import {defComponent} from "../utils";
import "./TxtCharsFadeIn.css"
import React from "react";

/**
 * Extends the Span Element
 *
 * This components fade in text by fading in each character at a time.
 *
 * To change color of text, attach a class or id to this component and change the css property '--color'.
 *
 * To change animation duration, change the css property for that.
 */
export const TxtCharsFadeIn = defComponent<React.HTMLProps<HTMLSpanElement>>((props, context) => {

    return <span  {...props} className={"txtchars_fadein "+props.className}>
        {props.children}
    </span>
})
