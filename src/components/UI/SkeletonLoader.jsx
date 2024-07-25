import React from "react";
import Skeleton from "./Skeleton";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SkeletonLoader = ({ count, type, settings }) => {
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

  const defaultSettings = {
    infinite: true,
    speed: 300,
    slidesToShow: count,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "0",
  };

  const mergedSettings = { ...defaultSettings, ...settings };

  return (
    <>
      {type === "topSellers" ? (
        <ol className="author_list">
          {skeletonItems.map((_, index) => (
            <li key={index}>
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <i className="fa fa-check"></i>
              </div>
              <div className="author_list_info">
                <Skeleton width="100px" height="15px" />
                <div>
                  <Skeleton width="50px" height="15px" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <Slider {...mergedSettings}>
          {skeletonItems.map((_, index) => (
            <div key={index} className="slide-item">
              {type === "newItems" ? (
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton width="50px" height="50px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="200px" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="140px" height="20px" />
                    <Skeleton width="100px" height="20px" />
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          ))}
        </Slider>
      )}
    </>
  );
};

export default SkeletonLoader;
