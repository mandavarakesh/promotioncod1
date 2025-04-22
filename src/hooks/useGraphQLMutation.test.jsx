import { renderHook } from "@testing-library/react";
import { useAppSelector } from "../redux/redux-hooks";
import { useMutation } from "@tanstack/react-query";
import { useGraphQLMutation } from "./useGraphQLMutation";

jest.mock("../redux/redux-hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("graphql-request", () =>
  jest.fn().mockReturnValue({ request: jest.fn() }),
);

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: jest
    .fn()
    .mockReturnValue({
      authState: { idToken: { idToken: "token123" } },
    }),
}));

describe("useGraphQLMutation", () => {
  test("should do mutations using useMutation and request", async () => {
    const token = "mocked_token";
    const config = {};
    const graphqlQuery = "mocked_graphql_query";

    useAppSelector.mockReturnValue({ token });

    useMutation.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() =>
      useGraphQLMutation(graphqlQuery, config),
    );

    expect(useAppSelector).toHaveBeenCalled();
    expect(useMutation).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
