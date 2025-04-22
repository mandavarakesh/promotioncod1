import { render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import RejectReasonDialog from "./RejectReasonDialog";
import userEvent from "@testing-library/user-event";



jest.mock("@okta/okta-react", () => ({
  useOktaAuth: jest.fn(() => ({
    oktaAuth: {
      revokeAccessToken: jest.fn(),
      revokeRefreshToken: jest.fn(),
      tokenManager: { clear: jest.fn() },
    },
  })),
}));

jest.mock("@okta/okta-react");
jest.mock("../../auth/OktaAuthProvider", () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="mock-okta-auth-provider">{children}</div>
    ),
  };
});
describe("RejectReasonDialog", () => {
  const mockSetOpen = jest.fn();
  const mockSubmit = jest.fn();

  test("renders correctly", () => {
    render(
      TestHelper(
        <RejectReasonDialog
          id="rejectReason"
          open={true}
          onSubmit={mockSubmit}
          setOpen={mockSetOpen}
          title="title"
        />,
      ),
    );

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Rejection Explaination/i }),
    ).toBeInTheDocument();
  });

  test("should show the error message if user clicks send without entering any reason", async () => {
    render(
      TestHelper(
        <RejectReasonDialog
          id="rejectReason"
          open={true}
          onSubmit={mockSubmit}
          setOpen={mockSetOpen}
          title="title"
        />,
      ),
    );
    await userEvent.click(screen.getByText(/send/i));
    expect(screen.getByText(/send/i)).toBeVisible();
  });
  test("On clicking send should call the api", async () => {
    render(
      TestHelper(
        <RejectReasonDialog
          id="rejectReason"
          open={true}
          onSubmit={mockSubmit}
          setOpen={mockSetOpen}
          title="title"
        />,
      ),
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /Rejection Explaination/i }),
      "test",
    );
    await userEvent.click(screen.getByText(/send/i));
    expect(mockSubmit).toHaveBeenCalled();
  });
  test("should display loading spinner if actionLoading prop is true", () => {
    render(
      TestHelper(
        <RejectReasonDialog
          id="rejectReason"
          open={true}
          onSubmit={mockSubmit}
          actionLoading={true}
          setOpen={mockSetOpen}
          title="title"
        />,
      ),
    );
  });
});
