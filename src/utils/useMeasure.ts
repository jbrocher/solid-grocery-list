import { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

export function useMeasure() {
  const ref = useRef<HTMLUListElement>(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [resizeObserver] = useState(
    () => new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current !== null) {
      resizeObserver.observe(ref.current);
    }
    return () => resizeObserver.disconnect();
  }, [resizeObserver]);
  return { ref, bounds };
}
