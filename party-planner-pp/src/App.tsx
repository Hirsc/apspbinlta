import { Box, Container } from '@mui/material'
import React from 'react'
import './App.css'
import { ErrorNotification } from './error/notification'
import SurveyParticipants from './survey/survey-participants'

function App() {
    return (
        <>
            <Container maxWidth="md">
                <h1>⚽ Wann kicken ⚽</h1>
                <SurveyParticipants />
            </Container>
            <ErrorNotification/>
        </>
    )
}

export default App
