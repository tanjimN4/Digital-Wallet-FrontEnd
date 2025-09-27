import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { ISidebarItem } from "@/types";
import { getSidebarItems } from "@/utils/getSidebarItems";
import * as React from "react";
import { Link } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const { data: userData } = useUserInfoQuery(undefined);
  const sidebarItems: ISidebarItem[] = getSidebarItems(userData?.data);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        {sidebarItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};
