import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
   

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0), // Rajout de '-1' car 1 slide vide
      3000
    );
  };

  useEffect(() => {
    const interval = setInterval(() =>{
      if(!paused){
        nextCard()
      }
    }, 3000);
    const handleKeyPress =(event) =>{
      if(event.code ==="Space"){
        event.preventDefault();
        setPaused((prevPaused) =>!prevPaused)
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => clearInterval(interval);
  },[index, paused]); // Déclenche le changement d'image lorsque l'index ou l'état de pause change
  
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Remplacement de 'idx' par index
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;