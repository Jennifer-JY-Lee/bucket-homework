import React from "react";

function FeedCard(props) {
  const {
    authorProfile,
    authorNickname,
    image,
    onScrapClick,
    id,
    scrapped
  } = props;
  return (
    <div className="feed-card">
      <span className="author-profile">
        <img src={authorProfile} alt={authorNickname} />
      </span>
      <span className="author-nickname">{authorNickname}</span>
      <div className="card-img" style={{ backgroundImage: `url(${image})` }}>
        <div
          className={`scrap-btn ${scrapped === true ? "scrapped" : ""}`}
          onClick={() => {
            onScrapClick(id, scrapped, image, authorNickname, authorProfile);
          }}
        />
      </div>
    </div>
  );
}

export default FeedCard;
