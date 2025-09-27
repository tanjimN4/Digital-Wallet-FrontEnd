import type { ISidebarItem, IUser } from "@/types";

export const generateRoutes = (
  sidebarItems: ISidebarItem[] | ((user?: IUser) => ISidebarItem[]),
  user?: IUser
) => {
  const itemsArray = typeof sidebarItems === "function" ? sidebarItems(user) : sidebarItems;
  return itemsArray.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};
