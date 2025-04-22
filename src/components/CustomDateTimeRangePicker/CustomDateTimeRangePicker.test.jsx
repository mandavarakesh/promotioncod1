import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CustomDateTimeRangePicker from "./index";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";



jest.mock("@okta/okta-react", () => {
  return {
    ...jest.requireActual("@okta/okta-react"),
    useOktaAuth: jest.fn(),
  };
});


jest.mock("@okta/okta-react");
jest.mock("../../auth/OktaAuthProvider", () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="mock-okta-auth-provider">{children}</div>
    ),
  };
});

const TestComponent = ({ defaultValue }) => {
  const { control } = useForm();
  return (
    <FormProvider {...control}>
      <CustomDateTimeRangePicker
        control={control}
        name="test"
        label="Start Time"
        defaultValue={defaultValue}
      />
    </FormProvider>
  );
};

describe("CustomDateTimeRangePicker", () => {
  test("should render CustomDateTimeRangePicker", () => {
    render(<TestComponent />);
    const startTimeInput = screen.getByPlaceholderText("Start Time");
    const endTimeInput = screen.getByPlaceholderText("End Time");
    expect(startTimeInput).toBeInTheDocument();
    expect(endTimeInput).toBeInTheDocument();
  });

  test("closes the date range picker popover on selecting dates", async () => {
    render(<TestComponent />);
    const startInput = screen.getByPlaceholderText("Start Time");
    await userEvent.click(startInput);
    const date = screen.getAllByText(10)[0];
    const date1 = screen.getAllByText(15)[0];
    fireEvent.click(date);
    fireEvent.click(date1);
    fireEvent.click(screen.getByText("Select time"));
    fireEvent.click(screen.getAllByText(10)[0]);
    fireEvent.click(screen.getAllByText(30)[0]);
    fireEvent.click(screen.getAllByText(11)[1]);
    fireEvent.click(screen.getAllByText(40)[1]);
    fireEvent.click(screen.getByText("Confirm"));
  });

  test("closes the date range picker popover by click on close", async () => {
    render(<TestComponent defaultValue={"05/01/2024"} />);
    var svgElement = document.querySelector(
      ".react-minimal-datetime-range__clear"
    );
    fireEvent.click(svgElement);
  });


  test("selecting dates", async () => {
    render(<TestComponent />);
    const startInput = screen.getByPlaceholderText("Start Time");
    await userEvent.click(startInput);

    fireEvent.click(screen.getAllByText("10")[0])
    fireEvent.click(screen.getAllByText("11")[0])
    fireEvent.click(screen.getByText("Confirm"));
  });
});
