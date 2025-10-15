interface AppLoaderProps {
  loaderType: "main" | "block";
}

export const AppLoader = ({ loaderType }: AppLoaderProps) => {
  return <div>AppLoader... {loaderType}</div>;
};
