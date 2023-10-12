import React, { useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Carousel from "./components/Carousel";

function App() {
  useEffect(() => {
    document.title = "Keebi3."
  }, []);

  return (
    <div>
      <NavigationBar />
      <Carousel />
    </div>
  );
}

export default App;
