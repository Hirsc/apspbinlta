import { api } from '../api'
import { Survey } from './survey'

export const route = '/survey'
export default {
    getData,
    setData,
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
        return parseError(e)
    }
}

type SetData = [number?, Error?]

async function setData(data: Survey[]): Promise<SetData> {
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

        return [response.status]
    } catch (error: unknown) {

        return parseError(error)
    }
}

function parseError(e: unknown): [undefined, Error] {
    if (typeof e === 'string') {
        e.toUpperCase() // works, `e` narrowed to string

        return [,new Error(e)]
    } else if (e instanceof Error) {

        return [,new Error(e.message)]
    }

    return [, new Error('ups')]
}