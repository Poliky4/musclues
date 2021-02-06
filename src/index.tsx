import { h, render } from "preact";
import { useEffect } from "preact/hooks";
import { musclues } from "./script";
import "./css/styles.css";

const App = () => {
  useEffect(() => {
    musclues();
  }, []);

  return (
    <div class="app">
      <canvas></canvas>

      <div class="ui">
        <div class="excercises"></div>
      </div>
    </div>
  );
};

render(<App />, document.body);
