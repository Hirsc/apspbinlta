import { isObject } from 'lodash'
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
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if(!response.ok) {
            return [,parseError(await response.json())]
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
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok) {
            return [,parseError(await response.json())]
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
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok) {
            return [,parseError(await response.json())]
        }
        const updated = await response.json()
        
        return [updated]
    } catch (e: unknown) {

        return [,parseError(e)]
    }
}

function parseError(e: unknown): Error {
    if (typeof e === 'string') {
        e.toUpperCase()

        return new Error(e)
    } else if (e instanceof Error) {
        return new Error(e.message)
    } else if (isObject(e)) {
        if(e.hasOwnProperty('message')) {
            return e as Error
        }
    }

    return new Error('ups')
}