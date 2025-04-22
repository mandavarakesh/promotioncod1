import { render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import Scrollbar from "./Scrollbar";

describe("Scrollbar", () => {
  test("should render correctly", () => {
    render(TestHelper(<Scrollbar>Content</Scrollbar>));
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  test("should render the conten on mobile correctly", () => {
    Object.defineProperty(window, "navigator", {
      value: {
        userAgent: "Android",
      },
      writable: true,
    });
    render(TestHelper(<Scrollbar>Mobile Content</Scrollbar>));
    expect(screen.getByText(/Mobile Content/i)).toBeInTheDocument();
  });
});
