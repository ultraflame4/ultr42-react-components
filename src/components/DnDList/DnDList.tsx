import React, {PropsWithChildren, useEffect, useState} from "react";
import {DragAndDropContainer} from "../DragAndDrop/DragAndDrop";
import classes from "./DnDList.module.css";
interface DnDListProps<T> {
    items: T[]
    itemAdapter: (item: T, index: number) => React.ReactNode
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

        return processItems(a)
    }


    return (
        <DragAndDropContainer
            itemData={items}
            className={classes.ItemList}
            itemContainerClass={classes.ItemContainer}
            itemClass={classes.ItemClass}
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
