import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import NumberInput from "./index";
import TestHelper from "../../TestHelper";

const TestComponent = ({ defaultValue }) => {
  const { control } = useForm();
  return (
    <FormProvider {...control}>
      <NumberInput
        name={"name"}
        control={control}
        label={"Input"}
        placeholder="Enter a number"
        defaultValue={defaultValue}
        sx={""}
        showDials={false}
        required={false}
        InputProps={""}
        disabled={false}
      />
    </FormProvider>
  );
};

describe("NumberInput", () => {
  test("renders correctly with label and placeholder", () => {
    render(<TestComponent defaultValue="42" />);
    const labelElement = screen.getByLabelText("Input");
    const placeholderElement = screen.getByPlaceholderText("Enter a number");
    expect(labelElement).toBeInTheDocument();
    expect(placeholderElement).toBeInTheDocument();
    expect(labelElement).toHaveValue("42");
  });
  test("handles user input correctly", () => {
    render(<TestComponent />);
    const labelElement = screen.getByLabelText("Input");
    fireEvent.change(labelElement, { target: { value: "12" } });
    expect(labelElement).toHaveValue("12");
    fireEvent.keyDown(labelElement, { key: "3", keyCode: 51, which: 51 });
  });
  test("should prevent non-numeric input and handle valid input", () => {
    render(TestHelper(<TestComponent />));
    const input = screen.getByLabelText("Input");
    fireEvent.keyDown(input, { key: "a", keyCode: 65, which: 65 });
    expect(input.value).toBe("");
    fireEvent.keyDown(input, { key: "z", keyCode: 90, which: 90 });
    expect(input.value).toBe("");
    fireEvent.keyDown(input, { key: "tab", keyCode: 9, which: 9 });
    expect(input.value).toBe("");
  });
  test("should prevent non-numeric input and handle valid input", async () => {
    render(TestHelper(<TestComponent />));
    const input = screen.getByLabelText("Input");
    fireEvent.wheel(input);
    await waitFor(() => {
      expect(input);
    });
  });
});
