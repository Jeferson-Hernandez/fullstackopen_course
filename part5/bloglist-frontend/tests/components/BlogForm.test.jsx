/* eslint-disable no-undef */
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BlogForm } from '../../src/components/BlogForm'

test('Blog form gets values', () => {

    const mockFormFunction = jest.fn()

    const document = render(<BlogForm handleCreate={mockFormFunction} />)

    const title = document.container.querySelector('#title')
    const author = document.container.querySelector('#author')
    const url = document.container.querySelector('#url')
    const form = document.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'Blog test with jest' }
    })

    fireEvent.change(author, {
        target: { value: 'Romeo' }
    })

    fireEvent.change(url, {
        target: { value: 'romeo.com/2121212' }
    })

    fireEvent.submit(form)

    expect(mockFormFunction.mock.calls[0][0].title).toBe('Blog test with jest')
    expect(mockFormFunction.mock.calls[0][0].author).toBe('Romeo')
    expect(mockFormFunction.mock.calls[0][0].url).toBe('romeo.com/2121212')

})