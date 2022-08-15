import React from "react";

function Questions(props) {
  const [question, setQuestion] = React.useState(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [className, setClassName] = React.useState(
    "q-container-question-answer-item"
  );

  const duration = (callback, delay) => {
    setTimeout(() => {
      callback();
    }, delay);
  };

  React.useEffect(() => {
    if (props.timer === 0) {
      props.setStop(true);
    }

    let a = setInterval(() => {
      props.setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(a);
  }, [props.timer]);

  React.useEffect(() => {
    props.setTimer(30)
  }, [props.activeList]);

  const handleClick = (answer) => {
    setSelectedAnswer(answer);

    setClassName("q-container-question-answer-item active");

    duration(
      () =>
        setClassName(
          answer.correct
            ? "q-container-question-answer-item correct"
            : "q-container-question-answer-item wrong"
        ),
      1000
    );

    duration(() => {
      if (answer.correct) {
        props.setActiveList((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        props.setStop(true);
      }
    }, 6000);
  };

  React.useEffect(() => {
    setQuestion(props.q[props.activeList - 1]);
  }, [props.activeList, props.q]);

  return (
    <div className="q-container">
      <div className="q-container-question">{question?.question}</div>
      <div className="q-container-question-answer">
        {question?.answers.map((answer) => (
          <div
            key={answer.id}
            onClick={() => handleClick(answer)}
            className={
              selectedAnswer === answer
                ? className
                : "q-container-question-answer-item"
            }
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
