import { Part } from "./Part"

export const Content = (props) => {
  return (
    <div>
        {
            props.parts.map(value => (
                <Part key={value.name} part={value} />
            ))
        }
    </div>
  )
}
