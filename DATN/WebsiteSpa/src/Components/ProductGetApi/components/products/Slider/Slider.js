import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import img from "./trietlong1.PNG"
import img2 from "./chamsocda4.PNG";
import img3 from "./chamsocda2.PNG";
import img4 from "./chamsocda1.PNG";
import img5 from "./trietlong2.PNG";
import img6 from "./munmu.jpg";
import img7 from "./trimun.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Slider.css";

// import required modules
import { Pagination, Autoplay } from "swiper";

export default function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} />
        </SwiperSlide>
        {/* <SwiperSlide>
          {" "}
          <img src={img4} />
        </SwiperSlide> */}
        <SwiperSlide>
          {" "}
          <img src={img5} />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={img6} />
        </SwiperSlide>
        {/* <SwiperSlide>
          {" "}
          <img src={img7} />
        </SwiperSlide> */}
        
      </Swiper>
    </>
  );
}
