import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const Prospects = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch('/api/prospects');

      return await response.json();
    },
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return JSON.stringify(data, null, 2);
};

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <h1>
        Lead Flow
      </h1>
      <Prospects />
    </QueryClientProvider>
  );
};

export default App;
