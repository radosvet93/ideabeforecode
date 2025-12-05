import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/components/projects/Projects";

export const useGetProjects = () => {
  const fetchProjects = async () => {
    const response = await fetch('/api/projects');
    const allProjects = await response.json() as Project[];

    return allProjects;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['getProjects'],
    queryFn: fetchProjects
  });

  return { data, isLoading, error };
};
