import type { ComponentType } from "react";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER"|"AGENT";

export interface IUser {
  _id: string;
  name?: string;
  email: string;
  role: TRole; // "user" | "agent" | "admin" | "superAdmin"
  agentApprovalStatus?: "APPROVED" | "PENDING" | "REJECTED"; // only for agents
}
