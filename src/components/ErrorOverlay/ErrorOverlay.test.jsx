import { render, screen } from "@testing-library/react";
import ErrorOverlay from ".";

describe("ErrorOverlay", () => {
  test("should render with default message when no props given", () => {
    render(<ErrorOverlay />);
    expect(screen.getByText('No Records Found')).toBeInTheDocument()
  });
  test("should render the given message", () => {
    render(<ErrorOverlay message='no data'/>);
    expect(screen.getByText('no data')).toBeInTheDocument()
  });
  test("should render the given render prop", () => {
    const mockRenderProp = jest.fn()
    render(<ErrorOverlay renderMessage={mockRenderProp}/>);
    expect(mockRenderProp).toHaveBeenCalled()
  });
});
