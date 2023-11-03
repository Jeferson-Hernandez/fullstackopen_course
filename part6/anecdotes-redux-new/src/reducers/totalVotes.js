const initialState = 0

const totalVotes = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'ADD_VOTE':
            return state = state + action.payload
        default:
            return state
    }
}

export const addVote = () => {
    return {
        type: 'ADD_VOTE',
        payload: 1
    }
}

export default totalVotes