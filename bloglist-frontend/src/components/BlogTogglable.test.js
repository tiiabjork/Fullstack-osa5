import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'
import BlogTogglable from './BlogTogglable'

describe('<BlogTogglable />', () => {
  let togglableComponent
  const blog = {
    id: "1234578aaa",
    title: "Ollin Omena-blogi",
    author: "Olli Omena",
    url: "www.omenaolli.fi",
    likes: 2,
    userId: {
      name: "Tiia Björk"
    }
  }

  beforeEach(() => {
    togglableComponent = shallow(
      <BlogTogglable title={blog.title} author={blog.author}>
        <div className="testDiv" />
      </BlogTogglable>
    )
  })

  it('renders its children', () => {
   expect(togglableComponent.contains(<div class="testDiv" />)).toEqual(false)
  })


  it('after clicking name, the details are displayed', () => {
    const nameDiv = togglableComponent.find('.togglableBlog')
    nameDiv.at(0).simulate('click')

    const contentDiv = togglableComponent.find('.togglableContent')
    expect(contentDiv.getElement().props.style).toEqual({ display: ''})
  })

})
