import React from 'react'
import blackarrow from "../../assets/images/mobileimages/blackarrow.svg";
import './header.css';
interface IProps {
    title?: string | boolean;
    back?: boolean;
    next?: any;
    enablenext?: any;
    enableback?: any;
    subtitle?: any;
}
export const Header: React.FC<IProps> = ({ title, back, next, enableback, enablenext, subtitle }: IProps) => {
    return (
        <div className="mobile_container dash_tabs header">
            <div className="sabrinamainscroll create_page list_page_head">
                {
                    back &&
                    <img
                        src={back ? blackarrow : ""}
                        className="cursor-pointer pr-3 list_preview_back"
                        onClick={enableback}
                        alt="back"
                    />
                }
                <h1 className="pt-3 text-center">
                    {title}
                    {
                        subtitle &&
                        <p className="subtitle"> {subtitle} </p>
                    }
                </h1>
                <button
                    className="next_text btn text-primary"
                    onClick={enablenext}
                >
                    {next}
                </button>
            </div>
        </div>
    )
}