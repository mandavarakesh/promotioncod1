import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountPopover from "./index";
import TestHelper from "../../../TestHelper";

jest.mock("../../../redux/redux-hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(() => ({
    user: {
      name: "Test User",
      email: "test@example.com",
      linkedMerchants: [],
      defaultShop: null,
    },
  })),
}));

jest.mock("../../../utils/persistentData", () => ({
  __esModule: true,
  ...jest.requireActual(),
  getDataFromLocalStorage: jest.fn().mockReturnValue({
    name: "Test User",
    email: "test@example.com",
    linkedMerchants: [],
    defaultShop: null,
  }),
}));

describe("AccountPopover", () => {
  const dispatchMock = {};
  // Mock useDispatch hook
  jest.mock("../../../redux/redux-hooks", () => ({
    useAppDispatch: jest.fn(() => dispatchMock),
  }));
  // Mock useGraphQLMutation hook
  jest.mock("../../../hooks/useGraphQLMutation", () => ({
    useGraphQLMutation: jest.fn(() => ({ mutate: jest.fn() })),
  }));
  test("renders AccountPopover and logs out successfully", async () => {
    // Render component with necessary providers
    render(TestHelper(<AccountPopover />));
    expect(screen.getByText(/T/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/T/i));

    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => {
      expect(dispatchMock);
    });
  });
  test("should show the current user name and email", async () => {
    render(TestHelper(<AccountPopover />));
    expect(screen.getByText(/T/i)).toBeInTheDocument();
  });

  test("should show the current user name and email in popup", async () => {
    render(TestHelper(<AccountPopover />));
    expect(screen.getByText(/T/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/T/i));
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });
  test("currrent user log out by click on logout ", async () => {
    render(TestHelper(<AccountPopover />));
    expect(screen.getByText(/T/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/T/i));
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("menuitem", { name: /Logout/i }));
  });
});
