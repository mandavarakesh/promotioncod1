import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategorySelection from "./index";

describe("CategorySelection", () => {
  const categoryList = [
    {
      slug: "category1",
      lang: {
        en: {
          name: "Category 1",
        },
      },
    },
    {
      slug: "category2",
      lang: {
        en: {
          name: "Category 2",
        },
      },
    },
  ];

  const selectedCategoryList = [
    {
      slug: "category3",
      lang: {
        en: {
          name: "Category 3",
        },
      },
    },
  ];

  const handleListItemClick = jest.fn();

  test("renders category list items correctly when level is 0", async () => {
    render(
      <CategorySelection
        level={0}
        selectedCategories={[{ slug: "category1" }]}
        categoryList={categoryList}
        isLoading={false}
        isError={false}
        handleListItemClick={handleListItemClick}
      />
    );

    const listItem1 = screen.getByText(/Category 1/i);
    const listItem2 = screen.getByText(/Category 2/i);

    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();

    await userEvent.click(listItem1);
    expect(handleListItemClick).toHaveBeenCalledWith(0, categoryList[0]);

    await userEvent.click(listItem2);
    expect(handleListItemClick).toHaveBeenCalledWith(0, categoryList[1]);
  });

  test("renders selected category list items correctly when level is not 0", async () => {
    render(
      <CategorySelection
        level={1}
        selectedCategories={["category3"]}
        selectedCategoryList={selectedCategoryList}
        handleListItemClick={handleListItemClick}
      />
    );

    const listItem = screen.getByText("Category 3");

    expect(listItem).toBeInTheDocument();

    await userEvent.click(listItem);
    expect(handleListItemClick).toHaveBeenCalledWith(
      1,
      selectedCategoryList[0]
    );
  });

  test("renders loading state correctly", () => {
    render(
      <CategorySelection
        level={0}
        isLoading={true}
        handleListItemClick={handleListItemClick}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders error state correctly", () => {
    render(
      <CategorySelection
        level={0}
        isError={true}
        categoryList={categoryList}
        selectedCategories={["dasl"]}
        handleListItemClick={handleListItemClick}
      />
    );

    expect(screen.getByText(/Something went worng/i)).toBeInTheDocument();
  });

  test("should render without any errors when there is no catergorylist prop", () => {
    render(
      <CategorySelection
        level={0}
        isError={false}
        selectedCategories={["dasl"]}
        handleListItemClick={handleListItemClick}
      />
    );

    expect(screen.getByText(/Level 1/i)).toBeInTheDocument();
  });

  test("should disable the container if disabled true", () => {
    render(
      <CategorySelection
        disabled={true}
        level={0}
        isError={false}
        selectedCategories={["dasl"]}
        handleListItemClick={handleListItemClick}
      />
    );

    expect(screen.getByTestId('catergory-selection-wrapper')).toHaveClass('disabled');
  });
});
