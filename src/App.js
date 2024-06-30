import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import PianoComponent from "./components/piano";

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <PianoComponent />
      </div>
    </>
  );
}

export default App;
