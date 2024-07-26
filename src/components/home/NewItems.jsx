import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SkeletonLoader from "../UI/SkeletonLoader";
import CountdownTimer from "../UI/CountdownTimer";
import useSlidesToShow from "./useSlidesToShow";
import "../../css/styles/react-slick.css";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const slidesToShow = useSlidesToShow();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="text-center"
              data-aos="fade-in"
              data-aos-delay="200"
            >
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <SkeletonLoader
                count={slidesToShow}
                type="newItems"
                settings={settings}
              />
            ) : (
              <div
                className="slider-container"
                data-aos="fade-in"
                data-aos-delay="200"
              >
                <Slider {...settings}>
                  {data.map((item) => (
                    <div key={item.id} className="slide-item">
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title={`Creator: ${item.authorName}`}
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt={item.authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <CountdownTimer expiryDate={item.expiryDate} />

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${item.id}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.id}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">
                            {item.price} ETH
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
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

export default NewItems;
