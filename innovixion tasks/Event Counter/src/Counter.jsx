import { useEffect, useState } from "react";

function Counter({ countDownWindowData }) {
  // const [data, setData] = useState(countDownWindowData);
  const { name, date, hour, description } = countDownWindowData;
  const [remain, setRemain] = useState({
    remainingDays: 0,
    remainingHours: 0,
    remainingMinutes: 0,
    remainingSeconds: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState(true);
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  const calculateTimeLeft = () => {
    let splitedHour = hour.split(":");
    let deadline = new Date(date).setHours(splitedHour[0], splitedHour[1]);
    deadline = new Date(deadline).getTime();
    const currentDate = new Date().getTime();
    let distinction = deadline - currentDate;

    const remainingDays = Math.floor(distinction / oneDay);
    const remainingHours = Math.floor((distinction % oneDay) / oneHour);
    const remainingMinutes = Math.floor((distinction % oneHour) / oneMinute);
    const remainingSeconds = Math.floor((distinction % oneMinute) / oneSecond);

    if (distinction > 0) {
      setRemain({
        remainingDays,
        remainingHours,
        remainingMinutes,
        remainingSeconds,
      });
      setFlag(true);
    } else {
      setFlag(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownWindowData]);

  return (
    <div className="p-10 lg:pt-10 h-full">
      {flag ? (
        <>
          <div className="flex items-center justify-around gap-10 py-10">
            <div className="flex">
              <p className="flex flex-col items-start">
                <span className="text-8xl font-medium text-sky-500">
                  {remain.remainingDays} ,
                </span>
                <span className="ps-2 text-white">Day</span>
              </p>
              <p className="flex flex-col items-center">
                <span className="text-8xl font-medium text-sky-500">
                  {remain.remainingHours}:
                </span>
                <span className="pe-2 text-white">Hour</span>
              </p>
              <p className="flex flex-col items-center">
                <span className="text-8xl font-medium text-sky-500">
                  {remain.remainingMinutes}:
                </span>
                <span className="pe-2 text-white">Minute</span>
              </p>
              <p className="flex flex-col items-center">
                <span className="text-8xl font-medium text-sky-500">
                  {remain.remainingSeconds}
                </span>
                <span className="text-white">Second</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center flex-wrap items-end">
            <span className="text-gray-300 text-4xl">up to </span>
            <h1
              className={`inline text-sky-400 underline text-5xl uppercase font-semibold pt-5 px-10  underline-offset-8 relative group`}
              onMouseOver={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              {name}
            </h1>
            <span className="text-gray-300 text-4xl pe-3">on </span>
            <span className="text-base text-red-500 underline underline-offset-4 decoration-red-600 ">
              {date}
            </span>
            <span className="text-sm text-white underline decoration-sky-500 underline-offset-4 ms-2 pb-[2px] pt-5">
              {hour}
            </span>
          </div>

          <p
            className={`pt-4 mx-auto text-white overflow-hidden text-sm text-center capitalize transition-all duration-500 ${
              isOpen ? "w-10/12" : "w-0"
            }`}
          >
            {description}
          </p>
        </>
      ) : (
        <>
          <div className="bg-red-500 font-semibold text-white py-4 text-4xl text-center">
            Event expired
          </div>
          <ul className="text-white capitalize pt-3">
            <li>event name : {name}</li>
            <li>event hour : {hour}</li>
            <li>event date : {date}</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Counter;
