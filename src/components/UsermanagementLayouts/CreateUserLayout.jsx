import { Box, Paper, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../PageHeader";
import { Controller, FormProvider } from "react-hook-form";
import CustomAutocomplete from "../CustomAutocomplete";
import RolesCheckBoxGrid from "../RolesCheckBoxGrid";
import CustomButton from "../CustomButton";
import CustomSnackBar from "../CustomSnackBar";
import AddIcon from "@mui/icons-material/Add";
import { adminPerms, merchantPerms } from "./RolePermissions";
import { isAdminOrMerchant } from "../../utils/isAdminOrMerchant";
import { useLocation } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { useGraphQLMutation } from "../../hooks/useGraphQLMutation";
import { GET_ALLMERCHANT_NAMES, VALIDATE_USER } from "../../graphql/queries";
import { useAppSelector } from "../../redux/redux-hooks";
import InfiniteAutoComplete from "../InfiniteAutoComplete";
import { newRoleObj } from "../../utils/userManagement";

const ADD_NEW_ROLE = "+ Add New Role";

const textFields = [
  {
    label: "Role Title",
    name: "customRoleTitle",
    required: true,
  },
];

const EMAIL_REGEX = /^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$/;

const DEFAULT_USER_ERROR_MSG = {
  isError: true,
  message: "Unable to fetch details, please try again",
};

const userNameInitials = {
  isError: false,
  message: "",
};

const getNextPageParam = (lastPage, _pages) =>
  lastPage?.getMerchantsByGSI?.lastEvaluatedKey;
const mapOptionFunction = (item) => ({
  label: item?.storeName?.name,
  value: item?.merchantId,
});

const mapDataFunction = (data) => {
  return data?.pages.map((pg) => pg?.getMerchantsByGSI?.data)?.flat() ?? [];
};

const variablesFunction = (prev, e) => ({
  ...prev,
  storeName: e?.target?.value ?? "",
});

const CreateUserLayout = ({
  formState,
  onSubmit,
  isLoading,
  options,
  buttonLoading,
  open,
  setOpen,
  infoMsg,
  selectedMerchantId,
  selectedRoleId,
  roleData,
  setSelectedMerchantId,
  setSelectedRoleId,
  emailSearchParam,
  isSuccess,
  roles,
}) => {
  const [emailAddress, setEmailAddress] = useState((prev) => {
    return emailSearchParam ? emailSearchParam : prev;
  });
  const [validationCount, setValidationCount] = useState(0);
  const [userName, setUserName] = useState(
    emailSearchParam ? emailSearchParam?.split("@")?.[0]?.toLowerCase() : null
  );
  const [userNameInfo, setUserNameInfo] = useState(userNameInitials);

  const { user } = useAppSelector((state) => state.user);
  const role = isAdminOrMerchant();
  const currentPage = useLocation().pathname;

  const isCreateAdminUserRoute = currentPage.includes("create-admin-user");
  const isAdminCreateMerUserRoute = currentPage.includes(
    "create-merchant-user"
  );
  const isEditAdminUserRoute = currentPage.includes("link-shop-account");
  const isMerCreateMerUserRoute = currentPage.includes("create-user");

  const {
    mutate: userValidation,
    data,
    isLoading: userValidationLoading,
  } = useGraphQLMutation(VALIDATE_USER);

  const isUserNameValid = data?.ecsUserValidate?.data?.valid;

  const {
    control,
    watch,
    handleSubmit,
    resetField,
    setValue,
    formState: { isDirty, errors, isSubmitSuccessful },
    getValues,
    reset,
    clearErrors,
  } = formState;

  const merchantId = watch("merchantName");
  const roleId = watch("role");
  const emailId = watch("email");

  useEffect(() => {
    if (isSuccess && isSubmitSuccessful) {
      reset();
      setUserName(
        isEditAdminUserRoute ? emailSearchParam?.split("@")?.[0]?.toLowerCase() : ""
      );
    }
  }, [isSuccess, isSubmitSuccessful, reset]);

  useEffect(() => {
    if (merchantId) {
      setSelectedMerchantId?.(merchantId?.value);
      if (merchantId?.value !== selectedMerchantId) {
        resetField("role");
        resetField("customRoleAccess", {});
        setSelectedRoleId?.(null);
      }
    }

    const isAddingNewRole = roleId === "" || roleId === ADD_NEW_ROLE;
    if (isAddingNewRole && isCreateAdminUserRoute) {
      setValue("customRoleAccess", newRoleObj.opCustomRoleAccess);
    }

    if (isAddingNewRole) {
      setValue("customRoleAccess", newRoleObj.customRoleAccess);
    }

    if (roleId) {
      setSelectedRoleId?.(roleId);
      if (roleId !== selectedRoleId) {
        if (isCreateAdminUserRoute) {
          const selectedRoleData = roles?.find(
            (item) => item.roleId === roleId
          );
          clearErrors();
          setValue("customRoleAccess", {
            opAdministrationAccess: selectedRoleData?.opAdministrationAccess,
            opDataInsightsAccess: selectedRoleData?.opDataInsightsAccess,
            opMerchantManagementAccess:
              selectedRoleData?.opMerchantManagementAccess,
            opOrderAccess: selectedRoleData?.opOrderAccess,
            opProductAccess: selectedRoleData?.opProductAccess,
          });
        }
      } else {
        clearErrors();
        setValue("customRoleAccess", {
          merDataInsightsAccess: roleData?.merDataInsightsAccess,
          merMyAccountAccess: roleData?.merMyAccountAccess,
          merOrderAccess: roleData?.merOrderAccess,
          merProductAccess: roleData?.merProductAccess,
        });
      }
    }
    if (emailId !== emailAddress) {
      setEmailAddress(emailId);
      setValidationCount(0);
    }
  }, [merchantId, roleId, selectedRoleId, selectedMerchantId, emailId, validationCount]);

  useEffect(() => {
    if (merchantId !== null) {
      validateUser({ target: { value: getValues("email") } });
    }
  }, [merchantId]);

  const getTitle = ({ isSubmitButton }) => {
    if (emailSearchParam && !isSubmitButton) {
      return "Link Shop Account";
    } else if (emailSearchParam && isSubmitButton) {
      return "Assign Shop";
    } else {
      return role === "ADMIN" && !isCreateAdminUserRoute
        ? "Create Merchant User"
        : "Create User";
    }
  };

  const getMerchantId = () => {
    if (
      (isAdminCreateMerUserRoute && merchantId) ||
      (isEditAdminUserRoute && merchantId)
    )
      return merchantId?.value;
    if (isMerCreateMerUserRoute) return user?.defaultShop;
    return 0;
  };

  const validateUser = (e, field) => {
    if (merchantId === null && isAdminCreateMerUserRoute) return null;
    const email = field === "userName" ? getValues("email") : e.target.value;
    if (
      (EMAIL_REGEX.test(email) && userName !== "" && validationCount < 1) ||
      (field === "userName" && userName !== getValues("userName"))
    ) {
      const variables = {
        userDetails: JSON.stringify({
          email,
          userName,
          merchantId: getMerchantId(),
        }),
      };
      userValidation(variables, {
        onSuccess: (response) => {
          const {
            data: userValidateData,
            code,
            message,
          } = response.ecsUserValidate;
          setEmailAddress();
          if (userValidateData.userName) {
            setUserName(userValidateData.userName);
          }
          if (code === 400 || code === 200) {
            setValidationCount((prev) => prev + 1);
            return setUserNameInfo({
              isError: !userValidateData.valid,
              message,
            });
          }
          return setUserNameInfo(DEFAULT_USER_ERROR_MSG);
        },
        onError: () => setUserNameInfo(DEFAULT_USER_ERROR_MSG),
      });
    }
  };

  return (
    <Stack>
      <PageHeader header={getTitle({ isSubmitButton: false })} />
      <Paper sx={{ p: 2 }}>
        <FormProvider {...formState}>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit((formData) =>
              onSubmit({ ...formData, userName })
            )}
          >
            <Box sx={{ width: { xs: "95%", sm: "60%" } }}>
              <Box sx={{ display: "flex", gap: 4, py: 2, flex: 1 }}>
                <Controller
                  name="email"
                  control={control}
                  disabled={emailSearchParam}
                  render={({
                    field: { ref, onChange, ...rest },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        {...rest}
                        onChange={(e) => {
                          const eventValue = e.target.value;
                          onChange(eventValue);
                          setUserName(eventValue?.split("@")?.[0]?.toLowerCase());
                          setUserNameInfo({ isError: false, message: "" });
                        }}
                        inputRef={ref}
                        onBlur={(e) => validateUser(e)}
                        required
                        label="Email address"
                        placeholder="john@gmail.com"
                        error={!!error}
                        helperText={error?.message}
                      />
                    );
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 4, py: 2, flex: 1 }}>
                <TextField
                  disabled={!userNameInfo.isError && validationCount <= 1}
                  value={userName}
                  name="userName"
                  onChange={(e) => {
                    setUserName(e.target.value?.split("@")?.[0]?.toLowerCase());
                  }}
                  onBlur={(e) => validateUser(e, "userName")}
                  required
                  label="Username"
                  placeholder="john"
                  error={userValidationLoading ? false : userNameInfo.isError}
                  helperText={
                    userValidationLoading
                      ? "Checking username availability, Please wait"
                      : userNameInfo.message
                  }
                  InputProps={{
                    endAdornment: isUserNameValid && (
                      <CheckIcon color="primary" />
                    ),
                  }}
                />
              </Box>
              <ShopAndRoleRender
                control={control}
                role={role}
                isCreateAdminUserRoute={isCreateAdminUserRoute}
                merchantId={merchantId}
                isLoading={isLoading}
                options={options}
              />
            </Box>
            <RenderRolesCheckBox
              role={role}
              roleId={roleId}
              merchantId={merchantId}
            />
            <Box sx={{ pt: 4 }}>
              <CustomButton
                title={getTitle({ isSubmitButton: true })}
                icon={<AddIcon />}
                loading={buttonLoading}
                disabled={
                  buttonLoading ||
                  !isDirty ||
                  Object.keys(errors)?.length > 0 ||
                  userValidationLoading ||
                  userNameInfo.isError
                }
              />
            </Box>
          </Box>
        </FormProvider>
      </Paper>
      <CustomSnackBar open={open} setOpen={setOpen} {...infoMsg} />
    </Stack>
  );
};

