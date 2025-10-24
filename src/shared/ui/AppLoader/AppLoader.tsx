import cls from "./AppLoader.module.scss";
import { classNames } from "@/shared/lib/classNames";

interface AppLoaderProps {
  loaderType?: "main" | "block";
}

export const AppLoader = ({ loaderType = "main" }: AppLoaderProps) => {
  return (
    <div className={classNames(cls.loaderWrap, {}, [cls[loaderType]])}>
      <span className={cls.loader} />
    </div>
  );
};
