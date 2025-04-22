import { useMutation } from "@tanstack/react-query";
import { useOktaAuth } from "@okta/okta-react";
import { useAppSelector } from "../redux/redux-hooks";
import { GraphQLClient } from "graphql-request";
import { getDataFromLocalStorage } from "../utils/persistentData";

export const useGraphQLMutation = (graphqlQuery, config = {}) => {
  const { user } = useAppSelector((state) => state.user);
  const { authState } = useOktaAuth();
  const trexAuthState  = getDataFromLocalStorage("trex-okta-authstate");
  const endpoint = import.meta.env.VITE_API_URL;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${
      trexAuthState
        ? trexAuthState?.idToken?.idToken
        : authState?.idToken?.idToken
    }`,
    "userType": user?.roleType ?? null
  };

  const mutationFn = (variables) => {
    const client = new GraphQLClient(endpoint, { headers });
    return client.request(graphqlQuery, variables);
  };

  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation({
    mutationFn,
    ...config,
  });

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  };
};
