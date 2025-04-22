import { Box, Paper, Stack } from "@mui/material";
import React from "react";
import PageHeader from "../PageHeader";
import { FormProvider } from "react-hook-form";
import RolesCheckBoxGrid from "../RolesCheckBoxGrid";
import CustomButton from "../CustomButton";
import AddIcon from "@mui/icons-material/Add";
import CustomSnackBar from "../CustomSnackBar";
import { useAppSelector } from "../../redux/redux-hooks";
import { adminPerms, merchantPerms } from "./RolePermissions";

const fields = {
  CREATEROLE: [
    {
      label: "Role Title",
      name: "customRoleTitle",
      required: true,
    },
  ],
  EDITROLE: [
    {
      label: "Role Title",
      name: "customRoleTitle",
      required: true,
    },
    {
      label: "Last Updated",
      name: "lastUpdateDate",
      isDisabled: true,
    },
    {
      label: "Last Updated by",
      name: "lastUpdatedBy",
      isDisabled: true,
    },
  ],
};

const RoleLayout = ({
  header,
  onSubmit,
  formState,
  renderedBy,
  open,
  setOpen,
  infoMsg,
  isLoading,
  title,
  isDefaultRole,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const {
    handleSubmit,
    formState: { isDirty },
  } = formState;
  return (
    <Stack>
      <PageHeader header={header} />
      <Paper sx={{ px: 2, pb: 2 }}>
        <FormProvider {...formState}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <RolesCheckBoxGrid
              isDefaultRole={isDefaultRole}
              roles={user.roleType === 0 ? adminPerms : merchantPerms}
              fields={fields[renderedBy]}
            />
            <Box sx={{ pt: 4 }}>
              <CustomButton
                loading={isLoading}
                disabled={isLoading || !isDirty || isDefaultRole}
                icon={<AddIcon />}
                title={title}
              />
            </Box>
          </Box>
        </FormProvider>
      </Paper>
      <CustomSnackBar open={open} setOpen={setOpen} {...infoMsg} />
    </Stack>
  );
};

export default RoleLayout;
