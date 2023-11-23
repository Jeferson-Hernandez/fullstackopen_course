/* eslint-disable react/prop-types */
import { gql, useQuery } from '@apollo/client';
import { Persons } from './components/Persons';
import { useState } from 'react';
import { PersonForm } from './components/PersonForm';
import { PhoneForm } from './components/PhoneForm';

const ALL_PERSONS = gql`
query {
  allPersons  {
    name
    phone
    id
  }
}
`

function App() {
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // })
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default App
