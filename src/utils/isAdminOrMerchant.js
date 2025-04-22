import { useAppSelector } from "../redux/redux-hooks";
import { ROLE_TYPE } from "../constants";

const isAdminOrMerchant = () => {
  const {user} = useAppSelector((state) => state?.user);
  if (user?.roleType === ROLE_TYPE.ADMIN) {
    return "ADMIN";
  }
  return "MERCHANT";
};

export { isAdminOrMerchant };
