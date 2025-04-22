import React from "react";
import { render, screen } from "@testing-library/react";
import UploadCard from "./index";
import TestHelper from "../../../TestHelper";

const state = {
  user: {
    userid: "729e454b-137c-44c3-9c38-d13c063904e2",
    name: "phani",
    email: "phani@gmail.com",
    mobile: null,
    roleType: 1,
    defaultShop: 2047,
    status: "INVITED",
    lastLoginDate: null,
    lastUpdateDate: "2023-07-12T20:05:53",
    createDate: "2023-07-12T18:07:40",
    lastUpdatedBy: "satish.kumar@changiairport.com",
    merchantIds: [2047],
    roleIdList: ["1f3ccacc-dd3e-42f2-aaec-a580d16e93d5"],
    merchantRoles: [
      {
        roleId: "1f3ccacc-dd3e-42f2-aaec-a580d16e93d5",
        merchantId: 2047,
        name: "thor",
        status: "ACTIVE",
        lastUpdateDate: "2023-07-12T12:05:52",
        createDate: "2023-07-12T12:05:52",
        isDefault: false,
        lastUpdatedBy: "satish.kumar@changiairport.com",
        roleType: 1,
        merDataInsightsAccess: {
          viewDashboard: "Y",
          exportSalesReport: "Y",
          exportInventoryReport: "Y",
          exportOrderReport: "Y",
          exportGiroReport: "Y",
        },
        merMyAccountAccess: {
          addNewUsers: "Y",
          editUserRoles: "Y",
          createNewRoles: "Y",
          viewBusinessInfo: "Y",
          editBusinessInfo: "Y",
          viewFinanceInfo: "Y",
          editFinanceInfo: "Y",
          editLeaseInfo: "Y",
          viewLeaseInfo: "Y",
          viewLogisticsInfo: "Y",
        },
        merOrderAccess: {
          viewOrders: "Y",
          editOrders: "Y",
          exportOrders: "Y",
          viewReturns: "Y",
        },
        merProductAccess: {
          viewProducts: "Y",
          addAndEditProducts: "Y",
          deactivateProducts: "Y",
          deleteProducts: "Y",
          exportProducts: "Y",
        },
      },
    ],
    operatorRoles: null,
  },
  selectedUser: {
    userid: "729e454b-137c-44c3-9c38-d13c063904e2",
    name: "phani",
    email: "phani@gmail.com",
    mobile: null,
    roleType: 1,
    defaultShop: 2047,
    status: "INVITED",
    lastLoginDate: null,
    lastUpdateDate: "2023-07-12T20:05:53",
    createDate: "2023-07-12T18:07:40",
    lastUpdatedBy: "satish.kumar@changiairport.com",
    merchantIds: [2047],
    roleIdList: ["1f3ccacc-dd3e-42f2-aaec-a580d16e93d5"],
    merchantRoles: [
      {
        roleId: "1f3ccacc-dd3e-42f2-aaec-a580d16e93d5",
        merchantId: 2047,
        name: "hella",
        status: "ACTIVE",
        lastUpdateDate: "2023-07-12T12:05:52",
        createDate: "2023-07-12T12:05:52",
        isDefault: false,
        lastUpdatedBy: "satish.kumar@changiairport.com",
        roleType: 1,
        merDataInsightsAccess: {
          viewDashboard: "Y",
          exportSalesReport: "Y",
          exportInventoryReport: "Y",
          exportOrderReport: "Y",
          exportGiroReport: "Y",
        },
        merMyAccountAccess: {
          addNewUsers: "Y",
          editUserRoles: "Y",
          createNewRoles: "Y",
          viewBusinessInfo: "Y",
          editBusinessInfo: "Y",
          viewFinanceInfo: "Y",
          editFinanceInfo: "Y",
          editLeaseInfo: "Y",
          viewLeaseInfo: "Y",
          viewLogisticsInfo: "Y",
        },
        merOrderAccess: {
          viewOrders: "Y",
          editOrders: "Y",
          exportOrders: "Y",
          viewReturns: "Y",
        },
        merProductAccess: {
          viewProducts: "Y",
          addAndEditProducts: "Y",
          deactivateProducts: "Y",
          deleteProducts: "Y",
          exportProducts: "Y",
        },
      },
    ],
    operatorRoles: null,
  },
};
jest.mock("../../../redux/redux-hooks.js", () => ({
  ...jest.requireActual("../../../redux/redux-hooks"),
  useAppSelector: jest.fn().mockImplementation(() => state),
}));

const updateStatus = require("./index");

describe("UploadCard", () => {
  test("should render", () => {
    let showProgress = false;
    render(TestHelper(<UploadCard uploadProgress={100} />));
    if (showProgress) {
      expect(screen.getAllByTestId("progress-status")[0]).toBeInTheDocument();
      expect(screen.getAllByTestId("file-status")[0]).toBeInTheDocument();
      expect(screen.getAllByTestId("upload-status")[0]).toBeInTheDocument();
      expect(screen.getAllByTestId("cancel-button")[0]).toBeInTheDocument();
      expect(screen.getAllByTestId("download-button")[0]).toBeInTheDocument();
    }
    expect(screen.getAllByTestId("progress-status")[0].innerHTML).toBe(
      "100% completed",
    );
  });
  test('should set status to "Pending Approval" if label is "DCA File"', () => {
    let showProgress = false;
    render(
      TestHelper(
        <UploadCard uploadProgress={100} label={"DCA File"} dcaFileStatus="" />,
      ),
    );
    if (showProgress) {
      const status = UploadCard(dcaFileStatus);
      expect(status).toBe("Pending Approval");
    }
  });
  test('should set status to "Pending Approval" if label is "DDA File"', () => {
    let showProgress = false;
    render(
      TestHelper(
        <UploadCard uploadProgress={100} label={"DDA File"} ddaFileStatus="" />,
      ),
    );
    if (showProgress) {
      const status = UploadCard(ddaFileStatus);
      expect(status).toBe("Pending Approval");
    }
  });
});
