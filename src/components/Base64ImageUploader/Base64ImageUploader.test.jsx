import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import Base64ImageUploader from "./index";
import { FormProvider, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

const TestComponentCommon = ({ defaultValue }) => {
  const { control, setValue } = useForm();
  return (
    <Base64ImageUploader
      defaultValue={defaultValue}
      name="testImage"
      control={control}
      setValue={setValue}
      acceptedFormats={[".png", ".jpg", ".jpeg", ".svg"]}
    />
  );
};
describe("Base64ImageUploader", () => {
  test("should render the given image", () => {
    render(TestHelper(<TestComponentCommon defaultValue="imageurl" />));
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteForeverIcon")).toBeInTheDocument();
  });
  test("should call dragging over the component", () => {
    render(<TestComponentCommon defaultValue="image" />);
    const handleDragOver = jest.fn();
    const boxLabel = screen.getByTestId("box-label");
    fireEvent.dragOver(boxLabel);
    expect(handleDragOver);
  });
  test("should call item is dropped on the component", () => {
    render(<TestComponentCommon defaultValue="image" />);
    const handleUpload = jest.fn();
    const boxLabel = screen.getByTestId("box-label");
    fireEvent.drag(boxLabel);
    expect(handleUpload);
  });
  test("should re-upload image", async () => {
    render(<TestComponentCommon defaultValue="imageurl" />);
    const reUploadButton = screen.getByTestId("ReplayIcon");
    fireEvent.click(reUploadButton);
    screen.queryByTestId("box-document");
  });
  test("should cancel uploaded image", async () => {
    render(<TestComponentCommon defaultValue="imageurl" />);
    const cancelButton = screen.getByTestId("DeleteForeverIcon");
    fireEvent.click(cancelButton);
    expect(screen.queryByTestId("box-label")).not.toBeInTheDocument();
  });
  test("should show error for unsupported file format", async () => {
    render(<TestComponentCommon />);
    const unsupportedFile = new File(["test content"], "unsupportedFile.txt", {
      type: "text/plain",
      size: 10000,
    });
    const fileList = {
      0: unsupportedFile,
      length: 1,
      item: (_index) => unsupportedFile,
    };
    const input = document.createElement("input");
    input.type = "file";
    Object.defineProperty(input, "files", {
      value: fileList,
      writable: false,
    });
    input.addEventListener("change", jest.fn());
    fireEvent.change(input);
    screen.queryByText("Only .png, .jpg, .jpeg, .svg files are allowed.");
  });
  it("handles file drop and processes it correctly", async () => {
    const name = "testImage";
    const acceptedFormats = [".jpg", ".png"];
    const mockOnChange = jest.fn();
    const TestComponent = () => {
      const { control } = useForm();
      return (
        <FormProvider>
          <Base64ImageUploader
            name={name}
            control={control}
            defaultValue=""
            onChange={mockOnChange}
            onBlur={jest.fn()}
            helperText1="Helper Text 1"
            helperText2="Helper Text 2"
            acceptedFormats={acceptedFormats}
            clearErrors={jest.fn()}
          />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    const dropzone = screen.getByTestId("drop-on");
    userEvent.upload(
      dropzone,
      new File(["file content"], "test-image.jpg", { type: "image/jpeg" })
    );
    await waitFor(() => {
      expect(mockOnChange);
    });
  });
  it("handles file drop correctly", async () => {
    const mockOnChange = jest.fn();
    const mockClearErrors = jest.fn();
    const name = "testImage";
    const acceptedFormats = [".jpg", ".png"];
    const TestComponent = () => {
      const { control } = useForm();
      return (
        <FormProvider>
          <Base64ImageUploader
            name={name}
            control={control}
            defaultValue=""
            onChange={mockOnChange}
            onBlur={jest.fn()}
            helperText1=""
            helperText2=""
            acceptedFormats={acceptedFormats}
            clearErrors={jest.fn()}
          />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    const file = new File(["file content"], "test.png", { type: "image/png" });
    const dropzone = screen.getByTestId("drop-on");
    fireEvent.change(dropzone, { target: { files: [file] } });
    await waitFor(() => {
      expect(mockClearErrors);
      expect(mockOnChange);
    });
  });

  it("displays error message for invalid file type", async () => {
    const mockSetError = jest.fn();
    const name = "name";
    const TestComponent = () => {
      const { control } = useForm();
      return (
        <FormProvider>
          <Base64ImageUploader
            name={name}
            control={control}
            defaultValue=""
            onChange={jest.fn()}
            onBlur={jest.fn()}
            helperText1="Helper Text 1"
            helperText2="Helper Text 2"
            acceptedFormats={[".jpg"]}
            clearErrors={jest.fn()}
            setError={mockSetError}
          />
        </FormProvider>
      );
    };
    render(<TestComponent />);
    const file = new File(["file content"], "test.png", { type: "image/png" });
    const dropzone = screen.getByTestId("drop-on");
    fireEvent.change(dropzone, { target: { files: [file] } });
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith("name", {
        type: "custom",
        message: "Only .jpg files are allowed.",
      });
    });
  });
});
