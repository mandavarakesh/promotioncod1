import React from "react";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomDatePicker from "../CustomDatePicker";
import MultiSelectWithCheckBox from "../MultiSelectWithCheckBox";
import CustomAutocomplete from "../CustomAutocomplete";
import NumberInput from "../NumberInput";
import Scrollbar from "../Scrollbar";
import InfiniteAutoComplete from "../InfiniteAutoComplete";
import AsyncAutoCompleteCheckbox from "../AsyncAutoCompleteCheckbox";
import AsyncAutoCompleteSelect from "../AsyncAutoCompleteSelect";
import CustomDateTimeRangePicker from "../CustomDateTimeRangePicker";
import { useAppSelector } from "../../redux/redux-hooks";
import RangeSlider from "../CustomRangeSlider";
import InfoIcon from "@mui/icons-material/Info";

const Filter = ({ fields, onSubmit, showHelperText }) => {
  const { handleSubmit, control } = useForm();

  const { user } = useAppSelector((state) => state?.user);
  const isAdmin = user?.roleType === 0;

  const getDropDownOptions = (options) =>
    options.map((option) => ({
      title: option?.label ?? "",
      value: option?.value ?? "",
    }));

  const renderField = (field) => {
    const {
      type,
      id,
      name,
      label,
      options,
      valueFieldName,
      selectFieldName,
      valueFieldPlaceholder = "",
      defaultValue = "",
      disabled = false,
      placeholder = "",
      queryName = "",
      queryKey,
      queryVariableKey,
      initialVariables,
      mapDataFunction,
      mapOptionFunction,
      getNextPageParam,
      variablesFunction,
      multiple,
      getOutPutAsOption,
      filterOptions,
    } = field;

    const color = isAdmin ? "#26A69A" : "#ffa726";

    switch (type) {
      case "TEXT":
        return (
          <Box key={id} py={1.5}>
            <Controller
              name={name}
              defaultValue={defaultValue}
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <TextField
                  {...rest}
                  inputRef={ref}
                  type="text"
                  label={label}
                  disabled={disabled}
                />
              )}
            />
          </Box>
        );
      case "NUMBER":
        return (
          <Box key={id} py={1.5}>
            <NumberInput
              name={name}
              control={control}
              defaultValue={defaultValue}
              label={label}
              placeholder={placeholder}
            />
          </Box>
        );
      case "RANGE":
        return (
          <Box key={id} py={1.5}>
            <RangeSlider
              name={name}
              control={control}
              defaultValue={defaultValue}
              label={label}
              placeholder={placeholder}
            />
          </Box>
        );
      case "DATE":
        return (
          <Box key={id} py={1.5}>
            <CustomDatePicker
              defaultValue={defaultValue}
              control={control}
              name={name}
              label={label}
              type={type}
              disabled={disabled}
            />
          </Box>
        );
      case "DATETIME":
        return (
          <Box key={id} py={1.5}>
            <CustomDatePicker
              defaultValue={defaultValue}
              control={control}
              name={name}
              label={label}
              type="date-time"
              disabled={disabled}
            />
          </Box>
        );
      case "DATETIMERANGEPICKER":
        return (
          <Box
            key={id}
            py={1.5}
            sx={{
              "& .react-minimal-datetime-range.visible": {
                zIndex: "999",
              },
              "& .react-minimal-datetime-range__range-input-wrapper ": {
                height: "56px",
              },

              "& .react-minimal-datetime-range-calendar__table-cel.active:not(.today) ":
                {
                  backgroundColor: color,
                },

              "& .react-minimal-datetime-range-calendar__table-cel.react-minimal-datetime-range-calendar__date-item:not(.disabled):hover":
                {
                  backgroundColor: color,
                },

              "& .react-minimal-datetime-range-calendar__table-cel.highlight": {
                backgroundColor: color,
                opacity: 0.3,
              },

              //button styles
              "& .react-minimal-datetime-range__button--type ": {
                color: color,
              },
              "& .react-minimal-datetime-range__button--confirm": {
                backgroundColor: color,

                border: color,
              },

              //time picker
              "& .react-minimal-datetime-range__time-select-option.active": {
                backgroundColor: color,
              },

              "& .react-minimal-datetime-range__time-select-option:hover": {
                backgroundColor: color,
              },

              // months calendar

              "& .react-minimal-datetime-range-calendar__title:hover": {
                color: color,
              },
              "& .react-minimal-datetime-range-dropdown-calendar__month-item.active>div":
                {
                  backgroundColor: color,
                },
              "& .react-minimal-datetime-range-dropdown-calendar__month-item>div:hover":
                {
                  backgroundColor: color,
                },

              // year
              "& .react-minimal-datetime-range-dropdown-calendar__year-item.active>span":
                {
                  backgroundColor: color,
                },
              "& .react-minimal-datetime-range-dropdown-calendar__year-item>span:hover":
                {
                  backgroundColor: color,
                },
              "& .react-minimal-datetime-range-calendar__table": {
                width: "100%",
              },
              "& .react-minimal-datetime-range-calendar__body-container": {
                height: "200px !important",
              },
              "& .react-minimal-datetime-range-calendar--range": {
                width: "100%",
              },
              "& .react-minimal-datetime-date-piker__divider": {
                width: "0px !important",
              },
            }}
          >
            <CustomDateTimeRangePicker
              defaultValue={defaultValue}
              control={control}
              name={name}
              label={label}
              disabled={disabled}
            />
          </Box>
        );
      case "MULTISELECT":
        return (
          <Box key={id} py={1.5}>
            <MultiSelectWithCheckBox
              label={label}
              name={name}
              control={control}
              defaultValue={defaultValue ? defaultValue : []}
              options={getDropDownOptions(options)}
              disabled={disabled}
            />
          </Box>
        );
      case "SELECT":
        return (
          <Box key={id} py={1.5}>
            <CustomAutocomplete
              control={control}
              name={name}
              label={label}
              disabled={disabled}
              defaultValue={defaultValue}
              options={getDropDownOptions(options)}
            />
          </Box>
        );
      case "SELECTWITHVALUE":
        return (
          <Box key={id} py={1.5} sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 2 }}>
              <CustomAutocomplete
                control={control}
                name={selectFieldName}
                label={label}
                options={getDropDownOptions(options)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <NumberInput
                showDials
                name={valueFieldName}
                defaultValue={defaultValue}
                control={control}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {valueFieldPlaceholder}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        );
      case "INFINITESELECT":
        return (
          <Box key={id} py={1.5}>
            <InfiniteAutoComplete
              name={name}
              control={control}
              label={label}
              query={queryName}
              defaultValue={defaultValue}
              queryKey={queryKey}
              queryVariableKey={queryVariableKey}
              initialVariables={initialVariables}
              mapDataFunction={mapDataFunction}
              mapOptionFunction={mapOptionFunction}
              getNextPageParam={getNextPageParam}
              variablesFunction={variablesFunction}
              disabled={disabled}
              getOutPutAsOption={getOutPutAsOption}
              filterOptions={filterOptions}
            />
          </Box>
        );
      case "ASYNCAUTOCOMPLETEWITHCHECKBOX":
        return (
          <Box key={id} py={1.5}>
            <AsyncAutoCompleteCheckbox
              label={label}
              name={name}
              control={control}
              defaultValue={defaultValue ? defaultValue : []}
              disabled={disabled}
              queryName={queryName}
              multiple={multiple}
            />
          </Box>
        );
      case "ASYNCAUTOCOMPLETEWITHSELECT":
        return (
          <Box key={id} py={1.5}>
            <AsyncAutoCompleteSelect
              label={label}
              name={name}
              control={control}
              defaultValue={defaultValue ? defaultValue : []}
              disabled={disabled}
              queryName={queryName}
            />
          </Box>
        );
      case "HEADER":
        return (
          <Box key={id} py={1.5}>
            <Typography variant="subtitle2">{label}</Typography>
          </Box>
        );
      default:
        return <h6>field type not found</h6>;
    }
  };

  return (
    <Scrollbar sx={{ maxHeight: "100vh" }}>
      <Box
        component="form"
        autoComplete="off"
        noValidate
        sx={{
          p: 2,
          minWidth: { xs: "280px", sm: "350px" },
          maxWidth: { xs: "280px", sm: "350px" },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" fontWeight="700">
          Search Filter
        </Typography>
        <Divider sx={{ my: 1 }} />
        {showHelperText && isAdmin && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 1,
                backgroundColor: "grey.200",
                p: 1,
              }}
            >
              <Box py={1}>
                <InfoIcon color="info" sx={{ fontSize: "30px" }} />
              </Box>
              <Typography variant="button">
                Please use two filters concurrently to narrow down your search
                results.
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
          </>
        )}
        {fields?.map((item) => renderField(item))}

        <Button fullWidth type="submit" data-testid="search-filter-submit">
          Search
        </Button>
      </Box>
    </Scrollbar>
  );
};

export default Filter;
