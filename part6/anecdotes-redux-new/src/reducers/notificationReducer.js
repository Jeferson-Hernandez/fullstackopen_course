import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationMessage(state, action) {
            return action.payload
        },
        clearNotification() {
            return ""
        }
    }
})

export const { notificationMessage, clearNotification } = notificationReducer.actions

export const setNotification = (content, time) => {
    return async (dispatch) => {
        dispatch(notificationMessage(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, (time * 1000))
    }
}
export default notificationReducer.reducer