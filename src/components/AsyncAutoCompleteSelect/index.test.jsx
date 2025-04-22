import React from "react";
import { fireEvent, render, screen} from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

import TestHelper from "../../TestHelper";
import userEvent from "@testing-library/user-event";
import AsyncAutoCompleteSelect from "./index";


const data = [
  "Beauty/Fragrance/Perfumes",
  "Beauty/Body & Haircare/Hair Care",
  "Beauty/Body & Haircare/Body Care",
  "Beauty/Skin Care/Lip Treatment",
  "Beauty/Skin Care/Sun Care",
  "Beauty/Skin Care/Eye Treatment",
  "Beauty/Skin Care/Face Treatment",
  "Beauty/MakeUp/Face MakeUp",
  "Beauty/MakeUp/Lip MakeUp",
  "Beauty/MakeUp/Eye MakeUp",
  "Beauty/Others Beauty/Bundled Beauty Sets",
  "Beauty/Others Beauty/Beauty Accessory",
  "Beauty/Others Beauty/Beauty Services",
  "Electronics/Audio/Speakers",
  "Electronics/Audio/Sound Equipment",
  "Electronics/Audio/Head & Earphones",
  "Electronics/Audio/microphones",
  "Electronics/Others Electronics/Elect Services",
  "Electronics/Others Electronics/Elect Accessories",
  "Electronics/Visual/Cameras",
  "Electronics/Visual/Drones",
  "Electronics/Visual/Action Cameras",
  "Electronics/Smart Devices/Tablets",
  "Electronics/Smart Devices/Mobile Phones",
  "Electronics/Smart Devices/PCs & Laptops",
  "Wines & Spirits/Spirits/Cognac",
  "Wines & Spirits/Spirits/Gin",
  "Wines & Spirits/Spirits/American Whiskey",
  "Wines & Spirits/Spirits/Other Whiskey",
  "Wines & Spirits/Spirits/Liqueurs",
  "Wines & Spirits/Spirits/Tequila",
  "Wines & Spirits/Spirits/Vodka",
  "Wines & Spirits/Spirits/Rum",
  "Wines & Spirits/Spirits/Single Malt",
  "Wines & Spirits/Spirits/Baijiu",
  "Wines & Spirits/Spirits/Brandy",
  "Wines & Spirits/Spirits/Others",
  "Wines & Spirits/Spirits/Blended whiskey",
  "Wines & Spirits/Spirits/Soju",
  "Wines & Spirits/Spirits/Japanese Whiskey",
  "Wines & Spirits/Beer/Beer Stout",
  "Wines & Spirits/Beer/Craft Beer",
  "Wines & Spirits/Beer/Non-Craft Beer",
  "Wines & Spirits/Wine & Champagne/Red Wine",
  "Wines & Spirits/Wine & Champagne/White Wine",
  "Wines & Spirits/Wine & Champagne/Sparkling Wine",
  "Wines & Spirits/Wine & Champagne/Champagne",
  "Wines & Spirits/Wine & Champagne/Rose",
  "Wines & Spirits/Wine & Champagne/Cider",
  "Wines & Spirits/Wine & Champagne/Sake",
  "Wines & Spirits/Wine & Champagne/Other Wines",
  "Wines & Spirits/Cocktail",
  "Wines & Spirits/Wine Accessories/Decanter",
  "Wines & Spirits/Wine Accessories/Wine Fridge",
  "Wines & Spirits/Wine Accessories/Wine Preservation Systems",
  "Beverage/Spirits/American Whiskey",
  "Beverage/Spirits/Baijiu",
  "Beverage/Spirits/Japanese Whiskey",
  "Beverage/Spirits/Cognac",
  "Beverage/Spirits/Gin",
  "Beverage/Spirits/Liqueurs",
  "Beverage/Spirits/Rum",
  "Beverage/Spirits/Scotch",
  "Beverage/Spirits/Tequila",
  "Beverage/Spirits/Other Spirits",
  "Beverage/Spirits/Vodka",
  "Beverage/Spirits/Other Whiskey",
  "Beverage/Spirits/Single Malt",
  "Beverage/Spirits/Sake",
  "Beverage/Non-Alcoholic/Water",
  "Beverage/Non-Alcoholic/Coffee",
  "Beverage/Non-Alcoholic/Carbonated Drinks Water",
  "Beverage/Non-Alcoholic/Tea",
  "Beverage/Non-Alcoholic/Non Carbonated Drinks Water",
  "Beverage/Non-Alcoholic/Others",
  "Beverage/Beer/Craft Beer",
  "Beverage/Beer/Non-Craft Beer",
  "Beverage/Wine & Champagne/Red Wine",
  "Beverage/Wine & Champagne/White Wine",
  "Beverage/Wine & Champagne/Champagne",
  "Beverage/Others Beverage/Beverage Accessory",
  "Toys/Play Toys/Plush Toys",
  "Toys/Play Toys/Figurines & Automobiles",
  "Toys/Play Toys/Dolls",
  "Toys/Others Toys/Roleplay & Costumes",
  "Toys/Others Toys/Collectibles",
  "Toys/Learning & Education/Games & Puzzles",
  "Toys/Learning & Education/Early Devt Toys",
  "Toys/Learning & Education/Craft & Sensory",
  "Toys/Learning & Education/Building Toys",
  "Reading & Writing Materials/Reading Materials/Fiction Book",
  "Reading & Writing Materials/Reading Materials/Non-Fiction Book",
  "Reading & Writing Materials/Reading Materials/Digital & EDU Books",
  "Reading & Writing Materials/Reading Materials/Non Book & Accessory",
  "Reading & Writing Materials/Writing Materials/Premium Pens",
  "Reading & Writing Materials/Writing Materials/Notebooks & Planners",
  "Reading & Writing Materials/Writing Materials/General Stationery",
  "Reading & Writing Materials/Writing Materials/Digital Stationery",
  "Pharmacy & Wellness/General Healthcare/Babycare & Accessory",
  "Pharmacy & Wellness/General Healthcare/Family & Maternity",
  "Pharmacy & Wellness/General Healthcare/ENT Care",
  "Pharmacy & Wellness/General Healthcare/Healthcare & Equip",
  "Pharmacy & Wellness/Application-Type Medicine/Ointments",
  "Pharmacy & Wellness/Application-Type Medicine/Sprays & Patches",
  "Pharmacy & Wellness/Oral Type Medicine/Western Medicine",
  "Pharmacy & Wellness/Oral Type Medicine/Traditional Medicine",
  "Pharmacy & Wellness/Personal Care/Hygiene & Grooming",
  "Pharmacy & Wellness/Supplements/General Supplements",
  "Services/Travel Services/Wifi Products",
  "Services/Travel Services/Sim Cards",
  "Services/Travel Services/Baggage & Shipping",
  "Services/Travel Services/Accomodation & Space",
  "Services/Travel Services/Money Changer",
  "Services/Travel Services/Attraction Tickets",
  "Services/Transport/Ground Transport",
  "Services/Transport/Air Sea Land Tix",
  "Services/Others Services/Enrichment & Lessons",
  "Services/Others Services/Medical & Facilities",
  "Services/Others Services/Miscellaneous",
  "Services/Others Services/Insurance",
  "Food/Candy/Candy Pick & Mix",
  "Food/Candy/Candy Barline",
  "Food/Candy/Candy Non-Barline",
  "Food/Convenience/Ready To Eat",
  "Food/Convenience/Grocery",
  "Food/Others Bev Accessory/Bundled Food Sets",
  "Food/Chocolate/Choc Pick & Mix",
  "Food/Chocolate/Choc Barline",
  "Food/Chocolate/Choc Non-Barline",
  "Food/Chocolate/Bundled Choc Sets",
  "Food/Deli/General Snacks",
  "Food/Deli/Paste, Sauce, Spread",
  "Food/Deli/Bakery",
  "Food/Baby Food/Milk Powder",
  "Food/Baby Food/Others Baby Feeds",
  "Fashion/Apparel/Tops",
  "Fashion/Apparel/Bottoms",
  "Fashion/Apparel/Others Apparel",
  "Fashion/Footwear, Watches & Accessories/Footwear",
  "Fashion/Footwear, Watches & Accessories/Jewellery",
  "Fashion/Footwear, Watches & Accessories/Watches & Timepiece",
  "Fashion/Footwear, Watches & Accessories/Gold & Precious Gems",
  "Fashion/Footwear, Watches & Accessories/Bags & Small Goods",
  "Fashion/Footwear, Watches & Accessories/Optical & Eyewear",
  "Fashion/Footwear, Watches & Accessories/Fashion Goods",
  "Lifestyle/Sports/Sports Accessories",
  "Lifestyle/Household & Living/HH Non Electronics",
  "Lifestyle/Household & Living/HH Electronics",
  "Lifestyle/Others Lifestyle/Entertainment",
  "Lifestyle/Travel/Souvenirs & Memorabilia",
  "Lifestyle/Travel/Travel Essentials",
];
const mockMutation = jest.fn();
jest.mock("../../hooks/useGraphQLMutation", () => ({
  useGraphQLMutation: jest.fn().mockImplementation((_props) => {
    return {
      mutate: mockMutation,
      isLoading: false,
    };
  }),
}));
const TestComponentC = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <AsyncAutoCompleteSelect
        name="test"
        label="label"
        disabled={false}
        queryName="GET_CATEGORIES"
      />
    </FormProvider>
  );
};

