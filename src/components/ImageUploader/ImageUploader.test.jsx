import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ImageUploader from "./index";
import TestHelper from "../../TestHelper";
import { FormProvider, useForm } from "react-hook-form";

const TestComponent = (props) => {
  const formState = useForm({
    defaultValues: {
      image: props.ImageUrl ?? "",
    },
  });
  return (
    <FormProvider {...formState}>
      <ImageUploader
        name="image"
        accept={[".png", ".jpg", ".jpeg"]}
        label="Image"
      />
    </FormProvider>
  );
};

const mockMutation = jest.fn();
jest.mock("../../hooks/useGraphQLMutation.js", () => ({
  useGraphQLMutation: jest.fn().mockImplementation(() => {
    return {
      mutateAsync: mockMutation,
      isLoading: false,
    };
  }),
}));

describe("ImageUploader component", () => {
  test("renders without errors", () => {
    render(TestHelper(<TestComponent />));
    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
  });

  test("uploads a file when using the file input", async () => {
    render(TestHelper(<TestComponent ImageUrl="imageUrl" />));
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByLabelText("File Upload");
    fireEvent.change(input, { target: { files: [file] } });
    const productImage = await screen.findByAltText(/product image/i);
    expect(productImage).toBeInTheDocument();
  });

  test("removes the uploaded file when clicking delete", async () => {
    render(TestHelper(<TestComponent ImageUrl="imageUrl" />));
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByLabelText("File Upload");
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.mouseEnter(screen.getByAltText(/product image/i));
    fireEvent.click(screen.getByTestId(/DeleteForeverIcon/i));
    expect(screen.queryByAltText("product image")).toBeNull();
  });
  
  test("displays error messages for invalid file types and maximum size exceeded", async () => {
    render(TestHelper(<TestComponent />));
    const invalidFile = new File(["invalid content"], "example.docx", {
      type: "application/msword",
    });
    const input = screen.getByLabelText("File Upload");
    fireEvent.change(input, { target: { files: [invalidFile] } });
    await waitFor(() => {
      expect(/Allowed image types/i);
    });
  });

  test("displays progress spinner during file upload and disappears after completion", async () => {
    render(TestHelper(<TestComponent />));
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByLabelText("File Upload");
    fireEvent.change(input, { target: { files: [file] } });
  });

  test("displays action icons upon hovering over the image and hides when not hovered", async () => {
    render(TestHelper(<TestComponent ImageUrl="imageUrl" />));
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByLabelText("File Upload");
    fireEvent.change(input, { target: { files: [file] } });
    const productImage = await screen.findByAltText(/product image/i);
    fireEvent.mouseEnter(productImage);
    const replayIcon = screen.getByTestId("ReplayIcon");
    const deleteIcon = screen.getByTestId("DeleteForeverIcon");
    expect(replayIcon).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
    fireEvent.mouseLeave(productImage);
    await waitFor(() => {
      expect(screen.queryByTestId("ReplayIcon")).not.toBeInTheDocument();
      expect(screen.queryByTestId("DeleteForeverIcon")).not.toBeInTheDocument();
    });
  });

  test("removes the uploaded file when clicking reupload icon", async () => {
    render(TestHelper(<TestComponent ImageUrl="imageUrl" />));
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByLabelText("File Upload");
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.mouseEnter(screen.getByAltText(/product image/i));
    fireEvent.click(screen.getByTestId(/ReplayIcon/i));
  });

  test("image upload api call on onSuccess", async () => {
    mockMutation.mockImplementation((_variables, options) => {
      const { onSuccess } = options;
      const response = {
        ecsProductUploadImage: {
          code: 200,
          data: {},
          message: "Success",
        },
      };
      onSuccess(response);
    });
    render(TestHelper(<TestComponent ImageUrl="imageUrl" />));
    const boxDocument = screen.getByTestId("drop-container");
    const file = new File(["file contents"], "test.png", { type: "image/png" });
    const mockedDataTransfer = {
      files: [file],
      items: [{ kind: 'file', type: file.type, getAsFile: () => file }],
      types: ['Files'],
    };
    fireEvent.drop(boxDocument, {
      dataTransfer: mockedDataTransfer,
    });
  
  });
  test("image upload api call fail on onSuccess", async () => {
    mockMutation.mockImplementation((_variables, options) => {
      const { onSuccess } = options;
      const response = {
        ecsProductUploadImage: {
          code: 401,
          data: {},
          message: "",
        },
      };
      onSuccess(response);
    });
    render(TestHelper(<TestComponent ImageUrl="" />));
    const boxDocument = screen.getByTestId("drop-container");
    const file = new File(["file contents"], "test.png", { type: "image/png" });
    const mockedDataTransfer = {
      files: [file],
      items: [{ kind: 'file', type: file.type, getAsFile: () => file }],
      types: ['Files'],
    };
    fireEvent.drop(boxDocument, {
      dataTransfer: mockedDataTransfer,
    });
    await waitFor(() => {
    expect(screen.findByText("Image failed to upload"))
    })
  });


  test("image upload api call fail on OnError", async () => {
      mockMutation.mockImplementation((_variables, options) => {
        const { onError } = options;
        const response = {
          ecsProductUploadImage: {
            code: 400,
            data: "Invalid Data",
            message: "Server not responding. Please try again later",
          },
        };
        onError(new Error("Server Error"), response);
      });
    render(TestHelper(<TestComponent ImageUrl="" />));
    const boxDocument = screen.getByTestId("drop-container");
    const file = new File(["file contents"], "test.png", { type: "image/png" });
    const mockedDataTransfer = {
      files: [file],
      items: [{ kind: 'file', type: file.type, getAsFile: () => file }],
      types: ['Files'],
    };
    fireEvent.drop(boxDocument, {
      dataTransfer: mockedDataTransfer,
    });
    await waitFor(() => {
     expect(screen.findByText("Image failed to upload"))
    })
  });
});
