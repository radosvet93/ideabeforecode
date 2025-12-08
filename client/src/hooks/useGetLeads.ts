import { useQuery } from "@tanstack/react-query";
import { fetchLeads } from "@/services/fetchLeads";

export const useGetLeads = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getLeads'],
    queryFn: fetchLeads
  });

  return { data, isLoading, error };
};
