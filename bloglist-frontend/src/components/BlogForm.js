import React from 'react'


const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => (
  <div>
    <h2>Create new blog</h2>

    <form onSubmit={handleSubmit}>
      <div>
        Title
        <input
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        Author
        <input
          name="author"
          value={author}
          onChange={handleChange}
        />
      </div>
      <div>
        Url
        <input
          name="url"
          value={url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
)

export default BlogForm
