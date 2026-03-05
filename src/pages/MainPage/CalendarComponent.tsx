import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Calendar.module.scss";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(newSelectedDate);
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = (firstDayOfMonth(year, month) + 6) % 7; // Начинаем с понедельника
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyCell}></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isSelected =
        selectedDate?.getDate() === day &&
        selectedDate?.getMonth() === month &&
        selectedDate?.getFullYear() === year;

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`${styles.dayButton} ${isSelected ? styles.selected : ""}`}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const dayLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.header}>
        <h2>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className={styles.navButtons}>
          <button onClick={handlePrevMonth}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNextMonth}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {dayLabels.map((label) => (
          <div key={label} className={styles.dayLabel}>
            {label}
          </div>
        ))}
        {renderDays()}
      </div>

      {selectedDate && (
        <div className={styles.footer}>
          Выбрано: {selectedDate.toLocaleDateString("ru-RU")}
        </div>
      )}
    </div>
  );
};

export default Calendar;
