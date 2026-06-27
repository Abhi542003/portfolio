import { useState, useEffect } from 'react';

export const useIntersectionObserver = (sectionIds, options = { threshold: 0.3 }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px', // Offset to activate as section crosses center
      ...options
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeId;
};
