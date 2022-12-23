import {defComponent, useOnScreen} from "../utils";
import "./TxtCharsFadeIn.css"
import React, {useRef} from "react";


export interface PropsTxtCharsFadeIn extends React.HTMLProps<HTMLSpanElement>{
    /** Whether to start the animation on scroll */
    animateOnScroll?:boolean
}


/**
 * Extends the Span Element
 *
 * This components fade in text by fading in each character at a time.
 *
 * To change color of text, attach a class or id to this component and change the css property '--color'.
 *
 * To change animation duration, change the css property for that.
 */
export const TxtCharsFadeIn = defComponent<PropsTxtCharsFadeIn>((props, context) => {
    const e = useRef<HTMLSpanElement>()

    if (props.animateOnScroll){

        useOnScreen(e,() => {
            if (e.current==null){
                console.error("Ref is null")
                return
            }

            e.current.style.animationName="none"
            setTimeout(args => {
                if (e.current==null){
                    console.error("Ref is null")
                    return
                }
                console.log("testd")
                e.current.style.animationName=""
            }, 100)
        })
    }


    return <span  {...props} className={"txtchars_fadein "+props.className} ref={e}>
        {props.children}
    </span>
})
