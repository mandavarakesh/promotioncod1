import React, { useEffect } from "react";
import DialogBox from "../DialogBox";
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

const RejectReasonDialog = ({
  open,
  setOpen,
  title,
  onSubmit,
  actionLoading,
  id,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [id]: "",
    },
  });

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <DialogBox open={open} setOpen={setOpen} title={title}>
      <DialogContent sx={{ width: { xs: "200px", sm: "500px" } }}>
        <Typography>Please state the reasons for rejection.</Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit((data, event) => {
            onSubmit(data, event, reset);
          })}
        >
          <TextField
            label="Rejection Explaination"
            multiline
            rows={4}
            autoFocus
            placeholder="Type your reasons here..."
            error={!!errors[id]?.message}
            helperText={errors[id]?.message}
            sx={{ mt: "1.5rem" }}
            {...register(id, {
              required: "Please provide a valid reason for rejection",
            })}
          />
          <Box
            py={1.5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              id="rejectReasonSend"
              type="submit"
              disabled={actionLoading}
              name="rejectReasonSend"
            >
              {actionLoading ? <CircularProgress size={25} /> : "Send"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </DialogBox>
  );
};

export default RejectReasonDialog;
