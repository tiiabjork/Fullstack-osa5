import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="simpleblogi">
    <div className="titleauthor">
      {blog.title} {blog.author}
    </div>
    <div className="likes">
      <p>blog has {blog.likes} likes</p>
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
