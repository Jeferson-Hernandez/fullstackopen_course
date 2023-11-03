import { useDispatch } from "react-redux"
import { filterAnecdotes } from '../reducers/filterReducer'

export const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const inputValue = event.target.value
        dispatch(filterAnecdotes(inputValue))
    }
    const style = {
        marginBottom: 10,
        marginTop: 20
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}