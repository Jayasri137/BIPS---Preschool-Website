import React, { createContext, useContext, useState, useCallback } from 'react';

const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState({});
  const pendingRequests = React.useRef({});

  const API_BASE = "https://bluestoneinternationalpreschool.com/api";

  const fetchMedia = useCallback(async (pageName) => {
    // 1. Check Cache first
    if (cache[pageName]) return;

    // 2. Check if a request for this pageName is already in progress
    if (pendingRequests.current[pageName]) {
      return pendingRequests.current[pageName];
    }

    setLoading(prev => ({ ...prev, [pageName]: true }));

    // 3. Create the promise and store it in pendingRequests ref
    const fetchPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE}/media/${pageName}`);
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

        setCache(prev => ({ ...prev, [pageName]: transformedData }));
        return transformedData;
      } catch (err) {
        console.error(`Error fetching media for ${pageName}:`, err);
        throw err;
      } finally {
        setLoading(prev => ({ ...prev, [pageName]: false }));
        delete pendingRequests.current[pageName];
      }
    })();

    pendingRequests.current[pageName] = fetchPromise;
    return fetchPromise;
  }, [cache]);

  const getMedia = useCallback((pageName) => {
    return cache[pageName] || {};
  }, [cache]);

  const getSectionImage = useCallback((pageName, section, index = 0) => {
    return cache[pageName]?.[section]?.[index]?.image_url || null;
  }, [cache]);

  const value = {
    fetchMedia,
    getMedia,
    getSectionImage,
    isLoading: (pageName) => !!loading[pageName],
  };

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMediaContext() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
}
