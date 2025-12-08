import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

const App = () => {

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
