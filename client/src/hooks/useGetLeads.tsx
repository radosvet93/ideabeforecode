import { useQuery } from "@tanstack/react-query";

interface Lead {
  id: string,
  name: string,
  description: string,
  createdAt: Date
}

export const useGetLeads = () => {
  const fetchLeads = async () => {
    const response = await fetch('/api/leads');
    const allLeads = await response.json() as Lead[];

    return allLeads;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['getLeads'],
    queryFn: fetchLeads
  });

  return { data, isLoading, error };
};
