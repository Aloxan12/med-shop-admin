const productsRoutes = {
  products: "products",
};

const categoriesRoutes = {
  categories: "categories",
};

const userRoutes = {
  users: "users",
};

export const allRouterPaths = {
  login: "login",
  logout: "logout",
  googleCallback: "google-callback",
  main: "/",
  forbidden: "forbidden",
  ...userRoutes,
  ...productsRoutes,
  ...categoriesRoutes,
};
