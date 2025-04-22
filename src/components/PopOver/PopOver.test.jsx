import React from "react";
import { render } from "@testing-library/react";
import PopOver from "./PopOver";

const TestComponent = () => {
  return <h1>test</h1>
}

describe("PopOver", () => {
  test("should render PopOver", () => {
    render(<PopOver Component={TestComponent} content="Test Content" />);
  });
});
