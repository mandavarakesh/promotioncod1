import { render, screen } from "@testing-library/react";
import BorderLinearProgress from "./index";

describe("BorderLinearProgress", () => {
  test("should render the progress if loading is true", () => {
    render(<BorderLinearProgress loading={true} />);
    expect(screen.getByRole("progressbar")).toBeVisible();
  });
  test("shouldn't render the progress if loading is false", () => {
    render(<BorderLinearProgress loading={false} />);
    expect(screen.queryByRole("progressbar")).toBeNull()
  });
});
