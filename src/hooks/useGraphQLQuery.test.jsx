import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useGraphQLQuery } from "./useGraphQLQuery";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: jest.fn().mockReturnValue({
    authState: { idToken: { idToken: "token123" } },
  }),
}));

jest.mock("graphql-request", () => jest.fn());

describe("useGraphQLQuery", () => {
  test("fetches data using useQuery and request", async () => {
    const token = "mocked_token";
    const queryKey = "mocked_query_key";
    const graphqlQuery = "mocked_graphql_query";
    const variables = {};

    useSelector.mockReturnValue({ token });

    useQuery.mockReturnValue({
      data: "Mocked data",
      isLoading: false,
      isError: false,
    });

    jest.mock("graphql-request", () => ({
      request: jest.fn(),
    }));

    const { result } = renderHook(() =>
      useGraphQLQuery(queryKey, graphqlQuery, variables)
    );

    expect(useSelector).toHaveBeenCalled();
    expect(useQuery).toHaveBeenCalled();
    expect(result.current.data).toEqual("Mocked data");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
