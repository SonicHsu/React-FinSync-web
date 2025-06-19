import { useState, useEffect } from "react";

// 自訂 Hook，判斷目前螢幕大小斷點狀態
export function useBreakpoint() {
  // isMobile：寬度 <= 639px
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // isTablet：寬度 640px ~ 1023px
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

     // 使用 matchMedia 建立監聽器，分別對手機和平板斷點判斷
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 640px) and (max-width: 1023px)",
    );

    setIsMobile(mobileQuery.matches);
    setIsTablet(tabletQuery.matches);

    // 事件處理函式，根據媒體查詢結果更新狀態
    const handleMobileChange = (e: MediaQueryListEvent) =>
      setIsMobile(e.matches);
    const handleTabletChange = (e: MediaQueryListEvent) =>
      setIsTablet(e.matches);

    // 加入事件監聽，監聽斷點變化
    mobileQuery.addEventListener("change", handleMobileChange);
    tabletQuery.addEventListener("change", handleTabletChange);

    // 清理監聽器，避免記憶體洩漏
    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
      tabletQuery.removeEventListener("change", handleTabletChange);
    };
  }, []);

  // 回傳裝置類型狀態，方便元件內判斷
  return {
    isMobile,
    isTablet,
    isMobileOrTablet: isMobile || isTablet,
    isDesktop: !isMobile && !isTablet,
  };
}
