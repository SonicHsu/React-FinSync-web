import { useBreakpoint } from "./useBreakpoint";

type ResponsiveValues<T> = {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  sm?: T;
  md?: T;
  lg?: T;
  default?: T;
};

export function useResponsiveValue<T>(values:ResponsiveValues<T>): T | undefined{
  const { isMobile, isTablet } = useBreakpoint();
  
  if (isMobile) return values.mobile || values.sm;
  if (isTablet) return values.tablet || values.md;
  return values.desktop || values.lg || values.default;
}