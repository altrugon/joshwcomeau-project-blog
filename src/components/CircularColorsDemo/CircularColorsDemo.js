"use client";
import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion, MotionConfig } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";
import { is } from "date-fns/locale";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const id = React.useId();
  const intervalRef = React.useRef(null);
  const [isRunning, setIsRunning] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  // COLORS array:
  const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);

  React.useEffect(() => {
    intervalRef.current = setTimeout(() => {
      if (isRunning) {
        const newTime = timeElapsed + 1;
        const newColor = newTime % COLORS.length;
        setSelectedColor(COLORS[newColor]);
        setTimeElapsed(newTime);
      }
    }, 1000);
    return () => clearTimeout(intervalRef.current);
  }, [isRunning, timeElapsed]);

  function handlePlayPauseClick() {
    setIsRunning(!isRunning);
  }

  function handleResetClick() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeElapsed(0);
    setSelectedColor(COLORS[0]);
  }

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layoutId={id}
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={handlePlayPauseClick}>
              {isRunning ? <Pause /> : <Play />}
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
            <button onClick={handleResetClick}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
