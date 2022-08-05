import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/new_home/logo.png";
import DownarrowBlack from "../../assets/images/new_landing/down_bloack.svg";
import Section1 from "../../assets/images/new_home/section1.png";
import Section2 from "../../assets/images/new_home/section2.png";
import Section3 from "../../assets/images/new_home/section3.png";
import Mobsection1 from "../../assets/images/new_home/mobsection1.png";
import Mobsection2 from "../../assets/images/new_home/mobsection2.png";
import Mobsection3 from "../../assets/images/new_home/mobsection3.png";
import ReactFullpage from "@fullpage/react-fullpage";
import "./landingnewPage.css";

interface IProps {}

export const LandingNewPage: React.FC<IProps> = () => {
  const [currentPage, handlePageChange] = useState<number>(0);
  let history = useHistory();
  const pageOnChange = (number: any) => {
    handlePageChange(number);
  };

  useEffect(() => {
    let video_tag: any = document.getElementsByClassName(
      `video-${currentPage}`
    );
    if (video_tag.length) {
      for (let i = 0; i < video_tag.length; i++) {
        video_tag[i].play();
      }
    }
  }, [currentPage]);

  return (
    <>
      <header className="header_full">
        <div className="container">
          <nav className="pt-md-3 d-md-block d-none">
            <img src={logo} alt="img" />

            <button
              className="button_join"
              onClick={() => history.push("/login")}
            >
              sign in
            </button>

            <button
              className="sign_btn d-md-inline-block d-none"
              onClick={() => {
                history.push("/api");
              }}
            >
              API
            </button>
          </nav>
          <nav className="pt-md-3 d-md-none d-block">
            <img src={currentPage === 0 ? logo : logo} alt="img" />
            {/* {currentPage === 0 && ( )} */}
            <>
              <button
                className="button_join"
                onClick={() => history.push("/login")}
              >
                sign in
              </button>
              <button
                className="sign_btn d-md-inline-block"
                onClick={() => {
                  history.push("/api");
                }}
              >
                API
              </button>
            </>
          </nav>
        </div>
      </header>

      <ReactFullpage
        licenseKey={"AF6E6FEF-0C764731-8289ADEB-285F2ADB"}
        scrollingSpeed={1000}
        scrollHorizontally={true}
        scrollHorizontallyKey={
          "QU5ZX3Y1N1kyOXVkR2x1ZFc5MWMwaHZjbWw2YjI1MFlXdz0zVzZ"
        }
        sectionsColor={["#fff", "#fff", "#fff"]}
        onLeave={(origin: any, direction: any) => {
          pageOnChange(direction.index);
        }}
        render={({ state, fullpageApi }: any) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <div className=" pt-md-5 screen_no1">
                  <div className="container">
                    <div className="landing_screen1 pt-md-0 pt-5">
                      <div className="row">
                        <div className="col-md-6 col-12 text-center pt-md-5 pt-3">
                          <div className="landing_one_space">
                            <h2
                              className={
                                currentPage === 0 ? "animate__animated" : ""
                              }
                            >
                              Discover your next <br /> investment idea
                            </h2>

                            <div className="text-center">
                              <button
                                className={`button_join join_waitlist ${
                                  currentPage === 0 ? "animate__animated" : ""
                                }`}
                                onClick={() => {
                                  history.push("/signup");
                                }}
                              >
                                Join waitlist
                              </button>
                            </div>

                            <p
                              className={`screen1_para mt-3 ${
                                currentPage === 0 ? "animate__animated" : ""
                              }`}
                            >
                              Tokuten is a social platform where you can build
                              or explore subscription based micro communities to
                              discover and exchange investment ideas
                            </p>
                          </div>

                          <div
                            className={`swipe_section swipe_para text-md-left mt-2 ${
                              currentPage === 0 ? "animate__animated" : ""
                            }`}
                          ></div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div
                            className={`bottom_image bottom_image_animate d-md-block d-none mt-3 text-md-right ${
                              currentPage === 0 ? "animate__animated" : ""
                            }`}
                          >
                            <img src={Section1} alt="img" />
                          </div>
                        </div>

                        <div
                          className={`bottom_image bottom_image_animate1 d-md-none d-inline-block mt-3 text-md-right ${
                            currentPage === 0 ? "animate__animated" : ""
                          }`}
                        >
                          <img src={Mobsection1} alt="img" />
                        </div>

                        <div className="col-md-12 col-12 text-center d-none">
                          <div className="swipe_position">
                            <p className="mb-md-2 mb-1 d-block">
                              Swipe up to learn more
                            </p>

                            <img
                              onClick={() => fullpageApi.moveSectionDown()}
                              src={DownarrowBlack}
                              className="pl-md-5"
                              alt="img"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* second */}

              <div className="section">
                <div className="pt-md-5 screen_no2 mt-md-0 mt-3">
                  <div className="container">
                    <div className="landing_screen2 pt-5 pt-md-0">
                      <div className="row">
                        <div className="col-md-6 col-12 text-center">
                          <div className="landing_one_space">
                            <h2
                              className={`pt-md-5 mt-md-1 heading_screen2 d-md-block d-none ${
                                currentPage === 1 ? "animate__animated" : ""
                              }`}
                            >
                              Built for all <br /> investable assets
                            </h2>

                            <h2
                              className={`pt-md-5 mt-0 pt-0 heading_screen2 d-md-none d-block ${
                                currentPage === 1 ? "animate__animated" : ""
                              }`}
                            >
                              Built for all <br /> investable assets
                            </h2>

                            <p
                              className={`top_para para_screen2 mt-3 ${
                                currentPage === 1 ? "animate__animated" : ""
                              }`}
                            >
                              Investable assets have expanded to include luxury
                              watches, handbags, wines and even sneakers
                            </p>

                            <span className="d-block w-100 section2_spanpara mt-md-5 mt-3">
                              Tune in. Discover. Engage.
                            </span>
                          </div>

                          {/* <div
                            className={`bottom_image bottom_image_animate mt-md-3 text-right d-md-none d-inline-block ${
                              currentPage === 1
                                ? "animate__animated"
                                : ""
                            }`}
                          >
                            <img src={Mobsection2} alt="img" />
                          </div> */}
                        </div>

                        <div className="col-md-6 col-12 text-md-right">
                          <div
                            className={`bottom_image bottom_image_animate mt-md-3 text-right ${
                              currentPage === 1 ? "animate__animated" : ""
                            }`}
                          >
                            <img
                              src={Section2}
                              className="d-md-inline-block d-none"
                              alt="img"
                            />
                            <img
                              src={Mobsection2}
                              className="d-md-none d-inline-block"
                              alt="img"
                            />
                          </div>
                        </div>

                        <div className="col-md-12 col-12 text-center d-none">
                          <div className="swipe_position1">
                            <p className="mb-md-2 mb-1 d-block">
                              Swipe up to learn more
                            </p>

                            <img
                              onClick={() => fullpageApi.moveSectionDown()}
                              src={DownarrowBlack}
                              className="pl-md-5"
                              alt="img"
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div className="d-md-none d-block screen_right_img text-right">
                        <img src={Dollar} alt="img" />
                      </div> */}

                      {/* <div className="bottom_image d-md-none d-block">
                        <video
                          width="100%"
                          height="100%"
                          loop={true}
                          muted={true}
                          autoPlay={true}
                          playsInline={true}
                          src={myVideo}
                          className="video_width video-1"
                        />
                      </div> */}

                      {/*<div className="bg_mob">
                        <p className="bottom_para d-none mb-0">
                          IDEAS. CHAT. LIVESTREAM
                        </p>

                         <div
                          className={`swipe_section swipe_para mt-md-5 mt-2 ${
                            currentPage === 1
                              ? "animate__animated"
                              : ""
                          }`}
                        >
                          <p className="mb-0 mb-md-4">Swipe up to learn more</p>

                          <img
                            onClick={() => fullpageApi.moveSectionDown()}
                            src={DownarrowBlack}
                            className="d-md-none ml-auto mr-auto d-block"
                            alt="img"
                          />
                          <img
                            onClick={() => fullpageApi.moveSectionDown()}
                            src={DownarrowBlack}
                            className="d-md-block ml-auto mr-auto d-none"
                            alt="img"
                          />
                        </div> 
                      </div>*/}
                    </div>
                  </div>
                </div>
              </div>

              {/* third */}
              <div className="section">
                <div className="pt-md-5 screen_no3">
                  <div className="container">
                    <div className="landing_screen3 pt-5 pt-md-5 mt-md-0">
                      <div className="row">
                        <div className="col-md-6 col-12 mt-md-5 pt-md-0 pl-md-3 pr-md-0 p-0 text-center">
                          <div className="landing_one_space">
                            <h2
                              className={`heading_screen2 pt-md-0 pt-2 ${
                                currentPage === 2 ? "animate__animated" : ""
                              }`}
                            >
                              Build and manage <br /> your own community
                            </h2>

                            <span className="d-block w-100 screen3_spanpara mt-md-4 mt-2 mb-md-3">
                              Create. Share. Monetize.
                            </span>

                            <p
                              className={`top_para para_screen2 mt-3 d-none ${
                                currentPage === 2 ? "animate__animated" : ""
                              }`}
                            >
                              Discover ideas, tune into live trading sessions or
                              chat about everything from stocks to rare watches,
                              wine and art to crypto and NFT
                            </p>
                          </div>

                          <div className="bottom_image pt-md-5 d-md-none d-inline-block">
                            <img src={Mobsection3} alt="img" />
                          </div>

                          <div className="text-center animate__animated">
                            <button
                              className="button_join"
                              onClick={() => {
                                history.push("/signup");
                              }}
                            >
                              Join waitlist
                            </button>

                            <div className="terms_para mt-0">
                              <Link to="/about">About Us</Link>
                              <Link to="/terms">Terms</Link>
                              <Link to="/privacy">Privacy</Link>
                            </div>
                          </div>

                          {/* <div className="d-md-block d-none terms_para mt-4">
                            <Link to="/about-us">About Us</Link>
                            <Link to="/terms/condition">Terms</Link>
                            <Link to="/privacy/policy">Privacy</Link>
                          </div> */}
                        </div>

                        <div className="col-md-6 col-12 pl-xl-5">
                          <div className="bottom_image pt-md-0">
                            <img
                              src={Section3}
                              className="d-md-inline-block d-none"
                              alt="img"
                            />
                            {/* <img src={Mobsection3} className="d-md-none d-inline-block" alt="img" /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
};
