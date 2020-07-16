import React from 'react';
import './App.css';
import {SingleTarget} from "./SingleTarget";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                {<SingleTarget/>}
            </div>
        </DndProvider>
    );
}

export default App;
