import React, { useState } from "react";
// import { useHistory } from "react-router";
import { useHistory, useLocation } from "react-router-dom";
import { WaitlistHeader } from "../../components/WaitlistHeader/waitlistHeader";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import chips1 from "../../assets/images/sign1/chips1.png";
import moneybeg from "../../assets/images/sign1/money-bag.png";
import rocket from "../../assets/images/sign1/rocket.png";
import cryptoimg from "../../assets/images/sign1/crypto.png";
import badge from "../../assets/images/sign1/badge.png";
import certificate from "../../assets/images/sign1/certificate.png";
import stock from "../../assets/images/sign1/certificate.png";
import bond from "../../assets/images/sign1/bond.png";
import option from "../../assets/images/sign1/option.png";
import Bag from "../../assets/images/login/bag.png";
import Girl from "../../assets/images/login/sign2.png";
import Arrow from "../../assets/images/login/sign3.png";
import Hammer from "../../assets/images/login/sign4.png";
import Video from "../../assets/images/login/sign5.png";
import stocks from '../../assets/images/sign1/stocks.png';
import Cryptocurrency from '../../assets/images/sign1/cryptocurrency.png' ;
import defi from '../../assets/images/sign1/defi.png' ;
import nft from '../../assets/images/sign1/nft.png' ;
import wine from '../../assets/images/sign1/wine.png' ;
import art from '../../assets/images/sign1/art.png' ;
import handbag from '../../assets/images/sign1/handbag.png' ;
import "./screen-one.scss";

interface IProps {}

export const ScreenONE: React.FC<IProps> = () => {
  const history = useHistory();
  let [isSkip, setIsSkip] = useState<boolean>(false);
  const location: any = useLocation();
  const { data } = location.state;
  let [iAmArr, setIamArr] = useState<any>([
    { id: 1, title: "Creator", img: chips1 },
    { id: 2, title: "Investor", img: moneybeg },
    { id: 3, title: "Trader", img: rocket },
    { id: 4, title: "Collector", img: cryptoimg },
    { id: 5, title: "Expert", img: badge },
    { id: 6, title: "Trainer", img: certificate }
  ]);

  const [financialMarkets, setFinancialMarkets] = useState<any>([
    { id: 1, title: "Stocks", img: stocks },
    { id: 2, title: "Bonds", img: bond },
    { id: 3, title: "Options", img: option }
  ]);

  const [crypto, setCrypto] = useState<any>([
    { id: 1, title: "Cryptocurrency", img: Cryptocurrency },
    { id: 2, title: "Defi", img: defi },
    { id: 3, title: "NFT", img: nft }

  ]);

  const [luxuryCollection, setLuxuryCollection] = useState<any>([
    { id: 1, title: "Wine", img: wine },
    { id: 2, title: "Art", img: art },
    { id: 3, title: "Hand Bags", img: handbag }
  ]);

  function setIsActive(data: any, value: any) {
    return data.map((x: any) => {
      if (x.id === value.id) {
        x.isActive = !x.isActive;
      }
      return x;
    });
  }

  function getFilterData(data: any) {
    return data.reduce((arr: any, curr: any) => {
      if (curr.isActive) {
        arr.push({ id: curr.id, title: curr.title });
      }
      return arr;
    }, []);
  }

  const onChangeIAM = (data: any, type: string) => {
    // let newArray = iAmArr.map((x: any) => {
    //   if (x.id === data.id) {
    //     x.isActive = !x.isActive;
    //   }
    //   return x;
    // });
    if (type === "i_am") {
      let newArray = setIsActive(iAmArr, data);
      setIamArr(newArray);
    } else if (type === "financial_markets") {
      let newArray = setIsActive(financialMarkets, data);
      setFinancialMarkets(newArray);
    } else if (type === "crypto") {
      let newArray = setIsActive(crypto, data);
      setCrypto(newArray);
    } else if (type === "Luxury_collection") {
      let newArray = setIsActive(luxuryCollection, data);
      setLuxuryCollection(newArray);
    }
  };

  const skipStep = () => {
    setIsSkip(true);
    onSubmit();
  };
  const onSubmit = () => {
    const passions: any = {
      financial_markets: getFilterData(financialMarkets),
      crypto: getFilterData(crypto),
      luxury_collection: getFilterData(luxuryCollection)
    };

    const payload: any = {
      signup: data,
      i_am_a: getFilterData(iAmArr),
      passions: passions
    };
    console.log(payload);

    history.push({ pathname: "/signup/step-2", state: { data: payload } });
  };

  return (
    <div className="login-pageform signup_1 login_sign_section">
      <img src={Bag} className="sign_left_img1 d-lg-block d-none" alt="img" />
      <img src={Girl} className="sign_left_img2 d-lg-block d-none" alt="img" />
      <img src={Arrow} className="sign_left_img3 d-lg-block d-none" alt="img" />
      <img
        src={Hammer}
        className="sign_left_img4 d-lg-block d-none"
        alt="img"
      />
      <img src={Video} className="sign_left_img5 d-lg-block d-none" alt="img" />
      <div className="content-div new_login">
        <WaitlistHeader isNext={true} enableNext={onSubmit} />

        <div className="form_body pt-0">
          <h3 className="second-screen text-md-left">
            Tell us more about yourself
          </h3>

          <div className="available-items">
            <div className="about-yourselfdiv mb-4">
              <h3 className="text-left">I am a</h3>
              <div className="grey-contentarea">
                {iAmArr.map((item: any, i: number) => (
                  <Chip
                    className={`chips chip_avatar ${
                      item?.isActive ? "active" : ""
                    }`}
                    avatar={<Avatar alt="img" src={item.img} />}
                    label={item.title}
                    onClick={() => onChangeIAM(item, "i_am")}
                  />
                ))}
              </div>
            </div>
            <div className="about-yourselfdiv text-left mb-3">
              <h3>Interested in</h3>
              <div className="grey-contentarea">
                <h4>Financial markets</h4>
                {financialMarkets.map((item: any) => {
                  return (
                    <Chip
                      className={`chips chip_avatar ${
                        item?.isActive ? "active" : ""
                      }`}
                      avatar={<Avatar alt="img" src={item.img} />}
                      label={item.title}
                      onClick={() => onChangeIAM(item, "financial_markets")}
                    />
                  );
                })}
                <h4 className="mt-2">Crypto</h4>
                {crypto.map((item: any) => {
                  return (
                    <Chip
                      className={`chips chip_avatar ${
                        item?.isActive ? "active" : ""
                      }`}
                      avatar={<Avatar alt="img" src={item.img} />}
                      label={item.title}
                      onClick={() => onChangeIAM(item, "crypto")}
                    />
                  );
                })}
                <h4 className="mt-2">Luxury collection</h4>
                {luxuryCollection.map((item: any) => {
                  return (
                    <Chip
                      className={`chips chip_avatar ${
                        item?.isActive ? "active" : ""
                      }`}
                      avatar={<Avatar alt="img" src={item.img} />}
                      label={item.title}
                      onClick={() => onChangeIAM(item, "Luxury_collection")}
                    />
                  );
                })}
              </div>
            </div>

            <span className="page_skip" onClick={skipStep}>
              Skip
            </span>

            <button
              type="submit"
              className="login_btn mt-4 d-md-block d-none"
              onClick={onSubmit}
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
