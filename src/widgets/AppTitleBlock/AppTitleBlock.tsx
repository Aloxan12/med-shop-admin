import { AppFlex } from "@/shared/ui/AppFlex";
import { AppTitle } from "@/shared/ui/AppTitle";

interface AppTitleBlockProps {
  title: string;
}

export const AppTitleBlock = ({ title }: AppTitleBlockProps) => {
  return (
    <AppFlex fullWidth justify="between">
      <AppTitle>{title}</AppTitle>
      <AppFlex>actions</AppFlex>
    </AppFlex>
  );
};
