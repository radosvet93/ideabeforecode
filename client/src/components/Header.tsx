import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

const Header = ({ hasBackButton = false }: { hasBackButton?: boolean }) => {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="flex justify-between">
        <h1>Lead Flow</h1>
        {hasBackButton && (
          <Link to="/">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:opacity-90">
              Back to projects
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;