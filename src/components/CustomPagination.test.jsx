import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import TestHelper from "../TestHelper";
import CustomPagination from "./CustomPagination";

const mockMutation = jest.fn();
jest.mock("../hooks/useGraphQLMutation", () => ({
  useGraphQLMutation: jest.fn().mockImplementation((_props) => {
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
jest.mock("../auth/OktaAuthProvider", () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="mock-okta-auth-provider">{children}</div>
    ),
  };
});

describe("Custom Pagination", () => {
  test("should render correctly ", async () => {
    render(
      TestHelper(
        <CustomPagination
          paginationModel={{
            pageSize: 10,
            lastEvaluatedKey: "",
          }}
          setPaginationModel={jest.fn()}
          lastEvaluatedKey={"last-evaluated-key"}
          loading={false}
        />
      )
    );
    const forwardIcon = screen.getByTestId("forward-icon");
    fireEvent.click(forwardIcon);
    const backwardIcon = screen.getByTestId("backward-icon");
    fireEvent.click(backwardIcon);
    fireEvent.mouseDown(screen.getAllByRole("button")[0]);
    waitFor(() => {
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText(/25/i));
    });
  });

  test("should render with loading true ", async () => {
    render(
      TestHelper(
        <CustomPagination
          paginationModel={{
            pageSize: 10,
            lastEvaluatedKey: null,
          }}
          setPaginationModel={jest.fn()}
          lastEvaluatedKey={"last-evaluated-key"}
          loading={true}
        />
      )
    );
  });
  test("should render with out lastEvaluatedKey ", async () => {
    render(
      TestHelper(
        <CustomPagination
          paginationModel={{
            pageSize: 10,
            page: 1,
          }}
          setPaginationModel={jest.fn()}
          lastEvaluatedKey={null}
          loading={false}
        />
      )
    );
    const forwardIcon = screen.getByTestId("forward-icon");
    fireEvent.click(forwardIcon);
    const backwardIcon = screen.getByTestId("backward-icon");
    fireEvent.click(backwardIcon);
    fireEvent.mouseDown(screen.getAllByRole("button")[0]);
    waitFor(() => {
      const listbox = within(screen.getByRole("listbox"));
      fireEvent.click(listbox.getByText(/50/i));
    });
  });
});
