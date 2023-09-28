import { useState } from 'react'
import Card from './components/Card'

function App() {
  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
        <div className="scoreboard">
          <p>Score: 0</p>
          <p>Best score: 0</p>
        </div>
      </header>
      <main>
        <p>Get points by clicking on an image, but don&apos;t click on any more than once!</p>

        <div className="card-container">
          <Card />
        </div>
      </main>
    </>
  )
}

export default App
