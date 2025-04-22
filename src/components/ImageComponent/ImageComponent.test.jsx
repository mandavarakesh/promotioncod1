import { render, screen } from "@testing-library/react";
import TestHelper from "../../TestHelper";
import ImageComponent from "./index";

describe("ImageComponent", () => {
  test("should render the given image", () => {
    render(TestHelper(<ImageComponent src="imagePath" alt="image" />));
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "imagePath");
    expect(image).toHaveAttribute("alt", "image");
  });
});
