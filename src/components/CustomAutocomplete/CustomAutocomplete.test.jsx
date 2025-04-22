import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomAutoComplete from "./index";
import { FormProvider, useForm } from "react-hook-form";

const TestComponent = ({ loading }) => {
  const methods = useForm({
    test: undefined,
  });

  return (
    <FormProvider {...methods}>
      <CustomAutoComplete
        options={[{ title: "+ Add New Role", value: "+ Add New Role" }]}
        name="test"
        label="label"
        loading={loading}
        disabled={false}
        defaultValue={undefined}
      />
    </FormProvider>
  );
};

describe("CustomAutoComplete", () => {
  test("should render correctly", () => {
    render(<TestComponent />);
    const autocomplete = screen.getByRole("combobox");
    fireEvent.change(autocomplete, "Add");
    fireEvent.keyDown(autocomplete, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.click(screen.getByText("+ Add New Role"));
    fireEvent.change(autocomplete, "");
  });
  test("should show the circular progress if loading is true", () => {
    render(<TestComponent loading={true} />);
  });
});
