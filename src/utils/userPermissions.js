const userPermissions = (user, permissions) => {
  let currentRole;
  if (permissions) {
    const permissionKeys = Object.keys(permissions);
    if (user?.roleType === 1 && user?.merchantRoles) {
      currentRole = user?.merchantRoles?.find(
        (role) => user?.defaultShop === role?.merchantId,
      );
      const keysMatch = permissionKeys?.every((key) =>
        currentRole?.hasOwnProperty(key),
      );

      if (currentRole && keysMatch) {
        return (
          permissions[permissionKeys]?.filter(
            (key) => currentRole[permissionKeys][key] === "Y",
          ).length > 0
        );
      } else {
        return false;
      }
    } else if (user?.operatorRoles) {
      const keysMatch = permissionKeys.every((key) =>
        user?.operatorRoles?.[0].hasOwnProperty(key),
      );
      if (keysMatch) {
        return (
          permissions[permissionKeys]?.filter(
            (key) => user?.operatorRoles?.[0][permissionKeys][key] === "Y",
          ).length > 0
        );
      } else {
        return false;
      }
    }
  }
};

export default userPermissions;
