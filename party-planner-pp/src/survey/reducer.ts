
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import service from './service'
import { AddEntry, Entry, Survey, UpdateEntry } from './survey'

export interface State {
    survey: Survey | undefined
    status: 'idle' | 'succeeded' | 'loading' | 'failed'
    error: Error | null | string | undefined
}

const initialState: State = {
    survey: [],
    status: 'idle',
    error: null
}

const slice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        getEntries(state) {
            return state
        },
        addEntryAction,
        updateEntryAction
    },
    extraReducers(builder) {
        builder
            .addCase(fetchEntries.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEntries.fulfilled, (state, action: PayloadAction<Survey>) => {
                state.status = 'succeeded'
                state.survey = action.payload
            })
            .addCase(fetchEntries.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(putEntry.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(putEntry.fulfilled, updateEntryAction)
            .addCase(putEntry.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postEntry.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(postEntry.fulfilled, addEntryAction)
            .addCase(postEntry.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const actions = slice.actions

export default slice.reducer

export const getError = (state: RootState) => state.survey.error
export const selectAll = (state: RootState) => state.survey.survey || []
export const getStatus = (state: RootState) => state.survey.status

export const selectEntryById = (state: RootState, id: string) =>
    state.survey?.survey?.find(entry => entry.name === id)

export const fetchEntries = createAsyncThunk<Survey>('survey/getEntries', async(_,{ rejectWithValue }) => {
    const [data, error] = await service.getData()

    if(error) {
        return rejectWithValue(error.message[0])
    }

    return data as Survey
})
export const putEntry = createAsyncThunk<Entry, Entry>('survey/addEntry', async(entry: Entry, { rejectWithValue }) => {
    const [data, error] = await service.updateEntry(entry)

    if(error) {
        return rejectWithValue(error.message[0])
    }

    return data as Entry
})
export const postEntry = createAsyncThunk<Entry, Entry>('survey/updateEntry', async(entry: Entry, { rejectWithValue }) => {
    const [data, error] = await service.addEntry(entry)

    if(error) {
        return rejectWithValue(error)
    }

    return data as Entry
})

export function addEntryAction(state: State, action: PayloadAction<Entry>) {
    state.status = 'succeeded'
    const newEntry = action.payload
    state.survey?.push({ ...newEntry })
}

export function updateEntryAction(state: State, action: PayloadAction<UpdateEntry>) {
    state.status = 'succeeded'
    const updatedEntry = action.payload
    const updateIndex = state.survey?.findIndex((o) => o.name === updatedEntry.name)

    if(updateIndex != undefined && state.survey){
        state.survey[updateIndex] = { 
            ...state.survey[updateIndex],
            ...updatedEntry,
            weekdays: {
                ...state.survey[updateIndex].weekdays,
                ...updatedEntry.weekdays
            }
        }
    }
}

