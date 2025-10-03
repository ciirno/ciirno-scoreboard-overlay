// src/components/SidebarNavbar.tsx

import React, { useState } from "react";

// --- INTERFACES ---

// 1. PlayerStyles Interface (must match the one in Scoreboard.tsx)
interface PlayerStyles {
  borderThickness: string;
  color: string;
  width: string;
  height: string;
  borderRoundness: string;
  textColor: string;
  [key: string]: string;
}
type ScorePositionSetter = React.Dispatch<
  React.SetStateAction<"left" | "right">
>;

// 2. SidebarNavbar Props Interface
interface SidebarNavbarProps {
  updateStyle: (
    playerKey: "player1" | "player2",
    styleName: keyof PlayerStyles,
    value: string
  ) => void;
  currentStyles: PlayerStyles;
  playerKey: "player1" | "player2";
  setEditingPlayer: React.Dispatch<React.SetStateAction<"player1" | "player2">>;
  player1ScorePosition: "left" | "right";
  setPlayer1ScorePosition: ScorePositionSetter;
  player2ScorePosition: "left" | "right";
  setPlayer2ScorePosition: ScorePositionSetter;
}

// 3. SelectControl Props Interface
interface SelectControlProps {
  label: string;
  name: string;
  options: string[];
}

// --- COMPONENT START ---

function SidebarNavbar({
  updateStyle,
  currentStyles,
  playerKey,
  setEditingPlayer,
  player1ScorePosition, // NEW
  setPlayer1ScorePosition, // NEW
  player2ScorePosition, // NEW
  setPlayer2ScorePosition, // NEW
}: SidebarNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarWidthExpanded = "w-64";
  const sidebarWidthMinimized = "w-20";

  // Helper arrays for options
  const borderThicknessOptions: string[] = [
    "border-0",
    "border",
    "border-2",
    "border-4",
    "border-8",
  ];
  const colorOptions: string[] = [
    "border-red-500",
    "border-green-500",
    "border-blue-500",
    "border-purple-500",
  ];
  const textColorOptions: string[] = [
    "text-white",
    "text-yellow-400",
    "text-pink-400",
    "text-lime-400",
  ];
  const roundnessOptions: string[] = [
    "rounded-none",
    "rounded-md",
    "rounded-lg",
    "rounded-xl",
    "rounded-full",
  ];
  const backgroundColorOptions: string[] = [
    "bg-gray-700",
    "bg-red-900",
    "bg-green-900",
    "bg-blue-900",
    "bg-purple-900",
    "bg-yellow-900",
  ];

  const widthOptions: string[] = ["w-20", "w-32", "w-48", "w-64"];
  const heightOptions: string[] = ["h-16", "h-24", "h-32", "h-48"];

  // Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const styleName = e.target.name as keyof PlayerStyles;
    const value = e.target.value;
    updateStyle(playerKey, styleName, value);
  };

  // SelectControl Sub-Component Implementation
  const SelectControl = ({ label, name, options }: SelectControlProps) => (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm mb-1">{label}</label>
      <select
        name={name}
        value={currentStyles[name] as string}
        onChange={handleChange}
        className="w-full p-2 bg-gray-700 text-white rounded text-sm focus:ring-2 focus:ring-blue-500">
        {options.map((option: string) => (
          <option key={option} value={option}>
            {name === "color" || name === "textColor" || "bgColor"
              ? option.split("-")[1]
              : option.replace(/^(border-|w-|h-|rounded-)/, "")}
          </option>
        ))}
      </select>
    </div>
  );

  const currentPosition =
    playerKey === "player1" ? player1ScorePosition : player2ScorePosition;
  const setPosition =
    playerKey === "player1" ? setPlayer1ScorePosition : setPlayer2ScorePosition;

  return (
    <>
      {/* SIDEBAR PANEL */}
      <nav
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white z-30
          flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? sidebarWidthExpanded : sidebarWidthMinimized}
          ${isOpen ? "p-4" : "p-2"} `}>
        {/* Top section: Title and Toggle Button */}
        <div
          className={`flex items-center
            ${isOpen ? "justify-between" : "justify-center"}
            mb-4 border-b border-gray-700 pb-2`}>
          <div
            className={`${isOpen ? "block" : "hidden"} text-white text-lg font-bold tracking-wider`}>
            Style Editor
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 p-2 rounded-md transition duration-300 hover:bg-gray-700"
            aria-label="Toggle customization panel">
            {isOpen ? (
              // Close Icon (X)
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Settings/Gear Icon when minimized
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Player Selector Buttons */}
        <div
          className={`${isOpen ? "flex" : "hidden"} justify-around p-1 mb-4 border-b border-gray-700`}>
          <button
            onClick={() => setEditingPlayer("player1")}
            className={`text-sm font-semibold p-2 rounded-md transition duration-200 
              ${playerKey === "player1" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
            Player 1
          </button>
          <button
            onClick={() => setEditingPlayer("player2")}
            className={`text-sm font-semibold p-2 rounded-md transition duration-200 
              ${playerKey === "player2" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
            Player 2
          </button>
        </div>

        {/* CUSTOMIZATION CONTROLS */}
        <div className={`${isOpen ? "block" : "hidden"} overflow-y-auto`}>
          <h4 className="text-md font-semibold mb-3 text-white">
            {playerKey === "player1" ? "Player 1 Styles" : "Player 2 Styles"}
          </h4>

          <SelectControl
            label="Border Thickness"
            name="borderThickness"
            options={borderThicknessOptions}
          />
          <SelectControl
            label="Border Color"
            name="color"
            options={colorOptions}
          />
          <SelectControl
            label="Background Color"
            name="backgroundColor"
            options={backgroundColorOptions}
          />
          <SelectControl
            label="Text Color"
            name="textColor"
            options={textColorOptions}
          />
          <SelectControl label="Width" name="width" options={widthOptions} />
          <SelectControl label="Height" name="height" options={heightOptions} />
          <SelectControl
            label="Roundness"
            name="borderRoundness"
            options={roundnessOptions}
          />
          <h4 className="text-sm font-semibold mb-2 text-white">
            Score Position
          </h4>
          <div className="p-1 mb-4 border-t border-b border-gray-700">
            <h4 className="text-sm font-semibold mb-2 text-white">
              Score Position
            </h4>
            <div className="flex justify-around space-x-2">
              <button
                onClick={() => setPosition("left")}
                className={`text-sm p-2 rounded w-full transition duration-200 
                        ${currentPosition === "left" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                Score Left
              </button>
              <button
                onClick={() => setPosition("right")}
                className={`text-sm p-2 rounded w-full transition duration-200 
                        ${currentPosition === "right" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
                Score Right
              </button>
            </div>
          </div>
        </div>

        {/* Minimized Icon/Indicator (Minimized View) */}
        <div
          className={`${isOpen ? "hidden" : "block"} flex flex-col items-center space-y-4 pt-4`}>
          <p className="text-xs text-gray-500 transform -rotate-90 whitespace-nowrap pt-12">
            STYLE
          </p>
        </div>
      </nav>
    </>
  );
}

export default SidebarNavbar;
