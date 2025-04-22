import React from "react";

import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";

function Administration({ filteredTemplate = {} }) {
  const { details, ruleManagement, schedule } =
    filteredTemplate?.ruleProperties;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data, "data");
        })}
      >
        <Box>
          <Typography variant="h4">{details?.title} </Typography>

          {details?.fields?.map((field) => {
            return (
              <Box
                sx={{
                  margin: "30px 0px",
                }}
              >
                <TextField
                  label={field?.fieldName}
                  placeholder={field?.fieldName}
                  id={field?.fieldId}
                  {...register(field?.fieldName)}
                />
              </Box>
            );
          })}
        </Box>

        <Box>
          <Typography variant="h4">{ruleManagement?.title} </Typography>

          {ruleManagement?.fields?.map((field) => {
            return (
              <Box
                sx={{
                  margin: "30px 0px",
                }}
              >
                <TextField
                  label={field?.fieldName}
                  placeholder={field?.fieldName}
                  id={field?.fieldId}
                  {...register(field?.fieldName)}
                />
              </Box>
            );
          })}
        </Box>

        <Box>
          <Typography variant="h4">{schedule?.title} </Typography>

          {schedule?.fields?.map((field) => {
            return (
              <Box
                sx={{
                  margin: "30px 0px",
                }}
              >
                <TextField
                  label={field?.fieldName}
                  placeholder={field?.fieldName}
                  id={field?.fieldId}
                  {...register(field?.fieldName)}
                />
              </Box>
            );
          })}
        </Box>

        <Button type="submit"> Create Promotion</Button>
      </form>
    </>
  );
}

export default Administration;
