import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@colors';

export async function getLocalColors() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn('Failed to load colors from storage:', error);
    return [];
  }
}

export async function saveLocalColors(colors) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  } catch (error) {
    console.warn('Failed to save colors to storage:', error);
  }
} 