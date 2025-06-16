import { useState, useEffect } from "react";

export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)",
    );

    setIsMobile(mobileQuery.matches);
    setIsTablet(tabletQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) =>
      setIsMobile(e.matches);
    const handleTabletChange = (e: MediaQueryListEvent) =>
      setIsTablet(e.matches);

    mobileQuery.addEventListener("change", handleMobileChange);
    tabletQuery.addEventListener("change", handleTabletChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      tabletQuery.removeEventListener("change", handleTabletChange);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isMobileOrTablet: isMobile || isTablet,
    isDesktop: !isMobile && !isTablet,
  };
}
