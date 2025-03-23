import React from "react";

interface DialogIntructionProps {
  title: string;
  toggleDialog: () => void;
}
function DialogInstruction({ title, toggleDialog }: DialogIntructionProps) {
  return (
    <div className="dialog-overlay fixed top-0">
      <div className="flex flex-col p-4 w-80 bg-white rounded">
        <div className="text-xl font-bold mt-2 mb-2">{title}</div>
        <div className="flex flex-col justify-start text-sm">
          Here is the instruction how to play the game:
          <ul>
            <li>1. </li>
            <li>2. </li>
          </ul>
        </div>
        <div className="flex flex-row justify-end gap-1 mt-4">
          <button
            className="ml-2 p-2 bg-green-500 text-white text-sm font-bold mt-2 mb-2 border rounded-full"
            onClick={toggleDialog}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogInstruction;
