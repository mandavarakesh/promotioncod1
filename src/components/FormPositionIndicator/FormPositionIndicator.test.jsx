import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import FormPositionIndicator from "./index";
import TestHelper from "../../TestHelper";

const SECTION = {
  GENERIC: 0,
  VARIANT: 1,
  CATEGORY: 2,
};
const sections = [
  { id: SECTION.GENERIC, name: "Generic Attributes" },
  { id: SECTION.VARIANT, name: "Unique Attributes" },
  { id: SECTION.CATEGORY, name: "Category Attributes" },
];
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
const mockHandleSectionChange = jest.fn();

const state = {
  showSection: 0,
  genericSectionValues: "",
  variantSectionValues: "",
  categorySectionValues: "",
};

jest.mock("../../redux/redux-hooks", () => ({
  ...jest.requireActual("../../redux/redux-hooks"),
  useAppSelector: jest.fn().mockImplementation(() => state),
}));

describe("FormPositionIndicator", () => {
  beforeEach(() => {
    render(
      TestHelper(
        <FormPositionIndicator
          handleSectionChange={mockHandleSectionChange}
          disabled={false}
        />,
      ),
    );
  });

  test("should render checkboxes for each milestone", () => {
    sections.forEach((section) => {
      expect(screen.getByText(section.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByTestId("checkbox")[0])

  });
});
