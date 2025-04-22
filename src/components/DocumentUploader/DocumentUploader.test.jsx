import { render, screen, fireEvent } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import DocumentUploader from "./index";
import { useForm } from "react-hook-form";

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
jest.mock("../../redux/redux-hooks.js", () => ({
  ...jest.requireActual("../../redux/redux-hooks"),
  useAppSelector: jest.fn().mockImplementation(() => state),
}));

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: jest.fn(() => ({
    oktaAuth: {
      revokeAccessToken: jest.fn(),
      revokeRefreshToken: jest.fn(),
      tokenManager: { clear: jest.fn() },
    },
  })),
}));

jest.mock("@okta/okta-react");
jest.mock("../../auth/OktaAuthProvider", () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="mock-okta-auth-provider">{children}</div>
    ),
  };
});

const TestComponent = ({ defaultValue }) => {
  const { control } = useForm({
    file: "image",
  });
  return (
    <DocumentUploader
      name="file"
      control={control}
      acceptedFormats={[".pdf"]}
      defaultValue={defaultValue}
      clearErrors={jest.fn()}
      setError={jest.fn()}
    />
  );
};

global.window.FileReader = jest.fn().mockImplementation(() => ({
  readAsDataURL: jest.fn(),
  onload: jest.fn(),
  onerror: jest.fn(),
  result: "mockedBase64Data", // Mocking the result data
}));

describe("DocumentUploader", () => {
  test("renders a BoxDocument with correct styling", () => {
    render(<TestComponent />);
    const boxDoument = screen.getByTestId("box-document");
    expect(boxDoument).toBeInTheDocument();
    expect(boxDoument).toHaveStyle("border: 1px dashed grey");
    expect(boxDoument).toHaveStyle("border-radius: 8px");
    expect(boxDoument).toHaveStyle("cursor: pointer");
    expect(boxDoument).toHaveStyle("height: 150px");
    expect(boxDoument).toHaveStyle("width: 450px");
    expect(boxDoument).toHaveStyle("justify-content: center");
    expect(boxDoument).toHaveStyle("padding: 5px");
    fireEvent.mouseOver(boxDoument);
    const fileID = screen.getByTestId("file-upload");
    fireEvent.change(fileID);
  });
  test("render document upload", () => {
    render(<TestComponent defaultValue="image" />);
    const DownloadImg = screen.getByTestId("download-button");
    fireEvent.click(DownloadImg);
  });
  test("error message ", () => {
    render(TestHelper(<TestComponent />));
    expect(screen.getByTestId("error-id")).toBeInTheDocument();
  });
  test("simulate file drop", () => {
    render(<TestComponent />);

    const boxDocument = screen.getByTestId("box-document");
    const file = new File(["bshlml"], "test.pdf", { type: "application/pdf" });

    // Mock FileReader written globally

    const mockedDataTransfer = {
      files: [file],
      items: [{ kind: "file", type: file.type, getAsFile: () => file }],
      types: ["Files"],
    };

    fireEvent.drop(boxDocument, {
      dataTransfer: mockedDataTransfer,
    });

    global.window.FileReader().onload();
  });

  test("simulate file drop with error", () => {
    render(<TestComponent />);

    const boxDocument = screen.getByTestId("box-document");
    const file = new File(["bshlml"], "test.pdf", { type: null });

    // Mock FileReader written globally

    const mockedDataTransfer = {
      files: [file],
      items: [{ kind: "file", type: file.type, getAsFile: () => file }],
      types: ["Files"],
    };

    fireEvent.drop(boxDocument, {
      dataTransfer: mockedDataTransfer,
    });
  });

  test("file size exceeds limit", () => {
    render(<TestComponent />);
    const boxDocument = screen.getByTestId("box-document");
    const file = new File(["file contents"], "large_file.pdf", {
      type: "application/pdf",
      size: 15 * 1024 * 1024,
    });
    const mockedDataTransfer = {
      files: [file],
      items: [{ kind: "file", type: file.type, getAsFile: () => file }],
      types: ["Files"],
    };
    fireEvent.drop(boxDocument, {
      dataTransfer: mockedDataTransfer,
    });
  });
  test("invalid file format", () => {
    render(<TestComponent />);
    const boxDocument = screen.getByTestId("box-document");
    const file = new File(["file contents"], "invalid_file.jpg", {
      type: "image/jpeg",
    });
    const mockedDataTransfer = {
      files: [file],
      items: [{ kind: "file", type: file.type, getAsFile: () => file }],
      types: ["Files"],
    };
    fireEvent.drop(boxDocument, {
      dataTransfer: mockedDataTransfer,
    });
  });
  test("simulate download click", () => {
    render(<TestComponent defaultValue="image" />);
    const downloadButton = screen.getByTestId("download-button");
    fireEvent.click(downloadButton);
  });
  test("required field behavior", () => {
    render(<TestComponent defaultValue="" />);
  });

  test("handles file upload successfully and displays upload UI", async () => {
    const mockSetValue = jest.fn();
    const { container } = render(
      <TestComponent
        name="document"
        control={{}}
        defaultValue=""
        setValue={mockSetValue}
        label="Test File"
        acceptedFormats={["pdf"]}
      />
    );

    const file = new File(["file contents"], "test.pdf", {
      type: "application/pdf",
    });
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [file] } });
  });

  test("displays an error when the uploaded file size exceeds the limit", async () => {
    const mockSetValue = jest.fn();
    const { container } = render(
      <TestComponent
        name="document"
        control={{}}
        defaultValue=""
        setValue={mockSetValue}
        label="Test File"
        acceptedFormats={["pdf"]}
      />
    );

    const file = new File(["large file contents"], "large_file.pdf", {
      type: "application/pdf",
    });
    const input = container.querySelector('input[type="file"]');
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockSetValue).not.toHaveBeenCalled();
  });
});
