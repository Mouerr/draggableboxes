import React, {memo} from 'react'
import {Dustbin} from './Dustbin'
import {Box} from './Box'

export const Container = memo(function Container() {
    return (
        <div>
            <div style={{overflow: 'hidden', clear: 'both'}}>
                <Dustbin/>
            </div>

            <div style={{overflow: 'hidden', clear: 'both'}}>
                <Box name="Glass" top={0} left={0}/>
                <Box name="Banana" top={0} left={0}/>
                <Box name="Paper" top={0} left={0}/>
            </div>
        </div>
    )
})