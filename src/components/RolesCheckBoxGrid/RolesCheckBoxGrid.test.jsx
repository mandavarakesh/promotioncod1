import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import RolesCheckBoxGrid from "./index";

const mockFields = [
  { name: "field1", label: "Field 1" },
  { name: "field2", label: "Field 2" },
];

const mockRoles = [
  {
    id: 1,
    title: "Products",
    name: "merProductAccess",
    permissions: [
      { label: "View Products", value: "viewProducts" },
      { label: "Add & Edit Products", value: "addAndEditProducts" },
      { label: "Deactivate Products", value: "deactivateProducts" },
      { label: "Delete Products", value: "deleteProducts" },
      { label: "Export Products", value: "exportProducts" },
    ],
  },
];

const TestComponent = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <RolesCheckBoxGrid roles={mockRoles} fields={mockFields} />
    </FormProvider>
  );
};

test("renders the component", () => {
  render(<TestComponent />);

  expect(screen.getByLabelText("Field 1")).toBeInTheDocument();
  expect(screen.getByLabelText("Field 2")).toBeInTheDocument();
});

test("handles checkbox change", async () => {
  render(<TestComponent />);

  const checkbox = screen.getByLabelText(/Add & Edit Products/i);
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked()
});

test("renders correct number of fields", () => {
  render(<TestComponent />);

  expect(screen.getAllByRole("textbox")).toHaveLength(mockFields.length);
});
