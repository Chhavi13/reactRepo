import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Privacy from "../../assets/images/privacy.png";
import "./privacyPolicy.scss";

export const PrivacyPolicy = () => {
  return (
    <div className="agreement_content pt-4 mb-4">
      <Container>
        <Row>
          <Col md={6} xs={12} className="d-md-none d-inline-block text-center">
            <img src={Privacy} className="privacy_img" alt="img" />
          </Col>

          <Col md={6} xs={12} className="text-md-left text-center">
            <h1 className="text-uppercase pt-md-5 pt-3 mb-3"> PRIVACY POLICY </h1>
          </Col>

          <Col md={6} xs={12} className="d-md-inline-block d-none text-right">
            <img src={Privacy} className="privacy_img" alt="img" />
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="mt-md-3">
              This privacy policy
              <span className="bold_font"> (“Privacy Notice”) </span> describes
              our policies and procedures for collection, use, disclosure and
              protection of your information when you use the website located at{" "}
              <a href="https://tokuten.co/" target="_blank" className="link_data" rel="noreferrer">
                www.tokuten.co
              </a>{' '}
              (the <span className="bold_font"> “Platform” </span>) made
              available by Tokuten Pte. Ltd. ({" "}
              <span className="bold_font">
                “Tokuten”, “Company”, “we”, “us”{" "}
              </span>{" "}
              and <span className="bold_font"> “our”</span>), a private company
              registered in Singapore and located at 68 Circular Road, #02-01,
              Singapore (049422).
            </p>
            <p>
              This Privacy Notice applies to your use of the Platform and any
              services provided, owned, or operated by Tokuten, and covers
              information collected in connection with your access to and use of
              the Platform. Tokuten values your privacy and that of other users,
              and wants you to be familiar with how we collect, use, and
              disclose personal information from and about you. Please read this
              Privacy Notice carefully. By continuing to interact with us, or
              signing-up for or signing-into a Tokuten account, or continuing to
              access the Platform, you are consenting to the practices described
              in this Privacy Notice.
            </p>
            <p>
              You may share personal information when using Tokuten. One example
              is when you provide information about yourself as part of the
              Tokuten account creation process. Another is when you take certain
              actions on Tokuten that are public or intended to be public in
              nature, such as when you post any information, text, links,
              graphics, photos, audio, videos, or other materials or
              arrangements of materials uploaded, downloaded or appearing
              (collectively <span className="bold_font"> “Content” </span>),
              follow a channel, or subscribe to a channel. All Content,
              including information about user activity such as, but not limited
              to, who posted particular Content and your IP address, may be
              collected and used for things like keeping your account secure and
              showing you more relevant Content, people to subscribe to, and
              events. Tokuten encourages you to be mindful of this when
              considering your activity on Tokuten.
            </p>
            <p>
              Tokuten obtains information about you through the means discussed
              below. Please note that we need certain types of information so
              that we can provide Tokuten to you and other users. If you do not
              provide us with such information, or ask us to delete it, you may
              no longer be able to access or use Tokuten.
            </p>

            <p>
              {" "}
              Tokuten obtains information about you through the means discussed
              below. Please note that we need certain types of information so
              that we can provide Tokuten to you and other Users. If you do not
              provide us with such information, or ask us to delete it, you may
              no longer be able to access or use Tokuten.{" "}
            </p>
            <h2 className="mb-0"> 1) COLLECTION AND RECEIPT OF INFORMATION </h2>

            <h2 className="mb-0 mt-3">
              {" "}
              1.1) User-Provided Information Part A.{" "}
            </h2>
            <p>
              You may provide a variety of information about yourself to us,
              such as your name, image, voice, username, email address, postal
              mailing address, telephone number, credit card number, bank
              account details and billing information when you create an account
              with us, use Tokuten, or post or interact with any Content.
            </p>

            <h2 className="mb-0"> 1.2) User-Provided Information Part B. </h2>
            <p>
              The users you subscribe to, and those who subscribe to you, as
              well as the Content you post or comment on, your interaction with
              others through a “like” button or any similar means, and the
              forums and bulletin boards in or through which your interact, are
              also public. By logging into your account and going to the ‘Edit
              Profile’ page, you will be able to update your profile information
              and preferences, including reviewing, updating, or deleting
              information that Tokuten may have about you.
            </p>
            <ul className="p-0">
              <li>
                {" "}
                • Tokuten lets you decide the visibility of any Content you post
                by selecting the audience for every post. The default audience
                setting for Content is ‘publicly visible’.
              </li>
              <li>
                {" "}
                You can also make selections on the Platform relating to whether
                (a) others can tag you in comments or Content they post, (b)
                Tokuten can collect and use your precise location, (c) Tokuten
                personalizes your experience based on Content you’ve engaged
                with, or (d) you want to block or mute other users’ accounts.{" "}
              </li>
            </ul>
            <p>
              {" "}
              For other requests to review, update, delete, or otherwise limit
              Tokuten’s use of information that you have provided directly to
              Tokuten, you may contact{" "}
              <a href="#" className="link_data">
                {" "}
                privacy@tokuten.co.{" "}
              </a>
              . In your request, please include your email address, name, and
              username, and specify all relevant information about your request.
              To protect your privacy and security, we may take steps to verify
              your identity before granting you access or making corrections to
              your information. You are responsible for maintaining the secrecy
              of your unique password and account information at all times.{" "}
            </p>
            <h2 className="mb-0"> 1.3) Automatically Collected Information </h2>
            <p>
              {" "}
              When you access Tokuten, we automatically record and store certain
              information about your system by using cookies and other types of
              technologies, such as your IP address, device and browser types
              and identifiers, referring and exit page addresses, software and
              system type, and information about your usage of Tokuten. In order
              to provide certain services, we may require access to location
              information, including precise geolocation information collected
              from your device. If you do not consent to collection of this
              information, certain services will not function properly and you
              may not be able to use those services.{" "}
            </p>
            <h2 className="mb-0"> 1.4) Information from other sources </h2>
            <p>
              {" "}
              We may obtain additional information from third parties and
              sources other than Tokuten. For example, we may obtain additional
              information from social media networks (such as Facebook) for
              which you have approved our access. When you access Tokuten
              through social media networks or when you connect Tokuten to
              social media networks, you are authorizing Tokuten to collect,
              store, and use such additional information and content in
              accordance with this Privacy Notice. Tokuten uses this information
              to supplement the information we collect in order to provide you
              with a better overall experience using Tokuten. If we combine or
              associate information from other sources with information that we
              collect through Tokuten, we will treat the combined information in
              accordance with this Privacy Notice.{" "}
            </p>
            <h2 className="mb-0"> 1.5) Children’s privacy </h2>
            <p>
              Tokuten’s services and Content are not directed at persons under
              the age of 18. If Tokuten learns that personal information of
              persons under 18 has been collected on or through Tokuten, Tokuten
              will take appropriate steps to delete this information. If you are
              the parent or legal guardian of a child under 18 who has become a
              Tokuten user, please contact Tokuten at{" "}
              <a href="#" className="link_data">
                {" "}
                privacy@tokuten.co.{" "}
              </a>{" "}
              to have that child’s account terminated and personal information
              deleted.
            </p>

            <h2 className="mb-0"> 2) USE OF INFORMATION </h2>

            <h2 className="mb-0 mt-3"> 2.1) Providing Services </h2>
            <p>
              {" "}
              Tokuten uses your information to operate, maintain, enhance,
              provide, create, and develop all of the features, functionality,
              and services (new or existing) found on Tokuten; provide security
              for its websites, software, and applications; manage relationships
              with Users; improve Users’ experience on Tokuten; prevent fraud
              and abuse; and understand the usage trends of Users like you.
            </p>

            <h2 className="mb-0"> 2.2) Communicating with You </h2>
            <p>
              {" "}
              We may also ask for your consent to process your personal
              information for a specific purpose that we communicate to you.
              When you consent to our processing your personal information for a
              specified purpose, you may withdraw your consent at any time and
              we will stop the processing of your data for that purpose. Tokuten
              will necessarily use your information to communicate with you and
              send you information that we think you may find useful, or which
              you have requested from us about our services, or to conduct
              surveys and collect feedback from you.{" "}
            </p>

            <h2 className="mb-0"> 2.3) Advertising and Marketing </h2>
            <p>
              {" "}
              Tokuten may use your information for communicating with you about
              opportunities, products, services, contests, promotions,
              discounts, incentives, surveys, andrewards offered by us and
              select partners. If we send you marketing emails, each email will
              contain instructions permitting you to "opt out" of receiving
              future marketing or other communications.
            </p>

            <h2 className="mb-0"> 2.4) Other Uses </h2>
            <p>
              {" "}
              In certain cases, we have a legal obligation to collect and
              process your personal information (such as our obligation to share
              data with tax authorities). Tokuten will rely on legal grounds to
              process your personal information to the extent permitted by
              applicable law, which may include, without limitation: to honor
              contractual commitments, to take steps in anticipation of entering
              into contract, to fulfill legal obligations, with your consent,
              and for Tokuten’s legitimate interests.{" "}
            </p>

            <h2 className="mb-0"> 3) SHARING OF INFORMATION </h2>

            <h2 className="mb-0 mt-3">
              {" "}
              3.1) Aggregated and Anonymized Information{" "}
            </h2>
            <p>
              {" "}
              Tokuten shares or discloses non-personal data and aggregated
              information such as the total number of times users engaged with a
              post, general demographics, the number of users who clicked on a
              particular link (even if only one did), the topics that users are
              discussing about in a particular location, some inferred
              interests, or reports to advertisers about how many users saw or
              clicked on their ads. Such aggregated and anonymized information
              will not specifically identify you or any individual user of our
              services.
            </p>

            <h2 className="mb-0"> 3.2) With Other Users and Third Parties </h2>
            <p>
              {" "}
              Tokuten may share information about you with other users of our
              services with whom you interact through your own use of our
              services. For example, we may share information when you make or
              accept a payment, appointment, or money transfer using our
              services. Tokuten may also share certain information with service
              providers working on our behalf, such as, to: provide website
              hosting, maintenance, and security services; conduct data analysis
              and create reports; offer certain functionality; or assist us in
              improving our platforms and creating new services and features.
              Tokuten requires that these parties process such information in
              compliance with this Privacy Notice, and we authorize them to use
              the information only for the purposes for which it is provided to
              them. We also require them to use reasonable confidentiality
              measures.
            </p>

            <h2 className="mb-0"> 3.3) With Affiliates </h2>
            <p>
              {" "}
              Tokuten may make information available to its affiliates, which
              are entities controlled by, controlling, or under common control
              with Tokuten, which are likewise subject to this Privacy Notice.{" "}
            </p>

            <h2 className="mb-0"> 3.4) Corporate Changes </h2>
            <p>
              {" "}
              n the event that Tokuten, or some or all assets related to Tokuten
              are acquired by or merged with a third-party entity or in
              connection with a contemplated financing, restructuring,
              acquisition, or change of ownership transaction, Tokuten reserves
              the right, in any of these circumstances, to transfer or assign
              the information collected from Users as part of that merger,
              acquisition, sale, or other change of control event or financing
              or acquisition or dissolution transaction, including in the course
              of diligence.
            </p>

            <h2 className="mb-0"> 3.5) Compliance With Laws </h2>
            <p>
              {" "}
              Tokuten may disclose user information if we believe, in good
              faith, that such disclosure is necessary to comply with Singapore
              law or other applicable foreign laws, or respond to a court order,
              judicial or other government request, subpoena, or warrant in the
              manner legally required. Tokuten also reserves the right to
              disclose information that we believe, in good faith, is
              appropriate or necessary to protect Tokuten from potential
              liability or from fraudulent, abusive, or unlawful uses;
              investigate and defend ourselves against third-party claims, or
              allegations; protect the security or integrity of Tokuten; or
              protect the rights, property, or safety of Tokuten, our users, or
              others.
            </p>

            <h2 className="mb-0"> 4) OPTING OUT </h2>
            <p>
              {" "}
              4.1) Other than as set out in this Privacy Notice, you will
              receive notice when personal information about you might be shared
              with third parties and you will have an opportunity to choose not
              to share the information.
            </p>

            <p>
              {" "}
              4.2) If you wish to deactivate your account, you can do so by
              logging into your Tokuten account or by emailing us on{" "}
              <a href="#" className="link_data">
                {" "}
                privacy@tokuten.co.{" "}
              </a>{" "}
            </p>

            <h2 className="mb-0"> 5) RETENTION OF INFORMATION</h2>
            <p>
              {" "}
              Tokuten maintains data related to your usage of Tokuten for as
              long as it is required in order to fulfill the relevant purposes
              described in this Privacy Notice, as may be required (or
              permitted) by law such as for tax and accounting purposes, or as
              otherwise communicated to you. Once you have asked Tokuten to
              close your account and delete your profile information, all
              information that is not required or permitted to be retained by
              law will be deleted. For up to 60 days after deletion it is still
              possible to restore your Tokuten account if it was accidentally or
              wrongfully deleted.{" "}
            </p>

            <h2 className="mb-0"> 6) COOKIES AND SIMILAR TECHNOLOGIES</h2>
            <p>
              {" "}
              6.1) We use various technologies to collect or receive information
              when you access or use our services, including placing a piece of
              code, commonly referred to as a "cookie," or similar technology on
              your device and using web beacons. Cookies are small data files
              that are stored on your hard drive or in your device memory when
              you visit a website or view a message. Among other things, cookies
              support the integrity of our registration process, retain your
              preferences and account settings, and help evaluate and compile
              aggregated statistics about user activity.{" "}
            </p>

            <p>
              {" "}
              6.2) We will begin collecting information about you or from
              activity on devices you use as soon as you access or use the
              Platform. By using the Platform, you permit us to collect or
              receive and use your information from activity on devices you use
              in accordance with this Privacy Notice.
            </p>

            <p>
              {" "}
              6.3) Certain cookies we use last only for the duration of your web
              or application session and expire when you close your browser or
              exit the application. Other cookies are used to remember you when
              you return to use the Platform and, as such, will last longer.
            </p>

            <p>
              6.4) Some of the cookies used in the Services are set by us, and
              others are set by third parties who deliver services on our
              behalf. Most web and mobile device browsers are set to
              automatically accept cookies by default. However, you can change
              your browser settings to prevent automatic acceptance of cookies,
              or to notify you each time a cookie is set. Please note, however,
              that by blocking or deleting cookies used in the Platform, you may
              not be able to take full advantage of the Platform.
            </p>

            <p>
              6.5) We also may collect or receive information using web beacons.
              Web beacons are electronic images that may be used in our Services
              or emails. We use web beacons to deliver cookies, track the number
              of visits to our website and apps, understand usage and
              effectiveness, and determine whether an email has been opened and
              acted upon.
            </p>

            <h2 className="mb-0"> 7) THIRD PARTY ADVERTISING AND ANALYTICS</h2>
            <p>
              {" "}
              7.1) Tokuten may link to third-party websites or services. The
              privacy practices of those third parties are not governed by this
              Privacy Notice. Tokuten encourages you to review the privacy
              policies of these third-party websites and services to understand
              their practices.{" "}
            </p>

            <p>
              7.2) Tokuten may use third-party web analytics services in
              connection with Tokuten. These service providers use a variety of
              tracking technologies such as cookies to analyze how users use
              Tokuten. The information collected may be shared with or collected
              directly by these services and processed to evaluate your use of
              Tokuten.
            </p>

            <p>
              7.3) Tokuten may also work with third-party ad networks,
              advertisers, and advertising analytics providers to target (and
              measure the performance of) ads to you both on and off Tokuten.
              Tokuten may share with these third parties (or they may directly
              collect) data such as cookie and mobile ad identifiers in order to
              engage in advertising activity (including to understand how you
              respond to advertisements and to serve relevant ads).
            </p>

            <h2 className="mb-0"> 8) DATA SECURITY</h2>

            <p>
              Tokuten uses various measures to protect the integrity and
              security of your information. These measures may vary based on the
              sensitivity of your information. However, no security precautions
              or systems can be completely secure, and therefore Tokuten cannot
              ensure or warrant the security of any information you transmit to
              it. You do so at your own risk.
            </p>

            <h2 className="mb-0"> 9) GLOBAL OPERATIONS AND PRIVACY</h2>

            <p>
              As a website, Tokuten operates globally. Information provided on
              Tokuten about investing, markets and the securities industry is
              not geared towards a particular jurisdiction. Where the laws of
              your country allow you to do so, you authorize Tokuten to
              transfer, store, and use your data in Singapore, and any other
              country where we may operate. In some of the countries to which
              Tokuten transfers personal data, the privacy and data protection
              laws and rules regarding when government authorities may access
              data may vary from those of your country. Residents of the
              European Economic Area (“EEA”) and residents of Brazil can
              exercise certain data subject rights available to them under
              applicable data protection laws.  Tokuten will comply with
              requests to exercise these rights in accordance with applicable
              law. If these rights apply to you, they may permit you to request
              that we:
            </p>

            <ul className="p-0">
              <li>
                {" "}
                • Obtain access to or a copy of certain personal information
                Tokuten holds about you.
              </li>
              <li>
                • Prevent the processing of your personal information for direct
                marketing purposes (including any direct marketing processing
                based on profiling).
              </li>

              <li>
                • Update personal information that is out of date or incorrect.
              </li>

              <li>
                • Delete certain personal information Tokuten holds about you.
              </li>

              <li>
                • Restrict the way that Tokuten processes and discloses specific
                personal information about you.
              </li>

              <li>
                • Transfer your personal information to a third-party provider
                of services.
              </li>

              <li>
                • Revoke consent that you previously provided for the processing
                of your personal information.
              </li>
            </ul>

            <p>
              For purposes of all applicable data protection laws, Tokuten shall
              be deemed to be the “data controller” of information collected in
              connection with the use of the Platform.
            </p>

            <p>
              International data transfers: Information collected by Tokuten may
              be stored and processed in your region or in any other country
              where Tokuten or its affiliates, subsidiaries, partners, or
              service providers are located or maintain facilities.  If Tokuten
              provides any information about you to any such entities, Tokuten
              will take appropriate measures to ensure such companies protect
              your information adequately in accordance with this Privacy Notice
              and applicable law.
            </p>

            <h2 className="mb-0 mt-3">
              {" "}
              10) AMENDMENTS AND CONTACT INFORMATIONY
            </h2>

            <h2 className="mb-0 mt-3">
              {" "}
              10.1) Changes and updates to this Privacy Notice
            </h2>

            <p>
              Tokuten reserves the right to change, modify, add, or remove
              portions of this Privacy Notice at any time. Please check this
              Privacy Notice periodically for those changes. Your continued use
              of Tokuten after the posting of changes constitutes your binding
              acceptance of such changes.
            </p>

            <h2 className="mb-0"> 10.2) Tokuten contact information</h2>
            <p>
              Please contact Tokuten with any questions or comments about this
              Privacy Notice at 68 Circular Road, #02-01, Singapore (049422), or
              by email to{" "}
              <a href="#" className="link_data">
                diamondhands@tokuten.co
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
