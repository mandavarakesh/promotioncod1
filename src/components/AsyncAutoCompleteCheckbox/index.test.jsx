import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AsyncAutoCompleteCheckbox from "./index";
import { FormProvider, useForm } from "react-hook-form";

import TestHelper from "../../TestHelper";

const mockMutation = jest.fn();
jest.mock("../../hooks/useGraphQLMutation", () => ({
  useGraphQLMutation: jest.fn().mockImplementation((_props) => {
    return {
      mutate: mockMutation,
      isLoading: false,
    };
  }),
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

const TestComponent = ({ queryName }) => {
  const methods = useForm();

  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <AsyncAutoCompleteCheckbox
        name="test"
        label="label"
        disabled={false}
        queryName={queryName}
        control={control}
        defaultValue={[]}
      />
    </FormProvider>
  );
};

describe("AsyncAutoCompleteCheckbox", () => {
  test("should render correctly with brands", async () => {
    mockMutation.mockImplementation((_variables, options) => {
      const { onSuccess } = options;
      const response = {
        ecsGetBrands: {
          page: 1,
          pageSize: 10,
          total: 6347,
          code: 200,
          data: [
            {
              slug: "balvenie",
              lang: {
                en: {
                  name: "BALVENIE",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "bodega-teho",
              lang: {
                en: {
                  name: "Bodega Teho",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "scotts",
              lang: {
                en: {
                  name: "SCOTTS",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "miumiu",
              lang: {
                en: {
                  name: "MiuMiu",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "nots",
              lang: {
                en: {
                  name: "NoTS",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "pamela-hamilton",
              lang: {
                en: {
                  name: "PAMELA HAMILTON",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "yungo",
              lang: {
                en: {
                  name: "Yungo",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "sphero",
              lang: {
                en: {
                  name: "Sphero",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "david-a-adler",
              lang: {
                en: {
                  name: "David A. Adler",
                },
                zh: null,
              },
              deleted: null,
            },
            {
              slug: "eleeels",
              lang: {
                en: {
                  name: "ELEEELS",
                },
                zh: null,
              },
              deleted: null,
            },
          ],
          message: null,
        },
      };
      onSuccess(response);
    });

    render(TestHelper(<TestComponent queryName="GET_BRANDS" />));

    const button = screen.getByTestId("ArrowDropDownIcon");

    fireEvent.click(button);

    const listbox = screen.getAllByRole("option")[0];
    fireEvent.click(listbox);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "b" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });

    fireEvent.click(button);
  });

  test("should render correctly with merchant names", async () => {
    mockMutation.mockImplementation((_variables, options) => {
      const { onSuccess } = options;
      const response = {
        getMerchantsByGSI: {
          lastEvaluatedKey:
            '{"lastUpdateDate": {"S": "2024-03-05T17:43:36"}, "gsi1PK": {"S": "1"}, "merchantId": {"N": "2049"}}',
          code: 200,
          message: "Success",
          pageSize: 5,
          data: [
            {
              merchantId: 120,
              storeName: {
                name: "Hindustan Pvt Ltd.",
              },
            },
            {
              merchantId: 119,
              storeName: {
                name: "trex-merchant-chaitu-store",
              },
            },
            {
              merchantId: 103,
              storeName: {
                name: "Mahesh Trex Store",
              },
            },
            {
              merchantId: 117,
              storeName: {
                name: "Nawaz Merchant",
              },
            },
            {
              merchantId: 2049,
              storeName: {
                name: "trex-test1234",
              },
            },
          ],
        },
      };
      onSuccess(response);
    });

    render(TestHelper(<TestComponent queryName="GET_ALLMERCHANT_NAMES" />));

    const button = screen.getByTestId("ArrowDropDownIcon");

    fireEvent.click(button);
  });

  test("should render correctly with merchant roles", async () => {
    mockMutation.mockImplementation((_variables, options) => {
      const { onSuccess } = options;
      const response = {
        getMerchantRoles: {
          code: 200,
          message: "Success",
          pageSize: 5,
          data: [
            {
              roleId: 120,
              name: "Hindustan Pvt Ltd.",
            },
          ],
        },
      };
      onSuccess(response);
    });

    render(TestHelper(<TestComponent queryName="GET_MERCHANTS_ROLES" />));

    const button = screen.getByTestId("ArrowDropDownIcon");

    fireEvent.click(button);
  });
});
