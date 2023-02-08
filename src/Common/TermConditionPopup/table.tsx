import React from 'react'
import banner from './banner-receipt.png'
import visa from './visa.png'
function TableContainer() {
    const boldtext = {
        backgroundcolor: '#F6F9FC', margin: 0, fontfamily: 'Poppins' || 'sans-serif', padding: '70px'
    }
    const table = {
        width: "600px", border: "0", bgcolor: "white", cellpadding: "0", cellspacing: "0", style: "margin: 0 auto"
    }
    const table1 = {
        width: "100%", border: "0", cellpadding: "0", cellspacing: "0"
    }
    // const table2={
    //     colspan:"3" ,align:"center"
    // }
    const image = {
        width: "100%"
    }
    const styleTag = {
        width: "100%", border: "0", cellpadding: "0", cellspacing: "0", padding: '0 20px'
    }
    const pare = {
        fontweight: 400, margin: '0,0,10px', color: '#32325D', fontsize: '24px', lineheight: '32px'
    }
    const head = {
        color: '#8898AA', fontsize: '15px', lineheight: '18px', margin: 0
    }
    const par1 = {
        texttransform: 'uppercase', color: '#8898AA', fontsize: '12px', lineheight: '16px', whitespace: 'nowrap', fontweight: '600'
    }
    const styleTag1 = {
        width: "100%", border: "0", cellpadding: "0", cellspacing: "0", margin: '25px 0', padding: '0 20px'
    }
    const par2 = {
        color: '#000000', fontsize: '15px', lineheight: '16px', whitespace: 'nowrap', fontweight: '400', margin: 0
    }
    const par3 = {
        color: '#000000', fontsize: '15px', lineheight: '16px', whitespace: 'nowrap', fontweight: '400', margin: '0', display: 'flex', alignitems: 'center'
    }
    const image1 = {
        width: "40", marginright: '5px'
    }
    const tablediv = {
        width: "100%", border: "0", cellpadding: "0", cellspacing: "0", margin: 0, padding: '0 20px'
    }
    // const tablec={
    //     colspan:"3"
    // }
    const tableb = {
        texttransform: 'uppercase', color: '#8898AA', fontsize: '12px', lineheight: '16px', whitespace: 'nowrap', fontweight: '600', margin: '0'
    }
    const tabled = {
        texttransform: 'uppercase', color: '#525F7F', fontsize: '16px', lineheight: '16px', whitespace: 'nowrap', fontweight: '400', margin: '0'
    }
    const pargraph = {
        width: "100%", border: "0", bgcolor: "#F6F9FC", cellpadding: "15", cellspacing: "0", margin: '20px 0 40px', padding: '0 20px'
    }
    const styleL = {
        colspan: "2", align: "left"
    }
    // const styleR={
    //     colspan:"1" ,align:"right"
    // }
    const par5 = {
        texttransform: 'uppercase', color: '#525F7F', fontsize: '16px', lineheight: '16px', whitespace: 'nowrap', fontweight: '600', margin: '0'
    }
    // const par6={
    //     colspan:"3"
    // }
    const par7 = {
        width: "100%", border: "0", cellpadding: "0", cellspacing: "0", margin: '40px 0 20px', padding: '0 20px'
    }
    const par8 = {
        display: 'block', borderbottom: '1px solid #E6EBF1'
    }
    const anch = {
        color: '#333333', fontsize: '16px', lineheight: '16px', whitespace: 'nowrap', fontweight: '600', margin: 0
    }
    const anch1 = {
        textDecoration: 'none', fontWeight: '700'
    }
    const span1 = {
        color: '#8898AA', fontsize: '12px', lineheight: '16px', display: 'inline-block', padding: '0 25px'
    }
    return (
        <div style={boldtext}>
            <table style={table}>
                <tr>
                    <td>
                        <table style={table1} >
                            <tr>
                                <td colSpan={3} align={'center'}>
                                    <img style={image} src={banner} alt="" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style={styleTag}>
                            <tr>
                                <td colSpan={3} align={'center'}>
                                    <h1 style={pare} >Receipt from NAPS</h1>
                                    <p style={head} ><span>Receipt</span> <span>#0000-0000</span></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style={styleTag1}>
                            <tr>
                                <td>
                                    <p style={par1} >Amount Paid</p>
                                    <p style={par2}>$19.99</p>
                                </td>
                                <td>
                                    <p style={par1}>Date Paid</p>
                                    <p style={par2} >Nov 15, 2022, 9:14:21 AM   </p>
                                </td>
                                <td>
                                    <p style={par1}>Payment Method</p>
                                    <p style={par3} ><span><img style={image1} src={visa} alt="visa" /></span>- 4242<span></span></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style={tablediv} >
                            <tr>
                                <td colSpan={3} >
                                    <p style={tableb}>SUMMARY</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style={pargraph} >
                            <tr>
                                <td colSpan={1} align={'left'} >
                                    <span style={tabled}>Charge Description</span>
                                </td>
                                <td colSpan={1} align={'right'}  >
                                    <span style={tabled}>$19.99</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={1} align={'left'}>
                                    <span style={par5}>Charge Description</span>
                                </td>
                                <td colSpan={1} align={'right'} >
                                    <span style={tabled}>$19.99</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <span style={par8} ></span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style={par7} >
                            <tr>
                                <td colSpan={3} >
                                    <p> <a style={anch}>If you have any questions, contact us at </a><a href="mailto:hello@nurturebynaps.com" style={anch1}>hello@nurturebynaps.com</a> or call at <a href="tel:+1 857-496-5095" style={anch1}> +1 857-496-5095</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} >
                        <span style={par8}></span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table style={par7}>
                            <tr>
                                <td colSpan={3}>
                                    <span style={span1} >You're receiving this email because you made a purchase at NAPS, which partners with Stripe to provide invoicing and payment processing.</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    )
}
export default TableContainer