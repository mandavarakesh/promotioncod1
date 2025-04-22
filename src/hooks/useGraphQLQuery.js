import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { GraphQLClient } from "graphql-request";
import { useOktaAuth } from "@okta/okta-react";
import { getDataFromLocalStorage } from "../utils/persistentData";

export const useGraphQLQuery = (
  queryKey,
  graphqlQuery,
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
    userType: user?.roleType ?? null
  };
  const abortControllerRef = useRef();
  const queryFn = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const client = new GraphQLClient(endpoint, {
      headers,
      signal: abortController.signal,
    });
    return client.request(graphqlQuery, variables);
  };

  const {
    data,
    dataUpdatedAt,
    error,
    errorUpdateCount,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
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
  } = useQuery({
    queryKey,
    queryFn,
    ...config,
  });
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  // console.groupEnd();
  return {
    data,
    dataUpdatedAt,
    error,
    errorUpdateCount,
    errorUpdatedAt,
    failureCount,
    failureReason,
    fetchStatus,
    isError,
    isFetched,
    isFetchedAfterMount,
    isFetching,
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
  };
};
