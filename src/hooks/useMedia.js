import { useState, useEffect } from 'react';

export function useMedia(pageName) {
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      try {
        const res = await fetch(`${API_BASE}/api/media/${pageName}`);
        const data = await res.json();

        // Transform and add full URL
        const transformedData = {};
        Object.keys(data).forEach(section => {
          transformedData[section] = data[section].map(item => ({
            ...item,
            image_url: item.image_url?.startsWith('data:image') || item.image_url?.startsWith('http')
              ? item.image_url 
              : `${API_BASE}${item.image_url}`
          }));
        });

        setMedia(transformedData);
      } catch (err) {
        console.error(`Error fetching media for ${pageName}:`, err);
      } finally {
        setLoading(false);
      }
    }

    if (pageName) fetchMedia();
  }, [pageName]);

  const getSectionImage = (section, index = 0) => {
    return media[section]?.[index]?.image_url || null;
  };

  return { media, loading, getSectionImage };
}
