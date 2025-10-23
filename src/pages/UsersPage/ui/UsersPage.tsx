import { UsersHeader } from "@/entities/Users";
import { useUserList } from "@/entities/Users/api/useUser.ts";

const UsersPage = () => {
  const { data } = useUserList({ page: 1, limit: 10 });

  console.log("data user", data);
  return (
    <div>
      <UsersHeader />
    </div>
  );
};

export default UsersPage;
