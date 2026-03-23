import React, { useState } from "react";
import PropTypes from "prop-types";

const DAYS_OF_WEEK = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
const MONTHS = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

export default function InterviewCalendar({ events, currentMonth, currentYear }) {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [viewMode, setViewMode] = useState("Mois");

  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const daysInPrevMonth = getDaysInMonth(month - 1, year);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const getEventForDay = (day) => events.find((e) => e.day === day);

  const renderCalendarDays = () => {
    const cells = [];

    // Jours du mois precedent
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push(
        <div
          key={`prev-${i}`}
          className="min-h-[110px] p-2 border-t border-border opacity-40"
        >
          <span className="text-sm font-body text-text-secondary">
            {daysInPrevMonth - i}
          </span>
        </div>
      );
    }

    // Jours du mois courant
    for (let day = 1; day <= daysInMonth; day++) {
      const event = getEventForDay(day);
      const isToday = event?.isToday;

      cells.push(
        <div
          key={day}
          className={`min-h-[110px] p-2 border-t border-border ${
            isToday ? "bg-primary/5" : ""
          }`}
        >
          <span
            className={`text-sm font-body ${
              isToday
                ? "text-primary font-extrabold"
                : "text-text-primary font-medium"
            }`}
          >
            {day}
          </span>

          {event && (
            <div
              className={`mt-2 p-2 rounded-lg text-xs font-body ${
                event.isToday
                  ? "bg-primary text-white shadow-md"
                  : event.color === "primary"
                  ? "bg-primary/10 border-l-4 border-primary text-primary"
                  : "bg-secondary/10 border-l-4 border-secondary text-secondary"
              }`}
            >
              <p className="font-semibold truncate">{event.title}</p>
              <p className={event.isToday ? "opacity-80" : "opacity-70"}>
                {event.time}
              </p>
            </div>
          )}
        </div>
      );
    }

    // Jours du mois suivant pour completer la grille
    const remainingCells = 42 - cells.length;
    for (let i = 1; i <= remainingCells; i++) {
      cells.push(
        <div
          key={`next-${i}`}
          className="min-h-[110px] p-2 border-t border-border opacity-40"
        >
          <span className="text-sm font-body text-text-secondary">{i}</span>
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Navigation mois */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl hover:bg-bg-soft transition-colors"
          >
            <span className="material-symbols-outlined text-text-secondary">
              chevron_left
            </span>
          </button>
          <h2 className="font-display text-xl font-bold text-text-primary min-w-[180px] text-center">
            {MONTHS[month]} {year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl hover:bg-bg-soft transition-colors"
          >
            <span className="material-symbols-outlined text-text-secondary">
              chevron_right
            </span>
          </button>
        </div>

        {/* Toggle vue */}
        
      </div>

      {/* Grille calendrier */}
      <div className="grid grid-cols-7">
        {/* En-tetes jours */}
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-xs font-body font-semibold text-text-secondary uppercase tracking-wider"
          >
            {day}
          </div>
        ))}

        {/* Cellules calendrier */}
        {renderCalendarDays()}
      </div>
    </div>
  );
}

InterviewCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      color: PropTypes.oneOf(["primary", "secondary"]).isRequired,
      isToday: PropTypes.bool,
    })
  ).isRequired,
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
};
