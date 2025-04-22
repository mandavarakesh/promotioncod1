import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"
import { Controller } from "react-hook-form"
import { useGraphQLMutation } from "../../hooks/useGraphQLMutation"
import { GET_CATEGORIES } from "../../graphql/queries"

export default function AsyncAutoCompleteSelect({
 name,
 label,
 control,
 disabled = false,
 required = false,
 defaultValue = "",
 queryName = "",

}) {
 const [open, setOpen] = React.useState(false)
 const [variables] = React.useState({})
 const [options, setOptions] = React.useState([])
 const queries = {
  GET_CATEGORIES: GET_CATEGORIES,
 }

 const { mutate: getOptions, isLoading } = useGraphQLMutation(
  queries[queryName]
 )


 const apiCall = () => {
  getOptions(variables, {
   onSuccess: (response) => {

    if (queryName === "GET_CATEGORIES") {

     let categories = response?.ecsGetCategories?.data
     const modifiedCategories = categories?.map((item) => {
      return {
       value: item,
       title: item,
      }
     })


     setOptions([...modifiedCategories])
    }
   },
   onError: (_error) => {
    console.log(_error)
   },
  })
 }

 return (
  <Controller
   name={name}
   control={control}
   defaultValue={defaultValue}

   render={({ field }) => {
    const { onChange, value, ref, onBlur } = field
    return (

     <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
       setOpen(true);
       apiCall()

      }}
      onClose={() => {
       setOpen(false);
      }}
      value={
       value && value?.length !== 0 && value || null
      }
      onChange={(_event, newValue) => {
       onChange(newValue)
      }}
      isOptionEqualToValue={(option, selectedOption) => option.title === selectedOption.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={isLoading}
      renderInput={(params) => (
       <TextField
        {...params}
        label={label}
        name={name}
        onBlur={onBlur}
        inputRef={ref}
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
        required={required}
        InputProps={{
         ...params.InputProps,
         endAdornment: (
          <React.Fragment>
           {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
           {params.InputProps.endAdornment}
          </React.Fragment>
         ),
        }}
       />
      )}
     />
    )
   }}
  />
 )
}
