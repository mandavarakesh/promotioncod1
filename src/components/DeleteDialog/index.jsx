import React from "react";
import DialogBox from "../DialogBox";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CustomButton from "../../components/CustomButton";

const DeleteDialog = ({ open, setOpen, title, isLoading, handleDelete }) => {
  return (
    <DialogBox open={open} setOpen={setOpen} title={title}>
      <DialogContent>
        <DialogContentText sx={{ width: { xs: "200px", sm: "500px" } }}>
          You cannot undo this action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton
          type="button"
          onClick={handleDelete}
          title="Yes"
          loading={isLoading}
        />
        <Button
          variant="cancel"
          disabled={isLoading}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </DialogBox>
  );
};

export default DeleteDialog;
