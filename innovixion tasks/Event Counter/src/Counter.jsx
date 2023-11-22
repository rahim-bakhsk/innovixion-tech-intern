import { useEffect, useState } from "react";

function Counter({ countDownWindowData }) {
  const { name, emoji = "🤚", date, color, description } = countDownWindowData;
  const [remain, setRemain] = useState({});

  const oneSecond = 1000 * 60;
  const oneHour = oneSecond * 60;
  const oneDay = oneHour * 24;

  const calculateTimeLeft = () => {
    const deadLine = new Date(date).getTime();
    const currentDate = new Date().getTime();
    let distinction = deadLine - currentDate;

    const remainingDays = Math.floor(distinction / oneDay);
    const remainingHours = Math.floor((distinction % oneDay) / oneHour);
    const remainingMinutes = Math.floor((distinction % oneHour) / oneSecond);
    const remainingSeconds = Math.floor((distinction % oneSecond) / 1000);

    return setRemain(() => ({
      remainingDays,
      remainingHours,
      remainingMinutes,
      remainingSeconds,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10 lg:pt-10 h-full">
      <div className="flex items-center justify-around gap-10 py-10">
        <div className="flex">
          <p className="flex flex-col items-start">
            <span className="text-8xl font-medium text-sky-500">
              {remain.remainingDays} ,
            </span>
            <span className="ps-2">Day</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="text-8xl font-medium text-sky-500">
              {remain.remainingHours}:
            </span>
            <span className="pe-2">Hour</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="text-8xl font-medium text-sky-500">
              {remain.remainingMinutes}:
            </span>
            <span className="pe-2">Minute</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="text-8xl font-medium text-sky-500">
              {remain.remainingSeconds}
            </span>
            <span>Second</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-end">
        <span className="text-gray-300 text-4xl">up tp </span>
        <h1
          className={`inline text-sky-400 underline text-5xl uppercase font-semibold pt-5 px-10 decoration-${color}-500 underline-offset-8`}
        >
          {name}
        </h1>
        <span className="text-gray-300 text-4xl pe-3">on </span>
        <span className="text-base text-red-500 underline underline-offset-4 decoration-red-600 ">
          {date}
        </span>
      </div>
    </div>
  );
}

export default Counter;
