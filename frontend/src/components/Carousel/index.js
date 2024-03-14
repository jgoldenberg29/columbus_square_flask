import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ImageCarousel = ({ images }) => {
    // console.log(images[0])
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            style={{ width: '100%', height: '100%' }}
            className="-z-10"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index} className="overflow-hidden">
                    <img src={image[index]} className="object-cover object-center min-w-full" />
                </SwiperSlide>
            ))}
        </Swiper>
    )
};

export default ImageCarousel;
