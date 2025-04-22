import { fireEvent, render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import UserStatusSwitch from "./UserStatusSwitch";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
}));

const mockMutation = jest.fn();
jest.mock("../../hooks/useGraphQLMutation", () => ({
  useGraphQLMutation: jest.fn().mockImplementation(() => {
    return {
      mutate: mockMutation,
      isLoading: false,
    };
  }),
}));

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

test("render User Status Switch component correctly", async () => {
  mockMutation.mockImplementation((_variables, options) => {
    const { onSuccess } = options;
    const response = {
      ecsUpdateUser: {
        code: 200,
        data: {
          status: "",
        },
        message: "",
      },
    };
    onSuccess(response);
  });

  render(
    TestHelper(
      <UserStatusSwitch
        statusInitialValue={"ACTIVE"}
        setInfoMsg={jest.fn()}
        setOpen={jest.fn()}
        selectedUserEmail={"email"}
        refetch={jest.fn()}
      />
    )
  );

    fireEvent.click(screen.getByTestId("ios-switch"));
});


test("render User Status Switch component correctly with error", async () => {
  mockMutation.mockImplementation((_variables, options) => {
    const { onError } = options;
    const response = {
      ecsUpdateUser: {
        code: 400,
        data: {
          status: "",
        },
        message: "",
      },
    };
    onError(response);
  });

  render(
    TestHelper(
      <UserStatusSwitch
        statusInitialValue={"ACTIVE"}
        setInfoMsg={jest.fn()}
        setOpen={jest.fn()}
        selectedUserEmail={"email"}

      />
    )
  );

    fireEvent.click(screen.getByTestId("ios-switch"));
});