import { render, screen, fireEvent } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import CustomToolBar from "./index";
import userEvent from "@testing-library/user-event";

describe("CustomToolbar", () => {
  const mockFilterOpen = jest.fn();
  const mockDownload = jest.fn();
  const mockAction = jest.fn();

  const actionButtons = [
    {
      id: 1,
      type: "DOWNLOAD",
      action: mockDownload,
      loading: true,
      title: "Download Merchant Data",
    },
    {
      id: 2,
      type: "BUTTON",
      action: mockAction,
      title: "primary",
      icon: "",
    },
    {
      id: 3,
      type: "BUTTON",
      action: mockAction,
      title: "secondary",
      icon: "",
    },
  ];

  describe("should show the right side when actionbuttons length is not 0", () => {
    beforeEach(() => {
      render(
        TestHelper(
          <CustomToolBar
            setFilterOpen={mockFilterOpen}
            hasFilterOption={true}
            searchPlaceHolder="search placeholder"
            actionButtons={actionButtons}
          />,
        ),
      );
    });

    test("should show the search bar", () => {
      expect(
        screen.getByPlaceholderText(/search placeholder/i),
      ).toBeInTheDocument();
    });

    test("updates the search value correctly", () => {
      render(TestHelper(<CustomToolBar setSearchValue={jest.fn()} />));
      const searchInput = screen.getAllByLabelText("Search")[1];
      fireEvent.change(searchInput, { target: { value: "test" } });
      expect(searchInput.value).toBe("test");
    });

    test("should show the filter icon & open the filter component when clicked", async () => {
      const filterOptionIcon = screen.getByTestId(/FilterListIcon/i);
      await userEvent.click(filterOptionIcon);
      expect(filterOptionIcon).toBeInTheDocument();
      expect(mockFilterOpen).toHaveBeenCalled();
    });

    test("should show the primary action Btn and navigate to specified path", async () => {
      const primaryBtn = screen.getByRole("button", { name: /primary/i });
      await userEvent.click(primaryBtn);
      expect(primaryBtn).toBeInTheDocument();
      expect(mockAction).toHaveBeenCalled();
    });

    test("should show the secoundary action Btn and navigate to specified path", async () => {
      const secondaryBtn = screen.getByRole("button", {
        name: /secondary/i,
      });
      await userEvent.click(secondaryBtn);
      expect(secondaryBtn).toBeInTheDocument();
      expect(mockAction).toHaveBeenCalled();
    });
  });

  describe("shouldn't show the right side actions when actionbuttons length is 0", () => {
    beforeEach(() => {
      render(
        TestHelper(
          <CustomToolBar
            setFilterOpen={mockFilterOpen}
            hasFilterOption={true}
            searchPlaceHolder="search placeholder"
            actionButtons={[]}
          />,
        ),
      );
    });

    test("should show the primary action", () => {
      expect(
        screen.queryByRole("button", { name: /primary/i }),
      ).not.toBeInTheDocument();
    });

    test("should show the secoundary action", () => {
      expect(
        screen.queryByRole("button", {
          name: /secondary/i,
        }),
      ).not.toBeInTheDocument();
    });
  });


  it('calls handleSearch when the search form is submitted', () => {
    // Arrange
    const handleSearchMock = jest.fn();
    const searchValue = 'test';
    const setSearchValueMock = jest.fn();

    const { getByLabelText, getByText } = render(
      TestHelper(<CustomToolBar
        searchValue={searchValue}
        setSearchValue={setSearchValueMock}
        handleSearch={handleSearchMock}
        setFilterOpen={jest.fn()}
        hasFilterOption={false}
        actionButtons={[]}
        handleCloseFilter={jest.fn()}
        isFilterApplied={false}
        searchPlaceHolder="Search Placeholder"
        downloadParams={{}}
        showDownload={false}
        handleDownload={jest.fn()}
        disableDownload={false}
      />)
    );

    // Act
    const searchInput = getByLabelText('Search');
    const searchButton = getByText('Search');
    fireEvent.change(searchInput, { target: { value: 'new value' } });
    fireEvent.submit(searchButton);

    // Assert
    expect(handleSearchMock).toHaveBeenCalled();
    expect(setSearchValueMock).toHaveBeenCalledWith('new value');
  });
  test("updates the search value correctly by click on button", () => {
    render(TestHelper(<CustomToolBar setSearchValue={jest.fn()} handleCloseFilter={jest.fn()} handleSearch={jest.fn()} isFilterApplied={true} />));
    const searchInput = screen.getByLabelText("Search")
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
    fireEvent.click(screen.getByTestId(/SearchIcon/i))
    const clearButton = screen.getByText(/Clear All Filters/i)
    expect(clearButton).toBeInTheDocument()
    fireEvent.click(clearButton)
  });
  test("handle download button", () => {
    const type = "BUTTON"
    const title = "Create Merchant Account"
    render(TestHelper(<CustomToolBar setSearchValue={jest.fn()}  handleSearch={jest.fn()} isFilterApplied={true} showDownload={true} actionButtons={[type,title]}/>));
    const downLoad = screen.getByTestId(/DownloadIcon/i) 
    expect(downLoad).toBeInTheDocument()
    fireEvent.click(downLoad)
  });
});
