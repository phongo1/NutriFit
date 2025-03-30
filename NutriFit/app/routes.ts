import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("signUp", "routes/signUp.tsx"),
    route("searchItem", "routes/searchItem.tsx"),
    route("profile", "routes/profile.tsx"),
] satisfies RouteConfig;
