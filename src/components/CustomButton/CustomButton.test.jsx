import React from "react";
import { render, screen } from "@testing-library/react";
import CustomButton from "./index";

describe("CustomButton", () => {

  test("renders the button correctly with title and icon", () => {
    const mockTitle = "Submit";
    render(<CustomButton title={mockTitle} loading={false} disabled={false} />);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(buttonElement).not.toBeDisabled();
  });

  test("renders the button correctly with loading spinner and no icon", () => {
    render(<CustomButton loading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("disables the button when disabled prop is true", () => {
    render(<CustomButton disabled={true} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
