import { renderHook } from "@testing-library/react";
import { useResponsive } from "./useResponsive";

describe("useGraphQLMutation", () => {
  test("should able to use the hook with query up", async () => {
    renderHook(() => useResponsive("up", "lg"));
  });
  test("should able to use the hook with query down", async () => {
    renderHook(() => useResponsive("down", "lg"));
  });
  test("should able to use the hook with query between", async () => {
    renderHook(() => useResponsive("between", "lg"));
  });
  test("should able to use the hook", async () => {
    renderHook(() => useResponsive());
  });
});
