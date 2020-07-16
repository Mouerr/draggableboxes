import React, {useState} from 'react'
import {useDrop} from 'react-dnd'
import {ItemTypes} from './ItemTypes'
import {NaiveBox} from "./NaiveBox";
import update from 'immutability-helper'

const styles = {
    width: 900,
    height: 500,
    border: '1px solid black',
    //position: 'relative',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}
export const Dustbin = () => {
    const [boxes, setBoxes] = useState({
        a: {top: 20, left: 80, title: 'apple'},
        b: {top: 180, left: 20, title: 'strawberry'},
    })

    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop(item, monitor) {
            if (item.action === 'move') {
                const delta = monitor.getDifferenceFromInitialOffset()
                const left = Math.round(item.left + delta.x)
                const top = Math.round(item.top + delta.y)
                moveBox(item.id, left, top)
            } else {
                const delta = monitor.getSourceClientOffset()
                const left = Math.round(delta.x)
                const top = Math.round(delta.y)
                addBox(item.name, left, top)
            }
            return undefined
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const moveBox = (id, left, top) => {
        setBoxes(
            update(boxes, {
                [id]: {
                    $merge: {left, top},
                },
            }),
        )
        console.log(`item id '${id}' has been moved to new coordinates(x:${left} y:${top})`)
    }

    const addBox = (id, left, top) => {
        setBoxes({
                ...boxes,
                [id]: {left, top, title: id},
            },
        )
        console.log(`item id '${id}' has been added to Box and placed in coordinates(x:${left} y:${top})`)
    }

    return (
        <div ref={drop} style={{...styles,}}>
            {Object.keys(boxes).map((key) => {
                const {left, top, title} = boxes[key]
                return (
                    <NaiveBox
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                        hideSourceOnDrag={true}
                    >
                        {title}
                    </NaiveBox>
                )
            })}
        </div>
    )
}