import { useInfiniteQuery } from "@tanstack/react-query";
import { useOktaAuth } from "@okta/okta-react";
import { useSelector } from "react-redux";
import { GraphQLClient } from "graphql-request";
import { getDataFromLocalStorage } from "../utils/persistentData";

export const useGraphQLInfiniteQueries = (
  queryKey,
  graphqlQuery,
  variableKeyName,
  variables,
  config = {}
) => {
  const { user } = useSelector((state) => state.user);
  const { authState } = useOktaAuth();
  const trexAuthState = getDataFromLocalStorage("trex-okta-authstate");
  const endpoint = import.meta.env.VITE_API_URL;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      trexAuthState
        ? trexAuthState?.idToken?.idToken
        : authState?.idToken?.idToken
    }`,
    userType: user?.roleType ?? null,
  };
  const getQueryVariables = (pageParam) => {
    if (queryKey?.includes("GET_ALLMERCHANT_NAMES")) {
      return {
        [variableKeyName]: JSON.stringify({
          ...variables,
          lastEvaluatedKey: pageParam ?? null,
        }),
      };
    }
    return {
      [variableKeyName]: JSON.stringify({ ...variables, page: pageParam ?? 1 }),
    };
  };
  const queryFn = (pageParam) => {
    const queryVariables =
      variableKeyName !== ""
        ? getQueryVariables(pageParam)
        : {};
    const client = new GraphQLClient(endpoint, { headers });
    return client.request(graphqlQuery, queryVariables);
  };

  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdateCount,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchNextPage,
    fetchPreviousPage,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isInitialLoading,
    isLoading,
    isLoadingError,
    isPaused,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    ...config,
  });

  return {
    data,
    dataUpdatedAt,
    error,
    errorUpdateCount,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchNextPage,
    fetchPreviousPage,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isInitialLoading,
    isLoading,
    isLoadingError,
    isPaused,
    isPlaceholderData,
    isPreviousData,
    isRefetchError,
    isRefetching,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
    hasNextPage,
    hasPreviousPage,
  };
};
