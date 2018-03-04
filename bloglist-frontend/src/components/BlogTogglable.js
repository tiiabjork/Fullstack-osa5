import React from 'react'
import PropTypes from 'prop-types'

class BlogTogglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false //tällä määritellään näkyykö blogista nimi vai kaikki tiedot
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible} onClick={this.toggleVisibility} className="togglableBlog">
          {this.props.title} {this.props.author}
        </div>
        <div style={showWhenVisible} onClick={this.toggleVisibility} className="togglableContent">
          {this.props.title} {this.props.author} {this.props.children}
        </div>
      </div>
    )
  }
}



export default BlogTogglable
