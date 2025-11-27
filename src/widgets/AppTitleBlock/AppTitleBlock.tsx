import { AppFlex } from "@/shared/ui/AppFlex";
import { AppTitle } from "@/shared/ui/AppTitle";
import { type LucideIcon } from "lucide-react";

import { AppButton } from "@/shared/ui/AppButton";
import React from "react";

interface ActionsType {
  title: string;
  onClick: () => void;
  icon?: LucideIcon;
}
interface AppTitleBlockProps {
  title: string;
  actions: ActionsType[];
}

export const AppTitleBlock = React.memo(
  ({ title, actions }: AppTitleBlockProps) => {
    return (
      <>
        <AppFlex fullWidth justify="between">
          <AppTitle>{title}</AppTitle>
          <AppFlex>
            {actions.map((action) => (
              <AppButton
                key={action.title}
                text={action.title}
                onClick={action.onClick}
                icoLeft={action.icon}
              />
            ))}
            {/*<UserRoundPlus onClick={() => setOpen(true)} />*/}
          </AppFlex>
        </AppFlex>
      </>
    );
  },
);
