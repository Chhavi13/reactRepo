import React from 'react'
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./termConditionModel.scss";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function TermConditionModel({ open, setOpen, scroll, setScroll }: any) {
    // const [open, setOpen] = React.useState(false);
    // const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    return (
        <div>
            {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
            <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                id="term-condition"
            >
                <DialogTitle id="scroll-dialog-title">TERMS AND CONDITIONS
                    <IconButton sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}>
                        <CloseIcon onClick={handleClose} />

                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                    
                       {/* <br /><br /> 
                       <h1> .</h1> */}
                        This Client Services Agreement (“Agreement”), is made by and between <strong>Boston NAPS, LLC, </strong> a Massachusetts Limited Liability Company, (the “Company,” or “Boston NAPS” or “NAPS”), and the “Client.”<br /><br />
                        The Company and the Client shall be referred to as the “Parties.” This Agreement shall include any child/children of the Client. <br /><br />
                        <span className='strong'>SCOPE OF THE TERM “CLIENT” </span>For the purposes of this Agreement, the term “Client” refers to the individual(s) seeking the services of NAPS and/or any children that the Company and Client expressly agree to include as part of this Agreement and the services that NAPS provides. These individuals and children are listed by name on your registration form. The term “Client” does not include other children in the same household, family, or otherwise, and NAPS is not expected to provide (nor will it provide) services to children and individuals other than those expressly named in and agreed upon by this document. Should the Client wish to expand the scope of care and add on additional children or other individuals, the Client and Company shall amend this Agreement to include the additional children and/or individuals. Company reserves the right to modify the cost of services in accordance with any change in services and/or addition of individuals. <br /> <br />
                        <span className='strong'>SCOPE OF SERVICES. </span>Boston NAPS, LLC provides comprehensive prenatal and postpartum services to families and individuals, including, but not limited to, consulting, education, and lactation services and in home nursing care to postpartum families and their newborns. In home services provided by Boston NAPS include, but are not limited to, pre-natal education, lactation consulting, newborn consulting, sleep consulting and training, bottle consulting and training, and such other services as may be required by the Client. NAPS also conducts pre-natal and postpartum educational classes and workshops at various locations throughout Massachusetts and online. This Agreement will outline the terms that govern the Companyʼs services and the Clientʼs responsibilities. <br /><br />
                        <span className='strong'>OBLIGATIONS OF THE COMPANY. </span> All consultation, educational, lactation, and services are provided by NAPS employees who are Registered Nurses (“Nurse”), Nurse Practitioners, other licensed Medical and Para-Medical Professionals, and unlicensed assistants as appropriate for the particular services requested by the Client. The Company acknowledges that privacy and discretion are of utmost importance to the Client. The Company and its employees shall maintain the Clientʼs confidentiality as required by federal and state law. The Company will provide only such information to those third parties as disclosed in the statement of Clientʼs privacy rights and HIPAA disclosures, provided to the Client in a separate disclosure. <br /><br />
                        <span className='strong'>In Home Services and Private Classes:</span> All in home consultation and educational services shall be agreed upon, scheduled and paid for in full no later than 24 hours in advance of such services. <br /><br />
                        <span className='strong'>Virtual Classes and Workshops: </span>All outside classes and workshops must be scheduled and paid for in full no later than 24 hours before the class or workshop. To reschedule a class, please provide 24 hoursʼ notice from the current class you are enrolled in and your payment will be transferred towards the class in which you re-enroll. The only exception is Pre Baby Bootcamp which requires at least fourteen (14) days' notice prior to the scheduled time of service to avoid a charge for that service. If the Client fails to provide 14 days' notice prior to cancellation, Client shall pay the Company for that day’s service since this time was specifically scheduled and held for the Client. No refund will be provided for a cancellation made less than 14 days in advance, or in case of a no-show. In the event that you deliver prior to your class date, a refund will be issued with a doctor’s note. If a cancellation is made less than 14 days in advance, the payment may be used as a credit towards other services offered by Boston NAPS. The Client shall not dispute the charges billed pursuant to the mutually agreed upon schedule. <br /><br />
                        <span className='strong'>Payment For Services. </span> Company services are private pay only.NAPS does not bill third party payers. It is Clientʼs responsibility to seek and ensure Client will be reimbursed for services. The Company requires payment in full no later than 24 hours prior to commencement of services or of a class/workshop. If the initial consultation fee is not paid by the due date, the services shall not be provided. <br /><br />
                        All payment for outside classes and workshops, consultations, and educational sessions or courses shall be made via Stripe or Quickbooks. By submitting payment, you secure your seat in the class or workshop, or the appointment slot designated for you. <br /><br />
                        <span className='strong'>Cancellation Policy: </span>Client must notify Boston NAPS of a service cancellation at least twenty four (24) hours prior to the scheduled time of service to avoid a charge for that service. If the Client fails to provide 24 hoursʼ notice prior to cancellation, Client shall pay the Company for that dayʼs service since this time was specifically scheduled and held for the Client. No refund will be provided for a cancellation made less than 24 hours in advance, or in case of a no show. In the event that you deliver prior to your class date, a refund will be issued with a doctorʼs note. If a cancellation is made less than 24 hours in advance, the non-refundable payment may be used as a credit towards other services offered by NAPS. The Client shall not dispute the charges billed pursuant to the mutually agreed upon schedule. <br /><br />
                        The only exception is Pre Baby Bootcamp which requires at least fourteen (14) days' notice prior to the scheduled time of service to avoid a charge for that service. If the Client fails to provide 14 days' notice prior to cancellation, Client shall pay the Company for that day’s service since this time was specifically scheduled and held for the Client. No refund will be provided for a cancellation made less than 14 days in advance, or in case of a no-show. In the event that you deliver prior to your class date, a refund will be issued with a doctor’s note. If a cancellation is made less than 14 days in advance, the payment may be used as a credit towards other services offered by Boston NAPS. The Client shall not dispute the charges billed pursuant to the mutually agreed upon schedule. <br /><br />
                        <span className='strong'>Inclement Weather or Instructor Illness:</span> NAPS will contact all parties registered for a class or service if the class or service has been canceled due to inclement weather or employee illness. In the event of a canceled class, NAPS will offer another date for the same missed class or service. <br /><br />
                        <span className='strong'>Additional Policies and Information:</span> We highly recommend you schedule your prenatal class or workshop prior to 36 weeks gestation to avoid missing your program due to delivery. NAPS is not responsible for any parking fees incurred during a class or workshop. Information provided in all classes taught by Boston NAPS, LLC is offered for educational purposes only and should not be construed as medical advice. Such information is not intended to be complete, nor to replace the proper and thorough medical advice of your own physician or health care provider. Attendees of group classes and private classes disclaim any and all liability for any injury or other damages which may be directly associated with the communication or review of information contained in our classes/workshops/programs. <br /><br />
                        <span className='strong'>DISCLOSURE.</span> The Company is not affiliated in any way with the Clientʼs physician, obstetrician/gynecologist, surgeon or any other health care providers or staff affiliated with such individuals. The Company is also not affiliated in any way with any third party service provider that may provide services that are arranged by the Company. The Company does not make legal or medical decisions for the Client and shall not be liable for any consequences occurring as a result of the legal or medical decisions made by the Client, the Clientʼs legal representative or physician. Client hereby waives all claims against Boston NAPS, LLC for any damages or consequences of said legal or medical decisions. <br /><br />
                        <span className='strong'>LIMITATION OF SERVICES.</span> Company will make every good faith effort to provide the requested services to Client according to the agreed upon terms. The Client agrees to provide accurate and complete information to NAPS and the employees of NAPS to ensure that appropriate services are provided. Agreement to a schedule shall not constitute a guarantee of service, and the Company reserves the right to cancel or suspend services with or without notice. Although Company will make every effort to provide services, in the rare instance that Company is unable to provide scheduled services (whether this is due to employee cancellation, illness, holiday, extreme weather, exigent circumstances or an unanticipated and/or last-minute request for nursing services), Company shall not be held liable for failure to provide services, and Client releases Company of any potential liability hereunder. <br /><br />
                        <span className='strong'>STATEMENT OF PATIENT PRIVACY RIGHTS.</span> Company will collect health information to ensure Client receives quality health care advice. Client has the right to have personal health care information kept confidential, and Boston NAPS, LLC will keep personal health care information confidential. This means that only those who are legally authorized to know, or who have a medical need to know, will see Clientʼs personal information. All other information for the purpose of improving the care NAPSʼ provides will be disclosed anonymously. Client has the right to refuse to answer questions, and does not have to answer every question to obtain services. Client has the right to review Clientʼs personal health information. Company knows how important it is to collect and maintain correct health information, and Client reserves the right to ask Company to modify Clientʼs health records, should Client notice a mistake or discrepancy in the health records. <br /><br />
                        <span className='strong'>RELEASE OF INFORMATION.</span> Client hereby consents to and authorizes NAPS to disclose and release information contained in Clientʼs clinical record to the health care providers involved in Clientʼs care. At times, information may be released for the purpose of utilization review, professional standards review organizations, regulatory review entities and any other organizations that may/will assist Client to meet Clientʼs home care needs. However, release of information to these organizations will remain anonymous. <br /><br />
                        <span className='strong'>LIMITATION OF LIABILITY. </span> Under no circumstances shall the Company be liable or responsible for any services provided by third parties. The Client shall indemnify, defend, and hold harmless the Company and its successors, officers, members, agents, independent contractors and employees from any and all actions, causes of action, claims, demands, cost liabilities, expenses and damages (including attorneys fees) arising out of, or in connection with, any services provided by any third- party service provider that provides services that are arranged by the Company pursuant to the provided services or in any way connected with the services rendered under the terms of this Agreement. The Company shall not be liable for any consequences occurring as a result of the legal or medical decisions made by the Client, the Clientʼs legal representative or physician. The Client hereby waives all claims against the Company, its members, agents, independent contractors and employees for any damages or consequences of said medical or legal decisions. In the event Client elects home care by a third party referred to the Client by the Company rather than care at a medical facility or surgical center that is contrary to the medical advice of the Clientʼs treating physician, the Company shall not be liable for any damages or the consequences of this decision. <br /><br />
                        <span className='strong'>GOVERNING LAW; ENFORCEMENT COSTS.</span> This Agreement will be construed in accord with, and any dispute arising from any breach or asserted breach of this Agreement will be governed by, the laws of the Commonwealth of Massachusetts. Neither party to this Agreement shall institute a proceeding in any court or administrative agency to resolve a dispute between the parties before that party has sought to resolve the dispute through negotiations with the other party. If a dispute is not resolved within three (3) weeks after a demand for direct negotiation, the parties shall attempt to resolve the dispute through mediation. If the parties do not promptly agree on a mediator, either party may request the appointment of a qualified mediator. If the Company is forced to take legal action to enforce this Agreement or institute collection efforts for any amounts due under this Agreement, all fees and costs, including but not limited to, collection fees, attorneyʼs fees, travel expenses, court costs and any post-judgment collection fees, shall be the sole responsibility of the Client. <br /><br />
                        <span className='strong'>INTEGRATION.</span> This Agreement may be executed in two (2) or more counterparts each of which shall be deemed an original, but all of such taken together shall constitute only one Agreement, superseding all prior understandings, oral or written; and it is expressly understood and that this Agreement does not obligate either party to enter into any other or further agreements. A facsimile signature shall be deemed legally binding. <br />br

                        <span className='strong'>NO THIRD-PARTY BENEFICIARIES.</span> Nothing in this Agreement will be construed to give any rights or benefits in this Agreement to anyone other than the Company and the Client. All duties and responsibilities undertaken pursuant to this Agreement will be for the sole and exclusive benefit of the Company and the Client, and not for the benefit of any other party. <br /><br />
                        <span className='strong'>ENTIRE AGREEMENT.</span> This Agreement and any writing incorporated by reference herein constitute the partiesʼ entire agreement. here are no restrictions, promises, representations, warranties, covenants or understandings other than those expressly set forth herein. This Agreement supersedes all prior agreements between the parties and may be modified or amended only by a writing signed by both parties. <br /><br />
                        <span className='strong'>AMENDMENT.</span> This Agreement may be amended only by a writing signed by the Client and by a duly authorized representative of the Company. <br /><br />
                        <span className='strong'>SEVERABILITY.</span> The invalidity or unenforceability of any provision hereof (as determined by a court or arbitrator of competent jurisdiction) shall in no way affect the validity or enforceability of the remainder of this Agreement or any other provision hereof. <br /><br />
                        <span className='strong'>MODIFICATION AND WAIVER.</span> No oral modifications shall be effective, and no delay or failure on the part of either party to insist on compliance with any provision hereof shall constitute a waiver of such partyʼs right to enforce such provision. All waivers must be in writing by a duly authorized representative of the party. <br /><br />
                        <span className='strong'>CONSTRUCTION.</span> The headings and captions of this Agreement are provided for convenience only and are intended to have no effect in construing or interpreting this Agreement. The language in all parts of this Agreement shall be in all cases construed according to its fair meaning and not strictly for or against either party. All pronouns and words denoting gender shall be construed so as to refer to the masculine, feminine, neuter, or singular form thereof as the identity of the persons, entities and situation may require. <br /><br />
                        <span className='strong'>TERM. </span> This Agreement shall commence on the date hereof and shall terminate One (1) year after the birth of the child named in this Agreement herein, or upon the end of the third successive month of no services being booked by the Client, whichever occurs first (the “term”). <br /><br />
                        <span className='strong'>NOTICES.</span> All notices and other communications hereunder will be in writing or by written telecommunication, and will be deemed to have been duly given if delivered personally or if mailed by certified mail, return receipt requested or by written telecommunication to the relevant address of the party, or to such address as the recipient of such notice or communication will have specified to the other party hereto in accordance with this section. <br /><br />

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Disagree</Button> */}
                    <button className='primary-blue-btn w-50 mx-auto' onClick={handleClose}>I Agree</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TermConditionModel
