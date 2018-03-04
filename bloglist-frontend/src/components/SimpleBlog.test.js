import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: "Omena",
      author: "Omena Mansikka",
      url: "www.omena.fi",
      likes: 2
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleauthorDiv = simpleBlogComponent.find('.titleauthor')

    expect(titleauthorDiv.text()).toContain(blog.title)
    expect(titleauthorDiv.text()).toContain(blog.author)

    const likesDiv = simpleBlogComponent.find('.likes')
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking the button twice', () => {
    const blog = {
      title: "Omena",
      author: "Omena Mansikka",
      url: "www.omena.fi",
      likes: 2
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    const likesDiv = simpleBlogComponent.find('.likes')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
