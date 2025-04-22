import { render, screen } from "@testing-library/react";
import Carousel from "./Carousel";
import userEvent from "@testing-library/user-event";

describe("render carousel", () => {

  test("render Carousel Component", () => {
    const onClickMock = jest.fn();
    render(
      <Carousel
        images={[
          {
            customFieldId: "1",
            value: "",
          },
          {
            customFieldId: "2",
            value: "",
          },
          {
            customFieldId: "3",
            value: "",
          },
          {
            customFieldId: "4",
            value: "",
          },
          {
            customFieldId: "1234",
            value: "",
          },
        ]}
        onClick={onClickMock}
        currentImageId="1234"
      />
    );

    expect(screen.getByTestId("carousel-component")).toBeVisible();
  });

  test("shouldnt throug any errors if images prop null", () => {
    const onClickMock = jest.fn();
    render(<Carousel onClick={onClickMock} currentImageId="1234" />);

    expect(screen.getByTestId("carousel-component")).toBeVisible();
  });

  test("should send the image id when image got clicked", async () => {
    const mockImageClick = jest.fn();

    render(
      <Carousel
        images={[
          {
            customFieldId: "1234",
            value: "1",
            code: "test1",
          },
        ]}
        onClick={mockImageClick}
        currentImageId={1234}
      />
    );
    await userEvent.click(screen.getByAltText("test1"));
    expect(mockImageClick).toHaveBeenCalled();
  });
});
