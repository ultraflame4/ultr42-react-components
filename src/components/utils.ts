import {FunctionComponent, MutableRefObject, PropsWithChildren, useEffect, useState} from "react";

export function defComponent<P>(component: FunctionComponent<PropsWithChildren<P>>): FunctionComponent<PropsWithChildren<P>>{

    return component
}

export function useOnScreen(ref:MutableRefObject<any>, callack: ()=>void) {

    const observer = new IntersectionObserver(
        ([entry]) => {

            if (entry.isIntersecting){

                callack()
            }
        }
    )

    useEffect(() => {
        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])


}
