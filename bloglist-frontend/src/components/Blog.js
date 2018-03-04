import React from 'react'
import BlogTogglable from './BlogTogglable'

const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
}

const Blog = ({ user, blog, like, remove }) => {
  const showDeleteButton = blog.userId === undefined || blog.userId.name === user.name
                          ? true : false

  const showWhenTrue = { display: showDeleteButton ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <BlogTogglable title={blog.title} author={blog.author}>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={like(blog.id)}>Like</button></p>
        <p>Blog added by {blog.userId.name}</p>
        <button onClick={remove(blog.id)} style={showWhenTrue}>Delete</button>
      </BlogTogglable>
    </div>
  )
}

export default Blog
