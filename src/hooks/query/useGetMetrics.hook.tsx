import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../axios.config";
import { ENDPOINTS, ReactQueryKeys } from "../../constants/general.constant";
import { IMetrics } from "../../types/metrics.type";

const useGetMetrics = (uuid: string) => {
  return useQuery<IMetrics>({
    queryKey: [ReactQueryKeys.GET_METRICS, { uuid }],
    queryFn: () => queryGetMetrics(uuid),
    staleTime: 3 * 60 * 1000,
    enabled: !!uuid,
  });
};

export const queryGetMetrics = async (uuid: string): Promise<IMetrics> => {
  return (
    await axiosClient.get(`${ENDPOINTS.GET_METRICS.replace(":cardId", uuid)}`)
  ).data;
};

export default useGetMetrics;
