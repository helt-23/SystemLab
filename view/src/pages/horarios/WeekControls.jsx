import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./app.css";

const WeekControls = ({ currentWeek, setCurrentWeek }) => {
  return (
    <div className="week-controls">
      <button
        onClick={() => setCurrentWeek((w) => Math.max(w - 1, 0))}
        disabled={currentWeek === 0}
      >
        <ChevronLeft size={20} />
      </button>
      <span>Semana {currentWeek + 1}</span>
      <button onClick={() => setCurrentWeek((w) => w + 1)}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default WeekControls;