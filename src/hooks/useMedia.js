import { useEffect } from 'react';
import { useMediaContext } from '../context/MediaContext';

export function useMedia(pageName) {
  const { fetchMedia, getMedia, getSectionImage, isLoading } = useMediaContext();

  useEffect(() => {
    if (pageName) {
      fetchMedia(pageName);
    }
  }, [pageName, fetchMedia]);

  return {
    media: getMedia(pageName),
    loading: isLoading(pageName),
    getSectionImage: (section, index = 0) => getSectionImage(pageName, section, index)
  };
}

