import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../axios.config";
import { ENDPOINTS, ReactQueryKeys } from "../../constants/general.constant";
import { ICard } from "../../types/card.type";

const useGetCards = (search: string) => {
  return useQuery<ICard[]>({
    queryKey: [ReactQueryKeys.GET_CARDS, search],
    queryFn: () => queryCards(search),
    staleTime: 3 * 60 * 1000,
  });
};

export const queryCards = async (search: string): Promise<ICard[]> => {
  return (
    await axiosClient.get(`${ENDPOINTS.GET_CARDS}?search=${search || ""}`)
  ).data;
};

export default useGetCards;
