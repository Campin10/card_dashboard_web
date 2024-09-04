import { useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "../../../axios.config";
import {
  DEFAULT_PAGINATION_LIMIT,
  ENDPOINTS,
  ReactQueryKeys,
} from "../../constants/general.constant";
import { calculateOffset } from "../../helpers/pagination.helper";
import { IActivityResponse } from "../../types/activity.type";

const useGetActivity = (cardId: string | undefined, enabled: boolean) => {
  return useInfiniteQuery<IActivityResponse>({
    queryKey: [ReactQueryKeys.GET_ACTIVITY, cardId, enabled],
    queryFn: ({ pageParam }) => queryFetchProperties(cardId, Number(pageParam)),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.pagination.moreAvailable
        ? Number(lastPageParam) + 1
        : undefined;
    },
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    enabled: !!cardId && enabled,
  });
};

export const queryFetchProperties = async (
  cardId: string | undefined,
  page: number
): Promise<IActivityResponse> => {
  const offset = calculateOffset(page, DEFAULT_PAGINATION_LIMIT);

  return (
    await axiosClient.get(
      `${ENDPOINTS.GET_ACTIVITY.replace(
        ":cardId",
        cardId || ""
      )}?skip=${offset}&limit=${DEFAULT_PAGINATION_LIMIT}`
    )
  ).data;
};

export default useGetActivity;
