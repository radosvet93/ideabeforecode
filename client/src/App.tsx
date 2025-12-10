import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

const App = () => {

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4 container mx-auto">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
