import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/services/fetchProjects";

export const useGetProjects = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['getProjects'],
    queryFn: fetchProjects
  });

  return { data, isLoading, error };
};
