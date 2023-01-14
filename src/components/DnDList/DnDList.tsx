import React, {PropsWithChildren, useEffect, useState} from "react";
import {DragAndDropContainer} from "../DragAndDrop/DragAndDrop";
import classes from "./DnDList.module.css";
interface DnDListProps<T> {
    items: T[]
    itemAdapter: (item: T, index: number) => React.ReactNode
    itemClass?: string
    /**Class name for DnDItemContainer for styling*/
    itemContainerClass?: string
    className?:string
    /**
     * This callback is called whenever an element as been dragged to another container
     * @param newArray The new array containing the itemData in the new arrangement.
     */
    onReorder?: (newArray: Array<T | null>) => void
}

export function DnDList<T>(props: DnDListProps<T>) {
    const [items, setItems] = useState(processItems(props.items))

    function processItems(_items:T[]){
        let zipped = _items.map((value, index) => [null, value])
        let flattened = zipped.flat()
        flattened.push(null)
        return flattened
    }


    function onReorder(itemsArray:any[],from:number,to:number){
        let fromItem = itemsArray[from]

        itemsArray[from] = null
        itemsArray[to] = fromItem
        let a = itemsArray.filter(value => value!==null)
        setTimeout(args => props.onReorder?.(a),0)
        return processItems(a)
    }


    return (
        <DragAndDropContainer
            itemData={items}
            className={`${classes.ItemList} ${props.className}`}
            itemContainerClass={`${classes.ItemContainer} ${props.itemContainerClass}`}
            itemClass={`${classes.ItemClass} ${props.itemClass}`}
            itemDataAdapter={(item, index) => props.itemAdapter(item, index)}
            env={(itemContainers, itemData) => {

                return <>
                    {itemContainers}
                </>
            }}
            interceptReorder={onReorder}
        />
    )
}
