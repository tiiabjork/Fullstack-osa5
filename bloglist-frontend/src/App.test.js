import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

const user = {
  username: "joppo",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvcHBvIiwiaWQiOiI1YTk0NWFjNmM1M2EwMjZkZTRmMjBkOTEiLCJpYXQiOjE1MjAwNjg3NDB9.aIPbdJcWvkb_m9oJC_gQPqi_4UGDPUTt8HUzLR-GQls",
  name: "joppo mikkola"
}

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      //luodaan sovellus siten, että kukaan ei ole kirjatutuneena sisään
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      //luodaan sovellus siten, että joku on kirjautunut sisään
      app = mount(<App />)
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
