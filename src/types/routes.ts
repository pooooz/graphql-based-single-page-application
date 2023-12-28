export enum Routes {
  LOGIN = "/login",
  HOME = "/",
  LOOS = '/loos',
}

export const PublicRoutes = [Routes.HOME, Routes.LOGIN]
export const PrivateRoutes = [Routes.LOOS]