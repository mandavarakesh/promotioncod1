import Header from './index';
import React from "react";
import { render} from "@testing-library/react";
import "@testing-library/jest-dom";
import TestHelper from "../../../TestHelper";

// Mock necessary dependencies or functions
jest.mock("@okta/okta-react", () => ({
  useOktaAuth: jest.fn(() => ({
    oktaAuth: {
      revokeAccessToken: jest.fn(),
      revokeRefreshToken: jest.fn(),
      tokenManager: { clear: jest.fn() },
    },
  })),
}));

jest.mock("../../../utils/persistentData", () => ({
  __esModule: true,
  ...jest.requireActual(),
  getDataFromLocalStorage: jest.fn().mockReturnValue({
    name: "Test User",
    email: "test@example.com",
    linkedMerchants: [],
    defaultShop: null,
  })
}));

jest.mock("../../../redux/redux-hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(() => ({
    user: {
      name: "Test User",
      email: "test@example.com",
      linkedMerchants: [],
      defaultShop: null,
    },
  })),
}));

jest.mock("@okta/okta-react");
jest.mock("../../../auth/OktaAuthProvider", () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="mock-okta-auth-provider">{children}</div>
    ),
  };
});

describe("TopHeader", () => {
  const dispatchMock = {};
  // Mock useDispatch hook
  jest.mock("../../../redux/redux-hooks", () => ({
    useAppDispatch: jest.fn(() => dispatchMock),
  }));
  // Mock useGraphQLMutation hook
  jest.mock("../../../hooks/useGraphQLMutation", () => ({
    useGraphQLMutation: jest.fn(() => ({ mutate: jest.fn() })),
  }));
  test('renders Header component correctly', () => {
    const mockOnOpenNav = jest.fn();
     render(TestHelper(<Header onOpenNav={mockOnOpenNav} />));
  });
});
