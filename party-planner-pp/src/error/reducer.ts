import {
    createAction,
    createReducer,
    AsyncThunk,
    AnyAction,
} from '@reduxjs/toolkit'
import { RootState } from '../store'
  
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
interface State {
    loading: boolean
    status: 'pending' | 'rejected' | 'fulfilled' | 'idle'
    message?: string[]
}
const initialState: State = {
    loading: false,
    status: 'idle',
    message: undefined,
}

export const resetAction = createAction('reset-tracked-loading-state')
  
function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending')
}
  
function isRejectedAction(action: AnyAction): action is RejectedAction { 
    return action.type.endsWith('/rejected')
}
function isFulfilledAction(action: AnyAction): action is RejectedAction { 
    return action.type.endsWith('/fulfilled')
}

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(resetAction, () => initialState)
        .addMatcher(
            isPendingAction, 
            (state, action) => {
                state.status = 'pending'
            })
        .addMatcher(
            isRejectedAction,
            (state, action: AnyAction) => {
                state.status = 'rejected'
                state.message = action.payload.message
            }
        )
        .addMatcher<FulfilledAction>(
            isFulfilledAction,
            (state, action: AnyAction) => {
                state.status = 'fulfilled'
            }
        )
})

export default reducer

export const getMessage = (state: RootState) => state.error.message
export const getLoading = (state: RootState) => state.error.loading || false
export const getStatus = (state: RootState) => state.error.status

