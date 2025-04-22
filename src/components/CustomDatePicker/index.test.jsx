import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import CustomDatePicker from "./index";

const TestComponent = ({ type = "date" }) => {
  const { control } = useForm();
  return (
    <FormProvider {...control}>
      <CustomDatePicker
        control={control}
        name="test"
        label="label"
        required={true}
        type={type}
        disabled={false}
      />
    </FormProvider>
  );
};

describe("CustomTimePicker", () => {
  test("should render CustomTimePicker", () => {
    render(<TestComponent />);
    const input = screen.getByLabelText(/label/i);
    fireEvent.click(input);
    fireEvent.click(screen.getByText(20));
    fireEvent.click(screen.getByText(/OK/i));
  });
  test("should render CustomTimePicker and click on cancel", () => {
    render(<TestComponent />);
    const input = screen.getByLabelText(/label/i);
    fireEvent.click(input);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(input).toHaveValue("DD/MM/YYYY");
  });

  test("should render CustomTimePicker with out type date", () => {
    render(<TestComponent type={null} />);
    const input = screen.getByLabelText(/label/i);
    fireEvent.click(input);
    fireEvent.click(screen.getByText(20));
    fireEvent.click(screen.getByText(/OK/i));
  });
});
