import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RangeSlider from "./index";
import { FormProvider, useForm } from "react-hook-form";

const TestComponent = () => {
  const { control } = useForm();
  return (
    <FormProvider {...control}>
      <RangeSlider
        name="test"
        control={control}
        label="Test Label"
        placeholder="Test Placeholder"
        defaultValue={[20, 80]}
        sx={{}}
        required={false}
        InputProps={{}}
        disabled={false}
        type="range"
      />
    </FormProvider>
  );
};
describe("RangeSlider Component", () => {
  test("renders RangeSlider component", () => {
    render(<TestComponent />);
    expect(screen.getByText("Test Label"));
  });
  test("handles slider change", () => {
    render(<TestComponent />);
    const rangeSlider = screen.getAllByRole("slider", { value: /80/i })[1];
    fireEvent.change(rangeSlider, { target: { value: "70" } });
    expect(screen.getAllByRole("slider", { value: /70/i })[1]);
  });
  test("renders with default value", () => {
    const defaultValue = [20, 80];
    render(<TestComponent />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getAllByRole("slider", { min: /0/i })[1]);
    expect(screen.getAllByRole("slider", { max: /1000/i })[1]);
    const slider = screen.getAllByRole("slider")[0];
    expect(slider).toHaveAttribute("aria-valuetext", `${defaultValue[0]}°C`);
    const slider1 = screen.getAllByRole("slider")[1];
    expect(slider1).toHaveAttribute("aria-valuetext", `${defaultValue[1]}°C`);
  });
});
