import React from 'react'

function Scoreboard(props) {
  return (
    <div className='scoreboard'>
      <h1 className='show-winner'>{props.winnerText}</h1>
      </div>
  )
}

export default Scoreboard