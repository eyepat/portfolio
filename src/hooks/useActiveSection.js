import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds, ready = true) {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!ready) return undefined;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.45 }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sectionIds, ready]);

  return active;
}
