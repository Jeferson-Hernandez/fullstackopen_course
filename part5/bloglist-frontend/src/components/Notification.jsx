
export const Notification = ({ message, color }) => {
    return (
        <div className={`message ${color}`} >{message}</div>
    )
}
