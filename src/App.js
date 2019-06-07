// base
import React from "react";
import { Route, Switch } from "react-router-dom";

// module
import { Row, Col } from "antd";

// page
import { Feed } from "pages";

function App() {
  return (
    <Row>
      <Col
        xs={22}
        sm={22}
        md={23}
        lg={19}
        xl={22}
        xxl={17}
        className="center-content"
      >
        <Switch>
          <Route path="/" component={Feed} />
        </Switch>
      </Col>
    </Row>
  );
}

export default App;
