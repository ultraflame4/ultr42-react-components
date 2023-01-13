import {convRelativeElement, defComponent} from "../utils";
import classes from "./DragAndDrop.module.css";
import React, {MutableRefObject, ReactElement, useContext, useEffect, useRef, useState} from "react";

interface DnDContext {
    draggedItemIndex: number | null // Object that is being dragged

}

const DnDContext = React.createContext<DnDContext | null>(null);


interface DnDItemProps {
    itemIndex: number
    className?: string
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
            setTimeout(() => {
                dndCtx.draggedItemIndex = null
            }, 0)

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
        <div className={`${classes.DnDItem} ${props.className ?? ''}`} onMouseDown={onMouseDown} ref={elementRef}>
            {props.children}
        </div>
    )
})

interface DnDItemContainerProps {
    currentItemIndex: number | null
    containerIndex: number
    item: React.ReactNode
    onDropItem: (from: number, to: number) => void
    className?: string
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
        if (dndCtx.draggedItemIndex === null) return;

        props.onDropItem(dndCtx.draggedItemIndex, props.containerIndex)
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
        <div className={`${classes.DnDItemContainer} ${props.className ?? ''}`} onMouseOver={onHover}
             onMouseLeave={onMouseLeave} ref={containerRef}>
            {props.item}
        </div>
    )
})

export interface DragAndDropContainerProps<T> {
    /**The draggable items to create. null to have empty container*/
    items: Array<React.ReactNode | null>
    /**Class name for DnDItem for styling*/
    itemClass?: string
    /**Class name for DnDItemContainer for styling*/
    itemContainerClass?: string
    /**
     * This callback gives you back the itemContainers,
     * allowing you to control how they are displayed. Eg. adding items between the containers
     * <br/>**Note that the parent element of where this is mounted will is display:flex**
     * <br/>**The index of the elements is preserved as it was in items prop**
     */
    env: (itemContainers: React.ReactElement[]) => React.ReactNode

}

/**
 * This is my implementation of a DnD system <br/>
 * It consist of DnDItem(s) and DnDItemContainer(s)<br/>
 * It is pretty simple, the DnDItem can be dragged in and out of DnDItemContainer(s)<br/>
 * <br/>
 * The DragAndDropContainer contains and isolates the different drag and drop systems.
 * <br/>
 * This system does not support nested drag and drop containers and items.
 *
 * @param props {DragAndDropContainerProps}
 * @constructor
 */
export function DragAndDropContainer(props: DragAndDropContainerProps) {
    const [items, setItems] = useState(props.items)

    function ReOrderItems(from: number, to: number) {

        setItems(prevState => {

            let newItems = [...prevState]
            let fromItem = newItems[from]
            newItems[from] = null
            newItems[to] = fromItem
            return newItems
        })
    }

    return (
        <DnDContext.Provider value={{
            draggedItemIndex: null
        }}>
            <div className={classes.DnDContainer}>
                {props.env(items?.map((value, index) => {

                    return <DnDItemContainer
                        className={props.itemContainerClass}
                        onDropItem={ReOrderItems}
                        containerIndex={index}
                        currentItemIndex={value === null ? null : index}
                        item={value === null ? <></> :
                            <DnDItem className={props.itemClass} itemIndex={index}>{value}</DnDItem>}
                        key={index}/>
                }))}
            </div>
        </DnDContext.Provider>
    )
}
