import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box, Button, Grid, Input } from '@mui/material'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'
import { Entry, getDefaultWeekdays, Survey, Weekdays } from './survey'
import { useSelector } from 'react-redux'
import { fetchEntries, getError, getStatus, postEntry, putEntry, selectAll } from './reducer'
import { useAppDispatch } from '../store'
import { getTotalParticipientsByColumns, Marked, Total, WeekdayKey } from './transform-rows-to-columns'
import * as styles from './style.module.scss'


export default function SurveyParticipants() {
    const dispatch = useAppDispatch()
    const data = useSelector(selectAll)
    const fetchStatus = useSelector(getStatus)
    const error = useSelector(getError)

    const addEntryFn = (entry: Entry) => {
        dispatch(postEntry(entry)).unwrap()
    }
    const updateEntryFn = (entry: Entry) => {
        dispatch(putEntry(entry))
    }

    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(fetchEntries())
        }
    }, [fetchStatus, dispatch])
  

    const columns = getTotalParticipientsByColumns(data)
    const highestCount = Math.max(...Object.values(columns))
    const marked = Object.keys(columns).filter((day: string) => columns[day as WeekdayKey] === highestCount) as WeekdayKey[]

    if(error) {
        console.log(error)
    }

    return (
        <>
            <Box sx={{ p: 2 }}>
                <AddEntry setData={addEntryFn}/>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">Montag</TableCell>
                            <TableCell align="center">Dienstag</TableCell>
                            <TableCell align="center">Mittwoch</TableCell>
                            <TableCell align="center">Donnerstag</TableCell>
                            <TableCell align="center">Freitag</TableCell>
                            <TableCell align="center">Samstag</TableCell>
                            <TableCell align="center">Sonntag</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {WeekdaysEntries({data, setData: updateEntryFn})}
                        <TableRow>
                            <TableCell></TableCell>
                            {WeekdaysResults({columns, marked})}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

function AddEntry({ setData}: { setData: (s: Entry) => void}) {
    const [name, setName] = useState<string>('')
    const onClick = () => {
        const addedSurvey: Entry = { 
            name, 
            weekdays: getDefaultWeekdays()
        }
        setData(addedSurvey)
    }
    const onChange = (n: React.ChangeEvent<HTMLInputElement>) => {
        setName(n.currentTarget?.value)
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Input type="text" onChange={onChange} placeholder="Dein Name"/>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={onClick}>Jo hab Bock</Button>
                </Grid>
            </Grid>
        </div>
    )
}

function WeekdaysResults({columns, marked}:{columns: Total, marked: Marked}): JSX.Element[] {
    const cells = Object.keys(Weekdays).map((day: string) => {
        const key = `columns_${day}`
        const isMarked = marked.includes(day as WeekdayKey)
        
        return (
            <TableCell key={key} align="center" >
                <span className={styles.cell} data-marked={isMarked}>
                    {columns[day as Weekdays]}
                </span>
                {/* <Checkbox checked={!!columns[day as Weekdays]} /> */}
            </TableCell>
        )
    })
    
    return cells
}

function WeekdaysEntries({data, setData}:{data: Survey, setData: (entry: Entry) => void}): React.ReactNode[] {
    const getCells = (row: Entry) => {
        return Object.keys(Weekdays).map((day: string) => {
            const key = `${row.name}_${day}`

            const onClick = () => {
                const currIndex = data.findIndex((o) => o.name === row.name)

                const temp = [
                    ...data
                ]

                const entry = {
                    ...temp[currIndex],
                    weekdays: {
                        ...row.weekdays,
                        [day]:!row.weekdays[day as Weekdays]
                    }
                }
                setData(entry)
            }
            
            return (
                <TableCell key={key} align="center">
                    {row.weekdays[day as Weekdays]}
                    <Checkbox checked={row.weekdays[day as Weekdays]} onClick={onClick} />
                </TableCell>
            )
        })
    }
    
    return (
        data.map((row: Entry) => {
            return (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    {getCells(row)}
                </TableRow>
            )
        })
    )
}