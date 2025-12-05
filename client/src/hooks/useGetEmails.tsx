import { useQuery } from "@tanstack/react-query";

interface Email {
  id: string,
  content: string,
  status: string
}

export const useGetEmails = () => {
  const fetchEmails = async () => {
    const response = await fetch('/api/emails');
    const allEmails = await response.json() as Email[];

    return allEmails;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['getEmails'],
    queryFn: fetchEmails
  });

  return { data, isLoading, error };
};
