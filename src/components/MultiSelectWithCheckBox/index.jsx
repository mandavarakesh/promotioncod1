import React, { useState, forwardRef } from "react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelectWithCheckBox = ({
  name,
  control,
  defaultValue = null,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, onBlur, ref } = field;

        return (
          <MultiSelectComponet
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            error={error}
            ref={ref}
            {...rest}
          />
        );
      }}
    />
  );
};

const MultiSelectComponet = forwardRef((props, ref) => {
  const {
    label,
    disabled,
    onChange,
    onBlur,
    value,
    error,
    placeholder,
    required = false,
    addCheckBoxSelection = true,
    getValuesAsArray = true,
    options = [],
  } = props;

  const [canOpen, setCanOpen] = useState(false);

  const getInitialArray = (initialValue) => {
    if (Array.isArray(initialValue)) {
      return options.filter((item) => initialValue.includes(item.value));
    } else if (typeof initialValue === "string") {
      const splitedValue = initialValue.split("|");

      return options.filter((item) => splitedValue.includes(item.value));
    } else {
      return [];
    }
  };

  const [selectedItems, setSelectedItems] = useState(getInitialArray(value));

  const getValue = (displayValue) => {
    if (Array.isArray(displayValue)) {
      return displayValue;
    } else if (typeof displayValue === "string") {
      return displayValue.split("|");
    } else {
      return [];
    }
  };

  const handleOnChnage = (event) => {
    const eventValue = event.target.value;
    const filteredItems = options.filter((item) =>
      eventValue.includes(item.value)
    );
    setSelectedItems(filteredItems);
    if (getValuesAsArray) {
      return eventValue.length > 0 ? eventValue : null;
    } else {
      if (eventValue.length > 0) {
        const modifiedValue = eventValue?.toString()?.replaceAll(",", "|");
        return modifiedValue?.startsWith("|")
          ? modifiedValue?.replace("|", "")
          : modifiedValue;
      }
      return null;
    }
  };

  const handleDelete = (deletedItem) => {
    const newValue = selectedItems.filter(
      (item) => item.value !== deletedItem.value
    );

    const modified = newValue.map((item) => item.value);

    if (getValuesAsArray) {
      onChange(modified);
    } else {
      const modifiedValue = modified?.toString()?.replaceAll(",", "|");
      onChange(
        modifiedValue?.startsWith("|")
          ? modifiedValue?.replace("|", "")
          : modifiedValue
      );
    }

    setSelectedItems(newValue);
  };

  const selectHandleOnOpen = () => {
    setCanOpen(!canOpen);
  };

  const isOptionChecked = (currentOption) => {
    if (!value) return false;
    let selectedValue = value;
    if (value && typeof value === "string") {
      selectedValue = value.split("|");
    }
    return selectedValue?.includes(currentOption);
  };

  return (
    <FormControl disabled={disabled} error={!!error} sx={{ width: "100%" }}>
      <InputLabel
        sx={{ backgroundColor: "white", px: 1 }}
        shrink={true}
        id="multiple-select"
        required={required}
      >
        {label}
      </InputLabel>
      <Select
        labelId="multiple-select"
        defaultValue={null}
        multiple
        onClick={selectHandleOnOpen}
        open={!disabled && canOpen}
        placeholder={placeholder}
        input={
          <OutlinedInput
            inputRef={ref}
            value={getValue(value)}
            onChange={(e) => onChange(handleOnChnage(e))}
            onBlur={onBlur}
            label={label}
          />
        }
        renderValue={() => {
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedItems.map((item) => (
                <Chip
                  disabled={disabled}
                  key={item.value}
                  label={item.title}
                  onDelete={() => handleDelete(item)}
                />
              ))}
            </Box>
          );
        }}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem
            onClick={(e) => e.stopPropagation()}
            key={option.value}
            value={option.value}
          >
            {addCheckBoxSelection && (
              <Checkbox
                data-testid={`option-${option.value}-checkbox`}
                disableRipple
                checked={isOptionChecked(option.value)}
              />
            )}
            {option.title}
          </MenuItem>
        ))}
      </Select>
      {!!error && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
});

export default MultiSelectWithCheckBox;
