import React, { useEffect } from "react";

interface ProgressBarProps {
  percentage: number;
  pointType: "normal" | "positive" | "negative";
}

function ProgressBar({ percentage, pointType }: ProgressBarProps) {
  const handleProgressBarLength = () => {
    const element = document.getElementById("progress-bar");
    if (element) {
      element.style.width = `${(percentage / 100) * 225}px`;
    }
  };

  const handleProgressBarState = () => {
    switch (pointType) {
      case "normal": {
        return "blue";
      }
      case "positive": {
        return "green";
      }
      case "negative": {
        return "red";
      }
      default:
        return "blue";
    }
  };

  useEffect(() => {
    const element = document.getElementById("progress-bar");
    if (element) {
      element.style.backgroundColor = handleProgressBarState();
    }
  }, [pointType, percentage]);

  useEffect(() => {
    handleProgressBarLength();
  }, [percentage]);

  return <div id="progress-bar" className={`progress-bar rounded `}></div>;
}

export default ProgressBar;
