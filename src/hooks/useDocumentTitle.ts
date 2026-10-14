// src/hooks/useDocumentTitle.ts

import { useEffect } from 'react';

export function useDocumentTitle(
  title: string,
  description?: string
): void {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDesc = document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content') ?? '';

    document.title = title
      ? `${title} | Jardin — Постижерное ателье`
      : 'Jardin — Постижерное ателье';

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = originalTitle;
      if (description) {
        document
          .querySelector('meta[name="description"]')
          ?.setAttribute('content', originalDesc);
      }
    };
  }, [title, description]);
}