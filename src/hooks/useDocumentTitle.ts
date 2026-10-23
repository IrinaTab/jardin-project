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

    const fullTitle = title ? `${title} | Jardin — Постижерное ателье` : 'Jardin — Постижерное ателье';

    document.title = fullTitle;

    if (description) {
      // Обновляем обычный description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      // Обновляем Open Graph
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', fullTitle);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
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