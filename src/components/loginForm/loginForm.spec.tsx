import * as Auth from "@/context/auth";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { LoginForm } from "./loginForm";
import { useRouter } from "next/router";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      replace: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
  usePathname() {
    return "";
  },
}));


jest.mock('../../context/auth.tsx', () => {
  return {
    __esModule: true,    //    <----- this __esModule: true is important
    ...jest.requireActual('../../context/auth.tsx')
  };
});

describe("Home", () => {
  it("renders a login form", () => {
    render(
      <Auth.AuthProvider>
        <LoginForm />
      </Auth.AuthProvider>
    );
    const loginButton = screen.getByText("Login");

    expect(loginButton).toBeInTheDocument();
  });
  it("login form should display error if nothing was provided", async () => {
    const authMock = jest.fn();
    jest.spyOn(Auth, "useAuth").mockImplementation(() => ({
      handleAuth: authMock,
      isAuth: false,
      handleLogout: jest.fn(),
    }));

    render(
      <Auth.AuthProvider>
        <LoginForm />
      </Auth.AuthProvider>
    );
    const loginButton = screen.getByText("Login");

    await fireEvent.click(loginButton);

    expect(authMock).not.toHaveBeenCalled();
  });
});
