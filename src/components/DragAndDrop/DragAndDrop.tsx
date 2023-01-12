import {convRelativeElement, defComponent} from "../utils";
import classes from "./DragAndDrop.module.css";
import React, {MutableRefObject, useContext, useEffect, useRef, useState} from "react";

interface DnDContext{
    draggedItem:object|null // Object that is being dragged
}

const DnDContext = React.createContext<DnDContext|null>(null);
interface DnDItemParent{
    setItem(ref:MutableRefObject<any>):void;
}

interface DnDItemProps{
    parent:DnDItemParent
}
export const DnDItem = defComponent<DnDItemProps>(props => {
    const mouseDowned = useRef(false)
    const elementRef = useRef<HTMLDivElement>(null)
    const initialRel = useRef<{ x:number,y:number }|null>(null)
    const dndCtx = useContext(DnDContext)


    function onMouseDown(ev:React.MouseEvent){
        mouseDowned.current=true
        if (!elementRef.current) return;
        elementRef.current.setAttribute("dragged","")

        setTimeout(args => {initialRel.current= {x:ev.clientX,y:ev.clientY}},0)
    }

    useEffect(() => {
        props.parent.setItem(elementRef)
    },[props.parent])


    useEffect(() => {

        function moveCallback(ev:MouseEvent){
            if (!mouseDowned.current) return
            if (!elementRef.current) return;
            if (!initialRel.current) return;
            if (!dndCtx) return;

            dndCtx.draggedItem=elementRef.current

            elementRef.current?.style.setProperty("--x",`${ev.clientX-initialRel.current.x}px`);
            elementRef.current?.style.setProperty("--y",`${ev.clientY-initialRel.current.y}px`);
            // elementRef.current?.style.setProperty("--x",`${ev.clientX}px`);
            // elementRef.current?.style.setProperty("--y",`${ev.clientY}px`);
        }

        function onMouseUp(ev:MouseEvent){
            if (!dndCtx) return;

            dndCtx.draggedItem=null
            mouseDowned.current=false
            elementRef.current?.style.removeProperty("--x");
            elementRef.current?.style.removeProperty("--y");
            elementRef.current?.removeAttribute("dragged")
        }

        window.addEventListener("mousemove",moveCallback)
        window.addEventListener("mouseup",onMouseUp)
        return ()=>{
            window.removeEventListener("mousemove",moveCallback)
            window.removeEventListener("mouseup",onMouseUp)
        }
    })

    return (
        <div className={classes.DnDItem} onMouseDown={onMouseDown} ref={elementRef}>
            {props.children}
        </div>
    )
})

interface DnDItemContainerProps{
    item?:(p:DnDItemParent)=>React.ReactElement
}

export const DnDItemContainer = defComponent<DnDItemContainerProps>(props => {
    const item = useRef<MutableRefObject<any>|null>(null)
    const containerRef = useRef<HTMLElement>(null)

    let child = props.item?.({
        setItem(ref: React.MutableRefObject<any>) {
            item.current=ref
        }
    })
    const dndCtx = useContext(DnDContext)

    function isDraggedItemMine(){
        if (!item?.current){
            return false
        }
        return item?.current?.current==dndCtx?.draggedItem
    }

    function onHover(ev:React.MouseEvent){
        containerRef.current?.removeAttribute("dragover")

        if (!isDraggedItemMine() && dndCtx!.draggedItem!==null && item.current===null){
            containerRef.current?.setAttribute("dragover","")
        }
    }

    function onMouseLeave(ev:React.MouseEvent){
        containerRef.current?.removeAttribute("dragover")
    }

    useEffect(() => {

        function onMouseUp(ev:MouseEvent){
            if (!dndCtx) return;
            containerRef.current?.removeAttribute("dragover")
        }

        window.addEventListener("mouseup",onMouseUp)
        return ()=>{
            window.removeEventListener("mouseup",onMouseUp)
        }
    })

    return (
        <div className={classes.DnDItemContainer} onMouseOver={onHover} onMouseLeave={onMouseLeave} ref={containerRef}>
            {child}
        </div>
    )
})
export const DragAndDropContainer = defComponent(props => {


    return (
        <DnDContext.Provider value={{
            draggedItem:null
        }}>
            <div className={classes.DnDContainer}>
                {props.children}
            </div>
        </DnDContext.Provider>
    )
})
