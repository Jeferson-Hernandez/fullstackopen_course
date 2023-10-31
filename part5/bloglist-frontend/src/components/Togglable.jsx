import PropTypes from 'prop-types'
import { useState } from "react"

export const Togglable = ({ children, buttonLabel }) => {

    const [isVisible, setIsVisible] = useState(false)

    return (
        <>
            {!isVisible ?
                <div>
                    <button onClick={() => setIsVisible(!isVisible)}>{buttonLabel}</button>
                </div> : <div>
                    {children}
                    <button onClick={() => setIsVisible(!isVisible)}>close</button>
                </div>
            }
        </>
    )
}

// eslint-disable-next-line no-undef
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
