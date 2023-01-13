import React, {PropsWithChildren, useEffect, useState} from "react";
import {DragAndDropContainer} from "../DragAndDrop/DragAndDrop";

interface DnDListProps<T> {
    items: T[]
    itemAdapter: (item: T, index: number) => React.ReactNode
}

export function DnDList<T>(props: DnDListProps<T>) {
    const [items,setItems] = useState<Array<React.ReactNode|null>>([])

    useEffect(() => {
        setProcessedItem(props.items)
    },[props.items])
    function setProcessedItem(_items:T[]){
        let zipped = _items.map((value, index) => [null, props.itemAdapter(value, index)])
        let flattened = zipped.flat()
        flattened.push(null)
        setItems(flattened)

    }
    console.log(items)
    function onReorder(newArray:any[]){
        let a = newArray.filter(value => value!==null)

        setProcessedItem(a)
    }

    return (
        <DragAndDropContainer
            itemData={items}
            itemDataAdapter={(item, index) => item}
            env={(itemContainers, itemData) => {
                console.log(itemData)
                return <>
                    {itemContainers}
                </>
            }}
            onReorder={onReorder}
        />
    )
}
