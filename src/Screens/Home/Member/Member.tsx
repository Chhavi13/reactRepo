import React from 'react'
import { Container, Image, Row} from 'react-bootstrap';
import "./Member.scss";
import spoiler_icon from "../../../Assets/img/homepage/spoiler-alert.svg";
import service1_icon from "../../../Assets/img/homepage/service-1.png";
import service2_icon from "../../../Assets/img/homepage/service-2.png";
import service3_icon from "../../../Assets/img/homepage/service-3.png";
import service4_icon from "../../../Assets/img/homepage/service-4.png";
import service5_icon from "../../../Assets/img/homepage/service-5.png";
import service6_icon from "../../../Assets/img/homepage/service-6.png";
import pb_bootcamp from "../../../Assets/img/homepage/offer-1.png";
import survival_group from "../../../Assets/img/homepage/offer-2.png";
import consultation from "../../../Assets/img/homepage/offer-3.png";
import expert_icon from "../../../Assets/img/homepage/seen.png";
import unswaddled_icon from "../../../Assets/img/homepage/unswaddled.png";
import blog_thum1 from "../../../Assets/img/homepage/blog-1.png";
import blog_thum2 from "../../../Assets/img/homepage/blog-2.png";
import blog_thum3 from "../../../Assets/img/homepage/blog-3.png";
import logo1_icon from "../../../Assets/img/homepage/logo-1.png";
import logo2_icon from "../../../Assets/img/homepage/logo-2.png";
import logo3_icon from "../../../Assets/img/homepage/logo-3.png";
import logo4_icon from "../../../Assets/img/homepage/logo-4.png";
import logo5_icon from "../../../Assets/img/homepage/logo-5.png";
import logo6_icon from "../../../Assets/img/homepage/logo-6.png";
import logo7_icon from "../../../Assets/img/homepage/logo-7.png";
import logo8_icon from "../../../Assets/img/homepage/logo-8.png";
import logo9_icon from "../../../Assets/img/homepage/logo-9.png";
import logo10_icon from "../../../Assets/img/homepage/logo-10.png";

