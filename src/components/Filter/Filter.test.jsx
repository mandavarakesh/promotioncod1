import { render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import Filter from "./index";

describe("Filter", () => {
  const fields = [
    {
      id: 1,
      name: "category",
      label: "Category",
      type: "SELECT",
      defaultValue:"",
      options: [
        { value: "ecp", label: "ECP" },
        { value: "foodAndBeverages", label: "Food & Beverages" },
        { value: "beauty", label: "Beauty" },
        { value: "w&s", label: "W&S" },
        { value: "fashion", label: "Fashion" },
        { value: "healthAndWellness", label: "Health & Wellness" },
        { value: "souvenirsAndGifts", label: "Souvenirs & Gifts" },
        { value: "babiesAndKids", label: "Babies & Kids" },
        { value: "homeAndLiving", label: "Home & Living" },
        { value: "travelAndServices", label: "Travel & Services" },
      ],
    },
    {
      id: 2,
      name: "storeName",
      label: "Store Name",
      type: "TEXT",
      defaultValue:"",

    },
    {
      id: 3,
      name: "without Type",
      label: "without Type",
      type: "HEADER",
      defaultValue:"",

    },
    {
      id: 4,
      name: "date",
      label: "Date",
      type: "DATE",
      defaultValue:"",

    },
    {
      id: 6,
      name: "",
      label: "",
      type: "",
      defaultValue:"",

    },

    
    
  ];
  const mockhandleFilterClick = jest.fn();

  beforeEach(() => {
    render(
      TestHelper(<Filter fields={fields} onSubmit={mockhandleFilterClick} />),
    );
  });

  test("renders correctly", () => {
    expect(screen.getByText(/filter/i)).toBeInTheDocument();
  });

  test("should render given input fields with given types", () => {
    expect(
      screen.getByRole("textbox", { name: /store name/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: /Category/i }),
    ).not.toBeInTheDocument();
  });
});
