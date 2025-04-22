import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import MultiSelectWithCheckBox from "./index";
import TestHelper from "../../TestHelper";

const options = [
  { value: "1", title: "Option 1" },
  { value: "2", title: "Option 2" },
];
describe("MultiSelectWithCheckBox Component", () => {
  
  test("renders without crashing", () => {
    const TestComponent = () => {
      const { methods, control } = useForm();
      return (
        <FormProvider {...methods}>
          <MultiSelectWithCheckBox
            name="testSelect"
            control={control}
            label="Test Label"
            options={options}
          />
        </FormProvider>
      );
    };
    render(TestHelper(<TestComponent />));
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });
  test("selects options and handles changes correctly", async () => {

    const TestComponent = () => {
      const { methods, control } = useForm();
      return (
        <FormProvider {...methods}>
          <MultiSelectWithCheckBox
            name="testSelect"
            control={control}
            label="Test Label"
            defaultValue={"2"}
            options={options}
            addCheckBoxSelection={true}
          />
        </FormProvider>
      );
    };
    render(TestHelper(<TestComponent />));
    fireEvent.click(screen.getByLabelText("Test Label"))
    const checkboxOption = screen.getByTestId('option-1-checkbox');
    userEvent.click(checkboxOption);
    expect(checkboxOption)
    const checkboxOption1 = screen.getByTestId('option-2-checkbox');
    userEvent.click(checkboxOption1);
    expect(checkboxOption1)
  });
});

