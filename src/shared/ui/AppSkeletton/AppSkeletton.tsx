import style from "./style.module.scss";

type PropsType = {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
};

export const AppSkeleton = ({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  className = "",
}: PropsType) => {
  return (
    <div
      className={`${className} ${style.skeleton}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};
