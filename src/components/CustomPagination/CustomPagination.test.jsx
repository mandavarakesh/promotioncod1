import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomPagination from "./index";
import { useTheme } from "@mui/material";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn(),
}));

describe("CustomPagination", () => {
  beforeEach(() => {
    useTheme.mockReturnValue({});
  });

  test("renders the pagination correctly", () => {
    const count = 100;
    const page = 0;
    const rowsPerPage = 10;
    const onPageChangeMock = jest.fn();

    render(
      <CustomPagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChangeMock}
      />,
    );

    const previousButton = screen.getByLabelText("previous page");
    const nextButton = screen.getByLabelText("next page");

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  test("calls onPageChange with correct page when previous button is clicked", async () => {
    const count = 100;
    const page = 1;
    const rowsPerPage = 10;
    const onPageChangeMock = jest.fn();

    render(
      <CustomPagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChangeMock}
      />,
    );

    await userEvent.click(screen.getByLabelText("previous page"));

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(expect.any(Function));
    const newPage = onPageChangeMock.mock.calls[0][0]({ page });
    expect(newPage.page).toBe(page - 1);
  });

  test("calls onPageChange with correct page when next button is clicked", async () => {
    const count = 100;
    const page = 1;
    const rowsPerPage = 10;
    const onPageChangeMock = jest.fn();

    render(
      <CustomPagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChangeMock}
      />,
    );

    await userEvent.click(screen.getByLabelText("next page"));

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(expect.any(Function));
    const newPage = onPageChangeMock.mock.calls[0][0]({ page });
    expect(newPage.page).toBe(page + 1);
  });

  test("displays the correct label for displayed rows", () => {
    const count = 100;
    const page = 1;
    const rowsPerPage = 10;
    const onPageChangeMock = jest.fn();
    render(
      <CustomPagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChangeMock}
      />,
    );
    expect(screen.getByText(/11–20 of 100/i)).toBeInTheDocument();
  });
  test("renders the pagination when count -1", () => {
    const count = -1;
    const page = 1;
    const rowsPerPage = 10;
    const onPageChangeMock = jest.fn();
    render(
      <CustomPagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChangeMock}
      />,
    );
  });
  test("renders the pagination when rows per page -1", () => {
    const count = 100;
    const page = 1;
    const rowsPerPage = -1;
    const onPageChangeMock = jest.fn();
    render(
      <CustomPagination
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChangeMock}
      />,
    );
  });
});
