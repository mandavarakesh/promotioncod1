import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} data-testid="next-arrow" onClick={onClick} />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} data-testid="prev-arrow" onClick={onClick} />
  );
}

export default function Carousel({ images = [], onClick, currentImageId }) {
  var settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: false,
    //     },
    //   },
    //   {
    //     breakpoint: 900,
    //     settings: {
    //       slidesToShow: 5,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  return (
    <div data-testid='carousel-component' className="content">
      <Slider {...settings} sx={{ padding: 1 }}>
        {images?.map((card, index) => (
          <Box key={index}>
            <Box
              sx={{
                cursor: "pointer",
                borderRadius: "1px",
                border:
                  currentImageId === card?.customFieldId
                    ? "1px solid red"
                    : "1px dashed lightgray",
                margin: " 0 2px",
                fontSize: "10px",
              }}
              data-testid='image-wrapper'
              onClick={() => onClick(card?.customFieldId)}
            >
              <img
                alt={card?.code}
                src={
                  // card?.value === errorMessage || card?.value?.length == 0
                  //   ? defaultImage
                  //   :
                  card?.value
                }
                style={{ objectFit: "contain", height: "47px", width: "100%" }}
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </div>
  );
}
