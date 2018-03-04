import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

store.subscribe(() => {
  console.log(store.getState())
  render()
})

const render = () => {
  ReactDOM.render(<App />,document.getElementById('root'))
}

const Statistiikka = () => {

  const palautteita = store.getState().good + store.getState().ok + store.getState().bad
  const keskiarvo = palautteita > 0 ? ((store.getState().good - store.getState().bad) / palautteita * 100).toFixed(0) : 0
  const positiivisia = (store.getState().good / palautteita * 100).toFixed(2)

  if (palautteita === 0) {
    return (
      <div>
        <h2>Stataistiikka</h2>
        <div>Ei yhtään palautetta annettu.</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>Hyvä</td>
            <td> { store.getState().good } </td>
          </tr>
          <tr>
            <td>Neutraali</td>
            <td> { store.getState().ok } </td>
          </tr>
          <tr>
            <td>Huono</td>
            <td> { store.getState().bad } </td>
          </tr>
          <tr>
            <td>Keskiarvo</td>
            <td> { keskiarvo } </td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td> { positiivisia }% </td>
          </tr>
        </tbody>
      </table>

      <button onClick={ e => store.dispatch({ type: 'ZERO' }) }>Nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {

  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={ e => store.dispatch({ type: 'GOOD'}) }>hyvä</button>
        <button onClick={ e => store.dispatch({ type: 'OK'}) }>neutraali</button>
        <button onClick={ e => store.dispatch({ type: 'BAD'}) }>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
