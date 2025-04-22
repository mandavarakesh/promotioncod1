import React, { useState } from "react";
import IOSSwitch from "../IOSSwitch";
import { Box, FormControlLabel, Typography } from "@mui/material";
import {
  SERVER_ERROR,
  USER_STATUS_ACTIVE,
  USER_STATUS_DEACTIVATED,
  USER_STATUS_INVITED,
} from "../../utils/userManagement";
import { useAppSelector } from "../../redux/redux-hooks";
import { useGraphQLMutation } from "../../hooks/useGraphQLMutation";
import { UPDATE_USER } from "../../graphql/mutations";

const UserStatusSwitch = ({
  statusInitialValue,
  selectedUserEmail,
  setInfoMsg,
  setOpen,
  refetch,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [status, setStatus] = useState(statusInitialValue);
  const { mutate, isLoading } = useGraphQLMutation(UPDATE_USER);

  const handleRoleStatusChange = (e) => {
    const userStatusChange = e.target.checked
      ? USER_STATUS_ACTIVE
      : USER_STATUS_DEACTIVATED;
    const variables = {
      updateUserData: JSON.stringify({
        merchantRoles: [],
        status: userStatusChange,
        email: selectedUserEmail,
      }),
      currentUserEmail: JSON.stringify({ currentUserEmail: user.email }),
    };
    mutate(variables, {
      onSuccess: (response) => {
        const { code, data, message } = response?.ecsUpdateUser;
        if (code === 200) {
          refetch();
          setStatus(data.status);
        }
        setInfoMsg({ message, isErrorMsg: code !== 200 });
        setOpen(true);
      },
      onError: () => {
        setInfoMsg(SERVER_ERROR);
        setOpen(true);
      },
    });
  };

  return (
    <Box pt={2}>
      <FormControlLabel
        label="User Status"
        control={
          <IOSSwitch
            disabled={isLoading || status === USER_STATUS_INVITED}
            checked={status === USER_STATUS_ACTIVE}
            data-testid="ios-switch"
            onChange={handleRoleStatusChange}
            sx={{ m: 1 }}
          />
        }
      />
      {isLoading && (
        <Typography component={Box} variant="caption" color="red">
          Updating in Progress. Please wait...
        </Typography>
      )}
    </Box>
  );
};

export default UserStatusSwitch;
