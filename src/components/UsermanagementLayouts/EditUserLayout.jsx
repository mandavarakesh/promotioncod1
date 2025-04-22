import React from "react";
import { Box, FormControlLabel, Paper, Stack, TextField } from "@mui/material";
import { Controller, FormProvider } from "react-hook-form";
import PageHeader from "../PageHeader";
import CustomAutocomplete from "../CustomAutocomplete";
import RolesCheckBoxGrid from "../RolesCheckBoxGrid";
import CustomButton from "../CustomButton";
import CustomSnackBar from "../CustomSnackBar";
import AddIcon from "@mui/icons-material/Add";
import IOSSwitch from "../IOSSwitch";
import { adminPerms, merchantPerms } from "./RolePermissions";
import { useAppSelector } from "../../redux/redux-hooks";

const textFields = [
  {
    label: "Role Title",
    name: "customRoleTitle",
    required: true,
  },
];

const ADD_NEW_ROLE = "+ Add New Role";
const USER_STATUS_ACTIVE = "ACTIVE";

const EditUserLayout = ({
  formState,
  onSubmit,
  options,
  disableRoleStatus,
  disableAutocomplete,
  handleRoleStatusChange,
  open,
  setOpen,
  infoMsg,
  buttonLoading,
  isLoading,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const {
    handleSubmit,
    control,
    watch,
    formState: { isDirty },
  } = formState;

  return (
    <Stack>
      <PageHeader header="Edit User" />
      <Paper sx={{ p: 2 }}>
        <FormProvider {...formState}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box sx={{ width: { xs: "95%", sm: "60%" } }}>
              <Box sx={{ display: "flex", gap: 4, py: 2, flex: 1 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <TextField
                      inputRef={ref}
                      {...rest}
                      label="Email address"
                      disabled
                    />
                  )}
                />
              </Box>
              <Controller
                name="lastUpdatedBy"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    inputRef={ref}
                    {...rest}
                    label="Last Updated by"
                    disabled
                  />
                )}
              />
              <Box pt={2}>
                <FormControlLabel
                  label="User Status"
                  control={
                    <Controller
                      name="userRoleStatus"
                      control={control}
                      render={({ field }) => (
                        <IOSSwitch
                          disabled={disableRoleStatus}
                          inputRef={field.ref}
                          checked={field.value === USER_STATUS_ACTIVE}
                          onChange={(e) =>
                            field.onChange(handleRoleStatusChange(e))
                          }
                          sx={{ m: 1 }}
                        />
                      )}
                    />
                  }
                />
              </Box>
              <Box pt={2}>
                <CustomAutocomplete
                  required={!disableAutocomplete}
                  name="role"
                  label="Select a Role"
                  control={control}
                  loading={isLoading}
                  disabled={disableAutocomplete}
                  options={options}
                />
              </Box>
            </Box>
            {watch("role") === ADD_NEW_ROLE && (
              <RolesCheckBoxGrid
                roles={user.roleType === 0 ? adminPerms : merchantPerms}
                fields={textFields}
              />
            )}
            <Box sx={{ pt: 2, pr: 2 }}>
              <CustomButton
                title="Save"
                loading={buttonLoading}
                disabled={buttonLoading || !isDirty}
                icon={<AddIcon />}
              />
            </Box>
          </Box>
        </FormProvider>
      </Paper>
      <CustomSnackBar open={open} setOpen={setOpen} {...infoMsg} />
    </Stack>
  );
};

export default EditUserLayout;
