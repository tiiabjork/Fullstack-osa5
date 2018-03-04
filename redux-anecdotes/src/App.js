import React from 'react';


class App extends React.Component {
  getId = () => (100000*Math.random()).toFixed(0)

  handleVote = (id) => (event) => {
    this.props.store.dispatch({ type: 'VOTE', data:{id} })
  }

  handleAdd = (event) => {
    event.preventDefault()
    const getId = () => (100000*Math.random()).toFixed(0)
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW',
      data: {
        content: content,
        id: getId(),
        votes: 0
      }
    })
    event.target.anecdote.value=''
  }



  render() {
    const anecdotes = this.props.store.getState()

    anecdotes.sort(function (a, b) {
      return b.votes - a.votes;
    })

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote.id)}>Vote</button>
            </div>
          </div>
        )}
        <h2>Create new</h2>
        <form onSubmit={this.handleAdd}>
          <div><input name="anecdote"/></div>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

export default App
