import { useCallback, useRef } from "react";

interface Props {
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

const useLastPageItemObserver = ({
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: Props) => {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (isLoading || isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  return lastElementRef;
};

export default useLastPageItemObserver;
