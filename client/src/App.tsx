import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-linear-to-br from-background via-background to-muted">
        <Header />
        <div className="p-4">
          <Dashboard />
        </div>
      </div>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
};

export default App;
