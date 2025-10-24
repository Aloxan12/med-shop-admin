interface AppLoaderProps {
  loaderType?: "main" | "block";
}

export const AppLoader = ({ loaderType = "main" }: AppLoaderProps) => {
  return <div>AppLoader... {loaderType}</div>;
};