const RenderRolesCheckBox = ({ role, merchantId, roleId }) => {
  const isCreateAdminUserRoute =
    useLocation().pathname.includes("create-admin-user");
  if (role === "ADMIN" && !merchantId && roleId === ADD_NEW_ROLE) {
    return <RolesCheckBoxGrid roles={adminPerms} fields={textFields} />;
  }

  if (isCreateAdminUserRoute) {
    return <RolesCheckBoxGrid roles={adminPerms} fields={[]} isDefaultRole />;
  }

  return (
    <RolesCheckBoxGrid
      roles={merchantPerms}
      fields={roleId === ADD_NEW_ROLE ? textFields : []}
      isDefaultRole={roleId !== ADD_NEW_ROLE}
    />
  );
};

const ShopAndRoleRender = ({
  control,
  role,
  isCreateAdminUserRoute,
  merchantId,
  isLoading,
  options,
}) => {
  if (role === "ADMIN" && !isCreateAdminUserRoute) {
    return (
      <>
        <Box pt={2} py={2}>
          <InfiniteAutoComplete
            required
            getOutPutAsOption
            label="Shop"
            name="merchantName"
            control={control}
            query={GET_ALLMERCHANT_NAMES}
            queryKey="GET_ALLMERCHANT_NAMES"
            queryVariableKey="filterData"
            initialVariables={{
              lastEvaluatedKey: null,
              pageSize: 5,
              storeName: "",
            }}
            getNextPageParam={getNextPageParam}
            mapOptionFunction={mapOptionFunction}
            mapDataFunction={mapDataFunction}
            variablesFunction={variablesFunction}
          />
        </Box>
        {merchantId !== null ? (
          <Box pt={2}>
            <CustomAutocomplete
              required
              name="role"
              label="Select a Role"
              loading={isLoading}
              control={control}
              options={options}
            />
          </Box>
        ) : null}
      </>
    );
  } else {
    return (
      <Box pt={2}>
        <CustomAutocomplete
          required
          name="role"
          label="Select a Role"
          loading={isLoading}
          control={control}
          options={options}
        />
      </Box>
    );
  }
};

export default CreateUserLayout;
