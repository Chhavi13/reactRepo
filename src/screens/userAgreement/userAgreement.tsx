import { useState } from 'react';
import "./userAgreement.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const UserAgreement = () => {
  return (
    <div className="agreement_content pt-5">
      <Container>
        <Row>
          <Col>

            <h1 className="text-uppercase mb-3"> Standard Agreement between creator and user </h1>

            <h2 className="mb-0"> Introduction: </h2>
            <p> This agreement between a Content Creator and a User sets out the terms which govern each transaction between a Content Creator and a User on Tokuten. </p>

            <p><span className="bold_font">"Transaction"  </span>means any transaction between a User and Content Creator on Tokuten by which access is granted to the Creator's Content (Relevant Content) in any of the following ways:  (i) a Subscription, (ii) payments made by a User to view a Creator's Content and (iii) one-off payments made by a User to Content Creator for joining any private groups (iv) one-off payments made by a User to Content Creator as Tips (v) one-off payments made by a User to Content Creator in exchange for any interaction  </p>

            <h2 className="mb-0 mt-3"> When does this agreement apply? </h2> <p> Each time a Transaction is initiated on Tokuten between a Content Creator and User, this Standard Contract between Content Creator and User will apply to the exclusion of any other terms which the Content Creator and User may propose, and this Standard Contract between Content Creator and User will legally bind the Content Creator and User participating in the Transaction. </p>

            <h2 className="mb-0 mt-3"> Parties: </h2>
            <p> The only parties to this agreement are the Content Creator and User participating in the Transaction. Tokuten is not a party to this agreement and neither grants any rights in respect of, nor participates in, any Transaction between Content Creator and User, except for acting as a payment intermediary. </p>

            <h2 className="mb-0 mt-3"> Pricing and payment:</h2> <p>By entering into a Transaction with a Content Creator, the User agrees to pay the Content Creator in accordance with the pricing set by the Creator. The User and Creator participating in the Transaction authorize Tokuten or any of its subsidiaries to act as a payment intermediary and to collect, hold, and process the payment and to deduct Tokuten’s Fee, and to pay out the sums due to Creator as described in the Tokuten Terms of Use. </p>

            <h2 className="mb-0 mt-3"> License of Content:</h2>
            <p> Once the User has made the payment for a Transaction, the Creator grants to the User a limited license to access the applicable Content of that Creator to which the Transaction relates (the "Relevant Content"). This license is non-transferable, non-sublicensable and non-exclusive, and permits the User to access and view the Relevant Content on the User's personal device and via a normal web browser (and to make a temporary copy of such Content only to the extent that this is an incidental and technical process forming part of the User's accessing the Content (i.e. caching) </p>

            <h2 className="mb-0 mt-3"> Ownership of Content:</h2>
            <p>The User participating in the User and Content Creator Transaction acknowledges and agrees that the license of the Relevant Content provided of this agreement does not result in the User acquiring any rights in or to the Relevant Content, which rights shall be retained by the Creator of the Relevant Content.</p>

            <h2 className="mb-0 mt-3"> Obligations between Creator and User entering into a Transaction: </h2>

            <p>In respect of every User and Content Creator Transaction: </p>

            <ul className="p-0">
              <li>  • The User participating in the Transaction agrees to make the payment required to access, view or interact with the Relevant Content, and agrees not to initiate a chargeback other than if the User disputes the Transaction in good faith.
              </li>
              <li>  • The Creator participating in the Transaction agrees to make the Relevant Content available to the User once the User has made the payment applicable to the Relevant Content. </li>
              <li>  • The Creator warrants (makes a legally enforceable promise) that it possesses all necessary rights in and to the Relevant Content sufficient to license it to the User in the territory in which the User will be accessing the Relevant Content, and has obtained any and all permissions and consents needed to grant the license in this agreement. </li>
              <li> • The Creator is solely responsible for creating and uploading the Relevant Content. The Creator provides no guarantees that it will continue to create and upload Relevant Content on an ongoing basis. </li>
              <li>  • Unless there has been negligence or other breach of duty by the Creator, the accessing by the User of the Creator's Content is entirely at the User's own risk. </li>
            </ul>

            <h2 className="mb-0 mt-3">  No guarantees:</h2>
            <p>The User participating in the Transaction acknowledges that Creators may add and remove Content at any time from their Creator account, and that Creators have the discretion to decide what sort of Content to make available on their account. In addition, the User participating in the Transaction acknowledges that there may be circumstances where it is not possible for the User to access to Relevant Content to be provided under the Transaction, including:</p>
            <ul className="p-0">
              <li> • if the Creator's account is suspended or deleted; </li>
              <li>  • if the User's account is suspended or deleted; </li>
              <li>  • if the availability of all or any part of Tokuten site is suspended or inaccessible; or </li>
              <li>  • if the Creator is unable to create or upload Relevant Content in the future. </li>
            </ul>

            <h2 className="mb-0 mt-3">  Disclaimers & No Liability </h2>
            <ul className="p-0">
              <li> • Creator may hold long or short positions in securities or derivatives of securities named in the Content and is free to buy or sell those positions at will </li>
              <li> • Creator may take positions inconsistent with the views expressed in the Content  </li>
              <li> • Content posted by Creators on the Tokuten platform contain the Creators’ own opinions (and not those of Tokuten)  </li>
              <li className="bold_font"> • None of the information contained therein constitutes a recommendation that any particular security, portfolio of securities, transaction, or investment strategy is suitable for any specific person  </li>
              <li> • User further understand that the Creator is not advising them personally concerning the nature, potential, value or suitability of any particular security, portfolio of securities, transaction, investment strategy or other matter  </li>
              <li> • The content is to be used for informational and entertainment purposes only and the Creator does not provide investment advice for any individual  </li>
              <li> • Creator specifically disclaim any and all liability or loss arising out of any action taken in reliance on content, including but not limited to market value or other loss on the sale or purchase of any company, property, product, service, security, instrument, or any other matter.  </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div >
  )
}