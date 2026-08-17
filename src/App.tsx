import "./App.css";
import { useRef, useState } from "react";
import * as React from "react";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type MessageType = "success" | "error" | "default";

type Message = {
  content: React.ReactNode;
  type: MessageType;
};

function App() {
  const [userNumber, setUserNumber] = useState<number | "">("");
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const [generatedValue, setGeneratedValue] = useState<number>(
    getRandomInt(0, 100),
  );
  const [attempt, setAttempt] = useState<number>(5);
  const numberInputRef = useRef<HTMLInputElement>(null);

  const onsubmitNumber = () => {
    if (userNumber === "") {
      return;
    }

    if (userNumber < 0 || userNumber > 100) {
      setMessage({
        type: "error",
        content: "Veuillez entrer un nombre entre 0 et 100",
      });
      return;
    }

    if (attempt > 1) {
      if (userNumber > generatedValue) {
        setMessage({ content: "Trop grand!", type: "default" });
      } else if (userNumber < generatedValue) {
        setMessage({ content: "Trop petit!", type: "default" });
      } else {
        setMessage({
          content: `Bravo! Vous avez trouvé la valeur après  ${5 - attempt} tentatives.`,
          type: "success",
        });
        return;
      }
      setAttempt(attempt - 1);
      numberInputRef.current?.focus();
    } else {
      setMessage({
        type: "error",
        content: (
          <>
            Perdu! Vous avez épuisé vos tentatives. <br /> Le nombre mystère
            était : {generatedValue}
          </>
        ),
      });
      setAttempt(attempt - 1);
      setUserNumber("");
    }
  };

  const getMessageColorByType = (type: MessageType) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "";
    }
  };

  const handleReset = () => {
    setMessage(undefined);
    setAttempt(5);
    numberInputRef.current?.focus();
    setGeneratedValue(getRandomInt(0, 100));
  };

  return (
    <div className="flex flex-col items-center mt-[10%] min-h-screen">
      <h1 className="py-4 text-5xl ">Guest number app</h1>
      <div className="border border-gray-200  rounded-md  flex flex-col items-center  p-4 gap-3 bg-gray-100">
        <h2>Deviner un nombre entre 0 et 100</h2>
        <h3>Vous avez 5 tentatives</h3>
        <h3>Tentatives restantes: {attempt}</h3>
        <input
          type="number"
          value={userNumber}
          ref={numberInputRef}
          onChange={(e) => {
            const value = e.target.value === "" ? "" : parseInt(e.target.value);
            setUserNumber(value);
          }}
          min="0"
          max="100"
          placeholder="Entrer un nombre entre 0 et 100"
          className="border border-gray-200 px-2 rounded-sm w-96 h-8"
        />

        {message && (
          <div className={`${getMessageColorByType(message.type)} `}>
            {" "}
            {message.content}
          </div>
        )}
        <div className="flex gap-3">
          <button
            className="bg-blue-500 h-8 mt-3 px-3 rounded-md cursor-pointer text-gray-200 disabled:bg-blue-500/60 disabled:cursor-not-allowed"
            onClick={onsubmitNumber}
            disabled={attempt === 0}
          >
            Valider
          </button>
          {attempt === 0 && (
            <button
              className="bg-gray-300 text-slate-700 h-8 mt-3 px-3 rounded-md cursor-pointer  "
              onClick={handleReset}
            >
              reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
