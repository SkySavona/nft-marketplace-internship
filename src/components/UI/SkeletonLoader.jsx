import React from 'react';
import Skeleton from './Skeleton';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SkeletonLoader = ({ count }) => {
  const skeletonItems = Array.from({ length: count });

  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: count,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <Slider {...settings}>
      {skeletonItems.map((_, index) => (
        <div key={index} className="slide-item">
          <div className="nft_coll">
            <div className="nft_wrap">
              <Skeleton width="100%" height="200px" />
            </div>
            <div className="nft_coll_pp">
              <Skeleton width="60px" height="60px" borderRadius="50%" />
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Skeleton width="140px" height="20px" />
              <div>
              <Skeleton width="100px" height="20px" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default SkeletonLoader;
