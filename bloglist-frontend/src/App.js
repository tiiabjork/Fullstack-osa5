import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogTogglable from './components/BlogTogglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      error: null,
      success: null,
      username: '',
      password: '',
      user: null,
      loginVisible: ''
    }
  }

  componentDidMount() {
    blogService
      .getAll()
      .then(blogs => {
        this.setState({ blogs })
      }
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{

      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({
        username: '',
        password: '',
        user,
        success: `${user.name} logged in succesfully.`
      })
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)

    } catch(exception) {
      this.setState({
        error: 'Username or password is wrong.',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({
      user: null,
      success: 'User has logged out succesfully',
    })
    setTimeout(() => {
      this.setState({ success: null })
    }, 5000)
  }

  addBlog = async (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    console.log('sisällä ollaan')
    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      blogService
        .create(blogObject)
        .then(newBlog => {
          this.setState({
            blogs: this.state.blogs.concat(newBlog),
            title: '',
            author: '',
            url: '',
            success: `A new blog "${newBlog.title}" was added succesfully by ${this.state.user.name}`
          })

          setTimeout(() => {
            this.setState({ success: null })
          }, 5000)
        })
    } catch (exception) {
      console.log(exception)
    }
  }

  updateBlog = (id) => () => {
    console.log(id)
    const blogToUpdate = this.state.blogs.find(blog => blog.id === id)
    console.log(blogToUpdate)

    try {
      const blogObject = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
        id: blogToUpdate.id,
        userId: blogToUpdate.userId
      }
      console.log(blogObject)
      console.log(blogObject.likes)

      blogService
        .update(id, blogObject)
        .then(updatedBlog => {
          let currentBlogs = this.state.blogs.filter((blogi) => blogi.id !== id)
          this.setState({
            blogs: currentBlogs.concat(blogObject),
            success: `One like added!`
          })
          setTimeout(() => {
            this.setState({ success: null })
          }, 5000)
        })
    } catch (exception) {
      console.log(exception)
    }
  }

  removeBlog = (id) => () => {
    const blogToRemove = this.state.blogs.find(blog => blog.id === id)
    const wantToRemove = window.confirm(`Delete ${blogToRemove.title} by ${blogToRemove.author}?`)
    if (!wantToRemove) {
      return
    }
    console.log(blogToRemove)

    blogService
      .remove(id)
      .then(response => {
        this.setState({
          blogs: this.state.blogs.filter(blog => blog.id !== id),
          success: `"${blogToRemove.title}" by ${blogToRemove.author} deleted`
        })
        setTimeout(() => {
          this.setState({ success: null })
        }, 5000)
      })
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const loginForm = () => {
      return (
        <div>
          <Togglable buttonLabel="Login">
            <LoginForm
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleChange}
              handleSubmit={this.login}
            />
          </Togglable>
        </div>
      )
    }


    const blogForm = () => {
      return (
        <div>
          <Togglable buttonLabel="Create" ref={component => this.blogForm = component}>
            <BlogForm
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
              handleChange={this.handleChange}
              handleSubmit={this.addBlog}
            />
          </Togglable>
        </div>
      )
    }

    const blogs = () => {

      this.state.blogs.sort(function (a, b) {
        return b.likes - a.likes;
      })

      return (
        <div>
          <p>{this.state.user.name} is logged in</p>
          <button onClick={this.logout}>Log out</button>
          <h2>Bloglist</h2>

          {this.state.blogs.map(blog =>
              <Blog key={blog.id} user={this.state.user} blog={blog} like={this.updateBlog} remove={this.removeBlog}/>
          )}
        </div>
      )
    }


    return (
        <div>
          <h1> Blogs </h1>

          <Notification error={this.state.error} success={this.state.success}/>

          {this.state.user === null && loginForm()}
          {this.state.user !== null && blogs()}
          {this.state.user !== null && blogForm()}

        </div>
      )
    }
}

export default App;
