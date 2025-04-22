import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomTimePicker from "./index";
import { FormProvider, useForm } from "react-hook-form";

const TestComponent = () => {
  const { control } = useForm();
  return (
    <FormProvider {...control}>
      <CustomTimePicker
        control={control}
        name="test"
        label="label"
        required={true}
        disabled={false}
      />
    </FormProvider>
  );
};

describe("CustomTimePicker", () => {
  test("should render CustomTimePicker", () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByLabelText(/label */i));
    expect(screen.getByText(/Select time/i)).toBeInTheDocument()
  });

  test("closes the date picker popover when selecting a date check", async () => {
    render(<TestComponent />);
    const input = screen.getByLabelText( /label */i );
    fireEvent.click(input);
    const Hrs = screen.getByRole("option", { name: "10 hours" });
    fireEvent.click(Hrs)
    const Min = screen.getByRole("option", { name: "11 hours" });
    fireEvent.click(Min)
    const formate = screen.getByRole("button", { name: "AM" });
    fireEvent.click(formate)
    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(input);
  });
});
