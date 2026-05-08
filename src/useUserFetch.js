import { useState, useEffect } from 'react';

export function useUserFetcher(userId) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Track the error
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let isCancelled = false;

    setLoading(true);
    setError(null);

    fetchUser(userId)
      .then((json) => {
        if (!isCancelled) setData(json);
      })
      .catch((err) => {
        if (!isCancelled) setError(err.message); // Catch the error here!
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => { isCancelled = true; }; // Cleanup to prevent memory leaks
  }, [userId]);
  // Return exactly what the UI needs
  return { data, loading, error };
}

async function fetchUser(id) {
  const response = await fetch(`https://api.com{id}`);
  if (!response.ok) throw new Error("Could not fetch user data");
  return response.json();
}