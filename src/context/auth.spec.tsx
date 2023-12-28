import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AuthProvider } from "./auth";
import React from "react";

jest.mock('next/navigation', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      replace: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
  usePathname() {
    return ''
  }
}))

describe("Home", () => {
  it("renders a auth context", () => {
    render(<AuthProvider />);

    expect(screen).toBeTruthy();
  });
});
