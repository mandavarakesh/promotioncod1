import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { Controller } from "react-hook-form";
import { debounce } from "lodash";
import { useGraphQLInfiniteQueries } from "../../hooks/useGraphQLInfiniteQueries";

const InfiniteAutoComplete = ({
  name,
  control,
  inputSize,
  label,
  queryKey,
  query,
  queryVariableKey,
  initialVariables,
  mapDataFunction,
  mapOptionFunction,
  getNextPageParam,
  variablesFunction,
  disabled,
  required,
  defaultValue = null,
  defaultOptions = [],
  filterOptions,
  getOutPutAsOption = false,
}) => {
  const [variables, setVariables] = useState(initialVariables);


  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    useGraphQLInfiniteQueries(
      [queryKey, variables],
      query,
      queryVariableKey,
      variables,
      {
        getNextPageParam: getNextPageParam,
      },

    );

  const modifiedData = mapDataFunction(data);
  const transformOptions = modifiedData.map((item) => mapOptionFunction(item));
  let options = [...transformOptions, ...defaultOptions] ?? [];

  if (typeof filterOptions === "function") {
    options = filterOptions(options);
  }

  const handleScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    if (
      !isFetching &&
      hasNextPage &&
      Math.floor(scrollHeight - scrollTop) <= clientHeight
    ) {
      fetchNextPage();
    }
  };

  const handleInputChange = (e) => {
    setVariables((prev) => variablesFunction(prev, e));
  };

  const debounceFunction = useCallback(debounce(handleInputChange, 500), []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? defaultValue : undefined}
      render={({
        field: { value, onBlur, onChange, ref, ...rest },
        fieldState: { error },
      }) => {
        let currentValue = value ?? null;
        if (!getOutPutAsOption) {
          currentValue = options.find((i) => (i.value ?? i) === value) ?? null;
        }

        return (
          <Autocomplete
            {...rest}
            value={currentValue}
            isOptionEqualToValue={(option, selectedOption) => {
              return option.value === selectedOption.value;
            }}
            onChange={(_event, newValue) => {
              if (getOutPutAsOption) return onChange(newValue);
              onChange(newValue ? newValue.value : "");
            }}
            options={options}
            ListboxComponent={ListBox}
            ListboxProps={{
              style: { maxHeight: "180px", overflow: "auto" },
              onScroll: handleScroll,
            }}
            loading={isLoading || isFetching}
            slotProps={{
              clearIndicator: {
                onClick: () => {
                  onChange(null);
                  setVariables(variablesFunction);
                },
              },
            }}
            disabled={disabled}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  onBlur={onBlur}
                  label={label}
                  size={inputSize}
                  inputRef={ref}
                  InputLabelProps={{ shrink: true }}
                  onChange={debounceFunction}
                  required={required}
                  error={!!error}
                  helperText={error?.message}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isLoading || isFetching ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              );
            }}
          />
        );
      }}
    />
  );
};

const ListBox = forwardRef(function ListBoxBase(props, ref) {
  const { children, ...rest } = props;

  const innerRef = useRef(null);

  useImperativeHandle(ref, () => innerRef.current);

  return (
    <ul {...rest} ref={innerRef} role="list-box">
      {children}
    </ul>
  );
});

export default InfiniteAutoComplete;
