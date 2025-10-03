import React, { useState } from "react";
import Navbar from "../components/Navbar"; // Adjust the path as needed

interface PlayerStyles {
  borderThickness: string;
  color: string;
  width: string;
  height: string;
  borderRoundness: string;
  textColor: string;
  backgroundColor: string;
  [key: string]: string;
}

type PlayerKey = "player1" | "player2";
// Define the initial default styles
const initialPlayerStyles: PlayerStyles = {
  borderThickness: "border-2",
  backgroundColor: "bg-gray-700",
  color: "border-blue-500",
  width: "w-48",
  height: "h-32",
  borderRoundness: "rounded-lg",
  textColor: "text-yellow-400",
};

type ScorePosition = "left" | "right";

// Remove the 'message' prop from the Scoreboard function signature
export function Scoreboard() {
  const [player1ScorePosition, setPlayer1ScorePosition] =
    useState<ScorePosition>("right");
  const [player2ScorePosition, setPlayer2ScorePosition] =
    useState<ScorePosition>("right");
  const [editingPlayer, setEditingPlayer] = useState<"player1" | "player2">(
    "player1"
  );
  // 1. STATE: Store the style objects for both players
  const [player1Styles, setPlayer1Styles] =
    useState<PlayerStyles>(initialPlayerStyles);
  const [player2Styles, setPlayer2Styles] =
    useState<PlayerStyles>(initialPlayerStyles);

  // 2. HANDLER: Function to update the style from the Navbar
  const updatePlayerStyle = (
    playerKey: PlayerKey, // Must be 'player1' or 'player2'
    styleName: keyof PlayerStyles, // Must be one of the keys from the PlayerStyles interface
    value: string
  ) => {
    if (playerKey === "player1") {
      // TypeScript now knows prevStyles is of type PlayerStyles
      setPlayer1Styles((prevStyles) => ({ ...prevStyles, [styleName]: value }));
    } else if (playerKey === "player2") {
      setPlayer2Styles((prevStyles) => ({ ...prevStyles, [styleName]: value }));
    }
  };

  const activeStyles =
    editingPlayer === "player1" ? player1Styles : player2Styles;
  // 3. COMBINER: Function to combine the style objects into a single Tailwind class string
  const getPlayer1Class = () => {
    return Object.values(player1Styles).join(" ");
  };

  const getPlayer2Class = () => {
    // We'll use this if you add controls for Player 2 later
    return Object.values(player2Styles).join(" ");
  };

  // Get the margin class for the main content to push it away from the sidebar
  const sidebarWidthMinimized = "w-20"; // From SidebarNavbar.js
  const mlClass = `ml-${sidebarWidthMinimized.replace("w-", "")}`;

  return (
    <div className="flex w-full min-h-screen bg-gray-900">
      {/* 4. RENDER SIDEBAR: Pass the handler and the current P1 styles */}
      <Navbar
        updateStyle={updatePlayerStyle}
        currentStyles={activeStyles}
        playerKey={editingPlayer} // Pass the currently active key
        setEditingPlayer={setEditingPlayer} // NEW: Pass the state setter
        // NEW: Pass the individual score position states and setters
        player1ScorePosition={player1ScorePosition}
        setPlayer1ScorePosition={setPlayer1ScorePosition}
        player2ScorePosition={player2ScorePosition}
        setPlayer2ScorePosition={setPlayer2ScorePosition}
      />

      {/* 5. MAIN CONTENT AREA: Render the scoreboxes */}
      <div
        className={`flex-grow transition-all duration-300 ease-in-out ${mlClass}`}>
        <main className="flex flex-col items-center justify-center pt-16 pb-4">
          <div className="flex space-x-4">
            {/* PLAYER 1 BOX - Logic updated */}
            <div
              className={`flex items-center justify-center text-2xl border ${getPlayer1Class()}`}>
              {/* Player 1 Score Position Logic */}
              {player1ScorePosition === "left" && <p className="px-2">2</p>}
              <p className={`font-semibold px-2`}>Player 1</p>
              {player1ScorePosition === "right" && <p className="px-2">2</p>}
            </div>

            {/* PLAYER 2 BOX - Logic updated */}
            <div
              className={`flex items-center justify-center text-2xl border ${getPlayer2Class()}`}>
              {/* Player 2 Score Position Logic */}
              {player2ScorePosition === "left" && <p className="px-2">2</p>}
              <p className={`font-semibold px-2`}>Player 2</p>
              {player2ScorePosition === "right" && <p className="px-2">2</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
