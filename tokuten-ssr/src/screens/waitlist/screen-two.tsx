import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { WaitlistHeader } from "../../components/WaitlistHeader/waitlistHeader";
import Bubble from "../../assets/images/login/bubble.png";
import Idea from "../../assets/images/login/idea.png";
import TextField from "@material-ui/core/TextField";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Youtube from "../../assets/images/social/youtube.png";
import Plus from "../../assets/images/plus.png";
import Minus from "../../assets/images/minus.png";
import Instagram from "../../assets/images/social/instagram.png";
import twitter from "../../assets/images/social/twitter.png";
import linkedin from "../../assets/images/social/linkedin.png";
import tiktok from "../../assets/images/social/tiktok.png";
import discord from "../../assets/images/social/discord.png";
import tribe from "../../assets/images/social/tribe.png";
import television from "../../assets/images/social/television.png";
import radio from "../../assets/images/social/radio.png";
import podcast from "../../assets/images/social/podcast.png";
import substack from "../../assets/images/social/substack.png";
import newsletter from "../../assets/images/social/newsletter.png";
import print from "../../assets/images/social/print.png";
import blog from "../../assets/images/social/blog.png";
import website from "../../assets/images/social/website.png";
import wechat from "../../assets/images/social/wechat.png";
import red from "../../assets/images/social/red.png";
import others from "../../assets/images/social/others.png";
import "./screen-two.scss";
import { joinWaitList } from "../../services/auth.service";
import { Spinner } from "react-bootstrap";

interface IProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    }
  })
);

export const ScreenTwo: React.FC<IProps> = () => {
  const history = useHistory();
  const [isSubmittingWaitList, setIsSubmittingWaitList] = useState<boolean>(false);
  const location: any = useLocation();
  const { data } = location.state;
  console.log(data);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [socialUrls, setSocialUrls] = React.useState<any>({});
  const accordionData = [
    {
      id: 1,
      title: "Youtube",
      icon: Youtube,
      text_field_name: "youtube",
      expanded: "panel1"
    },
    {
      id: 2,
      title: "Instagram",
      icon: Instagram,
      text_field_name: "instagram",
      expanded: "panel2"
    },
    {
      id: 3,
      title: "Twitter",
      icon: twitter,
      text_field_name: "twitter",
      expanded: "panel3"
    },
    {
      id: 4,
      title: "Linkedin",
      icon: linkedin,
      text_field_name: "linkedin",
      expanded: "panel4"
    },
    {
      id: 5,
      title: "Tiktok",
      icon: tiktok,
      text_field_name: "tiktok",
      expanded: "panel5"
    },
    {
      id: 6,
      title: "Discord",
      icon: discord,
      text_field_name: "discord",
      expanded: "panel6"
    },
    {
      id: 7,
      title: "Tribe",
      icon: tribe,
      text_field_name: "tribe",
      expanded: "panel7"
    },
    {
      id: 8,
      title: "Television",
      icon: television,
      text_field_name: "television",
      expanded: "panel8"
    },
    {
      id: 9,
      title: "Radio",
      icon: radio,
      text_field_name: "radio",
      expanded: "panel9"
    },
    {
      id: 10,
      title: "Podcast",
      icon: podcast,
      text_field_name: "podcast",
      expanded: "panel10"
    },
    {
      id: 11,
      title: "Substack",
      icon: substack,
      text_field_name: "substack",
      expanded: "panel11"
    },
    {
      id: 12,
      title: "Newsletter",
      icon: newsletter,
      text_field_name: "newsletter",
      expanded: "panel12"
    },
    {
      id: 13,
      title: "Print",
      icon: print,
      text_field_name: "print",
      expanded: "panel13"
    },
    {
      id: 14,
      title: "Blog",
      icon: blog,
      text_field_name: "blog",
      expanded: "panel14"
    },
    {
      id: 15,
      title: "Website",
      icon: website,
      text_field_name: "website",
      expanded: "panel15"
    },
    {
      id: 16,
      title: "Wechat",
      icon: wechat,
      text_field_name: "wechat",
      expanded: "panel16"
    },
    {
      id: 17,
      title: "Red",
      icon: red,
      text_field_name: "red",
      expanded: "panel17"
    },
    {
      id: 18,
      title: "Others",
      icon: others,
      text_field_name: "others",
      expanded: "panel18"
    }
  ];

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onTextChange = (event: any) => {
    const name: string = event.target.name;
    const value: string = event.target.value;
    const newState = { ...socialUrls, [name]: value };
    setSocialUrls(newState);
  };

  const onSubmit = async () => {
    const payload: any = {
      email: data.signup.email,
      username: data.signup.username,
      password: data.signup.password,
      first_name: data.signup.first_name,
      last_name: data.signup.last_name,
      country: data.signup.country,
      passions: data.passions,
      i_am_a: data.i_am_a,
      social_urls: socialUrls
    };
    setIsSubmittingWaitList(true);
    
    try {
      const response: any = await joinWaitList(payload);
      if (response.data.success) {
        history.push({ pathname: '/signup/step-3', state: { 
          id: response?.data.data.id,
          wait_list_count: response?.data.data.wait_list_count
        }});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-pageform signup_2 login_sign_section">
      <img
        src={Bubble}
        className="sign2_left_img1 d-lg-block d-none"
        alt="img"
      />
      <img
        src={Idea}
        className="sign2_right_img2 d-lg-block d-none"
        alt="img"
      />

      <div className="content-div new_login">
        <WaitlistHeader isNext={true} enableNext={onSubmit} />

        <div className="form_body pt-0">
          <h3 className="second-screen">Where do you create</h3>
          <div className="available-items">
            <div className={classes.root}>
              {accordionData.map((item: any) => {
                return (
                  <Accordion
                    key={item.id}
                    expanded={expanded === `panel${item.id}`}
                    onChange={handleChange(`panel${item.id}`)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <div>
                          <img src={Plus} className="plus_icon" alt="img" />
                          <img src={Minus} className="minus_icon" alt="img" />
                        </div>
                      }
                      aria-controls="panel1bh-content"
                      id={`panel${item.id}`}
                    >
                      <div className="img_div_width">
                        <img src={item.icon} alt="img" />
                      </div>
                      <Typography className={classes.heading}>
                        {item.title}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <TextField
                        onChange={event => onTextChange(event)}
                        placeholder="Link to your profile"
                        // id="first test"
                        // label="Username"
                        name={item.text_field_name}
                        variant="outlined"
                        className="w-100 user-inputfeild mt-0"
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>

            {/* <span className="page_skip">Skip</span> */}

            <button type="submit"
                onClick={onSubmit}
                disabled={isSubmittingWaitList}
                className={`login_btn d-md-block d-none ${isSubmittingWaitList ? 'add-opacity' : ''}`}>
                {isSubmittingWaitList ? ( <Spinner animation="border" variant="light" /> ) : (
                  <span>Join waitlist</span>
                )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
