import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/images/new_home/logo.png";
import Api from "../../assets/images/api/api.png";
import "./apiPage.scss";
import { Button } from "react-bootstrap";

export const APIComponent = (props: any) => {
  const history = useHistory();

  return (
    <div>
      <div className="header_full api_header pt-3">
        <Container>
          <nav>
            <img src={logo} alt="img" onClick={() => history.push('/')} />
          </nav>
        </Container>
      </div>

      <div className="api_content mt-5 pt-5">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={10} xs={12}>
              <h1 className="mt-md-4 text-center">
                Transform your fintech app with Tokuten API
              </h1>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={10} xs={10}>
              <p className="built_text text-center mb-0">
                You built a revolutionary fintech service. Let help you with
                <span className="green_text"> engagement </span>. Build your
                product at the cross section of{" "}
                <span className="blue_text"> creator economy </span> and{" "}
                <span className="blue_text"> fintech revolution </span>.
              </p>
            </Col>
          </Row>

          <div className="api_image text-center mt-md-4 mb-5">
            <Row>
              <Col md={12} xs={12}>
                <img src={Api} alt="img" />
              </Col>
            </Row>

            <h3 className="mt-md-0 mt-4">API Integration</h3>

            <div className="api_name api_name_btn mt-md-5 mb-5">
              <span className="api-communities-btn">communities</span>
              <span className="api-ideas-btn">Ideas</span>
              <span className="api-live-btn">livestream</span>
              <span className="api-chat-btn">Chat</span>
              <span className="api-post-btn">posting</span>
            </div>
          </div>

          <div className="api_transform mt-5">
            <Row>
              <Col md={12} xs={12}>
                <h2>Transform your users to creators</h2>

                <div className="api_name mt-4 mb-md-5">
                  <span className="api-communities-btn">communities</span>
                  <p className="w-100 mt-3">Build free and paid communities</p>
                </div>

                <div className="api_name mt-md-4 mb-md-5">
                  <span className="api-ideas-btn">Ideas</span>
                  <p className="w-100 mt-3">
                    Integrate executable investment ideas
                  </p>
                </div>

                <div className="api_name mt-md-4 mb-md-5">
                  <span className="api-live-btn">livestream</span>
                  <span className="api-chat-btn">Chat</span>
                  <span className="api-post-btn">posting</span>
                  <p className="w-100 mt-3">Increase engagement</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="use_case">
              <h4>
              Use cases
              </h4>
              <ul className="pl-4">
                <li>Brokerage and financial advisory apps</li>
                <li>Market places for luxury products</li>
                <li>Wine merchants</li>
                <li>Auction houses</li>
              </ul>
          </div>

          <p className="api_solution mt-md-5 mb-5">
            Our API solutions are in <span className="red_text">  Private BETA </span>. Reach out to us at
            <span className="blue_text"> api@tokuten.co </span>
          </p>
        </Container>
      </div>
    </div>
  );
};
