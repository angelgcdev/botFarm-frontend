"use client";

import * as React from "react";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

type NavItemWithChildren = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  children?: NavItem[];
};

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
};

export function CollapsibleNavMain({
  items,
}: {
  items: NavItemWithChildren[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <React.Fragment key={item.title}>
              {
                <SidebarMenuItem>
                  <Link href={item.url}>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && (
                        <item.icon
                          className={
                            item.title === "Panel de administración"
                              ? "text-orange-600"
                              : ""
                          }
                        />
                      )}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              }
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
