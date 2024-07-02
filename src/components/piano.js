import styled from "styled-components";
import * as Tone from "tone";
import React from "react";

const PianoContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: fit-content;
`;

const Key = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isBlack ? "#90" : "#f0f0f0")};
  }
`;

const WhiteKey = styled(Key)`
  width: 75px;
  height: 400px;
  background-color: white;
  border: 1px solid black;
  position: relative;
  z-index: 1;
`;

const BlackKey = styled(Key)`
  width: 50px;
  height: 250px;
  color: white;
  borderl: 1px solid black;
  background-color: black;
  position: absolute;
  left: ${(props) => props.$leftOffset}px;
  top: 0;
  z-index: 2;
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

const getBlackKeyOffset = (index) => {
  switch (index) {
    case 0:
    case 1:
    case 3:
    case 4:
    case 5:
      return 50;
    default:
      return 0;
  }
};

const PianoComponent = () => {
  const synth = new Tone.Synth().toDestination();

  const playNote = async (note) => {
    await Tone.start();
    synth.triggerAttackRelease(note, "8n");
  };

  return (
    <PianoContainer>
      {whiteKeys.map((key, index) => (
        <div key={index} style={{ position: "relative" }}>
          <WhiteKey onMouseDown={() => playNote(noteMapping[index])}>
            {key}
          </WhiteKey>
          {blackKeys[index] && (
            <BlackKey
              key={index}
              $leftOffset={getBlackKeyOffset(index)}
              onMouseDown={() =>
                playNote(noteMapping[index + whiteKeys.length])
              }
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
