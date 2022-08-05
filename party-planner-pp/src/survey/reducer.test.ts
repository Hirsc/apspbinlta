import reducer, { actions, State } from './reducer'
import { getDefaultWeekdays, Survey } from './survey'

test('should return the initial state', () => {
    const expected = {'error': null, 'status': 'idle', 'survey': []}
    const actual = reducer(undefined, { type: undefined })

    expect(actual).toEqual(expected)
})

test('should handle a todo being added to an empty list', () => {
    const previousState: State = {
        survey: [],
        status: 'idle',
        error: null,
    }

    const actual = reducer(previousState, actions.addEntryAction({ name: 'kai', weekdays: getDefaultWeekdays() }))
    const expected =  {
        survey: [{'name': 'kai', 'weekdays': {'friday': false, 'monday': false, 'saturday': false, 'sunday': false, 'thursday': false, 'tuesday': false, 'wednesday': false}}],
        error: null,
        status: 'succeeded', 
    }
    expect(actual).toEqual(expected)
})

test('should handle a participient being updated to an existing list', () => {
    const previousState: State = {
        survey: [{ name: 'kai', weekdays: getDefaultWeekdays() }], 
        status: 'idle',
        error: null
    }

    const actual = reducer(previousState, actions.updateEntryAction({ name: 'kai', weekdays: { 'monday': true }}))
    const expected = {
        survey: [{'name': 'kai', 'weekdays': {'friday': false, 'monday': true, 'saturday': false, 'sunday': false, 'thursday': false, 'tuesday': false, 'wednesday': false}}], 
        status: 'succeeded',
        error: null
    }

    expect(actual).toEqual(expected)
})