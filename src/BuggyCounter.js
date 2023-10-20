import React, { useState } from "react";

const BuggyCounter = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  if (counter === 5) {
    throw new Error("I crashed!");
  }

  return <h1 onClick={handleClick}>{counter}</h1>;
};

export default BuggyCounter;
