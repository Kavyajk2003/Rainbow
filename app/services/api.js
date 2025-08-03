export async function postColorUpdate({ hex, timestamp }) {
  const response = await fetch('http://localhost:3000/colorUpdate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hex, timestamp }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response;
} 