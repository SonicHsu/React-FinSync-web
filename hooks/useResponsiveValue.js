import { useBreakpoint } from "./useBreakpoint";

export function useResponsiveValue(values) {
  const { isMobile, isTablet } = useBreakpoint();
  
  if (isMobile) return values.mobile || values.sm;
  if (isTablet) return values.tablet || values.md;
  return values.desktop || values.lg || values.default;
}