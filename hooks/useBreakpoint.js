import { useState, useEffect } from "react";

export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)",
    );

    const handleMobileChange = (e) => setIsMobile(e.matches);
    const handleTabletChange = (e) => setIsTablet(e.matches);

    handleMobileChange(mobileQuery);
    handleTabletChange(tabletQuery);

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
