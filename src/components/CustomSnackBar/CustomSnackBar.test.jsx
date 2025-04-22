import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHelper from "../../TestHelper";
import CustomSnackBar from "./index";

describe("CustomSnackBar", () => {
  const mockCloseFn = jest.fn();

  beforeEach(() => {
    render(
      TestHelper(
        <CustomSnackBar
          open={true}
          message="message"
          setOpen={mockCloseFn}
          isErrorMsg={true}
        />,
      ),
    );
  });

  test("renders CustomSnackBar correctly", () => {
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  test("should display the message", () => {
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();
  });

  test("should close the snack bar when clicking close icon", async () => {
    await userEvent.click(screen.getByTitle("Close"));
    expect(mockCloseFn).toHaveBeenCalledWith(false);
  });

  test("snackbar shouldn't be visible after 6sec", () => {
    jest.useFakeTimers();
    jest.advanceTimersByTime(6000);
    expect(mockCloseFn).toHaveBeenCalled();
  });

  test("should have error color if isError is true", () => {
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardError");
  });
});
