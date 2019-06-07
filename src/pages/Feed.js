// base
import React from "react";
import { connect } from "react-redux";

// module
import { Row, Col, Checkbox, Spin, Modal } from "antd";

// component
import { FeedCard } from "components";

// action
import { getFeedList, setScrapFeed } from "store/actions/feed";

// asset
import "assets/less/feedPage.less";

// define
const confirm = Modal.confirm;

class Feed extends React.Component {
  state = {
    page: 1,
    filterScrap: false,
    hasMore: true,
    loading: false
  };

  componentDidMount() {
    this.getData("append");
    window.addEventListener("scroll", this.scrollHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
  scrollHandler = e => {
    const { loading } = this.state;
    if (
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.scrollHeight
    ) {
      if (loading === false) {
        this.getData("append");
      }
    }
  };
  getData = async type => {
    const { page, filterScrap, hasMore } = this.state;
    const { getFeedListAction } = this.props;
    if (hasMore) {
      this.setState({ loading: true });
      const result = await getFeedListAction(type, page, filterScrap);
      if (result.length === 0) {
        this.setState({ hasMore: false });
      }
      this.setState(prevState => ({
        page: prevState.page + 1,
        loading: false
      }));
    }
  };

  onScrapClick = (id, status, image_url, nickname, profile_image_url) => {
    const { setScrapFeedAction } = this.props;
    confirm({
      title: `${
        status === true ? "스크랩을 취소하시겠어요?" : "스크랩 하시겠어요?"
      }`,
      onOk() {
        setScrapFeedAction(id, !status, image_url, nickname, profile_image_url);
      }
    });
  };
  onFilterChange = e => {
    this.setState({ filterScrap: e.target.checked, page: 1 });
  };

  render() {
    const { filterScrap, loading } = this.state;
    const { feedList, scrappedList } = this.props;
    const filteredList = [];
    Object.keys(scrappedList).forEach(element => {
      filteredList.push(scrappedList[element]);
    });

    return (
      <div className="feed-page">
        <div className="filter-wrap">
          <Checkbox
            className="filter-checkbox"
            checked={filterScrap}
            onChange={this.onFilterChange}
          >
            스크랩한 것만 보기
          </Checkbox>
        </div>
        <Row gutter={20}>
          {filterScrap === false &&
            feedList.map(item => {
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id.toString()}>
                  <FeedCard
                    authorProfile={item.profile_image_url}
                    authorNickname={item.nickname}
                    image={item.image_url}
                    onScrapClick={this.onScrapClick}
                    id={item.id}
                    scrapped={
                      scrappedList[item.id] !== undefined ? true : false
                    }
                  />
                </Col>
              );
            })}
          {filterScrap === true &&
            filteredList.map(item => {
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id.toString()}>
                  <FeedCard
                    authorProfile={item.profile_image_url}
                    authorNickname={item.nickname}
                    image={item.image_url}
                    onScrapClick={this.onScrapClick}
                    id={item.id}
                    scrapped={
                      scrappedList[item.id] !== undefined ? true : false
                    }
                  />
                </Col>
              );
            })}
          {loading && (
            <div className="spinner-wrap">
              <Spin size="large" />
            </div>
          )}
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({
    feedList: state.feed.feedList,
    scrappedList: state.feed.scrappedList
  }),
  {
    getFeedListAction: getFeedList,
    setScrapFeedAction: setScrapFeed
  }
)(Feed);
