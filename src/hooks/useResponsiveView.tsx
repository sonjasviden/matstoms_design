import { useState, useEffect } from "react";

const useResponsiveView = (): boolean => {
  const isMobile = (query: string): boolean => {
    return window.matchMedia(query).matches;
  };

  const [mobileView, setMobileView] = useState<boolean>(
    isMobile("(max-width: 767px)")
  );

  useEffect(() => {
    const query = "(max-width: 767px)";
    const mediaQueryList = window.matchMedia(query);

    const updateMobileView = (e: MediaQueryListEvent) => {
      setMobileView(e.matches);
    };

    mediaQueryList.addEventListener("change", updateMobileView);

    return () => mediaQueryList.removeEventListener("change", updateMobileView);
  }, []);

  return mobileView;
};

export default useResponsiveView;
