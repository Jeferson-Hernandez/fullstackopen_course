/* eslint-disable no-undef */
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Blog } from '../../src/components/Blog'


test('blog shows title and author by default', () => {

    const blog = {
        title: "jest testing",
        author: "nicolas",
        url: "url.com",
        likes: "20"
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
})

test('blog shows all info when click show', () => {

    const blog = {
        title: "jest testing",
        author: "nicolas",
        url: "url.com",
        likes: "20"
    }

    const user = {
        username: 'Pablito'
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const button = component.container.querySelector('button')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)
})

test('like button clicks', () => {

    const blog = {
        title: "jest testing",
        author: "nicolas",
        url: "url.com",
        likes: "20"
    }

    const user = {
        username: 'Pablito'
    }

    const mockLikeFunction = jest.fn()

    render(<Blog blog={blog} user={user} handleLike={mockLikeFunction} />)


    fireEvent.click(screen.getByText('view'))

    fireEvent.click(screen.getByText('like'))
    fireEvent.click(screen.getByText('like'))

    expect(mockLikeFunction.mock.calls).toHaveLength(2)
})

