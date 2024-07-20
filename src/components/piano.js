import styled, { css } from "styled-components";
import * as Tone from "tone";
import React, { useEffect } from "react";

const PianoContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: fit-content;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Key = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: background-color 0.1s ease, box-shadow 0.1s ease;
  user-select: none;

  &:hover {
    background-color: ${(props) => (props.isBlack ? "#606060" : "#e0e0e0")};
  }

  &:active {
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const WhiteKey = styled(Key)`
  width: 75px;
  height: 400px;
  background: linear-gradient(to bottom, #fff 0%, #ddd 100%);
  border: 1px solid #ccc;
  border-bottom: 4px solid #bbb;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.active &&
    css`
      background-color: #e0e0e0;
      box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3);
    `}
`;

const BlackKey = styled(Key)`
  width: 50px;
  height: 250px;
  background: linear-gradient(to bottom, #000 0%, #333 100%);
  color: white;
  border: 1px solid #222;
  position: absolute;
  left: ${(props) => props.$leftOffset}px;
  top: 0;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  ${(props) =>
    props.active &&
    css`
      background-color: #606060;
      box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3);
    `}
`;

const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
const blackKeys = ["C#", "D#", "", "F#", "G#", "A#", "", ""];
const noteMapping = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C#4",
  "D#4",
  "",
  "F#4",
  "G#4",
  "A#4",
];
const whiteKeyMappings = ["a", "s", "d", "f", "g", "h", "j"];
const blackKeyMappings = ["w", "e", "", "t", "y", "u", "", ""];

const getBlackKeyOffset = (index) => {
  switch (index) {
    case 0:
    case 1:
    case 3:
    case 4:
    case 5:
      return 55;
    default:
      return 0;
  }
};

const PianoComponent = () => {
  const synth = new Tone.Synth().toDestination();
  const [activeKeys, setActiveKeys] = React.useState({});

  const playNote = async (note) => {
    await Tone.start();
    synth.triggerAttackRelease(note, "8n");
  };

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();
    const whiteKeyIndex = whiteKeyMappings.indexOf(key);
    const blackKeyIndex = blackKeyMappings.indexOf(key);

    if (whiteKeyIndex !== -1) {
      playNote(noteMapping[whiteKeyIndex]);
      setActiveKeys((prev) => ({ ...prev, [key]: true }));
    } else if (blackKeyIndex !== -1) {
      playNote(noteMapping[blackKeyIndex + whiteKeys.length]);
      setActiveKeys((prev) => ({ ...prev, [key]: true }));
    }
  };

  const handleKeyUp = (event) => {
    const key = event.key.toLowerCase();
    setActiveKeys((prev) => ({ ...prev, [key]: false }));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <PianoContainer>
      {whiteKeys.map((key, index) => (
        <div key={index} style={{ position: "relative" }}>
          <WhiteKey
            onMouseDown={() => playNote(noteMapping[index])}
            active={activeKeys[whiteKeyMappings[index]]}
          >
            {key}
          </WhiteKey>
          {blackKeys[index] && (
            <BlackKey
              key={`black-${index}`}
              $leftOffset={getBlackKeyOffset(index)}
              onMouseDown={() =>
                playNote(noteMapping[index + whiteKeys.length])
              }
              active={activeKeys[blackKeyMappings[index]]}
            >
              {blackKeys[index]}
            </BlackKey>
          )}
        </div>
      ))}
    </PianoContainer>
  );
};

export default PianoComponent;
