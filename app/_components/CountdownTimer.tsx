"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  accentColor?: string;
}

export default function CountdownTimer({
  accentColor = "text-rose-500",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 12,
    minutes: 51,
    seconds: 48,
  });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-6 flex flex-col items-center md:items-start">
      <div className="text-sm font-medium text-gray-400">OFFER ENDS IN</div>
      <div className="mt-3 flex gap-3 text-white">
        <TimeUnit
          value={timeLeft.days.toString().padStart(2, "0")}
          label="DAYS"
          accentColor={accentColor}
        />
        <span className="text-2xl font-light text-gray-600">:</span>
        <TimeUnit
          value={timeLeft.hours.toString().padStart(2, "0")}
          label="HOURS"
          accentColor={accentColor}
        />
        <span className="text-2xl font-light text-gray-600">:</span>
        <TimeUnit
          value={timeLeft.minutes.toString().padStart(2, "0")}
          label="MINUTES"
          accentColor={accentColor}
        />
        <span className="text-2xl font-light text-gray-600">:</span>
        <TimeUnit
          value={timeLeft.seconds.toString().padStart(2, "0")}
          label="SECONDS"
          accentColor={accentColor}
        />
      </div>
    </div>
  );
}

function TimeUnit({
  value,
  label,
  accentColor,
}: {
  value: string;
  label: string;
  accentColor: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className={`text-3xl font-bold ${accentColor}`}>{value}</div>
      <div className="mt-1 text-xs font-medium text-gray-500">{label}</div>
    </div>
  );
}
