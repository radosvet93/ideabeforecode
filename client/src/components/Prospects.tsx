import { useQuery } from "@tanstack/react-query";

interface ProspectResponse {
  id: string,
  name: string
}

const Prospects = () => {
  const fetchProspects = async () => {
    const response = await fetch('/api/prospects');
    const allProspects = await response.json() as ProspectResponse[];

    return allProspects;
  };

  const { isLoading, error, data: prospects } = useQuery({
    queryKey: ['getProspects'],
    queryFn: fetchProspects
  });

  if (isLoading) return 'Loading...';

  if (error) return 'Something went wrong';

  return !prospects ? (
    <p>no prospects</p>
  ) : (
    <ul>
      {prospects.map((prospect) => {
        return (
          <li key={prospect.id}>{prospect.name}</li>
        );
      })}
    </ul>
  );

};

export default Prospects;