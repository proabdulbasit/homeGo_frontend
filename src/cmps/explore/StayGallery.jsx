import React from "react";
import Slider from "react-slick";

export function StayGallery({ stay }) {
    var settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings} className="stay-preview-slider">
            <div>
                <img src={stay.imgUrls[0]} alt="" />
            </div>
            <div>
                <img src={stay.imgUrls[1]} alt="" />
            </div>
            <div>
                <img src={stay.imgUrls[2]} alt="" />
            </div>
            <div>
                <img src={stay.imgUrls[3]} alt="" />
            </div>
        </Slider>
    );
}


