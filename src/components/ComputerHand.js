import React from 'react';
import Card from './Card';

function ComputerHand(props) {
  return(
    <div>
    {props.cards.map((card, index) => {
      if(props.showComputerCards === true || index === 0){
        return <img key={index} className="computer-card" src={card.image} alt="" />
        
      }else{
        return < Card />
      }
      
    })}</div>
  )
}

export default ComputerHand