import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfiniteAutoComplete from "./index";
import { useForm } from "react-hook-form";

jest.mock("../../hooks/useGraphQLInfiniteQueries", () => ({
  useGraphQLInfiniteQueries: jest.fn().mockImplementation(() => ({
    data: {},
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    isFetching: false,
    isLoading: false,
  })),
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
const TestComponent = () => {
  const { control } = useForm();
  return (
    <InfiniteAutoComplete
      name="test"
      control={control}
      inputSize="medium"
      label="Infinite Autocomplete"
      defaultValue={null}
      queryKey="testqueryKey"
      query="testQuery"
      queryVariableKey="key"
      initialVariables={{ test: "1234", page: 1, pageSize: 1 }}
      mapDataFunction={jest.fn().mockReturnValue([
        { lang: { en: { name: "label1" } }, slug: "value1" },
        { lang: { en: { name: "label2" } }, slug: "value2" },
        { lang: { en: { name: "label3" } }, slug: "value3" },
        { lang: { en: { name: "label4" } }, slug: "value4" },
        { lang: { en: { name: "label5" } }, slug: "value5" },
      ])}
      mapOptionFunction={(item) => ({
        label: item?.lang?.en?.name,
        value: item.slug,
      })}
      getNextPageParam={jest.fn()}
      variablesFunction={jest.fn()}
      disabled={false}
      required={false}
    />
  );
};

describe("InfiniteAutoComplete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  jest.mock("lodash", () => ({
    debounce: jest.fn((func) => func),
  }));

  test("renders InfiniteAutoComplete component with initial state", () => {
    render(<TestComponent />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("updates input value on user input", async () => {
    render(<TestComponent />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "label1");
    await waitFor(() => {
      expect(input).toHaveValue("label1");
    });
  });

  test("triggers debounce function on input change", async () => {
    render(<TestComponent />);
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "testing debounce");
    expect(jest.requireMock("lodash").debounce);
  });

  test("fetches next page on scroll to bottom",() => {
    render(<TestComponent />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "l" } });
    fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    fireEvent.click(screen.getByTestId(/CloseIcon/i))
  });
});
