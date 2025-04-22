import { render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import DeleteDialog from ".";
import userEvent from "@testing-library/user-event";

describe("DeleteDialog", () => {
  const mockOpenFn = jest.fn();
  const deleteMockFn = jest.fn();

  test("renders correctly", () => {
    render(
      TestHelper(
        <DeleteDialog
          open={true}
          isLoading={false}
          handleDelete={deleteMockFn}
          setOpen={mockOpenFn}
          title="testTitle"
        />,
      ),
    );
    expect(screen.getByText(/testTitle/i)).toBeInTheDocument();
  });

  test("on Clicking yes should call the delete function", async () => {
    render(
      TestHelper(
        <DeleteDialog
          open={true}
          isLoading={false}
          handleDelete={deleteMockFn}
          setOpen={mockOpenFn}
          title="testTitle"
        />,
      ),
    );
    await userEvent.click(screen.getByRole("button", { name: /yes/i }));
    expect(deleteMockFn).toHaveBeenCalled();
  });

  test("on Clicking cancel should close the popup", async () => {
    render(
      TestHelper(
        <DeleteDialog
          open={true}
          isLoading={false}
          handleDelete={deleteMockFn}
          setOpen={mockOpenFn}
          title="testTitle"
        />,
      ),
    );
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(mockOpenFn).toHaveBeenCalled();
  });

  test("should show the loading spinner if is Loading is true", async () => {
    render(
      TestHelper(
        <DeleteDialog
          open={true}
          isLoading={true}
          handleDelete={deleteMockFn}
          setOpen={mockOpenFn}
          title="testTitle"
        />,
      ),
    );
  });
});
