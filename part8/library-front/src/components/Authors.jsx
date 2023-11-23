/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../graphql/queries'
import { AuthorYearForm } from './AuthorYearForm'

export const Authors = (props) => {
    const { data, loading } = useQuery(ALL_AUTHORS)

    if (!props.show) {
        return null
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ paddingTop: 20}}>
                <AuthorYearForm authors={data.allAuthors} />
            </div>
        </div>
    )
}
