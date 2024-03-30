import { useEffect, useState } from "react"

const Card = ({card, setSelectedCards, selectedCards})=>{
    // console.log(card);
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = ()=>{
        setSelectedCards([...selectedCards, card])
    }

    useEffect(()=>{
        if(selectedCards[0] === card || selectedCards[1]=== card || card.isMatch ===true ){
            setIsFlipped(true)
        }
        else{
            setIsFlipped(false)
        }
    },[selectedCards])
    return(
        <div className={isFlipped ? "card open" : "card"} onClick={handleClick}>
            <div className="front">
                <img src={card.img}></img>
            </div>
            <div className="back"></div>
        </div> 
    )
}
export default Card;