import React from "react";
import { render } from "@testing-library/react";
import Day from "./Day"; // Replace with the correct path to your Day component

describe("Day Component", () => {
  const defaultProps = {
    startOfRange: false,
    endOfRange: false,
    disabled: false,
    highlighted: false,
    outlined: false,
    filled: false,
    onClick: jest.fn(),
    onHover: jest.fn(),
    value: "1",
    isSunday: false,
    isSaturday: false,
    isFirstDayOfMonth: false,
    isLastDayOfMonth: false,
  };

  it("renders without crashing", () => {
    render(<Day {...defaultProps} />);
  });

  it("renders the day value correctly", () => {
    const { getByText } = render(<Day {...defaultProps} />);
    const dayValue = getByText("1");
    expect(dayValue).toBeInTheDocument();
  });

  it("applies the correct border radius when highlighted and filled", () => {
    const { container } = render(<Day {...defaultProps} highlighted filled />);
    const boxElement = container.querySelector(".MuiBox-root");
    expect(boxElement).toHaveStyle("border-radius: 50%");
  });

  it("applies the correct background color when highlighted", () => {
    const { container } = render(<Day {...defaultProps} highlighted />);
    const boxElement = container.querySelector(".MuiBox-root");
    expect(boxElement).toHaveStyle("background-color: #42A5F5");
  });

  it("applies the correct border radius when filled and startOfRange", () => {
    const { container } = render(<Day {...defaultProps} filled startOfRange />);
    const boxElement = container.querySelector(".MuiBox-root");
    expect(boxElement);
  });
});