const Member = () => {
  return (
    <div className='page-inner-section'>
       <section className="banner mob-banner d-flex align-items-center m-3">
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="banner-content-box py-5 py-md-0 pe-0 pe-md-5">
                        <h1 className="text-white text-left fs-1">Newborn & Parenting Support</h1>
                        <p className="cursive pink fs-1 lh-1 my-4 ">that’s actually supportive</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="py-4 py-md-3 header-text">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-2">
                    <div className="spoiler pt-2 pb-1 position-relative d-flex align-items-center">
                        <img src={spoiler_icon} className="w-25 d-md-inline-block d-none" alt="" />
                        
                        <div className="alert-box w-75">
                            <p className="fw-bold text-uppercase green lh-1">Spoiler Alert</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="perfect-parent">
                        <p className="fs-4 lh-sm">The perfect parent <span className="fw-bold d-md-inline-block d-block">doesn’t exist.</span></p>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="parents-content">
                        <p>As registered nurses and parents ourselves, we would’ve seen one by now. Instead, we believe in confident parents. Ones who make decisions that are right for themselves and their growing family. And we’re here to support you in finding that confidence in the chaos that is parenting.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="services py-3 py-md-5 section-bg">
        <div className="container border-bottom">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-header text-center">
                        <h2 className="mx-auto blue-text lh-1">Services for<span className="fw-bold d-block"> every situation</span></h2>
                        <p className="mx-auto my-4 w-45">We’re here for you from pregnancy to birth to toddlerhood—nap time, feeding time, any time. Choose your stage to learn about services designed for your needs.</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-center py-5">
                        <div className="service-block text-center px-3">
                            <img src={service1_icon} alt="" width="100%" />
                            <p className="py-4">Pregnancy</p>
                        </div>

                        <div className="service-block text-center px-3">
                            <img src={service2_icon} alt="" width="100%" />
                            <p className="py-4">Pregnancy</p>
                        </div>

                        <div className="service-block text-center px-3">
                            <img src={service3_icon} alt="" width="100%" />
                            <p className="py-4">Pregnancy</p>
                        </div>

                        <div className="service-block text-center px-3">
                            <img src={service4_icon} alt="" width="100%" />
                            <p className="py-4">Pregnancy</p>
                        </div>

                        <div className="service-block text-center px-3">
                            <img src={service5_icon} alt="" width="100%" />
                            <p className="py-4">Pregnancy</p>
                        </div>

                        <div className="service-block text-center px-3">
                            <img src={service6_icon} alt="" width="100%" />
                            <p className="py-4">Pregnancy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="offerings py-3 py-md-5 section-bg">
        <div className="container border-bottom">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-header text-center mb-5">
                        <h2 className="mx-auto blue-text lh-1">Our<span className="fw-bold pink"> Offerings</span></h2>
                    </div>
                </div>
            </div>

            <div className="row my-5 my-lg-5 py-5 py-lg-5 col-reverse position-relative justify-content-center pre-baby">
                <div className='col-md-10'>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className="offering-block-content pe-0 pe-lg-5">
                                <h3 className="lh-1 mb-0 w-75 d-flex align-items-end">
                                <span className="d-md-inline-block d-block">
                                    <span className="number pink">1.</span>
                                    <span className="content">Pre-Baby Bootcamp</span>
                                </span>
                                    <span className="cursive pink">Bestseller!</span>
                                </h3>
                                <p className="pb-3">It’s your one-stop-shop for everything you’ll want to know before the big day (or night). In just one weekend, learn all the essentials plus everything we wish traditional hospital classNamees taught. All delivered in a non-terrifying way by registered nurses with lots of opportunities for questions.</p>
                                <a href="#" className="btn d-inline-block py-2 px-4 btn-radius btn-bg-pink text-white text-decoration-none">Learn More</a>
                            </div>
                        </div>
                        <div className="col-md-6 section-img-container">
                            <div className="offering-block-content mb-5 ">
                                <img src={pb_bootcamp} alt="Pre Baby Bootcamp" className='img-responsive' />
                                {/* <img src="images/offer-1.png" width="100%" alt="" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3 my-lg-5 py-3 py-lg-5 position-relative justify-content-center moms-survival-grp">
                <div className='col-lg-10 col-md-10'>
                    <div className='row'>
                        <div className="col-md-6 section-img-container">
                            <div className="offering-block-content mb-5">
                                <img src={survival_group} alt="Servival Group" className='img-responsive' />
                                {/* <img src="images/offer-2.png" width="100%" alt="" /> */}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="offering-block-content ps-0">
                                <h3 className="lh-1 mb-0 w-75">
                                    <span className="d-md-inline-block d-block">
                                        <span className="number orange">2. </span>
                                        <span className="content">New Moms Survival Group</span><sup>TM</sup>
                                    </span>
                                </h3>
                                <p className=" ">It’s your one-stop-shop for everything you’ll want to know before the big day (or night). In just one weekend, learn all the essentials plus everything we wish traditional hospital classNamees taught. All delivered in a non-terrifying way by registered nurses with lots of opportunities for questions.</p>
                                <a href="#" className="btn d-inline-block py-2 px-4 btn-radius btn-bg-orange text-white text-decoration-none">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>

            <div className="row my-3 my-lg-5 py-3 col-reverse position-relative justify-content-center consultations">
                <div className='col-lg-10 col-md-10'>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className="offering-block-content pe-0 pe-lg-5">
                                <h3 className="lh-1 mb-0 consultations w-75">
                                    <span className="d-md-inline-block d-block">
                                        <span className="number green">3. </span>
                                        <span className="content">1:1 Consultations</span>
                                    </span>
                                </h3>
                                <p className=" ">It’s your one-stop-shop for everything you’ll want to know before the big day (or night). In just one weekend, learn all the essentials plus everything we wish traditional hospital classNamees taught. All delivered in a non-terrifying way by registered nurses with lots of opportunities for questions.</p>
                                <a href="#" className="btn d-inline-block py-2 px-4 btn-radius btn-bg-green text-white text-decoration-none">Learn More</a>
                            </div>
                        </div>
                        <div className="col-md-6 section-img-container">
                            <div className="offering-block-content mb-5">
                                <img src={consultation} className='img-responsive' alt="consultation" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </section>

    <section className="we-seen section-bg py-5 py-md-0">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-header text-center mb-5">
                        <h2 className="mx-auto blue-text lh-1 font-80">We’ve<span className="fw-bold position-relative"> seen it all!</span></h2>
                        <p className="cursive lavender font-80">except true support</p>
                    </div>
                </div>
            </div>

            <div className="row mb-4 mb-md-0">
                <div className="offset-md-2 col-md-8">
                    <img src={expert_icon} className='img-responsive' alt="" />
                   {/* < <img src="images/seen.png" width="100%" alt="" />> */}
                </div>
            </div>

            <div className="row py-3 py-md-5">
                <div className="offset-md-1 col-md-10 text-center">
                    <p className="content lh-sm blue-text text-center">With more than a decade as <span className="fw-bold">labor and delivery nurses,</span> we’ve worked with thousands of new parents. And we got really f!cking tired of a system that feeds off parental doubt and “expert” advice.</p>
                    <p className="content lh-sm blue-text text-center">So we founded <span className="fw-bold">NAPS™</span> to empower parents to trust their gut. Whether you’re listening to Unswaddled, taking a className, reading a post, or working with one of our nurses directly, we promise unfiltered, judgment-free support<span className="fw-bold">—however that looks to you.</span></p>
                    <a href="#" className="primary-blue-small-btn">More about us</a>
                    <img src="images/nurture.png" width="100%" alt="" />
                </div>
            </div>
        </div>
    </section>

    <section className='become-a-member'>
        <Container>
            <Row>
            <div className='col-lg-12 col-md-12'>
                <div className='become-member my-4'>
                <div className='container'>
                    <div className='col-lg-12 col-md-12'>
                    <div className='become-member-container p-5'>
                        <div className='row'>
                        <div className='col-lg-5'>
                            <div className='become-meber-captions'>
                            <h3>Become a Member
                                <span className="strong">for total access</span>
                            </h3>
                            <div className='price-dtls'>
                                <p>from <span className='pvalue strong'>$76.50</span> /mo</p>
                            </div>
                            <div>
                                <p>This is your all-access pass to our courses, videos, live webinars, Ask A Nurse, and more. </p>
                            </div>
                            <div>
                                <button className='secondary-teal-btn-small mt-4'>Read More</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </Row>
        </Container>
    </section>

    <section className="unswaddled position-relative py-3 py-md-5 section-bg">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="unswaddled-img text-end">
                        <img src={unswaddled_icon} className='img-responsive'/>
                        
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="unswaddled-content px-0 px-lg-5 py-5 py-md-0">
                        <h2 className="blue-text w-75 lh-1"><span className="fw-bold">Unswaddled:</span> The podcast</h2>
                        <p className="cursive pink">uncensored & unscripted</p>
                        <p> Get even more up-close-and-personal with weekly hot takes from real moms, real nurses, and real NAPS co-founders, Emily and Jamie. Plus guests, answers to questions submitted by listeners, and the more-than-occasional f-bomb.</p>
                        <a href="#" className="btn d-block d-lg-inline-block py-2 px-4 my-4 text-white btn-radius btn-bg-pink pink text-decoration-none">Ask a Question</a>
                        <a href="#" className="btn d-block d-lg-inline-block py-2 px-4 my-4 pink pink-border btn-radius pink text-decoration-none">Subscribe to Podcast</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="blog section-bg py-3 py-md-5">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-header text-center mb-5">
                        <h2 className="mx-auto blue-text lh-1">Our<span className="fw-bold"> Blog</span></h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="blog-box border-bottom mx-0 mx-md-4 pb-4 mb-4">
                        <div className="blog-img mb-3">
                            <img src={blog_thum1} className="img-responsive" alt="" />
                        </div>
                        <div className="blog-content">
                            <small className="dark-grey mb-3 d-inline-block">2 Days Ago</small>
                            <h4 className="blue-text">We’re happy to announce a new course:</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus arcu non eros porttitor, in malesuada lorem ullamcorper.</p>
                            <a href="#" className="btn d-inline-block blue-text fw-bold text-decoration-underline py-2 px-0">Read More</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="blog-box border-bottom mx-0 mx-md-4 pb-4 mb-4">
                        <div className="blog-img mb-3">
                            <img src={blog_thum2} className="img-responsive" alt="" />
                        </div>
                        <div className="blog-content">
                            <small className="dark-grey mb-3 d-inline-block">2 Days Ago</small>
                            <h4 className="blue-text">We’re happy to announce a new course:</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus arcu non eros porttitor, in malesuada lorem ullamcorper.</p>
                            <a href="#" className="btn d-block d-md-inline-block blue-text fw-bold text-decoration-underline py-2 px-0">Read More</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="blog-box border-bottom mx-0 mx-md-4 pb-4 mb-4">
                        <div className="blog-img mb-3">
                            <img src={blog_thum3} className="img-responsive" alt="" />
                        </div>
                        <div className="blog-content">
                            <small className="dark-grey mb-3 d-inline-block">2 Days Ago</small>
                            <h4 className="blue-text">We’re happy to announce a new course:</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum faucibus arcu non eros porttitor, in malesuada lorem ullamcorper.</p>
                            <a href="#" className="btn d-block d-md-inline-block blue-text fw-bold text-decoration-underline py-2 px-0">Read More</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="container">
                    <div className="col-md-12 text-center">
                        <a href="#" className="primary-blue-small-btn">View All</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="corporate mx-3 d-flex align-items-end py-3 py-md-5">
        <div className="container">
            <div className="row">
                <div className="offset-md-2 col-md-8">
                    <div className="corporate-program rounded p-3 p-md-5 text-center blue-bg">
                        <h2 className="text-white"><span>Corporate</span> Programs</h2>
                        <p className="text-white lh-sm py-3">XX% of new parents don’t feel supported in the workplace. Show your employees their job at home is just as important as their job in your organization with benefits like a Nurture By Naps membership or individual services.</p>
                        <a href="#" className="btn d-block d-md-inline-block py-2 px-4 btn-radius btn-bg-green text-white text-decoration-none">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="sponser position-relative py-3 py-md-5">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-header text-center mb-5">
                        <h2 className="mx-auto blue-text lh-1 mb-4">Sponsorships &<span className="fw-bold"> Collabs</span></h2>
                        <p className="w-50 mx-auto dark-grey">For Unswaddled sponsorship information and business collaboration requests, please reach out.</p>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12">
                    <div className="d-flex align-items-center justify-content-center flex-wrap">
                        <div className="logo-items mb-4">
                            <img src={logo1_icon} className='img-responsive'/>
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo2_icon} className='img-responsive'/>
                            {/* <img src="images/logo-2.png" width="75%" alt="" /> */}
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo3_icon} className='img-responsive'/>
                            {/* <img src="images/logo-3.png" width="75%" alt="" /> */}
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo4_icon} className='img-responsive'/>
                            {/* <img src="images/logo-4.png" width="75%" alt="" /> */}
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo5_icon} className='img-responsive'/>
                            {/* <img src="images/logo-9.png" width="75%" alt="" /> */}
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo6_icon} className='img-responsive'/>
                            {/* <img src="images/logo-5.png" width="75%" alt="" /> */}
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo7_icon} className='img-responsive'/>
                            {/* <img src="images/logo-7.png" width="75%" alt="" /> */}
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo8_icon} className='img-responsive'/>
                            {/* <img src="images/logo-8.png" width="75%" alt="" /> */}
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo9_icon} className='img-responsive'/>
                            {/* <img src="images/logo-8.png" width="75%" alt="" /> */}
                        </div>
                        <div className="logo-items mb-5">
                            <img src={logo10_icon} className='img-responsive'/>
                            {/* <img src="images/logo-10.png" width="75%" alt="" /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <a href="#" className="primary-blue-small-btn">Contact</a>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Member