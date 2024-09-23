import { useEffect, useRef } from "react";

export function usePreviousData<T>(data: T) {
  const previousData = useRef<T>(data);

  useEffect(() => {
    previousData.current = data;
  }, [data]);

  return previousData.current;
}