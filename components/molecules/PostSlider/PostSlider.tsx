import React from 'react';
import Slider from "react-slick";
import {iPreviewSliderProps} from "./types";
import styles from './PostSlider.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SampleNextArrow = (props) => {
    const { onClick, currentSlide, slideCount } = props;
    return (
        <div className={`${styles.arrow} ${styles.arrow_next}`}
             onClick={onClick}
             aria-disabled={currentSlide === slideCount - 1 ? true : false}
        >
            <svg aria-label="Стрелка вправо" className="_8-yf5 " color="#ffffff" fill="#ffffff" height="16" role="img"
                 viewBox="0 0 24 24" width="16">
                <polyline fill="none" points="8 3 17.004 12 8 21" stroke="currentColor" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="2"></polyline>
            </svg>
        </div>)
}

const SamplePrevArrow = (props) => {
    const {onClick, currentSlide } = props;
    return (
        <div className={`${styles.arrow} ${styles.arrow_prev}`}
             onClick={onClick}
             aria-disabled={currentSlide === 0 ? true : false}
        >
            <svg aria-label="Стрелка влево" className="_8-yf5 " color="#ffffff" fill="#ffffff" height="16" role="img"
                 viewBox="0 0 24 24" width="16">
                <polyline fill="none" points="16.502 3 7.498 12 16.502 21" stroke="currentColor" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="2"></polyline>
            </svg>
        </div>
    )
}

const PostSlider = ({children}: iPreviewSliderProps) => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dotsClass: styles.dots,
        lazyLoad: true
    }

    return (
        <div className={styles.wrapper}>
            <Slider {...settings} className={styles.slider} >
                {children}
            </Slider>
        </div>
    );
};

export default PostSlider;