import React from 'react';


const order = "23456789TJQKA";
export const ranksName = {
  9: "High Card",
  8: "One Pair",
  7: "Two Pair",
  6: "Three of a Kind",
  5: "Straight",
  4: "Flush",
  3: "Full House",
  2: "Four of a Kind",
  1: "Straight Flush",
  0: "Royal Flush"
};
export const cardsNames = {
  "M": "Two",
  "L": "Three",
  "K": "Four",
  "J": "Five",
  "I": "Six",
  "H": "Seven",
  "G": "Eight",
  "F": "Nine",
  "E": "Ten",
  "D": "Jack",
  "C": "Queen",
  "B": "King",
  "A": "Ace"

}
const cardVal = {
  'A': 'A',
  'K': 'B',
  'Q': 'C',
  'J': 'D',
  'T': 'E',
  '9': 'F',
  '8': 'G',
  '7': 'H',
  '6': 'I',
  '5': 'J',
  '4': 'K',
  '3': 'L',
  '2': 'M'
}
export function getHandDetails(cards) {

  if (cards === null) {
    return { rank: 100, value: null, value1: null, faces0: null, faces1: null, value2: null };
  }


  const lenofHand = cards.length;

  const faces = cards.map((a) => cardVal[a[0]]).sort();
  const suits = cards.map((a) => a[1]).sort();
  const counts = faces.reduce(count, {});
  const duplicates = Object.values(counts).reduce(count, {});
  const flush = (suits[0] === suits[4]) && lenofHand > 4;
  const first = faces[0].charCodeAt(0);
  // remove repeated cards, so they appear only once
  const auxfaces = [...new Set(faces)];
  const lowStraight = auxfaces.join("")[0] === "A" && auxfaces.join("").slice(-4) === "JKLM";
  const straight = (lowStraight || auxfaces.every((f, index) => f.charCodeAt(0) - first === index)) && lenofHand > 4;
  let rank =
    (flush && straight && 1) ||
    (duplicates[4] && 2) ||
    (duplicates[3] && duplicates[2] && 3) ||
    (flush && 4) ||
    (straight && 5) ||
    (duplicates[3] && 6) ||
    (duplicates[2] > 1 && 7) ||
    (duplicates[2] && 8) ||
    9;
  
  return { rank, value: faces.sort(byCountFirst).join(""), lowStraight:  lowStraight };

  function byCountFirst(a, b) {
    // Counts are in reverse order - bigger is better
    const countDiff = counts[b] - counts[a];
    if (countDiff) return countDiff; // If counts don't match return
    return b > a ? -1 : b === a ? 0 : 1;
  }

  function count(c, a) {
    c[a] = (c[a] || 0) + 1;
    return c;
  }
}

function compareHands(hands) {

  const handDetails = hands.map((h) => getHandDetails(h));
  let winningRank = 10; // Initialize with the lowest rank (9 is the highest possible rank)
  let winningIndex = -1;

  handDetails.forEach((hand, index) => {

    if (hand.rank < winningRank) {
      winningRank = hand.rank;
      winningIndex = index;
    } else if (hand.rank === winningRank) {
      // If ranks are the same, compare the values
      if (hand.value < handDetails[winningIndex].value) {
        winningIndex = index;
      }
    }
  });
  return winningIndex;
}

export function benchMark() {


  var startTime = performance.now()
    
  CalculatePlayersWinProb([], [], [1,1,1,1,1,1], [1,1,1,1,1,1], 100000)
    
var endTime = performance.now()

console.log(`Call to doSomething took ${endTime - startTime} milliseconds.`)

}

export function CalculatePlayersWinProb(playersCards, flopCards, playersPlaying, playersWithCards, numberOfSimulations) {


  var deck = generateDeck();
  function removeCardsFromArray(cardsToRemove, array) {
    return array.filter(card => !cardsToRemove.includes(card));
  }
  var usedCards = [].concat(...playersCards, ...flopCards)


  deck = removeCardsFromArray(usedCards, deck);
  const playerWins = new Array(playersPlaying.length).fill(0);
  var remainingPlayers = playersPlaying.slice();
  for (let i = 0; i < numberOfSimulations; i++) {
    var shuffledDeck = shuffleDeck([...deck]);
    const remainingFlop = flopCards.slice();
    

    var newFlop = dealRandomCard(5 - remainingFlop.length, shuffledDeck);
    remainingFlop.push(...newFlop);

    shuffledDeck = removeCardsFromArray(newFlop, shuffledDeck);
    const playerHands = playersCards.map((hand, index) => {
      if (remainingPlayers[index] === 1) {
        const remainingHand = hand.slice();
        const newCards = dealRandomCard(2 - remainingHand.length, shuffledDeck);
        shuffledDeck = removeCardsFromArray(newCards, shuffledDeck);
        remainingHand.push(...newCards);
        if (playersWithCards[index] === 1) {
          return [...remainingHand, ...remainingFlop];
        }
      }
      return null
    });

    //eliminar la mano de los que no juegan
    const winningIndex = compareHands(playerHands);


    if (winningIndex !== null) {
      playerWins[winningIndex]++;
    }
  }

  const winProbabilities = playerWins.map(wins => (wins / numberOfSimulations) * 100);
  return winProbabilities;
}

function generateDeck() {
  const ranks = "23456789TJQKA";
  const suits = "CDHS";
  const deck = [];

  for (const rank of ranks) {
    for (const suit of suits) {
      deck.push(rank + suit);
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}


function dealRandomCard(numCards, deck) {
  const dealtCards = [];
  for (let i = 0; i < numCards; i++) {
    if (deck.length > 0) {
      const card = deck.pop();
      dealtCards.push(card);
    }
  }
  return dealtCards;
}

export default { CalculatePlayersWinProb, getHandDetails,benchMark };

