
import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMessage, getStatus, resetAction } from './reducer'

export function ErrorNotification () {
    const error = useSelector(getMessage) 
    const hasErrors = error?.length || -1
    const status = useSelector(getStatus)
    const shouldOpen = (status === 'rejected' || status === 'fulfilled') && hasErrors > 0
    const severity = getSeverity(status)

    const dispatch = useDispatch()

    function handleClose() {
        dispatch(resetAction())
    }
 
    return (
        <Snackbar
            open={shouldOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}

function getSeverity(status: 'fulfilled' | 'rejected' | 'idle' | 'pending'): 'success' | 'error' | 'info' | 'warning' {
    const severityMap: SeverityMap = {
        'fulfilled': 'success',
        'rejected' : 'error',
        'idle': undefined,
        'pending': undefined
    }

    const severity = severityMap[status]

    return severity ? severity: 'info'
}

interface SeverityMap {
    'fulfilled': 'success'
    'rejected' : 'error'
    'idle': undefined
    'pending': undefined
}