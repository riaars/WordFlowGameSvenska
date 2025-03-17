import React, { useEffect } from "react";

interface ProgressBarProps {
  percentage: number;
}

function ProgressBar({ percentage }: ProgressBarProps) {
  const handleProgressBarLength = () => {
    const element = document.getElementById("progress-bar");
    if (element) {
      element.style.width = `${(percentage / 100) * 225}px`;
    }
  };

  useEffect(() => {
    handleProgressBarLength();
  }, [percentage]);

  return (
    <div id="progress-bar" className={`progress-bar rounded border `}></div>
  );
}

export default ProgressBar;
