import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Button, Input } from '@mui/material'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'
import { Entry, getDefaultWeekdays, Survey, Weekdays } from './survey'
import { useSelector } from 'react-redux'
import { fetchEntries, getError, getStatus, postEntry, putEntry, selectAll } from './reducer'
import { useAppDispatch } from '../store'
import { getTotalParticipientsByColumns, Total } from './transform-rows-to-columns'


export default function BasicTable() {
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
    if(error) {
        console.log(error)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>KW 1</TableCell>
                            <TableCell align="right">Montag</TableCell>
                            <TableCell align="right">Dienstag</TableCell>
                            <TableCell align="right">Mittwoch</TableCell>
                            <TableCell align="right">Donnerstag</TableCell>
                            <TableCell align="right">Freitag</TableCell>
                            <TableCell align="right">Samstag</TableCell>
                            <TableCell align="right">Sonntag</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {WeekdaysEntries({data, setData: updateEntryFn})}
                        <TableRow>
                            <TableCell></TableCell>
                            {WeekdaysResults({columns})}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <AddEntry setData={addEntryFn}/>
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
            <Button variant="contained" onClick={onClick}/>
            <Input type="text" onChange={onChange}/>
        </div>
    )
}

function WeekdaysResults({columns}:{columns: Total}): JSX.Element[] {
    const cells = Object.keys(Weekdays).map((day: string) => {
        const key = `columns_${day}`
        
        return (
            <TableCell key={key} align="right">
                {columns[day as Weekdays]}
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
                <TableCell key={key} align="right">
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