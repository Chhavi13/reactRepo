import React from 'react'
import { OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap'
import AskIcon from "../../Assets/img/asknurse/Q.svg";

const OverLayWrapper = (props: any) => {
    let { children, ...rest } = props
    return (
        <div {...rest}>

            {children}

        </div>
    )
}

export default OverLayWrapper