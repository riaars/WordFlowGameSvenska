import React from "react";

interface DialogIntructionProps {
  title: string;
  toggleDialog: () => void;
}
function DialogInstruction({ title, toggleDialog }: DialogIntructionProps) {
  return (
    <div className="dialog-overlay fixed top-0">
      <div className="flex flex-col p-4 w-80 bg-white rounded">
        <div className="text-center text-xl font-bold mt-2 mb-2">{title}</div>
        <div className="self-start text-sm">
          <div className="mb-2">
            Here is the instruction how to play the game:
          </div>
          <ol className="list-decimal pl-4">
            <li>Tap on letters to add them to your word.</li>
            <li> Tap on a letter to remove it from your word.</li>
            <li>You can also clear the whole word. </li>
            <li>
              The longer the word, the more score and the more time gets added
              to your clock.
            </li>
            <li>If you use refresh, you lose time. </li>
          </ol>
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
