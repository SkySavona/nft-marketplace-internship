import React, { useState, useEffect } from "react";

const CountdownTimer = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiryDate * 1000) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { h: 0, m: 0, s: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (interval !== "s" || timeLeft[interval] > 0) {
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval]}{interval}{" "}
        </span>
      );
    }
  });

  return (
    <div className="de_countdown">
      {timeLeft.h === 0 && timeLeft.m === 0 && timeLeft.s === 0 ? (
        <span>EXPIRED</span>
      ) : (
        <>
          <span>{timeLeft.h}h </span>
          <span>{timeLeft.m}m </span>
          {timeLeft.s > 0 && <span>{timeLeft.s}s</span>}
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
