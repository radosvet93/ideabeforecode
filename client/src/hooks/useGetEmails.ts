import { useQuery } from "@tanstack/react-query";
import { fetchEmails } from "@/services/fetchEmails";

export const useGetEmails = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getEmails'],
    queryFn: fetchEmails
  });

  return { data, isLoading, error };
};
