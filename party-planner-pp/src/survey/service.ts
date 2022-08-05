import { api } from '../api'
import { Entry, Survey } from './survey'

export const route = '/survey'
export default {
    getData,
    addEntry,
    updateEntry,
}

type GetData = [Survey?, Error?]

async function getData(): Promise<GetData> {
    try {
        const response = await fetch(`${api}${route}`,  {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        if(!response.ok) {
            throw Error('ups')
        }
        const data = await response.json()
        
        return [data]
    } catch (e: unknown) {
        return [,parseError(e)]
    }
}

type AddEntry = [Entry?, Error?]

async function addEntry(data: Entry): Promise<AddEntry> {
    try {
        const response = await fetch(`${api}${route}`,  {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })

        if(!response.ok) {
            throw Error('ups')
        }
        const added = await response.json()
        
        return [added]
    } catch (e: unknown) {

        return [,parseError(e)]
    }
}

type UpdateEntry = [Entry?, Error?]
async function updateEntry(data: Entry): Promise<UpdateEntry> {
    try {
        const response = await fetch(`${api}${route}`,  {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })

        if(!response.ok) {
            throw Error('ups')
        }
        const updated = await response.json()
        
        return [updated]
    } catch (e: unknown) {

        return [,parseError(e)]
    }
}

function parseError(e: unknown): Error {
    if (typeof e === 'string') {
        e.toUpperCase() // works, `e` narrowed to string

        return new Error(e)
    } else if (e instanceof Error) {

        return new Error(e.message)
    }

    return new Error('ups')
}