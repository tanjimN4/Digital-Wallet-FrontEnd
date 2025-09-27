import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { generateRoutes } from "@/utils/generateRoutes";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Outlet, Route, Routes } from "react-router";
import { AppSidebar } from "../app-sidebar";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function DashboardLayout() {
  const { data, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) return <p className="text-center p-6">Loading...</p>;

  const currentUser = data?.data;
  const sidebarItems = getSidebarItems(currentUser);
  const userRoutes = generateRoutes(sidebarItems, currentUser);

  return (
    <SidebarProvider>
      <AppSidebar sidebarItems={sidebarItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Routes>
              {userRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.Component />} />
              ))}
            </Routes>
            <Outlet />
          </div>
          <div className=" min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
