import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import SkeletonLoader from "../components/UI/SkeletonLoader";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFollow = () => {
    setIsFollowing(true);
    setAuthorData((prevState) => ({
      ...prevState,
      followers: prevState.followers + 1,
    }));
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    setAuthorData((prevState) => ({
      ...prevState,
      followers: prevState.followers - 1,
    }));
  };

  if (loading) {
    return <SkeletonLoader count={8} type="authorPage" />;
  }

  if (!authorData) {
    return <div>Author not found</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${AuthorBanner}) top`}
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={authorData.authorImage}
                        alt={authorData.authorName}
                      />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {authorData.followers} followers
                      </div>
                      {isFollowing ? (
                        <button
                          className="btn-main unfollow"
                          onClick={handleUnfollow}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button className="btn-main" onClick={handleFollow}>
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorData.nftCollection}
                    loading={loading}
                    authorImage={authorData.authorImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
