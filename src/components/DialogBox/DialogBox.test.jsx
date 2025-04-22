import { render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import DialogBox from "./index";
import userEvent from "@testing-library/user-event";

describe("DialogBox", () => {
  const mockOpenFn = jest.fn();

  test("should render the content and title", () => {
    render(
      TestHelper(
        <DialogBox
          open={true}
          children={<p>Content</p>}
          setOpen={mockOpenFn}
          title="title"
          onClose={jest.fn()}
          showCloseIcon={false}
        />,
      ),
    );
    expect(screen.getByText(/content/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });

  test("the dialog box should be closed when clicking close icon", async() => {
    render(
      TestHelper(
        <DialogBox
          open={true}
          children={<p>Content</p>}
          setOpen={mockOpenFn}
          title="title"
          onClose={jest.fn()}
          showCloseIcon={true}
        />,
      ),
    );
    await userEvent.click(screen.getByTestId(/CancelIcon/i));
    expect(mockOpenFn);
  });
});
