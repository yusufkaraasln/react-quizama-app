import React from "react";
import "./app.scss";
import Questions from "./components/Questions";
import data from "./dummyData.json";
import questions from "./questions.json";
const reversed = data.reverse();

function App() {
  const [activeList, setActiveList] = React.useState(1);
  const [totalEarn, setTotalEarn] = React.useState(0);
  const [stop, setStop] = React.useState(false);
  const [timer, setTimer] = React.useState(30);





  React.useEffect(() => {

    activeList>1 ? setTotalEarn(data.find(money=> money.id === activeList-1).amount) : setTotalEarn(0);
  },[activeList]);







  


  return (
    <div className="container">
      <div className="container-main">
        {stop ? (
          <h1>Your total earn : {totalEarn} ₺</h1>
        ) : (
          <>
            <div className="container-main-top">
              <div 

                  style={{
                    color: timer<=10 ? "red" : "white"
                    
                  }}
              
              className="container-main-top-timer">{timer}</div>
            </div>

            <div className="container-main-bottom">
              <Questions
                q={questions}
                setStop={setStop}
                setActiveList={setActiveList}
                activeList={activeList}
                setTimer={setTimer}
                timer={timer}
              />
            </div>
          </>
        )}
      </div>

      <div className="container-stack">
        <ul className="container-stack-list">
          {reversed.map((item) => (
            <li
              className={
                item.id === activeList
                  ? "container-stack-list-item active"
                  : "container-stack-list-item"
              }
            >
              <span className="container-stack-list-item-no">{item.id}</span>
              <span className="container-stack-list-item-amount">
                {item.amount} ₺
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
