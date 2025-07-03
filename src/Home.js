import { useState } from "react";
import { evaluate } from "mathjs";

const Home = () => {
  const chiffres = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [display, setDisplay] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleClick = (value) => {
    // Si le résultat vient d'être affiché et qu'on appuie sur un chiffre → on remplace l'affichage
    if (isResult && "0123456789".includes(value)) {
      setDisplay(value);
      setIsResult(false);
      return;
    }

    // Empêcher plusieurs zéros en début de nombre
    if (value === "0") {
      const parts = display.split(/[\+\-\*\/]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart === "0") return;
    }

    // Empêcher deux décimales dans le même nombre
    if (value === ".") {
      const parts = display.split(/[\+\-\*\/]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes(".")) return;
    }

    // Gérer plusieurs opérateurs consécutifs
    if ("+-*/".includes(value)) {
      const lastChar = display[display.length - 1];
      const secondLastChar = display[display.length - 2];

      if ("+-*/".includes(lastChar)) {
        // autoriser *- ou /- (pour les nombres négatifs)
        if (value === "-" && (lastChar === "*" || lastChar === "/")) {
          setDisplay((prev) => prev + value);
        } else {
          // sinon remplacer le dernier opérateur
          setDisplay((prev) => prev.slice(0, -1) + value);
        }
        return;
      }
    }

    // Ajouter la valeur normalement
    setDisplay((prev) => prev + value);
    setIsResult(false);
  };

  // Calculer le résultat
  const handleResult = () => {
    try {
      const result = evaluate(display);
      setDisplay(Number(result.toFixed(4)).toString()); // précision 4 décimales
      setIsResult(true);
    } catch (error) {
      setDisplay("Erreur");
      setIsResult(true);
    }
  };

  // Réinitialiser
  const handleClear = () => {
    setDisplay("");
    setIsResult(false);
  };

  return (
    <div
      id="drum-machine"
      className="h-screen w-screen flex flex-col p-4 bg-gray-100"
    >
      {/* Affichage */}
      <div
        id="display"
        className="my-4 text-3xl border border-gray-300 p-2 rounded bg-white"
      >
        {display || "0"}
      </div>

      {/* Commandes */}
      <div className="gap-4 grid grid-cols-3 justify-around mb-4">
        <button onClick={handleClear} className="text-3xl bg-red-400 p-2 rounded">
          AC
        </button>
        <button
          onClick={handleResult}
          className="text-3xl bg-green-400 p-2 rounded"
        >
          =
        </button>
      </div>

      {/* Chiffres + opérations */}
      <div className="w-full flex">
        <div className="grid grid-cols-3 grid-rows-4 gap-4 w-3/4 bg-slate-500 p-4 rounded-lg">
          {chiffres.map((chiffre) => (
            <button
              key={chiffre}
              id={chiffre}
              className="text-2xl bg-white p-3 rounded"
              onClick={() => handleClick(chiffre.toString())}
            >
              {chiffre}
            </button>
          ))}
          <button
            onClick={() => handleClick("-")}
            className="text-3xl bg-orange-300 p-3 rounded"
          >
            -
          </button>
          <button
            onClick={() => handleClick("+")}
            className="text-3xl bg-orange-300 p-3 rounded"
          >
            +
          </button>
          <button
            onClick={() => handleClick(".")}
            className="text-3xl bg-white p-3 rounded"
          >
            .
          </button>
        </div>

        <div className="w-1/4 flex flex-col justify-around bg-orange-200 p-4 rounded-lg ml-4">
          <button
            onClick={() => handleClick("/")}
            className="text-3xl bg-white p-3 rounded"
          >
            ÷
          </button>
          <button
            onClick={() => handleClick("*")}
            className="text-3xl bg-white p-3 rounded"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
