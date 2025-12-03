import { createRootRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>404 Not Found</div>,
});

function RootComponent() {
  return <Outlet />;
}
