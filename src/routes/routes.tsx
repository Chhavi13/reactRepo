import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../routes/private.routes";
import PublicRoute from "../routes/public.routes";
import { AddAddress } from "../screens/addAddress/addAddress";
import {
  Dashboard,
  BookNow,
  MUserProfile,
  EditUserProfile,
  ListPreview,
  ListEvent,
  ThankYou,
  Address,
  ManageStore,
  MyOrder,
  OrderDetail,
  SetLoyalityRewards,
  ConfirmEmail,
  ListDetail,
  FanGroup,
  ForgotPassword,
  NewList,
  Textarea,
  ResetPassword,
  GetLoyalityRewards,
  Booking,
  CreateSlot,
  CreaterEventList,
  ChatDashBoard,
  CreateChannel,
  ChatRoom,
  ChannelChatList,
  LandingNewPage,
  SignIn,
  ScreenONE,
  ScreenTwo,
  ScreenThree,
  LoginPage,
  RegisterPage,
  OfferTag,
  PrivacyPolicy,
  AboutUs,
  TermsAndCondition,
  UserAgreement,
  APIComponent,
  CreateOfferPreview,
  SearchPost
} from "../screens";
import {
  BOOK_NOW,
  DASHBOARD,
  MUSER_PROFILE,
  LANDING_PAGE,
  CREATE_USER_PROFILE,
  NEW_LIST_STEPPER,
  ADD_ADDRESS,
  ADDRESS,
  LIST_PREVIEW,
  LIST_EVENT,
  THANK_YOU,
  MANAGE_STORE,
  MY_ORDER,
  LOYALITY,
  LIST_DETAIL,
  FAN_GROUP,
  CREATE_OFFER_NOTES,
  CREATE_OFFER_DETAILS,
  BUY_NOW_PREVIEW,
  CONFIRM_EMAIL,
  FORGOTPASSWORD,
  RESETPASSWORD,
  GET_LOYALITY_REWARDS,
  THANKYOU,
  CONFIRM_EMAILID,
  BUY_NOW,
  EDIT_ADDRESS_ID,
  USER_PROFILE_ID,
  ORDER_DETAIL_ID,
  BOOKING,
  CREATE_SLOT,
  CREATER_EVENT_LIST,
  ACTIVITY,
  ENDORSEMENT,
  REVIEW,
  CHAT,
  CREATE_CHANNEL,
  CHAT_ROOM,
  FAN_GROUP_DETAIL,
  CHANNEL_LIST,
  INVEST_ME,
  SUBSCRIPTION,
  SIGN_IN,
  SIGN_UP,
  SCREEN_ONE,
  SCREEN_TWO,
  SCREEN_THREE,
  OFFER_COMMENT,
  OFFER_TAG,
  ABOUT_US,
  PRIVACY_POLICY,
  TERM_CONDITIONS,
  USER_AGREEMENT,
  NOTIFICATION,
  API,
  SEARCH_POST
} from "./routesConstants";
import ListStepper from "../screens/newList/stepper";
import { BuyNow } from "../screens/buyNow/buyNow";
import { ThankYouScreen } from "../screens/thankYou/thankYou";
import { Activty } from "../screens/activity/activity";
import { Review } from "../components/review/reviews";
import Endorsement from "../screens/endorsement/endorsement";
import Groups from "../screens/loyality/fanGroup/groupList";
import InvestMe from "../screens/investInMe/investMe";
import Subscription from "../screens/subscription/subscription";
import { OfferComment } from "../screens/offerComment/offerComment";
import Notifications from "../screens/Notifications/Notifications"
const Routes: React.FC<any> = () => {
  return (
    <Switch>
      {/* Mobile pages */}
      <Route exact path={NEW_LIST_STEPPER} component={CreateOfferPreview} />

      <PublicRoute exact path={SIGN_IN} component={LoginPage} isHeader={false} />
      <PublicRoute
        exact
        path={SIGN_UP}
        component={RegisterPage}
        isHeader={false}
      />
      <PublicRoute
        exact
        path={SCREEN_ONE}
        component={ScreenONE}
        isHeader={false}
      />
      <PublicRoute
        exact
        path={SCREEN_TWO}
        component={ScreenTwo}
        isHeader={false}
      />
      <PublicRoute
        exact
        path={SCREEN_THREE}
        component={ScreenThree}
        isHeader={false}
      />
      <PublicRoute
        exact
        path={LANDING_PAGE}
        component={LandingNewPage}
        isHeader={false}
      />
      <PublicRoute exact path={API} component={APIComponent} />
      <PublicRoute exact path={ABOUT_US} component={AboutUs} />
      <PublicRoute exact path={PRIVACY_POLICY} component={PrivacyPolicy} />
      <PublicRoute exact path={TERM_CONDITIONS} component={TermsAndCondition} />
      <PublicRoute exact path={USER_AGREEMENT} component={UserAgreement} />
      
      <PrivateRoute exact path={SEARCH_POST} component={SearchPost} />
      <PrivateRoute component={ChatRoom} exact path={CHAT_ROOM} />
      <PrivateRoute component={ChannelChatList} exact path={CHANNEL_LIST} />
      <PrivateRoute component={Booking} exact path={BOOKING} />
      <PrivateRoute component={ChatDashBoard} isHeader={false} path={CHAT} />
      <PrivateRoute
        component={CreateChannel}
        isHeader={false}
        path={CREATE_CHANNEL}
      />
      <PrivateRoute component={CreateSlot} exact path={CREATE_SLOT} />
      <PrivateRoute component={CreaterEventList} path={CREATER_EVENT_LIST} />
      <PrivateRoute
        component={FanGroup}
        path={FAN_GROUP}
        exact
        isHeader={false}
      />
      <PrivateRoute
        component={NewList}
        path={CREATE_OFFER_DETAILS}
        exact
        isHeader={false}
      />
      <PrivateRoute
        component={Textarea}
        path={CREATE_OFFER_NOTES}
        exact
        isHeader={false}
      />

      <PrivateRoute
        component={ListDetail}
        path={LIST_DETAIL}
        exact
        isHeader={false}
      />
      <PublicRoute
        component={ConfirmEmail}
        path={CONFIRM_EMAIL}
        exact
        isHeader={false}
      />
      <PublicRoute
        component={ResetPassword}
        path={RESETPASSWORD}
        exact
        isHeader={false}
      />
      <PublicRoute
        component={ForgotPassword}
        path={FORGOTPASSWORD}
        exact
        isHeader={false}
      />
      <PrivateRoute
        component={MyOrder}
        path={MY_ORDER}
        exact
        isHeader={false}
      />
       <PrivateRoute
        component={Notifications}
        path={NOTIFICATION}
        exact
        isHeader={false}
      />
      <PrivateRoute
        component={OrderDetail}
        path={ORDER_DETAIL_ID}
        exact
        isHeader={false}
      />
      <PrivateRoute
        component={ManageStore}
        path={MANAGE_STORE}
        exact
        isHeader={false}
      />
      <PrivateRoute
        component={SetLoyalityRewards}
        path={LOYALITY}
        exact
        isHeader={false}
      />
      <PrivateRoute component={Address} path={ADDRESS} exact />
      {/* <Route component={Address} path='/address/:id' exact /> */}
      <PrivateRoute component={ThankYou} path={THANK_YOU} exact />
      <PrivateRoute component={ListEvent} path={LIST_EVENT} exact />
      <PrivateRoute component={ListPreview} path={LIST_PREVIEW} exact />
      {/* <Route component={ListStepper} path={BUY_NOW_PREVIEW} exact /> */}
      {/* <PrivateRoute component={ListStepper} path={NEW_LIST_STEPPER} exact /> */}
      <PrivateRoute
        component={EditUserProfile}
        path={CREATE_USER_PROFILE}
        exact
        isHeader={false}
      />
      <PrivateRoute
        exact
        path={ACTIVITY}
        component={Activty}
        isHeader={false}
      />
      {/* <PublicRoute exact path={SIGN_IN} component={SignIn} /> */}
      <PrivateRoute
        exact
        path={DASHBOARD}
        component={Dashboard}
        isHeader={false}
      />
      <PrivateRoute
        exact
        path={BOOK_NOW}
        component={BookNow}
        isHeader={false}
      />
      <PrivateRoute
        exact
        path={MUSER_PROFILE}
        component={MUserProfile}
        isHeader={false}
      />
      <Route exact path={USER_PROFILE_ID} component={MUserProfile} />
      <PrivateRoute
        exact
        path={ADD_ADDRESS}
        component={AddAddress}
        isHeader={false}
      />
      <PrivateRoute
        exact
        path={EDIT_ADDRESS_ID}
        component={AddAddress}
        isHeader={false}
      />
      <Route path={BUY_NOW} component={BuyNow} />
      <Route path={CONFIRM_EMAILID} component={ConfirmEmail} />
      <PrivateRoute
        path={THANKYOU}
        component={ThankYouScreen}
        isHeader={false}
      />
      <PrivateRoute
        path={GET_LOYALITY_REWARDS}
        component={GetLoyalityRewards}
        isHeader={false}
      />
      <PrivateRoute path={REVIEW} component={Review} isHeader={false} />
      <PrivateRoute path={ENDORSEMENT} component={Endorsement} />
      <PrivateRoute path={FAN_GROUP_DETAIL} component={Groups} />
      <PrivateRoute path={INVEST_ME} component={InvestMe} />
      <PrivateRoute path={SUBSCRIPTION} component={Subscription} />
      <Route
        component={OfferComment}
        path={OFFER_COMMENT}

      />
      <PrivateRoute exact path={OFFER_TAG} component={OfferTag} />

      {/* <PrivateRoute component={ListStepper} isHeader={false} /> */}

      {/* Mobile pages */}
    </Switch>
  );
};
export default Routes;
