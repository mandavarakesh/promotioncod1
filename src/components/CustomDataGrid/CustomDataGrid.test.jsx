import { fireEvent, render, screen } from "@testing-library/react";
import CustomDataGrid from "./index";

const setPaginationModelMock = jest.fn();

const TestComponent = () => {
  return (
    <CustomDataGrid
      columns={[{ field: "column1" }, { field: "column2" }]}
      rows={[
        { id: "1", column1: "row cell 1" },
        { id: "2", column2: "row cell 2" },
      ]}
      rowCount={30}
      pageSizeOptions={[10, 25, 50, 75, 100]}
      loading={false}
      paginationModel={{ page: 1, pageSize: 10 }}
      setPaginationModel={setPaginationModelMock}
    />
  );
};

describe("CustomDataGrid", () => {
  test("renders CustomDataGrid correctly", async () => {
    render(<TestComponent />);
    expect(await screen.findByRole("grid")).toBeInTheDocument();
  });

  test("should call onPaginationModelChange with the correct page information", () => {
    render(<TestComponent />);
    const nextPage = screen.getByTestId(/KeyboardArrowRightIcon/i);
    fireEvent.click(nextPage);
  });

  test("paginationModelChecker returns 'client' when noPagination is true", () => {
    const { rerender } = render(
      <CustomDataGrid
        columns={[{ field: "column1" }, { field: "column2" }]}
        rows={[
          { id: "1", column1: "row cell 1" },
          { id: "2", column2: "row cell 2" },
        ]}
        rowCount={30}
        pageSizeOptions={[10, 25, 50, 75, 100]}
        loading={false}
        paginationModel={{ page: 1, pageSize: 10 }}
        setPaginationModel={setPaginationModelMock}
        noPagination={true}
      />
    );

    expect(screen.getByRole("grid")).toBeInTheDocument();
    rerender(
      <CustomDataGrid
        columns={[{ field: "column1" }, { field: "column2" }]}
        rows={[
          { id: "1", column1: "row cell 1" },
          { id: "2", column2: "row cell 2" },
        ]}
        rowCount={30}
        pageSizeOptions={[10, 25, 50, 75, 100]}
        loading={false}
        paginationModel={{ page: 1, pageSize: 10 }}
        setPaginationModel={setPaginationModelMock}
        noPagination={false}
      />
    );
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  test("renders CustomDataGrid with CustomizedPagination when isCustomPagination is true", async () => {
    render(
      <CustomDataGrid
        columns={[{ field: "column1" }, { field: "column2" }]}
        rows={[
          { id: "1", column1: "row cell 1" },
          { id: "2", column2: "row cell 2" },
        ]}
        rowCount={30}
        pageSizeOptions={[10, 25, 50, 75, 100]}
        loading={false}
        paginationModel={{ page: 1, pageSize: 10 }}
        setPaginationModel={setPaginationModelMock}
        isCustomPagination={true}
      />
    );

    expect(await screen.findByRole("grid")).toBeInTheDocument();
    expect(await screen.findByText("Page 1")).toBeInTheDocument();
  });
});
