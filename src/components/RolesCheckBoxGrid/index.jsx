import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const RolesCheckBoxGrid = ({ roles, fields, isDefaultRole }) => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const handleCheckBoxChange = (e) => {
    clearErrors("customRoleAccess");
    return e.target.checked ? "Y" : "N";
  };
  return (
    <>
      {fields.length > 0 &&
        fields.map((field) => (
          <Box key={field.name} sx={{ width: { xs: "95%", sm: "60%" }, pt: 4 }}>
            <Controller
              name={field.name}
              defaultValue={field?.defaultValue ?? ""}
              control={control}
              render={({ field: { ref, ...rest }, fieldState: { error } }) => {
                return (
                  <TextField
                    {...rest}
                    inputRef={ref}
                    label={field.label}
                    error={!!error}
                    helperText={error?.message}
                    required={!isDefaultRole && field?.required}
                    disabled={field?.isDisabled || isDefaultRole}
                  />
                );
              }}
            />
          </Box>
        ))}
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", pt: 4 }}>
        {roles.map((item) => (
          <Box width="100%" key={item.id}>
            <Typography gutterBottom color="text.secondary" fontWeight="bold">
              {item.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row" },
                pl: 1,
              }}
            >
              {item.permissions.map((permission) => {
                return (
                  <Box
                    key={permission.label}
                    sx={{ flexBasis: { xs: "50%", sm: "25%" } }}
                  >
                    <FormControlLabel
                      label={permission.label}
                      disabled={isDefaultRole}
                      control={
                        <Controller
                          name={`customRoleAccess.${item.name}.${permission.value}`}
                          control={control}
                          defaultValue={"N"}
                          render={({
                            field: { value, ref, onChange, ...rest },
                          }) => (
                            <>
                              <Checkbox
                                {...rest}
                                inputRef={ref}
                                onChange={(e) =>
                                  onChange(handleCheckBoxChange(e))
                                }
                                checked={value === "Y"}
                              />
                            </>
                          )}
                        />
                      }
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
      {errors.customRoleAccess ? (
        <p style={{ color: "red" }}>{errors.customRoleAccess.root?.message}</p>
      ) : null}
    </>
  );
};

export default RolesCheckBoxGrid;