const mockResponseCallBack = (_variables, options) => {
  const { onSuccess } = options;
  const response = {
    ecsGetCategories: {
      code: 200,
      data: data,
      message: "Success",
    },
  };
  onSuccess(response);
};
describe("AsyncAutoCompleteCheckbox", () => {
  test("should render correctly", () => {
    mockMutation.mockImplementation(mockResponseCallBack);
    render(TestHelper(<TestComponentC />));
    const input = screen.getByRole("combobox", { name: "label" });
    fireEvent.change(input, { target: { value: "b" } });
    userEvent.click(input);
  });
  test("call onClose", async () => {
    const TestComponent = () => {
      const { methods, control } = useForm();
      return (
        <FormProvider {...methods}>
          <AsyncAutoCompleteSelect
            name="test"
            label="label"
            disabled={false}
            queryName={"GET_CATEGORIES"}
            control={control}
            defaultValue="test"
          />
        </FormProvider>
      );
    };
    render(TestHelper(<TestComponent />));
    expect(screen.getByRole("combobox", { value: "undefined" }));
    fireEvent.click(screen.getByTestId(/CloseIcon/i));
    expect(screen.getByRole("combobox", { value: "" }));
    expect(screen.findByTestId(/CloseIcon/));
  });
  it("handles onError callback", async () => {
    const errorMock = new Error("API Error");
    const mutateMock = jest.fn().mockRejectedValue(errorMock);
    const TestComponent = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <AsyncAutoCompleteSelect
            name="test"
            label="label"
            disabled={false}
            queryName={"GET_CATEGORIES"}
          />
        </FormProvider>
      );
    };
    mockMutation.mockImplementation((_variables, options) => {
      const { onError } = options;
      const response = {
        ecsGetCategories: {
          code: 400,
          data: data,
          message: "",
        },
      };
      onError(new Error("Server Error"), response);
    });
    render(TestHelper(<TestComponent />));
    const input = screen.getByRole("combobox", { name: "label" });
    fireEvent.change(input, { target: { value: "b" } });
    userEvent.click(input);
    expect(screen.getByText(/No options/i)).toBeInTheDocument();
    expect(mutateMock);
  });
  test("test for onChange", () => {
    mockMutation.mockImplementation(mockResponseCallBack);
    render(TestHelper(<TestComponentC />));
    const input = screen.getByRole("combobox", { name: "label" });
    fireEvent.change(input, { target: { value: "b" } });
    userEvent.click(input);
    fireEvent.click(
      screen.getByRole("option", { name: "Beauty/Fragrance/Perfumes" })
    );
    expect(
      screen.getByRole("combobox", { value: "Beauty/Fragrance/Perfumes" })
    ).toBeInTheDocument();
    expect(screen.getByTestId(/CloseIcon/)).toBeInTheDocument();
  });
});
