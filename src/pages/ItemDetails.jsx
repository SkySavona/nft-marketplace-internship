import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import SkeletonLoader from "../components/UI/SkeletonLoader";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
        );

        if (response.data && Object.keys(response.data).length > 0) {
          setItemDetails(response.data);
        } else {
          setError("No data available for this NFT.");
        }
      } catch (error) {
        setError(`Failed to load item details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItemDetails();
    } else {
      setError("No Item ID provided");
      setLoading(false);
    }
    window.scrollTo(0, 0);
  }, [itemId]);

  if (loading) {
    return <SkeletonLoader type="itemDetails" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!itemDetails) {
    return <div>No item details available</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={itemDetails.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {itemDetails.title} #{itemDetails.tag}
                  </h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>{itemDetails.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            <img
                              className="lazy"
                              src={itemDetails.ownerImage}
                              alt={itemDetails.ownerName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            {itemDetails.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            <img
                              className="lazy"
                              src={itemDetails.creatorImage}
                              alt={itemDetails.creatorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            {itemDetails.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
