import { render, screen } from "@testing-library/react";
import TestHelper from "../../../TestHelper";
import NavBar from "./index";
import { useAppSelector } from "../../../redux/redux-hooks";
import { useResponsive } from "../../../hooks/useResponsive";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest
    .fn()
    .mockReturnValueOnce({ pathname: "/" })
    .mockReturnValue({ pathname: "/somepath" }),
}));

jest.mock("../../../redux/redux-hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("../../../hooks/useResponsive", () => ({
  useResponsive: jest.fn(),
}));

describe("NavBar", () => {
  const closeMockfn = jest.fn();

  test("renders correctly", () => {
    useAppSelector.mockImplementation(() => ({ user: { roleType: 0 } }));
    render(TestHelper(<NavBar />));
  });

  test("should show admin tabs when roleType=0", () => {
    render(TestHelper(<NavBar openNav={true} onCloseNav={closeMockfn} />));
    expect(screen.getByText(/Merchant Management/i)).toBeVisible();
  });

  test("should show the merchant tabs when roleType=0", () => {
    useAppSelector.mockImplementation(() => ({ user: { roleType: 1 } }));
    render(TestHelper(<NavBar openNav={true} onCloseNav={closeMockfn} />));
    expect(screen.queryByText(/Merchant Management/i)).not.toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeVisible();
  });

  test("should close the navbar when path changes", () => {
    render(TestHelper(<NavBar openNav={true} onCloseNav={closeMockfn} />));
    expect(closeMockfn).toHaveBeenCalled();
  });

  test("should hide the side nav bar in mobile", () => {
    render(TestHelper(<NavBar openNav={true} onCloseNav={closeMockfn} />));
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  test("should always show the side nav bar in desktop", () => {
    useResponsive.mockImplementation(() => true);
    render(TestHelper(<NavBar openNav={true} onCloseNav={closeMockfn} />));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("should show the log based on roleType", () => {
    useAppSelector.mockImplementation(() => ({ user: { roleType: 0 } }));
    render(TestHelper(<NavBar openNav={true} onCloseNav={closeMockfn} />));
    expect(screen.getByAltText("TREX")).toBeInTheDocument();
  });
});
