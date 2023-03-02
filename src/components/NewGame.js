import React, { useState } from 'react';
import { Button } from '@mui/material';
import './Card.css';
import ComputerHand from './ComputerHand';
import Scoreboard from './Scoreboard';
import { Avatar } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import redchip from '../red-chip.jpeg';
import fourchips from '../four-chips.jpeg';
import chipstack from '../chip-stack.jpeg'


function NewGame() {

  const [showComputerCards, setShowComputerCards] = useState(false)
  const [deckId, setDeckId] = useState()
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [displayWinner, setDisplayWinner] = useState("")

  const _newDeck = () => {
    setShowComputerCards(false)
    setGameEnded(false)
    setDisplayWinner("")

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json())
      .then(data => {
        const newDeckId = data.deck_id;
        setDeckId(newDeckId)


        fetch(`https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=2`)
          .then(res => res.json())
          .then(data => {

            setPlayerCards(data.cards)
          });


        fetch(`https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=2`)
          .then(res => res.json())
          .then(data => { setComputerCards(data.cards) });

      })
  }

  const _hitPlayer = () => {
    if (gameEnded) {
      alert("Game Over")
      return
    }
    let computerHand = _calculateCardsValue(computerCards)


    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(res => res.json())
      .then(data => {

        let newPlayerCards = playerCards.concat(data.cards)
        setPlayerCards(newPlayerCards)

        let updatedPlayerHand = _calculateCardsValue(newPlayerCards);

        if (updatedPlayerHand > 21) {
          setTimeout(() => {
            _endGame(updatedPlayerHand, computerHand);
          }, 1200)
        }
      });

  }

  const _computerTurn = (cc = computerCards) => {
    if (gameEnded) {
      setTimeout(() => {
        _endGame(playerHand, computerHand);
      }, 1200);
      return
    }

    let computerHand = _calculateCardsValue(cc)
    let playerHand = _calculateCardsValue(playerCards)

    setShowComputerCards(true)

    console.log(playerHand, computerHand)

    if (computerHand <= playerHand && computerHand <= 16) {

      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {

          let newComputerCards = cc.concat(data.cards)
          setComputerCards(newComputerCards);

          let updatedComputerHand = _calculateCardsValue(newComputerCards);

          if (updatedComputerHand <= playerHand && playerHand <= 21) {
            setTimeout(() => {
              _computerTurn(newComputerCards)
             }, 1500); // Call the function again after 1 second
          } else {
            setTimeout(() => {
              _endGame(playerHand, updatedComputerHand);
            }, 1200);
          }
        });

    } else {
      setTimeout(() => {
        _endGame(playerHand, computerHand);
      }, 1200);
    }
  };

  const _endGame = (playerHand, computerHand) => {

    setGameEnded(true)

    if (playerHand > 21 || (computerHand > playerHand && computerHand <= 21)) {
      setDisplayWinner("Computer Wins!");
    } else if (computerHand > 21 || (playerHand > computerHand && playerHand <= 21)) {
      setDisplayWinner("You Win!");
    } else {
      setDisplayWinner("It's a Tie");
    }
  };

  const _calculateCardsValue = (cards) => {
    let total = 0;
    let aces = 0;

    cards.forEach(card => {
      if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
        total += 10;
      }
      else if (card.value === "ACE") {
        aces += 1;
        total += 11;
      }
      else {
        total += Number(card.value);
      }
    });

    while (aces > 0 && total > 21) {
      total -= 10;
      aces -= 1;
    }

    return total;
  }

  return (

    <Grid container spacing={2} minHeight={160}>

      <Grid xs display="flex" justifyContent="center" alignItems="center">

        <h2>Dealer's Hand</h2>
        <br/>
        <br/>
        <br/>
        <ComputerHand cards={computerCards} showComputerCards={showComputerCards} />

      </Grid>

      <Grid xs display="flex" justifyContent="center" alignItems="center">
      <Box className="box">

        <div>
          <Button variant="contained" color="secondary" startIcon={<Avatar src={fourchips} />} onClick={_newDeck}> Deal Cards</Button>
          <br/>
          <br/>
          <br/>
          <br/>
          
          <Button onClick={_hitPlayer} variant="contained" color="success" startIcon={<Avatar alt="" src={chipstack} />}>Hit</Button>
          <Button onClick={() => {_computerTurn()}} variant="contained" color="error" startIcon={<Avatar src={redchip} />}>Stay</Button>
          <br/>
          <br/>
          <br/>
          <br/>
          <div>
            <Scoreboard winnerText={displayWinner} />
          </div>
        </div>
        </Box>

      </Grid>

      <Grid xs display="flex" justifyContent="center" alignItems="center">

        <h2>Player's Hand</h2>
        <br/>
        <br/>
        <br/>

        <div>
          {playerCards.map((card, index) => {
            return <img key={index} className="player-card" src={card.image} alt="" />
          })}
        </div>

      </Grid>

    </Grid>




  )

}


export default NewGame

