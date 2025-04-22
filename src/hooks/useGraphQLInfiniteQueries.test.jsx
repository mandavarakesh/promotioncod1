import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useGraphQLInfiniteQueries } from "./useGraphQLInfiniteQueries";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
    useInfiniteQuery: jest.fn(),
}));

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: jest
    .fn()
    .mockReturnValue({
      authState: { idToken: { idToken: "token123" } },
    }),
}));

jest.mock("graphql-request", () => jest.fn());

describe("useGraphQLInfiniteQueries", () => {
  test("fetches data using useInfiniteQuery and request", async () => {
    const token = "mocked_token";
    const queryKey = "mocked_query_key";
    const graphqlQuery = "mocked_graphql_query";
    const variables = {};
    const variableKeyName={};

    useSelector.mockReturnValue({ token });

    useInfiniteQuery.mockReturnValue({
      data: "Mocked data",
      isLoading: false,
      isError: false,
    });

    jest.mock("graphql-request", () => ({
      request: jest.fn(),
    }));

    const { result } = renderHook(() =>
    useGraphQLInfiniteQueries(queryKey, graphqlQuery, variableKeyName,variables),
    );

    expect(useSelector).toHaveBeenCalled();
    expect(useInfiniteQuery).toHaveBeenCalled();
    expect(result.current.data).toEqual("Mocked data");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
