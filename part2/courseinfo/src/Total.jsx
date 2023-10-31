import { useEffect, useState } from "react"

export const Total = ({ parts }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(parts.reduce((sum, value) => sum + value.exercises, 0))
  }, [parts])


  return (
    <p><strong>Number of {total} exercises</strong></p>
  )
}
