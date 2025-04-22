import React from "react";
import { render, screen } from "@testing-library/react";
import DateRangePicker from "./index";



var currentTime = new Date()
var year = currentTime.getFullYear()



jest.mock("./Menu", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((props) => {
    props.setFirstMonth("01/01/2023")
    props.setSecondMonth("01/01/2024")
   
   
    return <div>Menu</div>;
  }),
}));

describe("DateRangePicker", () => {
  it("should set the first month when a valid date is provided", () => {
    const mockOnChange = jest.fn();
    const mockHandleClose = jest.fn();
    render(
      <DateRangePicker
        onChange={mockOnChange}
        initialDateRange={{ startDate: new Date(), endDate: null }}
        minDate={new Date()}
        maxDate={new Date()}
        locale="en-US"
        handleClose={mockHandleClose}
      />
    );
    const YEAR = document.write(year)
    expect(screen.findByText(YEAR))

    
  });
});
