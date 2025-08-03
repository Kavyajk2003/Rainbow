import { useCallback, useEffect, useRef, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { postColorUpdate } from '../services/api';
import { getLocalColors, saveLocalColors } from '../services/storage';
import useNetworkStatus from './useNetworkStatus';

function randomHex() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
}

export default function useColorScreen() {
  const [colors, setColors] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const isOnline = useNetworkStatus();
  const prevOnline = useRef(isOnline);

  // Load colors on mount
  useEffect(() => {
    async function loadColors() {
      const localColors = await getLocalColors();
      setColors(localColors);
    }
    loadColors();
  }, []);

  // Add color to local storage and update in DB
  const addColor = useCallback(async () => {
    const newColor = {
      id: uuidv4(),
      hex: randomHex(),
      timestamp: Date.now(),
      synced: false,
    };

    setColors(prevColors => {
      const updated = [newColor, ...prevColors];
      saveLocalColors(updated)
      return updated;
    });

    if (isOnline) {
      setSyncing(true);
      try {
        await postColorUpdate(newColor);
        setColors(prevColors => {
          const updated = prevColors.map(c =>
            c.id === newColor.id ? { ...c, synced: true } : c
          );
          saveLocalColors(updated).catch(err => {
            console.warn('Failed to save synced colors to storage:', err);
          });
          return updated;
        });
      } catch (err) {
        console.warn('Failed to sync color:', err);
      } finally {
        setSyncing(false);
      }
    }
  }, [isOnline]);

  useEffect(() => {
    if (isOnline && !prevOnline.current) {
      const unsynced = colors.filter((c) => !c.synced);

      if (unsynced.length > 0) {
        setSyncing(true);

        Promise.allSettled(
          unsynced.map(async (color) => {
            try {
              await postColorUpdate(color);
              return { success: true, color };
            } catch (err) {
              console.warn('Failed to sync color on restore:', color.hex, err);
              return { success: false, color };
            }
          })
        )
          .then((results) => {
            const successfulSyncs = results
              .filter(result => result.status === 'fulfilled' && result.value.success)

            if (successfulSyncs.length > 0) {
              setColors(prevColors => {
                const updated = prevColors.map(c =>
                  successfulSyncs.some(s => s.id === c.id)
                    ? { ...c, synced: true }
                    : c
                );
                saveLocalColors(updated);
                return updated;
              });
            }
          })
          .catch((error) => {
            console.warn('Failed to process sync results:', error);
          })
          .finally(() => setSyncing(false));
      }
    }
    prevOnline.current = isOnline;
  }, [isOnline, colors]);

  return { colors, isOnline, syncing, addColor };
} 