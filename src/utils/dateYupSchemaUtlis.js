import dayjs from "dayjs";
import * as yup from 'yup';

export const startDateValidation = {
  name: "start_date_validation",
  test: (value,ctx) => {
    if(value===null||value===undefined||value===''){
      return true;
    }
  
    if(!dayjs(value).isValid()){
      return ctx.createError(new yup.ValidationError("Invalid Date"));
    }
    return true
  },
}

export const endDateValidation = (refId) => {
  return {
  name: "end_date_validation",
  test: (value,ctx) => {
    if(value===null||value===undefined||value===''){
      return true;
    }

    if(!dayjs(value).isValid()){
      return ctx.createError(new yup.ValidationError("Invalid Date"));
    }
    const startDate = ctx.resolve(yup.ref(refId));
    const isValid = !startDate || !value || new Date(value) >= new Date(startDate);
    if(!isValid){
      return ctx.createError(new yup.ValidationError("End date should be after the start date"))
    }

    return true
  }
}
}