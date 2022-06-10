import { useEffect, useState } from "react";
import Sound from "./assets/alert.mp3";
import Add from "./assets/img/add.svg";
import AddLight from "./assets/img/addLight.svg";
import Remove from "./assets/img/remove.svg";
import RemoveLight from "./assets/img/removeLight.svg";
import Play from "./assets/img/play.svg";
import Pause from "./assets/img/pause.svg";
import Stop from "./assets/img/stop.svg";
import ThemeDark from "./assets/img/theme1.svg";
import ThemeLight from "./assets/img/theme2.svg";
import "./styles.css";

const COUNT_AMOUNT_START_SECONDS = 0;

export default function App() {
  const [secondsAmount, setSecondsAmount] = useState<number>(
    COUNT_AMOUNT_START_SECONDS
  );

  const [active, setActive] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("dark");

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const body = document.body;
    if (theme === "dark") {
      body.style.cssText = "background-color: #2C3333;";
    } else if (theme === "light") {
      body.style.cssText = "background-color: #dedede;";
    }
  }, [theme]);

  useEffect(() => {
    let interval: number | undefined;

    if (active) {
      interval = setInterval(() => {
        if (secondsAmount > 0) {
          setSecondsAmount((state) => state - 1);
          if (secondsAmount === 1) {
            let audio = new Audio(Sound);
            audio.play();
            setActive(false);
          }
        } else {
          setActive(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [active, secondsAmount]);

  const handleStart = () => {
    if (secondsAmount > 0) setActive(true);
  };

  const handleReset = () => {
    setSecondsAmount(COUNT_AMOUNT_START_SECONDS);
    setActive(false);
  };

  const handlePause = () => setActive(false);

  const handleAddMinute = () => {
    if (active) return;
    setSecondsAmount((state) => state + 60);
    setTheme("light");
  };

  const handleRemoveMinute = () => {
    if (active) return;
    if (secondsAmount >= 60) {
      setSecondsAmount((state) => state - 60);
      return;
    }
    return;
  };
  return (
    <main className="body">
      <div className="container">
        <div className={`stopwatch-${theme}`}>
          <h1>COUNTDOWN</h1>
          {theme === "dark" ? (
            <button
              title="Change theme"
              onClick={() => {
                setTheme("light");
              }}
              className="buttonPlay"
            >
              <img id="playButton" src={ThemeDark} />
            </button>
          ) : (
            <button
              title="Change theme"
              onClick={() => {
                setTheme("dark");
              }}
              className="buttonPlay"
            >
              <img id="playButton" src={ThemeLight} />
            </button>
          )}
          <div className={`circle-${theme}`}>
            <button onClick={handleRemoveMinute}>
              {theme === "dark" ? (
                <img src={Remove} />
              ) : (
                <img src={RemoveLight} />
              )}
            </button>
            <span className={`time-${theme}`} id="display">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
            <button onClick={handleAddMinute}>
              {theme === "dark" ? <img src={Add} /> : <img src={AddLight} />}
            </button>
          </div>

          <div className="controls">
            <button
              onClick={active ? handlePause : handleStart}
              className="buttonPlay"
            >
              {!active ? (
                <img id="playButton" src={Play} />
              ) : (
                <img id="playButton" src={Pause} />
              )}
            </button>

            <button onClick={handleReset} className="buttonPlay">
              <img id="playButton" src={Stop} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
