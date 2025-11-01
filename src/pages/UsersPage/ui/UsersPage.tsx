import { UsersHeader } from "@/entities/Users";
import { UsersTable } from "@/entities/Users/ui/UsersTable/UsersTable.tsx";

const UsersPage = () => {
  return (
    <div>
      <UsersHeader />
      <UsersTable />
    </div>
  );
};

export default UsersPage;
