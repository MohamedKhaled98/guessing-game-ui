import { useState } from "react";
import Button from "../Shared/button";

type Props = {
  onSubmit: (value: string) => void;
};
const WelcomeScreen = ({ onSubmit }: Props) => {
  const [playerName, setPlayerName] = useState("");
  const disabled = playerName.length < 3;
  return (
    <div className="bg-mid-dark border border-slate-700 rounded-lg flex-col col-span-4 p-5 text-center">
      <h1 className="text-2xl font-bold text-slate-300 my-20">Welcome</h1>
      <div className="text-sm font-semibold text-slate-500 mb-3">
        Please Insert Your Name
      </div>
      <input
        type="text"
        className="p-2 bg-dark rounded-lg grow outline-none border border-slate-700 w-full"
        value={playerName}
        onChange={({ target }) => setPlayerName(target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter" && !disabled) {
            onSubmit(playerName);
          }
        }}
      />
      <Button
        className="mt-2 w-full"
        title="Accept"
        onClick={() => onSubmit(playerName)}
        disabled={disabled}
      />
    </div>
  );
};

export default WelcomeScreen;
