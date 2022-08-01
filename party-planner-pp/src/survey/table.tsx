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
import service from './service'
import { Entry, getDefaultWeekdays, Survey, Weekdays } from './survey'


export default function BasicTable() {
    const [data, setData] = useState<Survey>([])
    useEffect(() => {  
        async function fetch(){
            const [data] = await service.getData()
            if(data) {
                setData(data)
            }
        }
        fetch()
    }, [])
    const columns = transformRowsToColumns(data)

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
                        {WeekdaysEntries({data, setData})}
                        <TableRow>
                            <TableCell></TableCell>
                            {WeekdaysResults({columns})}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <AddEntry setData={setData}/>
        </>
    )
}

function AddEntry({ setData}: { setData: React.Dispatch<React.SetStateAction<Survey>>}) {
    const [name, setName] = useState<string>('')
    const onClick = () => {
        const addedSurvey: Entry = { 
            name, 
            weekdays: getDefaultWeekdays()
        }
        setData((d: Survey) => [...d, addedSurvey])
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

type Total = {
    [key in Weekdays]: number
}

function transformRowsToColumns(rows: Survey): Total {
    const columns = rows.reduce(
        (acc, row: Entry) => {
            acc['monday'] = row.weekdays.monday === true ? acc['monday'] + 1 : acc['monday']
            acc['tuesday'] = row.weekdays.tuesday === true ? acc['tuesday'] + 1 : acc['tuesday']
            acc['wednesday'] = row.weekdays.wednesday === true ? acc['wednesday'] + 1 : acc['wednesday']
            acc['thursday'] = row.weekdays.thursday === true ? acc['thursday'] + 1 : acc['thursday']
            acc['friday'] = row.weekdays.friday === true ? acc['friday'] + 1 : acc['friday']
            acc['saturday'] = row.weekdays.saturday === true ? acc['saturday'] + 1 : acc['saturday']
            acc['sunday'] = row.weekdays.sunday === true ? acc['sunday'] + 1 : acc['sunday']

            return acc
        }, { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0, }
    )
    
    return columns
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

function WeekdaysEntries({data, setData}:{data: Survey, setData: React.Dispatch<React.SetStateAction<Survey>>}): React.ReactNode[] {
    const getCells = (row: Entry) => {
        return Object.keys(Weekdays).map((day: string) => {
            const key = `${row.name}_${day}`
            const onClick = () => {
                const currIndex = data.findIndex((o) => o.name === row.name)

                const temp = [
                    ...data
                ]
                temp[currIndex] = {
                    ...temp[currIndex],
                    weekdays: {
                        ...row.weekdays,
                        [day]:!row.weekdays[day as Weekdays]
                    }
                }
                setData(temp)
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