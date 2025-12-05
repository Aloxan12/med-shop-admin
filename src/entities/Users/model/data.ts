import type { UserRoleType } from "@/entities/Users/model/types.ts";

export const userHeaderData = [
  { title: "Id", colWidth: "45%" },
  { title: "Email" },
  { title: "Role", colWidth: "45%" },
  { title: "Action", colWidth: "5%" },
];

export const usersRoleData: UserRoleType[] = [
  { value: "superadmin", label: "суперадмин" },
  { value: "admin", label: "админ" },
  { value: "manager", label: "менеджер" },
  { value: "client", label: "клиент" },
];
