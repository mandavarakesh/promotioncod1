import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CustomModal from "./CustomModal";

describe("CustomModal component", () => {
  const handleClose = jest.fn();
  const ModalTitle = "Test Modal";
  const Content = <div>Test Content</div>;

  test("renders modal correctly when open is true", () => {
    const { getByText } = render(
      <CustomModal
        open={true}
        handleClose={handleClose}
        ModalTitle={ModalTitle}
        Content={Content}
      />
    );

    expect(getByText(ModalTitle)).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  test("does not render modal when open is false", () => {
    const { queryByText } = render(
      <CustomModal
        open={false}
        handleClose={handleClose}
        ModalTitle={ModalTitle}
        Content={Content}
      />
    );

    expect(queryByText(ModalTitle)).not.toBeInTheDocument();
    expect(queryByText("Test Content")).not.toBeInTheDocument();
  });

  test("closes modal when close icon is clicked", () => {
    const { getByTestId } = render(
      <CustomModal
        open={true}
        handleClose={handleClose}
        ModalTitle={ModalTitle}
        Content={Content}
      />
    );
    const closeIcon = getByTestId("CancelIcon");
    fireEvent.click(closeIcon);
    expect(handleClose).toHaveBeenCalled();
  });

  test("does not call handleClose when modal is closed by clicking outside and isBackdrop is false", async () => {
    const { getByRole } = render(
      <CustomModal
        open={true}
        handleClose={handleClose}
        ModalTitle={ModalTitle}
        Content={Content}
        isBackdrop={false}
      />
    );
    const backdrop = getByRole("presentation");
    expect(backdrop).toBeVisible();

    fireEvent.mouseDown(backdrop);
    fireEvent.mouseUp(backdrop);
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalled();
  });

  test("does not call handleClose when modal is closed by clicking outside and isBackdrop is true", async () => {
    const { getByRole } = render(
      <CustomModal
        open={true}
        handleClose={handleClose}
        ModalTitle={ModalTitle}
        Content={Content}
        isBackdrop={true}
      />
    );
    const backdrop = getByRole("presentation");
    expect(backdrop).toBeVisible();

    fireEvent.mouseDown(backdrop);
    fireEvent.mouseUp(backdrop);
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalled();
  
  });

  test("call handleClose when modal is closed by click on close icon", async () => {
    render(
      <CustomModal
        open={true}
        handleClose={handleClose}
        ModalTitle={ModalTitle}
        showCloseIcon={true}
        
      />
    );
    const cancelIcon = screen.getByTestId("CancelIcon");
    fireEvent.click(cancelIcon);
    expect(handleClose).toHaveBeenCalled();
  });

  test("call handleClose when modal is closed by escape backdrop true", async () => {
    render(
      <CustomModal
        open={true}
        handleClose={handleClose}
        ModalTitle={ModalTitle}
        showCloseIcon={true}
        isBackdrop={true}


      />
    );
    fireEvent.keyDown(screen.getByText('Test Modal'), {
      key: 'Escape',
      code: 'Escape'
    });

  });


  test("call handleClose when modal is closed by escape", async () => {
    render(
      <CustomModal
        open={true}
        handleClose={handleClose}
        ModalTitle={ModalTitle}
        showCloseIcon={true}
        isBackdrop={false}


      />
    );
    fireEvent.keyDown(screen.getByText('Test Modal'), {
      key: 'Escape',
      code: 'Escape'
    });

  });


});
