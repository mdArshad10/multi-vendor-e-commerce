import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    // if(true){
    //     throw redirect({
    //         to:"/dashboard",
    //     })
    // }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
