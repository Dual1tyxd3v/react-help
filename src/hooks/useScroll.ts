import { useEffect, useState } from 'react';

export function useScroll() {
  const [element, setElement] = useState<HTMLDivElement | number>();

  useEffect(() => {
    if (!element && element !== 0) {
      return;
    }
    if (typeof element === 'number') {
      window.scrollTo(0, element);
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [element]);

  return setElement;
}
