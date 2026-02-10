import { useState } from 'react';

export type MediaRow = { url: string; alt: string };

export function useVenueMedia() {
  const [media, setMedia] = useState<MediaRow[]>([{ url: '', alt: '' }]);

  function addMediaRow() {
    setMedia((prev) => [...prev, { url: '', alt: '' }]);
  }

  function updateMediaRow(index: number, patch: Partial<MediaRow>) {
    setMedia((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  function removeMediaRow(index: number) {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  }

  return {
    media,
    setMedia,
    addMediaRow,
    updateMediaRow,
    removeMediaRow,
  };
}
