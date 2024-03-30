
import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import GameOver from './Components/GameOver';

function App() {
  let arrayOfImages = [
    {
      num:1, img: './img/first.jpg',
      isMatch: false
    },
    {
      num:2, img: './img/second.jpg',
      isMatch: false
    },
    {
      num:3, img: './img/thrid.jpg',
      isMatch: false
    },
    {
      num:4, img: './img/fourth.jpg',
      isMatch: false
    },
    {
      num:5, img: './img/fifth.jpg',
      isMatch: false
    },
    {
      num:6, img: './img/six.jpg',
      isMatch: false
    },
  ]
  const [cards, setCards]= useState([])
  const [selectedCards, setSelectedCards] = useState([])
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const shuffleImages = ()=>{
   let shuffledArray = [...arrayOfImages,...arrayOfImages]
    .map((item, index)=>({...item, id: index+1})).sort((a,b)=>0.5 - Math.random())
    setScore(0)
   setCards(shuffledArray)
  };

  useEffect(()=>{
    shuffleImages();
    alert("Мини-Правила для Игры - Угадай Пару: \n\n Цель игры:   Найти все пары карт, переворачивая их по две за один ход. \n\nСоветы:  Запоминайте расположение открытых карт, чтобы в будущем легче было найти пару.Обратите внимание на кратковременное запоминание местоположения карт для улучшения своей игры")
  },[])

  useEffect(()=>{
    if(selectedCards.length === 2){
      setTimeout(() => {
        setSelectedCards([])
      }, 1000);
      checkMatch()
    }
  },[selectedCards])

  const checkMatch = () => {
    if (selectedCards[0].num === selectedCards[1].num) {
      setScore((prev)=>prev+1)
      let updatedCards = cards.map((card) => {
        if (card.num === selectedCards[0].num) {
          return {
            ...card,
            isMatch: true
          };
        }
        return card;
      });
      setCards(updatedCards);
    } else {
      setTries((prev)=>prev+1)
    }
  };

  useEffect(()=>{
    if(score === arrayOfImages.length){
      setTimeout(()=>{
        shuffleImages()
        setGameOver(true)
      },1000)
    }
  },[score, shuffleImages])
  
  return (
    <>
    {gameOver && <GameOver tries={tries} setGameOver={setGameOver} setTries={setTries} />}
      <div className='container'>
        <div className='score-container'>
          <div className='score'>Score: {score}</div>
          <div className='tries'>Tries: {tries}</div>
        </div>
        <div className='cards-container'>
          {cards.map((card)=>(
            <Card key={card.id} card={card} setSelectedCards={setSelectedCards} selectedCards = {selectedCards}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;
