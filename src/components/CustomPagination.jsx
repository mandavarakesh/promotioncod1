import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const styles = {
  selectWrapper: {
    " .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input ": {
      fontSize: "14px",
      padding: "14px 28px 14px 4px",
    },
  },
  selectStyles: {
    " .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
};

const calculateRange = (page, pageSize) => {
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = startIndex + pageSize - 1;
  return `${startIndex}-${endIndex}`;
};

const CustomPagination = ({
  paginationModel,
  setPaginationModel,
  lastEvaluatedKey,
  loading,
  rows,
}) => {
  const [page, setPage] = useState(1);
  const { pageSize } = paginationModel;
  const previousKeyRef = useRef([null]);
  useEffect(() => {
    if (
      (Object.hasOwn(paginationModel, "lastEvaluatedKey") &&
        paginationModel?.lastEvaluatedKey === null) ||
      (Object.hasOwn(paginationModel, "page") && paginationModel?.page === 1)
    ) {
      setPage(1);
    }
  }, [paginationModel?.lastEvaluatedKey, paginationModel?.page]);

  const handleChange = (e) => {
    previousKeyRef.current = [null];
    setPage(1);
    setPaginationModel((prev) => {
      
      if (Object.hasOwn(paginationModel, "lastEvaluatedKey")) {
        return {
          ...prev,
          pageSize: e.target.value,
          lastEvaluatedKey: null,
        };
      }
      return {
        ...prev,
        page: 1,
        pageSize: e.target.value,
      };
    });
  };

  const handleBackword = () => {
    setPage((prev) => prev - 1);
    setPaginationModel((prev) => {
      if (Object.hasOwn(paginationModel, "lastEvaluatedKey")) {
        return {
          ...prev,
          lastEvaluatedKey: previousKeyRef.current?.[page - 2],
        };
      }
      return {
        ...prev,
        page: prev.page - 1,
      };
    });
    previousKeyRef.current.pop();
  };

  const handleForword = () => {
    setPage((prev) => prev + 1);
    previousKeyRef.current?.push(lastEvaluatedKey);
    setPaginationModel((prev) => {
      if (Object.hasOwn(paginationModel, "lastEvaluatedKey")) {
        return { ...prev, lastEvaluatedKey };
      }

      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  };

  const handleForwardDisabled = () => {
    if (Object.hasOwn(paginationModel, "lastEvaluatedKey")) {
      return lastEvaluatedKey === null || loading
    }
    return loading || rows?.length < paginationModel?.pageSize
  }

  return (
    <Box display="flex" justifyContent="end">
      <Box display="flex" alignItems="center" gap="10px">
        <Box display="flex" alignItems="center" gap="5px">
          <Typography fontSize="14px" fontWeight="400">
            Rows per page:
          </Typography>

          <Box data-testid="select-rows">
            <FormControl sx={styles.selectWrapper}>
              <Select
                value={pageSize}
                onChange={handleChange}
                sx={styles.selectStyles}
                // inputProps={{
                //   "data-testid":"select-rows"
                // }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Typography fontSize="14px">
          {calculateRange(page, pageSize)}
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <IconButton
            disabled={page === 1 || loading}
            onClick={handleBackword}
            data-testid="backward-icon"
          >
            <KeyboardArrowLeft />
          </IconButton>
          <Typography fontSize="14px">Page {page}</Typography>
          <IconButton
            disabled={handleForwardDisabled()}
            onClick={handleForword}
            data-testid="forward-icon"
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomPagination;
