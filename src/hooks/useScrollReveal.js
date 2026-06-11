import { useEffect } from 'react';

export function useScrollReveal(ready = true) {
  useEffect(() => {
    if (!ready) return undefined;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ready]);
}
