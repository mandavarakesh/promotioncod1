import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { useGraphQLMutation } from "../../hooks/useGraphQLMutation";
import {
  GET_ALLMERCHANT_NAMES,
  GET_BRANDS,
  GET_MERCHANTS_ROLES,
} from "../../graphql/queries";
import useDebounce from "../../hooks/useDebounce";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AsyncAutoCompleteCheckbox({
  name,
  label,
  control,
  disabled = false,
  required = false,
  defaultValue = "",
  queryName = "",
  multiple = true,
}) {
  const [open, setOpen] = React.useState(false);
  const [variables, setVariables] = React.useState({});
  const [searchText, setSearchText] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const [options, setOptions] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);

  const [lastEvaluatedKey, setLastEvaluatedKey] = React.useState(null);

  const structureVariables = (queryType, pageType) => {
    if (queryType === "GET_ALLMERCHANT_NAMES") {
      setVariables({
        filterData: JSON.stringify({
          pageSize: 5,
          lastEvaluatedKey: pageType + 1 == 1 ? null : lastEvaluatedKey,
          storeName: searchText || "",
        }),
      });
    }
    if (queryType === "GET_BRANDS") {
      setVariables({
        filterData: JSON.stringify({
          pageSize: 5,
          page: pageType + 1,
          enName: searchText || "",
        }),
      });
    }
    if (queryType === "GET_MERCHANTS_ROLES") {
      setVariables({
        roleBody: JSON.stringify({
          pageSize: 5,
          page: pageType + 1,
          name: searchText || "",
        }),
      });
    }
  };

  React.useEffect(() => {
    if (open) {
      structureVariables(queryName, page);
    }
  }, [open, page]);

  React.useEffect(() => {
    if (Object.keys(variables)?.length !== 0) {
      apiCall();
    }
  }, [variables]);

  const queries = {
    GET_ALLMERCHANT_NAMES: GET_ALLMERCHANT_NAMES,
    GET_BRANDS: GET_BRANDS,
    GET_MERCHANTS_ROLES: GET_MERCHANTS_ROLES,
  };

  const { mutate: getOptions, isLoading } = useGraphQLMutation(
    queries[queryName]
  );

  function removeDuplicatesFromArray(arr) {
    let uniqueValues = new Set();

    return arr?.filter((item) => {
      if (uniqueValues?.has(item.value)) {
        return false;
      } else {
        uniqueValues?.add(item.value);
        return true;
      }
    });
  }
  const apiCall = () => {
    getOptions(variables, {
      onSuccess: (response) => {
        if (queryName === "GET_BRANDS" && response?.ecsGetBrands?.code == 200) {
          let brands = response?.ecsGetBrands?.data;

          if (brands) {
            const modifiedBrands = brands?.map((item) => {
              return {
                value: item.slug,
                title: item.lang.en.name,
              };
            });

            setOptions((prevOptions) => [...prevOptions, ...modifiedBrands]);
            setTotalCount(response?.ecsGetBrands?.total);
          }
          return;
        }

        if (
          queryName === "GET_ALLMERCHANT_NAMES" &&
          response?.getMerchantsByGSI?.code === 200
        ) {
          let merchantNames = response?.getMerchantsByGSI?.data?.map((item) => {
            return {
              title: item?.storeName?.name ?? "",
              value: item?.merchantId ?? "",
            };
          });

          setOptions((prevOptions) => [...prevOptions, ...merchantNames]);

          setLastEvaluatedKey(response?.getMerchantsByGSI?.lastEvaluatedKey);

          setTotalCount(response?.getMerchantsByGSI?.data?.length);
        }

        if (
          queryName === "GET_MERCHANTS_ROLES" &&
          response?.getMerchantRoles?.code === 200
        ) {
          let roleType = response?.getMerchantRoles?.data?.map((item) => {
            return {
              title: item?.name ?? "",
              value: item?.roleId ?? "",
            };
          });
          setOptions((prevOptions) => [...prevOptions, ...roleType]);
          setTotalCount(response?.getMerchantRoles?.total);
        }
      },
      onError: (_error) => {
        console.log(_error);
      },
    });
  };

  const handleScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    if (Math.floor(scrollHeight - scrollTop) <= clientHeight) {
      if (queryName === "GET_ALLMERCHANT_NAMES") {
        if (lastEvaluatedKey !== null) {
          setPage((prev) => prev + 1);
        }
      } else {
        

        let limit = Math.floor(totalCount / 5);
        if (page + 1 <= limit) {
          setPage((prev) => prev + 1);
        }


      }
    }
  };

  const handleOnChange = (_event) => {
    let searchValue = _event?.target?.value;

    setInputValue(searchValue);
    if (searchValue?.length == 0) {
      setPage(0);
    }
  };

  const debouncedSearchValue = useDebounce(inputValue, 500);

  React.useEffect(() => {
    if (open) {
      setSearchText(debouncedSearchValue);
      setOptions([]);

      if (queryName === "GET_ALLMERCHANT_NAMES") {
        setVariables({
          filterData: JSON.stringify({
            pageSize: 5,
            page: 1,
            storeName: debouncedSearchValue || "",
          }),
        });
      }

      if (queryName === "GET_BRANDS") {
        setVariables({
          filterData: JSON.stringify({
            pageSize: 5,
            page: 1,
            enName: debouncedSearchValue || "",
          }),
        });
      }
      if (queryName === "GET_MERCHANTS_ROLES") {
        setVariables({
          roleBody: JSON.stringify({
            pageSize: 5,
            page: 1,
            name: debouncedSearchValue || "",
          }),
        });
      }
    }
  }, [debouncedSearchValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const { onChange, value, ref, onBlur } = field;

        return (
          <Autocomplete
            multiple={multiple}
            id="autocomplete"
            value={value}
            data-testid="autocomplete"
            onChange={(_event, newValue) => {
              onChange(newValue);
            }}
            ListboxComponent={ListBox}
            isOptionEqualToValue={(option, selectedOption) => {
              return option?.title === selectedOption?.title;
            }}
            getOptionLabel={(option) => option?.title || ""}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
              setOptions([]);
              setSearchText("");
              setPage(0);
            }}
            options={removeDuplicatesFromArray(options)}
            loading={isLoading}
            ListboxProps={{
              style: { maxHeight: "230px", overflow: "auto" },
              onScroll: handleScroll,
            }}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                disabled={disabled}
                InputLabelProps={{ shrink: true }}
                required={required}
                onBlur={onBlur}
                inputRef={ref}
                data-testid="async-checkbox"
                onChange={handleOnChange}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
}

const ListBox = React.forwardRef(function ListBoxBase(props, ref) {
  const { children, ...rest } = props;
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => innerRef.current);
  return (
    <ul {...rest} ref={innerRef}         role="list-box"    >
      {children}
    </ul>
  );
});
