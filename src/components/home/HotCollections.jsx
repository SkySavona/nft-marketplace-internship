import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SkeletonLoader from "../UI/SkeletonLoader";
import useSlidesToShow from "./useSlidesToShow";
import "../../css/styles/react-slick.css";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const slidesToShow = useSlidesToShow();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    speed: 300,
    slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <SkeletonLoader
                count={slidesToShow}
                type="hotCollections"
                settings={settings}
              />
            ) : (
              <div className="slider-container">
                <Slider {...settings}>
                  {data.map((collection) => (
                    <div key={collection.id} className="slide-item">
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${collection.id}`}>
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt={collection.name}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/author/${collection.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={collection.authorImage}
                              alt={collection.authorName}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <h4>{collection.title}</h4>
                          <span>ERC-{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
