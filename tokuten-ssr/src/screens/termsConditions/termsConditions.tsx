import React from 'react';
import "./termsConditions.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

export const TermsAndCondition = () => {
  return (
    <div className="agreement_content pt-5">
      <Container>
        <Row>
          <Col>
            <div className="text-md-left text-center">
              <h1 className="text-uppercase mb-3"> Terms </h1>
            </div>

            <p> These Terms of Use (this “Agreement”) explain the terms by which you the “User” may use Tokuten, and other online or mobile services we may provide (collectively, the “Service”). Please read this Agreement carefully before using the Service. By accessing or using the Service, you agree that you have read, understood, and agree to be bound by this Agreement, along with
              <Link to="/Standard Agreement between Creator and User">
                <span className="bold_font"> “Standard Agreement between Creator and Users”</span>
              </Link>
              and to the collection and use of your information as set forth in our
              <span className="bold_font">
              &nbsp; 
              <Link to="/privacy" className="bold_font" >
                 Privacy Policy
              </Link> 
              </span>, whether or not you are a registered user of our Service. This Agreement applies to all visitors, users, and others who access the Service (collectively, “Users”). </p>

            <p> Tokuten is a “Service” designed and developed for you, the “User,” to assist you in learning about investing, stock market, and the securities industry and in making YOUR OWN INVESTMENT DECISIONS through “Content” that is made available on the Service by “Creators”. </p>

            <p>  Tokuten allows you to post content on the Service. The Service is a platform for Creators to publish investment blogs, livestream, hold discussions on ideas related to investment or trading of securities in public or private forums (“Content”). </p>

            <p>"Content" means any material uploaded to Tokuten by any User including any photos, videos, audio (for example music and other sounds), livestream material, data, text (such as comments and hashtags), metadata, images, interactive features, emojis, GIFs, memes, and any other material whatsoever. User who posts or publish any content is called “Creator”. </p>

            <p> Any “Content” posted by User must adhere to these Terms of Use. Any content posted by User on Tokuten is completely at User’s sole discretion and is completely voluntary and User does not have any obligation to do so. </p>

            <h2 className="mb-0"> Amendments to Terms of Use </h2>
            <p> This Agreement is maintained on our website. We reserve the right, in our sole discretion, to modify or replace this Agreement from time to time, and so you should review this page periodically. Your continued use of the Service after any such change constitutes your acceptance of the new terms. If you do not agree to any of these terms or any future terms, do not use or access (or continue to access) the Service. </p>

            <h2 className="mb-0"> Registration </h2>
            <p>  Tokuten is only available for Users who register and create a User account on Tokuten. </p>
            <ul className="p-0">
              <li>  • User must provide their email address, a username, and a password which sufficiently complies with Tokuten’s technical requirements of the composition of passwords. </li>
              <li>  • User must be at least 18 years old, and you will be required to confirm this. If the laws of the country or State/province where you live provide that you can only be legally bound by a contract with Tokuten at an age which is higher than 18 years old, then you must be old enough to be legally bound by a contract with us under the laws of the country or State/province where you live. </li>
              <li>  • User must not be barred from accessing Tokuten under any laws which apply to you. If you do not meet the above requirements, you must not access or use Tokuten. </li>
              <li>   • If you previously had an account with Tokuten, you confirm that your old account was not terminated or suspended by us because you violated any of our terms or policies. </li>
              <li>  • You will make sure that all information which you submit to us is truthful, accurate and complete. You will update promptly any of your information you have submitted to us as and when it changes. </li>
              <li>   • You are responsible for the confidentiality and use of your username password and any access numbers, names or additional passwords. You must immediately notify Tokuten if you become aware of any unauthorized use, loss or theft of your username or login password by sending an email to support@tokuten.co </li>
              <li>   • You are responsible for all activity on your account even if, contrary to the Terms of Use, someone else uses your account. </li>
              <li>  • We will not be liable for your losses caused by any unauthorized use of your account, and you shall be solely liable for the losses due to such unauthorized use. </li>
            </ul>

            <h2 className="mb-0 mt-3"> Suspension, Termination & Investigation </h2>
            <p>  We reserve the right in our sole discretion to terminate your agreement with us and your access to Tokuten for any reason or without prior notice. </p>

            <p>  We may, at our sole discretion and without limiting other remedies, limit, suspend, or terminate your user account(s) and access to our Services, delay or remove hosted content, remove any special status associated with your account(s), remove, not display, reduce or eliminate any discounts, and take technical and/or legal steps to prevent you from using our Services. </p>

            <p>  Tokuten may terminate your account, delete your profile and any Content that you have posted on the Service and/or prohibit you from using or accessing the Service for any reason, or no reason, at any time in its sole discretion, with or without notice. </p>

            <p> Some (but not all) of the reasons for such action may be: </p>
            <ul className="p-0">
              <li>  • If we believe you are abusing our Services in any way </li>
              <li> • If we believe that you are under 18  </li>
              <li>  • If we think that you have or may have seriously or repeatedly breached any part of the Terms of Use or if you attempt or threaten to breach any part of the Terms of Use in a way which has or could have serious consequences for us or another User; or </li>
              <li>   • if you take any action that in our opinion has caused or is reasonably likely to cause us to suffer a loss or that otherwise harms the reputation of Tokuten. </li>
            </ul>

            <p> During any period when access to your User account is suspended, any Payments from or to you which would otherwise have fallen due during the period of suspension will be suspended. In the event of a suspension or termination, if we have to refund any amounts to the Users who pay you for your content, you agree to pay us for any such refunded amounts. </p>

            <p>Upon termination of your account, we may deal with your Content in any appropriate manner in accordance with our Privacy Policy (including by deleting it) and you will no longer be entitled to access your Content. </p>
            <p> We can investigate any suspected or alleged misuse, abuse, or unlawful use of Tokuten and cooperate with law enforcement agencies in such investigation. We can disclose any information or records in our possession or control about your use of Tokuten to law enforcement agencies in connection with any law enforcement investigation of any suspected or alleged illegal activity, or in response to a court order. </p>

            <h2 className="mb-0 mt-3"> Site Content </h2>
            <p> You understand that all "Content" posted or published on, uploaded to, transmitted through, or linked from, the Service (hereinafter, “post”, “posted” or “published”), by users of the Service are the sole responsibility of the person or entity from whom such Content originated. We do not authorize or approve Content on Tokuten, and views expressed by Creators or Users on Tokuten do not necessarily represent our views. </p>

            <p> All Content is created, selected and provided by Users and not by us. We are not responsible for reviewing or moderating Content, and we do not select or modify the Content that is stored or transmitted via Tokuten. We are under no obligation to monitor Content or to detect breaches of the Terms of Use. </p>

            <p>You agree that by using the Service, you may be exposed to Content that is offensive, indecent, inaccurate, misleading, or otherwise objectionable. Tokuten, its affiliates and partners are not responsible for the conduct, whether online or offline, of any User. You agree that you bear all risks associated with, the use or posting of any Content, that you may not rely on said Content, and that under no circumstances will Tokuten, its affiliates, or partners be liable in any way for any Content or for any loss or damage of any kind incurred as a result of the use of any Content posted or otherwise made available via the Service.</p>

            <p>We do not grant you any rights in relation to Content. Any such rights may only be granted to you by Creators. You may not republish, post, transmit or distribute the Content to online bulletin and message boards, blogs, chat rooms, intranets or anywhere else without our consent. </p>

            <p> You agree that you have no obligation to follow any suggestions, comments, reviews or instructions received from another User of Tokuten and that if you choose to do so, you do so entirely at your own risk.</p>

            <p> We make no promises or guarantees of any kind that Creators will make a particular sum of money (or any money) from their use of Tokuten. </p>

            <p> The materials which we make accessible on Tokuten for Users are for general information only. We make no promises or guarantees that Users will achieve any particular result or outcome from using such materials.</p>

            <h2 className="mb-0 mt-3">  Securities Disclaimer, No recommendations, No advice </h2>
            <p> Tokuten does not recommend or endorse any particular securities or investments or otherwise provide investment advice that is personalized in nature. </p>

            <p> Tokuten does not act as a tax advisor, investment adviser, broker, dealer, underwriter, or placement agent. The service is not intended to provide tax, legal, financial or investment advice, and nothing on the service should be construed as an offer to sell, a solicitation of an offer to buy, or a recommendation for any security. Trading in such securities can result in immediate and substantial losses of the capital invested. You should only invest risk capital, and not capital required for other purposes. </p>

            <p>You must use your own judgment in making investment decisions <span className="bold_font"> independently and prudently, not to rely on information provided on Tokuten when making any investment decision and consult investment, legal or tax professional professionals as appropriate. </span> </p>

            <p> <span className="bold_font"> You alone are solely responsible for determining whether any investment, security or strategy, or any other product or service, is appropriate or suitable for you based on your investment objectives and personal and financial situation. You should also consult an attorney or tax professional regarding your specific legal or tax situation. </span> </p>

            <p> Tokuten is not responsible for your selection of securities or investments and does not guarantee the accuracy or completeness of any information provided on Tokuten. You should consult with an investment professional before any trade. You assume any liability for any loss that results from information you obtained on Tokuten.  Past performance of any security or investment is not an indication of future performance.  <span className="bold_font"> All investments involve risks, including the possible loss of capital. </span> </p>

            <p> The Service is a platform for Creators to publish investment blogs, livestream, hold discussions on ideas related to investment or trading of securities in public or private forums. Creators may hold long or short positions in securities or derivatives of securities named in the Content and are free to buy or sell those positions at will. The Creators may take positions inconsistent with the views expressed in their Content. Content posted by Creators on the Tokuten platform contain the Creators’ own opinions (and not those of the Company), and none of the information contained therein constitutes a recommendation that any particular security, portfolio of securities, transaction, or investment strategy is suitable for any specific person. <span className="bold_font"> You further understand that the Creators are not advising you personally concerning the nature, potential, value or suitability of any particular security, portfolio of securities, transaction, investment strategy or other matter.</span> </p>

            <p>  The content is to be used for informational and entertainment purposes only and the service does not provide investment advice for any individual. Tokuten, its affiliates and partners specifically disclaim any and all liability or loss arising out of any action taken in reliance on content, including but not limited to market value or other loss on the sale or purchase of any company, property, product, service, security, instrument, or any other matter. </p>

            <p> You understand that an investment in any security is subject to a number of risks, and that discussions of any security published on the service will not contain a list or description of relevant risk factors. In addition, please note that some of the securities about which content is published on the service may have insufficient public float. Such securities are subject to more risk including greater volatility, lower liquidity and less publicly available information. </p>

            <h2 className="mb-0"> Content Policy  </h2>
            <p> You agree to ensure that any information disseminated pursuant to the Service, whether such dissemination is made (a) by you or on your behalf by a person authorized to disseminate information on your behalf or (b) otherwise, in any case, complies with all statutes, rules, regulations, orders or other governmental acts of any jurisdiction, whether foreign or domestic including without limitation any rules of any national or other securities exchange.</p>

            <h2 className="mb-0"> General: </h2>
            <p>  You must not submit or post any Content on Tokuten, including to any forums, chat rooms or bulletin boards available on or through Tokuten, if it: </p>

            <ul className="p-0">
              <li> • Violates or infringes any rights of any other party, including but not limited to copyright, trademark, privacy, publicity or any other intellectual property rights; </li>
              <li> • Contains statements or materials that are inappropriate, indecent, obscene, hateful, tortious, defamatory, slanderous or libelous, or that defame, harass, abuse, stalk, threaten or in any way infringe on the rights of others; </li>
              <li> • Contains statements or materials that contain vulgar, obscene, profane or otherwise objectionable language or images that typically would not be considered socially or professionally appropriate; </li>
              <li>  • Contains content that is, or may reasonably be considered to be, hate speech, or promotes bigotry, racism, hatred, or harm against any group or individual or promotes discrimination based on race, gender, religion, nationality, disability, sexual orientation or age; </li>
              <li> • Contains statements or materials that encourage criminal conduct that would give rise to civil liability or that otherwise violate or run contrary to any law or regulation, including but not limited to securities laws or regulations of Singapore or of any other jurisdiction; </li>
              <li> • Disparages Tokuten or any other person or party; </li>
            </ul>

            <h2 className="mb-0"> No advice or misleading content: </h2>
            <p>  The content you post on Tokuten must not be tailored, or purport to be tailored, to the investment needs of any other User or other individual. Any information you post must also be genuine in nature. When posting Content, you must disclose: </p>
            <ul className="p-0">
              <li>  • Any affiliations you have with any issuer, sponsor or promoter of a security or investment about which you post Info or make predictions (including, but not limited to, any viewpoints, opinions, and/or conclusions), and the nature of your affiliation. </li>
              <li> • Any monetary benefit or other consideration (and the specific amount) you, or anyone with whom you are affiliated, have received or expect to receive by virtue of your posting Content, directly or indirectly, from an issuer, underwriter, or dealer. </li>
              <li> • Any conflicts of interest that you may have that may incline you, consciously or unconsciously, to post certain Content. </li>
              <li>  • If you post an endorsement, you must comply with the relevant laws Concerning the Use of Endorsements and Testimonials in Advertising </li>
            </ul>

            <p> You must not submit or post any Content on Tokuten, including to any forums, chat rooms or bulletin boards available on or through Tokuten, if it: </p>
            <ul className="p-0">
              <li> • Contains statements without reasonable factual basis or for the purpose of manipulating the price of a security, cryptocurrency or other investment; </li>
              <li> • Contains information about issuer of securities, a cryptocurrency or other investment that is material and nonpublic, the disclosure of which is improper or unlawful; </li>
              <li> • Contains information that is false, inaccurate or misleading; </li>
              <li>  • Contains chain letters or pyramid schemes; </li>
              <li> • Contains material not consistent with the image and values of Tokuten </li>
            </ul>

            <p>  We reserve the right, but are not obligated, to reject and/or remove any Content that we believe, in our sole discretion, violates these provisions. We can investigate any suspected or alleged misuse, abuse, or unlawful use of Tokuten and cooperate with law enforcement agencies in such investigation. We can disclose any information or records in our possession or control about your use of Tokuten to law enforcement agencies in connection with any law enforcement investigation of any suspected or alleged illegal activity, or in response to a court order. </p>

            <p> You acknowledge that once your Content is posted on Tokuten, we cannot control and will not be responsible to you for the use which other Users or third parties make of such Content. You can delete your account at any time, but you acknowledge that deleting your account will not of itself prevent the circulation of any of your Content which may have been recorded by other Users in breach of the Terms of Use or by third parties prior to the deletion of your account. </p>

            <h2 className="mb-0 mt-3"> Intellectual Property </h2>

            <h2 className="mb-0 mt-3"> Definition of Intellectual Property Rights. </h2>
            <p>  For the purposes of this Agreement, “Intellectual Property Rights” means all patent rights, copyright rights, mask work rights, moral rights, rights of publicity, trademark, trade dress and service mark rights, goodwill, trade secret rights and other intellectual property rights as may now exist or hereafter come into existence, and all applications therefore and registrations, renewals and extensions thereof, under the laws of any state, country, territory or other jurisdiction. </p>

            <ul className="p-0">
              <li> a. YOU RETAIN OWNERSHIP OF YOUR CONTENT </li>
              <li> b. How we can use your content. You own all of the Content that you post or publish (“post”) on the Service. You permit us to use your company and/or trade name and logo on our website and other promotional materials </li>
              <li> c. <span className="bold_font">Your responsibility for your content.</span> By uploading, posting, submitting or otherwise disclosing or distributing Content, you represent and warrant that you own all rights in your Content and that any Content you post </li>
              <ul className="pl-4 mb-3">
                <li>  1. Does not and will not infringe, misappropriate or violate a third party’s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy/data protection or otherwise violates, or encourage any conduct that would violate, any applicable law, rule, statute, ordinance, court or agency decision or regulation (collectively, the ‘Laws’), </li>
                <li> 2. Would not give rise to civil liability, </li>
                <li> 3. Is not fraudulent, false, libellous, misleading or deceptive, </li>
                <li> 4. Is not defamatory, obscene, pornographic, sexual, vulgar or offensive links to an adult orientated, pornographic or otherwise sexually orientated service, </li>
                <li> 5. Does not and will not promote sexually explicit materials, illegal activities, violence, discrimination (based on race, sex, religion, nationality, disability, sexual orientation, age or otherwise), bigotry, racism, hatred, harassment or harm against any individual or group (on the basis of age, colour, national origin, race, religion, sex, sexual orientation, handicap or otherwise), or </li>
                <li>  6. Is not violent or threatening or promotes violence or actions that are threatening to any person or entity </li>
              </ul>
              <li>  d. We reserve the right, but are not obligated, to reject and/or remove any Content that we believe, in our sole discretion, violates these provisions. </li>
              <li> e. We take no responsibility and assume no liability for any Content that you or any other Users or third parties post or send over the Service. </li>
              <li> f. You understand and agree that any loss or damage of any kind that occurs as a result of the use of any Content that you send, upload, download, stream, post, transmit, display, or otherwise make available or access through your use of the Service, is solely your responsibility, and you agree that we are only acting as a passive conduit for your online distribution and publication of your Content. We are not responsible for any public display or misuse of your Content. </li>
            </ul>

            <p> You grant us the limited right to submit notifications of infringement (including of copyright or trademark) on your behalf to any third-party website or service that hosts or is otherwise dealing in infringing copies of your Content without your permission. Although we are not under any obligation to do so, we may at any time submit or withdraw any such notification to any third-party website or service where we consider it appropriate to do so. However, we do not and are under no obligation to police infringements of your Content. You agree that if we request, you will provide us with all consents and other information which we reasonably need to submit notifications of infringement on your behalf.
            </p>

            <p> Other than Content (which is owned by or licensed to User), all rights in and to Tokuten and its entire contents, features, databases, source code and functionality, are owned by us and/or our licensors. Such material is protected by copyright, and may be protected by trademark, trade secret, and other intellectual property laws. </p>



            <h2 className="mb-0 mt-3">  User Policy </h2>

            <h2 className="mb-0 mt-3">  Subscriptions and purchases by Users: </h2>
            <p>  All transactions facilitated by Tokuten are contracts between Users and Creators on the terms of the <span className="bold_font"> Standard Agreement between Creator and User </span>. Although we facilitate transactions between Users and Creators by providing the Tokuten platform, storing Content, and acting as a payment intermediary, we are not a party to the <span className="bold_font"> Standard Agreement between Creator and User </span> or any other contract which may exist between a User and Creator, and are not responsible for any transactions between Users and Creators. </p>

            <p> Creators are solely responsible for determining (within the parameters for pricing on Tokuten) the pricing applicable to transactions and the Content to which you may be given access.</p>

            <p>  You authorize us to supply your payment card details to a third-party payment provider for the purpose of processing your Payment. Your payment card provider may charge you currency conversion fees. We do not have control over currency exchange rates or charges imposed by your payment card provider or bank and we are not responsible for paying any charges or fees imposed by your payment card provider or bank. </p>

            <p>  The payment provider will take (i) monthly payments from your payment card for Payments which are Subscriptions; and (ii) immediate payments from your payment card for ad hoc Payments such as paying a tip to the Creator or unlocking premium Content. You authorize and consent to each of these payments being debited using your supplied payment card details.</p>

            <p>  All Subscriptions to a Creator's profile will automatically renew at the end of the monthly subscription period, except if your payment card was declined, the subscription price has increased, or you have turned off the "Auto-Renew" switch located on the relevant Creator's profile. This means that if you want to stop subscribing to a Creator's profile and paying continuing monthly subscription charges, you will need to turn off the "Auto-Renew" switch located on the relevant Creator's profile. If you cancel a Subscription you will continue to be permitted to view the relevant Creator's Content until the end of the subscription period in which you cancelled, after which no further payments will be taken from your payment card in respect of subscriptions to that Creator's profile, and you will no longer be able to view the relevant Creator's Content. </p>

            <p> What are the fees that we charge Creators for the use of Tokuten? We charge a fee to you of ten per cent (10%) of all Payments made to you (called Our Fee). The remaining ninety per cent (90%) of the Payment is payable to you (called "Creator Earnings"). Our Fee includes our costs of providing, maintaining and operating Tokuten and storing your Content. Our Fee is deducted from the Payment, and Creator Earnings are paid to you. </p>

            <p>  You will need on your User account page to select one of the available methods provided by Tokuten as to how your Creator Earnings will be transferred to you. You may also need to submit additional information depending on the country where you live. If you want to charge other Users a monthly subscription fee you will need to set your subscription price. </p>

            <h2 className="mb-0 mt-3">  Disputes between Users </h2> <p>  Because Tokuten does not and cannot be involved in dealings between Users, in the event you have a dispute with one or more Users, you will not involve Tokuten, and you release Tokuten (and our directors, officers, employees, representatives, agents, successors or assigns) from claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, suspected and unsuspected, disclosed and undisclosed, arising out of or in any way connected with such disputes. </p>

            <h2 className="mb-0 mt-3">Data Use Policy </h2>
            <p> We may include your name, your app or your web courses in our general listing of reference lists, press releases, success stories and other marketing materials. </p>

            <p> We are the sole and exclusive owners of any and all anonymised data relating to your use of Tokuten and such anonymised data can be used by us for any purpose, including for commercial, development and research purposes. </p>

            <h2 className="mb-0 mt-3"> INDEMNITY </h2>
            <p> You agree to indemnify and hold Tokuten, its subsidiaries and affiliates, and each of their members, managers, directors, officers, agents, contractors, partners and employees, harmless from and against any loss, liability, claim, demand, damages, costs and expenses, including reasonable attorney's fees, arising out of or in connection with your use of the Service, your use of any Third-Party Services that are made available by the Service, any Content you post or Content you share on or through the Service or otherwise, your conduct in connection with the Service or with other Users, or any violation of these Terms or of any law, rule, regulation or order, or the rights of any third party. This indemnity shall survive any termination or cessation of use by you of the Service. Without limiting the generality of the foregoing, you agree to indemnify and hold Tokuten and its licensors harmless for any improper or illegal use of your account, including the illegal or improper use of your account by someone to whom you have given permission to use your account. </p>

            <h2 className="mb-0 mt-3"> NO WARRANTY </h2>
            <p> The service, including all content, is provided on an “as is” and “as available” basis. Use of the service is at your own risk. The service is provided without warranties of any kind, either express or implied, including, without limitation, implied warranties of merchantability, fitness for a particular purpose or non-infringement. Without limiting the foregoing, we, our affiliates, and our licensors do not warrant that the content on the service is accurate, reliable or correct; that the service will meet your requirements; that the service will be available at any particular time or location, uninterrupted or secure; that any defects or errors will be corrected; or that the service is free of viruses or other harmful components. Any content downloaded or otherwise obtained through the use of the service is downloaded at your own risk and you will be solely responsible for any damage to your computer system or loss of data, including user content, that results from such download or your use of the service. </p>
            <p> We do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through our service or any hyperlinked website or service, or featured in any banner or other advertising, and we will not be a party to or in any way monitor any transaction between you and third-party providers of products or services. </p>

            <h2 className="mb-0 mt-3"> Limit of liability </h2>
            <p> Neither Tokuten nor any of its directors, officers, employees, representatives, agents, successors or assigns will be liable for any indirect, incidental, special or consequential damages (including but not limited to lost profits, trading losses and damages that result from inconvenience, delay or loss of the use of Tokuten) arising out of the use of Tokuten, the information contained on or available through Tokuten, even if Tokuten has been advised of the possible of such damages or losses. </p>

            <h2 className="mb-0 mt-3">Security </h2>
            <p> Tokuten reserves the right to view, monitor and record activity on Tokuten. Any information obtained is subject to review by law enforcement and regulatory organizations. Tokuten will also comply with all court orders involving requests for information. You agree to use Tokuten only for the purposes for which it is intended. </p>

            <h2 className="mb-0 mt-3"> Tax Compliance for Creators </h2>
            <p> We recommend that all Users seek professional advice to ensure you are compliant with your local Tax rules including any Federal and State taxes, VAT or Sales Tax that may become applicable based on your individual circumstances. By using Tokuten as a Creator, you warrant (which means you make a legally enforceable promise) that you have reported and will report in the future the receipt of all payments made to you in connection with your use of Tokuten to the relevant Tax authority in your jurisdiction, as required by law.
            </p>

            <p> By using Tokuten as a Creator you warrant (which means you make a legally enforceable promise) that you will at all times comply with all laws and regulations relating to Tax which apply to you. We reserve the right to close your Tokuten account if we are notified of or become aware of any Tax non-compliance by you.</p>

            <h2 className="mb-0 mt-3"> THIRD-PARTY LINKS, SITES AND SERVICES </h2>
            <p> The Service may contain links to other websites, advertisers, services, special offers, or other events or activities that are not owned or controlled by us. Because we have no control over such sites and resources, you acknowledge and agree that we are not responsible for the availability of such external sites or resources, and does not endorse and is not responsible or liable for any content, advertising, products or other materials on or available from such sites or resources. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such site or resource. You understand that these Terms of Use and our Privacy Policy below do not apply to your use of such sites. We encourage you to be aware of when you leave the Service, and to read the terms and conditions and privacy policy of any third-party website or service that you visit. </p>

            <h2 className="mb-0 mt-3"> MISCELLANEOUS TERMS </h2>
            <ul className="p-0">
              <li> • Entire Agreement. This Agreement and the Terms of Use sets forth the entire agreement and understanding of the Parties relating to the subject matter hereof and supersedes any and all prior oral and written agreements, understandings and quotations relating thereto. No waiver, amendment, alteration, modification, or cancellation of any of the provisions of this Agreement shall be binding unless made in writing and signed by the both parties. </li>
              <li> • Governing Law. This Agreement will be governed by, construed and enforced in accordance with the laws of Singapore without regard for the conflict of law rules of any jurisdiction. Each party irrevocably and unconditionally waives any right it may have to a trial by jury in respect of any legal action arising out of or relating to this Agreement or the transactions contemplated by this Agreement. </li>

              <li> • Severability. If any provision of this Agreement is invalid or unenforceable, such provision will be enforced only to the extent that it is not in violation of such law or is not otherwise unenforceable and all other provisions of this Agreement will remain in full force and effect.
              </li>

              <li>• Waiver. The failure of a party in any one or more instances to insist upon strict performance of any of the terms of this Agreement will not be construed as a waiver or relinquishment, to any extent, of the right to assert or rely upon any such terms on any future occasion.</li>

              <li> • Force Majeure. We will not be responsible for any non-performance or delay caused by acts of God, man-made or natural disasters, acts of terrorism, infectious disease, public utility interruptions, discontinuance of necessary products or unavailability of a service. </li>

              <li> • We do not promise that Tokuten is compatible with all devices and operating systems. You are responsible for configuring your information technology, device, and computer programs to access Tokuten. You should use your own virus protection software.</li>

              <li>• We are not responsible for the availability of the internet, or any errors in your connections, device or other equipment, or software that may occur in relation to your use of Tokuten.</li>

              <li> • While we try to make sure that Tokuten is secure and free from bugs and viruses, we cannot promise that it will be and have no control over the Content that is supplied by Creators.</li>

              <li> • We are not responsible for any lost, stolen, or compromised User accounts, passwords, email accounts, or any resulting unauthorized activities or resulting unauthorized payments or withdrawals of funds. </li>
              <li> • Notices. Any notice that is required or permitted hereunder shall be deemed given only if delivered personally or by registered or certified mail, return receipt requested and postage prepaid, or by a nationally recognized overnight delivery service at: </li>
            </ul>

            <p className="mb-4"> Tokuten Pte. Ltd. <br />
              68 Circular Road <br />
              #02-01 <br />
              Singapore (049422)
            </p>

          </Col>
        </Row>
      </Container>
    </div>
  )
}