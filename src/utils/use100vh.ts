import { useEffect, useState } from "react";

export const use100vh = () => {
  const [measuredWindowHeight, setMeasuredWindowHeight] = useState<
    string | number
  >(0);
  useEffect(() => {
    const measureHeight = () => {
      return document.documentElement?.clientHeight || window.innerHeight;
    };

    const updateHeight = () => {
      setMeasuredWindowHeight(measureHeight());
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return measuredWindowHeight > 0 ? measuredWindowHeight : "100vh";
};
