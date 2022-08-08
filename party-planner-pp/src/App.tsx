import React from 'react'
import './App.css'
import { ErrorNotification } from './error/notification'
import BasicTable from './survey/table'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>⚽ Party Planer - PP ⚽</h1>
                <BasicTable></BasicTable>
                <ErrorNotification/>
            </header>
        </div>
    )
}

export default App
