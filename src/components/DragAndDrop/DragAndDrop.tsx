import {convRelativeElement, defComponent} from "../utils";
import classes from "./DragAndDrop.module.css";
import React, {MutableRefObject, ReactElement, useContext, useEffect, useRef, useState} from "react";

interface DnDContext {
    draggedItemIndex: number | null // Object that is being dragged

}

const DnDContext = React.createContext<DnDContext | null>(null);


interface DnDItemProps {
    itemIndex: number
}

export const DnDItem = defComponent<DnDItemProps>(props => {
    const mouseDowned = useRef(false)
    const elementRef = useRef<HTMLDivElement>(null)
    const initialRel = useRef<{ x: number, y: number } | null>(null)
    const dndCtx = useContext(DnDContext)


    function onMouseDown(ev: React.MouseEvent) {
        mouseDowned.current = true
        if (!elementRef.current) return;
        elementRef.current.setAttribute("dragged", "")

        setTimeout(args => {
            initialRel.current = {x: ev.clientX, y: ev.clientY}
        }, 0)
    }


    useEffect(() => {

        function moveCallback(ev: MouseEvent) {
            if (!mouseDowned.current) return
            if (!elementRef.current) return;
            if (!initialRel.current) return;
            if (!dndCtx) return;

            dndCtx.draggedItemIndex = props.itemIndex
            elementRef.current?.style.setProperty("--x", `${ev.clientX - initialRel.current.x}px`);
            elementRef.current?.style.setProperty("--y", `${ev.clientY - initialRel.current.y}px`);
            // elementRef.current?.style.setProperty("--x",`${ev.clientX}px`);
            // elementRef.current?.style.setProperty("--y",`${ev.clientY}px`);
        }

        function onMouseUp(ev: MouseEvent) {
            if (!dndCtx) return;
            setTimeout(() => {dndCtx.draggedItemIndex = null},0)

            mouseDowned.current = false
            elementRef.current?.style.removeProperty("--x");
            elementRef.current?.style.removeProperty("--y");

            elementRef.current?.removeAttribute("dragged")
        }

        window.addEventListener("mousemove", moveCallback)
        window.addEventListener("mouseup", onMouseUp)
        return () => {
            window.removeEventListener("mousemove", moveCallback)
            window.removeEventListener("mouseup", onMouseUp)
        }
    })

    return (
        <div className={classes.DnDItem} onMouseDown={onMouseDown} ref={elementRef}>
            {props.children}
        </div>
    )
})

interface DnDItemContainerProps {
    currentItemIndex: number | null
    containerIndex: number
    item: React.ReactNode
    onDropItem:(from:number,to:number)=>void
}

export const DnDItemContainer = defComponent<DnDItemContainerProps>(props => {
    const dndCtx = useContext(DnDContext)
    const isDroppable = useRef(false)
    const containerRef = useRef<HTMLDivElement>(null)

    function isDraggedItemMine() {
        return props.currentItemIndex == dndCtx?.draggedItemIndex
    }

    function onHover(ev: React.MouseEvent) {

        if (!isDraggedItemMine() && dndCtx!.draggedItemIndex !== null && props.currentItemIndex === null) {

            isDroppable.current = true
            containerRef.current?.setAttribute("dragover", "")
        }
    }

    function onMouseLeave(ev: React.MouseEvent) {

        containerRef.current?.removeAttribute("dragover")
        isDroppable.current = false
    }

    function OnDroppedOn() {
        if (!dndCtx) return;
        if (dndCtx.draggedItemIndex===null) return;

        props.onDropItem(dndCtx.draggedItemIndex,props.containerIndex)
    }


    useEffect(() => {

        function onMouseUp(ev: MouseEvent) {
            if (!dndCtx) return;
            containerRef.current?.removeAttribute("dragover")
            if (isDroppable.current) {
                OnDroppedOn()
            }
        }

        window.addEventListener("mouseup", onMouseUp)
        return () => {
            window.removeEventListener("mouseup", onMouseUp)
        }
    })

    return (
        <div className={classes.DnDItemContainer} onMouseOver={onHover} onMouseLeave={onMouseLeave} ref={containerRef}>
            {props.item}
        </div>
    )
})

interface DragAndDropContainerProps {
    items: Array<React.ReactNode | null>
}

export function DragAndDropContainer(props: DragAndDropContainerProps) {
    const [items, setItems] = useState(props.items)

    function ReOrderItems(from:number, to:number){

        setItems(prevState => {

            let newItems =  [...prevState]
            let fromItem = newItems[from]
            newItems[from] = null
            newItems[to]=fromItem
            return newItems
        })
    }

    return (
        <DnDContext.Provider value={{
            draggedItemIndex: null
        }}>
            <div className={classes.DnDContainer}>
                {items?.map((value, index) => {

                    return <DnDItemContainer
                        onDropItem={ReOrderItems}
                        containerIndex={index}
                        currentItemIndex={value===null?null:index}
                        item={value===null?<></>:<DnDItem itemIndex={index}>{value}</DnDItem>}
                        key={index}/>
                })}
            </div>
        </DnDContext.Provider>
    )
}
