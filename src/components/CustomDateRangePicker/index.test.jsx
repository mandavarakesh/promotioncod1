import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CustomDateRangePicker from "./index";
import { FormProvider, useForm } from "react-hook-form";
 
describe("CustomDateRangePicker", () => {
  test("should render CustomDateRangePicker", () => {
    const TestComponent = () => {
      const { control } = useForm();
      return (
        <FormProvider {...control}>
          <CustomDateRangePicker
            control={control}
            name="test"
            label="label"
            id=""
            disabled={false}
          />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    const startInput = screen.getByLabelText("Start Date");
    const endInput = screen.getByLabelText("End Date");
    expect(startInput).toBeInTheDocument();
    expect(endInput).toBeInTheDocument();
    fireEvent.click(startInput);
    const datePicker = screen.getByTestId("date-picker");
    expect(datePicker).toBeInTheDocument();
  });
  test("closes the date picker popover when selecting a date check", async () => {
    const TestComponent = () => {
      const { control } = useForm();
      return (
        <FormProvider {...control}>
          <CustomDateRangePicker
            control={control}
            name="test"
            label="label"
            id=""
            disabled={false}
            inputSize={"small"}
          />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    const stack = screen.getByRole("textbox", { name: "Start Date" });
    fireEvent.click(stack);
    const popover = screen.getByTestId("datePopup-open");
    expect(popover).toBeVisible();
    fireEvent.click(screen.getAllByText(3)[0]);
    fireEvent.click(screen.getAllByText(5)[0]);
    await waitFor(() => {
      expect(popover).not.toBeVisible();
    });
  });
});