import React from "react";
import * as Tone from 'tone';
import styled from "styled-components";

const keys = [
  { note: "C4", type: "white" },
  { note: "C#4", type: "black" },
  { note: "D4", type: "white" },
  { note: "D#4", type: "black" },
  { note: "E4", type: "white" },
  { note: "F4", type: "white" },
  { note: "F#4", type: "black" },
  { note: "G4", type: "white" },
  { note: "G#4", type: "black" },
  { note: "A4", type: "white" },
  { note: "A#4", type: "black" },
  { note: "B4", type: "white" },
  { note: "C5", type: "white" },
];

const PianoContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: fit-content;
`;

const WhiteKey = styled.div`
  width: 90px;
  height: 400px;
  background-color: white;
  border: 1px solid black;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
`;

const BlackKey = styled.div`
  width: 60px;
  height: 250px;
  background-color: black;
  border: 1px solid black;
  position: absolute;
  left: ${(props) => props.leftOffset}px;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
`;

const PianoComponent = () => {
  const synth = new Tone.Synth().toDestination();

  const playNote = (note) => {
    synth.triggerAttackRelease(note, "8n");
  };

  return (
    <PianoContainer>
      {keys.map((key, index) => {
        if (key.type === "white") {
          return (
            <WhiteKey key={index} onMouseDown={() => playNote(key.note)}>
              {key.note}
            </WhiteKey>
          );
        } else {
          const leftOffset = (index * 60) - 20;
          return (
            <BlackKey
              key={index}
              leftOffset={leftOffset}
              onMouseDown={() => playNote(key.note)}
            >
              {key.note}
            </BlackKey>
          );
        }
      })}
    </PianoContainer>
  );
};

export default PianoComponent;
