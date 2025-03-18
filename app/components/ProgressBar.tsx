import React, { useEffect } from "react";

interface ProgressBarProps {
  percentage: number;
  bonus: number;
  isNewScore: boolean;
}

function ProgressBar({ percentage, bonus, isNewScore }: ProgressBarProps) {
  const handleProgressBarLength = () => {
    const element = document.getElementById("progress-bar");
    if (element) {
      element.style.width = `${(percentage / 100) * 225}px`;
    }
  };

  useEffect(() => {
    const element = document.getElementById("progress-bar");
    if (element) {
      if (isNewScore) {
        element.style.background = bonus > 0 ? "green" : "red";
      } else {
        element.style.backgroundColor = "blue";
      }
    }
  }, [bonus, percentage]);

  useEffect(() => {
    handleProgressBarLength();
  }, [percentage]);

  return (
    <div id="progress-bar" className={`progress-bar rounded border `}></div>
  );
}

export default ProgressBar;
