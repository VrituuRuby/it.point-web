import { useRef } from "react";

export default function useDebounce(fn: (...args: any) => any, delay: number) {
  const timeoutRef = useRef<number | undefined>(undefined);

  function debouncedFunction(...args: any) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debouncedFunction;
}
