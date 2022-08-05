import { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/images/new_home/logo.png";
import Mission from "../../assets/images/about/mobmission.png";
import Members from "../../assets/images/about/members.png";
import Mobmembers from "../../assets/images/about/mobmembers.png";
import Roboto from "../../assets/images/about/roboto.png";
import Mobroboto from "../../assets/images/about/mobroboto.png";
import Rocket from "../../assets/images/about/rocket.png";
import Mobrocket from "../../assets/images/about/mobrocket.png";
import Trade from "../../assets/images/about/trade.png";
import Mobtrade from "../../assets/images/about/mobtrade.png";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import "./aboutUs.scss";

const Accordion = withStyles({
  root: {
   
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 30,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export const AboutUs = (props: any) => {
  const [expanded, setExpanded] = useState("panel1");
  const history = useHistory();

  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <div className="header_full about_header">
        <Container>
          <nav>
            <img src={logo} alt="img" onClick={() => history.push('/')} />
            {/* <button className="button_join">sign in</button> */}
            {/* <button className="sign_btn d-md-inline-block d-none">API</button> */}
          </nav>
        </Container>
      </div>

      <div className="about_content">
        <div className="about_mission">
          <Container>
            <div className="mission_bg">
              <Row>
                <Col md={12} xs={12} className="d-md-none d-block mt-5">
                  <div className="mission_img mt-5">
                    <img src={Mission} alt="Image" />
                  </div>
                </Col>

                <Col md={7} xs={12} className="ml-md-5 pl-md-5 mt-md-5 mt-5">
                  <h1>Our Mission</h1>

                  <p className="mt-md-5 mt-3">
                    We are on a mission to build more engaging investor
                    communities by revolutionizing the way ideas, expertise and
                    content on investing is shared.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <div className="about_member about_space pt-md-5">
          <Container>
            <Row>
              <Col md={6} xs={12} className="d-md-none d-inline-block mt-5 pt-3">
                <div className="">
                  <img src={Mobmembers} alt="Image" />
                </div>
              </Col>

              <Col md={6} xs={12}>
                <div className="member_detail">
                  <h2 className="mt-md-0 mt-5">Members</h2>

                  <p className="mt-md-5 mt-3 mb-4">
                    Discover ideas, knowledge, expertise and content about
                    investing by simply subscribing to a community. Some
                    communities maybe free to join while others may charge a
                    subscription fee to allow access.
                  </p>

                  <p>
                    This fee incentivises the community owners to share their
                    best ideas, run the community in a more engaging way and
                    continuously refresh their content. We believe that the
                    right idea or expertise can be much more valuable to you in
                    your decision making process compared to what you pay for
                    it.
                  </p>
                </div>
              </Col>

              <Col md={6} xs={12} className="d-md-inline-block d-none">
                <div className="">
                  <img src={Members} alt="Image" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="about_space about_builder">
          <Container>
            <Row>
              <Col md={6} xs={12} className="d-md-none d-inline-block mt-4">
                <div className="">
                  <img src={Mobroboto} alt="Image" />
                </div>
              </Col>

              <Col md={6} xs={12}>
                <div className="member_detail pt-md-5">
                  <h2 className="mt-md-5 mt-5">Community Builders</h2>

                  <p className="mt-md-5 mt-3 mb-4">
                    Build your own subscription based micro-communities and
                    share your best ideas using multiple engagement channels.
                    Set the pricing, engagement and access level for each
                    community. Create a differentiated content and engagement
                    experience for members of separate communities.
                  </p>

                  <p>
                    Tokuten seamlessly integrates growth, engagement and
                    monetization of your communities with the content you post,
                    allowing you to effortlessly toggle between these aspects.
                    You don’t need multiple platforms and services to manage
                    these.
                  </p>
                </div>
              </Col>

              <Col md={6} xs={12} className="d-md-inline-block d-none">
                <div className="text-right">
                  <img src={Roboto} alt="Image" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="about_space about_asset mt-md-5">
          <Container>
            <Row>
              <Col md={6} xs={12} className="d-md-none d-inline-block">
                <div className="">
                  <img src={Mobrocket} alt="Image" />
                </div>
              </Col>

              <Col md={6} xs={12}>
                <div className="member_detail pt-md-5">
                  <h2 className="mt-md-0 mt-5">
                    Everything is an <br /> investable asset
                  </h2>

                  <p className="mt-md-5 mt-3 mb-4">
                    We are living in an era where everything is an investable
                    asset. You can trade everything from stocks to sneakers,
                    watches to wine, at low or no brokerage cost.
                  </p>

                  <p>
                    Tokuten was built keeping in mind the ever expanding
                    universe of investable assets.Discover or build communities
                    and engage with others who are exploring ideas on new
                  </p>
                </div>
              </Col>

              <Col md={6} xs={12} className="d-md-inline-block d-none">
                <div className="text-right mt-md-4">
                  <img src={Rocket} alt="Image" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="about_space about_faq mt-md-5">
          <Container>
            <Row>
              <Col md={6} xs={12} className="d-md-none d-inline-block">
                <div className="member_detail text-center">
                  <img src={Mobtrade} alt="Image" />
                  <h2 className="mt-md-0 mt-4">FAQ</h2>
                </div>
              </Col>
            </Row>

            <Row className="d-md-flex d-none">
              <Col md={6} xs={12}>
                <div className="member_detail pt-md-5">
                  <h2 className="mt-md-5">FAQ</h2>
                </div>
              </Col>

              <Col md={6} xs={12}>
                <div className="text-right mt-md-4">
                  <img src={Trade} alt="Image" />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12} xs={12}>
                <div className="faq_accordion mt-4 mt-md-5 mb-5">
                  <Accordion
                    square
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Can I trade on Tokuten? </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        No. Tokuten is not a trading venue or a wallet. You will
                        need to use other services which facilitate trading such
                        as your broker or a wallet.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <Typography>
                        Can I give/get investment/financial advice on Tokuten?{" "}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        No. All ideas and content on Tokuten is purely for
                        educational and entertainment purposes only. Please read
                        the Terms of Use and Contract between Creators and Users
                        for more information.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                    >
                      <Typography>
                        Can I buy/sell Cryptocurrency or NFT on Tokuten?{" "}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        No. Tokuten is not a trading venue or a wallet. You will
                        need to use other services which facilitate such
                        transactions.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      aria-controls="panel4d-content"
                      id="panel4d-header"
                    >
                      <Typography>
                      Can I pay/get paid in Cryptocurrency on Tokuten?{" "}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        No. Tokuten does not
                facilitate transactions in cryptocurrency.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    square
                    expanded={expanded === "panel5"}
                    onChange={handleChange("panel5")}
                  >
                    <AccordionSummary
                      aria-controls="panel5d-content"
                      id="panel5d-header"
                    >
                      <Typography>
                      Should I act on the investment ideas I find on Tokuten?{" "}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                      All ideas and content on Tokuten are purely for educational and
                entertainment purposes only. We recommend that you consult your
                investment advisor before making any investment decisions.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
