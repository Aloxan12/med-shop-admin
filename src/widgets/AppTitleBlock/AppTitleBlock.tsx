import { AppFlex } from "@/shared/ui/AppFlex";
import { AppTitle } from "@/shared/ui/AppTitle";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";

interface AppTitleBlockProps {
  title: string;
}

export const AppTitleBlock = ({ title }: AppTitleBlockProps) => {
  const [open, setOpen] = useState(false);

  return (
    <AppFlex fullWidth justify="between">
      <AppTitle>{title}</AppTitle>
      <AppFlex>
        <UserRoundPlus onClick={() => setOpen(true)} />
      </AppFlex>
    </AppFlex>
  );
};
