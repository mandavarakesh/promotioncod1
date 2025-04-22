import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import ErrorOverlay from "../ErrorOverlay";
import Scrollbar from "../Scrollbar";
import CustomPagination from "../CustomPagination";

const CustomDataGrid = ({
  columns,
  rowCount,
  rows,
  paginationModel,
  setPaginationModel,
  isError,
  pageSizeOptions = [10, 25, 50, 75, 100],
  extraStyles = {},
  lastEvaluatedKey = "",
  loading = false,
  ...restProps
}) => {
  return (
    <>
      <Scrollbar
        sx={{
          height: 1,
          "& .simplebar-content": {
            height: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <DataGrid
          autoHeight
          loading={loading}
          rowCount={rowCount}
          columns={columns}
          rows={rows}
          pageSizeOptions={pageSizeOptions}
          disableColumnMenu
          sortingOrder={["desc", "asc"]}
          disableRowSelectionOnClick
          paginationMode="server"
          slots={{
            noRowsOverlay: ErrorOverlay,
            noResultsOverlay: ErrorOverlay,
            pagination: CustomPagination,
          }}
          slotProps={{
            noRowsOverlay: {
              message: isError ? "Server failed to load data" : null,
            },
            noResultsOverlay: {
              message:
                rows?.length > 0 ? null : "Your search returned no results",
            },
            pagination: {
              paginationModel,
              setPaginationModel,
              lastEvaluatedKey,
              loading,
              rows
            },
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "primary.lighter",
            },
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },
            "& .MuiDataGrid-cell": {
              border: 1,
              borderTop: 0,
              borderRight: 0,
              borderLeft: 0,
              borderColor: "grey.300",
            },
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
              {
                outline: "none",
              },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              height: "6px",
            },
            "&:hover": {
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                backgroundColor: "lightGray",
                borderRadius: "6px",
              },
            },
            ...extraStyles,
          }}
          {...restProps}
        />
      </Scrollbar>
    </>
  );
};

export default CustomDataGrid;
