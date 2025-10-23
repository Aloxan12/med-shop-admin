import { UsersHeader } from "@/entities/Users";
import { UsersTable } from "@/entities/Users/ui/UsersTable/UsersTable.tsx";
import { useUserList } from "@/entities/Users/api/useUser.ts";

const UsersPage = () => {
  const { data } = useUserList({ page: 1, limit: 10 });
  console.log("data", data);
  return (
    <div>
      <UsersHeader />
      <UsersTable />
    </div>
  );
};

export default UsersPage;
