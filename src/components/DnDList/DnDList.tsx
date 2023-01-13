import React, {PropsWithChildren, useEffect, useState} from "react";
import {DragAndDropContainer} from "../DragAndDrop/DragAndDrop";

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
        // let a = newArray.filter(value => value!==null)
        // console.log(processItems(a))
        // setItems([...processItems(a)])
        return itemsArray
    }


    return (
        <DragAndDropContainer
            itemData={items}
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
