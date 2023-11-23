import { useState, useEffect } from "react";
import Counter from "./Counter";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [states, setStates] = useState({
    isEventInput: false,
    isDescInput: false,
    isDateInput: false,
    isCreatingNewEvent: false,
  });

  const [formData, setFormData] = useState({
    eventDate: "",
    eventDesc: "",
    eventName: "",
    eventHour: "",
  });
  const [eventsArray, setEventsArray] = useState([]);
  const [countDownWindowData, setCountDownWindowData] = useState({});

  useEffect(() => {
    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem("eventsArray")) || [];
    setEventsArray(existingData);
  }, []);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Create a new object with the current form data
    const newEventData = { eventID: uuidv4(), ...formData };
    // Update the array with the new object
    const updatedArray = [...eventsArray, newEventData];
    // Update state and local storage with the new array
    setEventsArray(updatedArray);
    localStorage.setItem("eventsArray", JSON.stringify(updatedArray));
    return setStates((prev) => ({ ...prev, isCreatingNewEvent: false }));
  };

  // const [ID, setID] = useState(null);
  // let countDownWindowAnalyser = (eventsArray, id) => {
  //   const selectedEvent = eventsArray.find((item) => item.eventID === id);

  //   if (selectedEvent) {
  //     setCountDownWindowData({
  //       name: selectedEvent.eventName,
  //       date: selectedEvent.eventDate,
  //       hour: selectedEvent.eventHour,
  //       description: selectedEvent.eventDesc,
  //     });
  //   } else {
  //     console.log("Event not found");
  //   }
  // };

  // useEffect(() => {
  //   countDownWindowAnalyser(eventsArray, ID);
  //   console.log(countDownWindowData);
  // }, [ID]);

  return (
    <section className="flex h-screen bg-slate-950">
      {/* side bar */}
      <div className="w-full sm:w-4/12  lg:w-3/12 p-5 h-full bg-slate-700 text-sky-100">
        <h2 className="text-lg capitalize pb-10 flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          <span>event counter</span>
        </h2>
        <button
          type="button"
          className="p-3 rounded-lg border flex gap-1 overflow-hidden relative before:content-[' '] before:absolute before:bg-gray-400  before:top-0 before:bottom-0 before:-z-10 z-20 before:w-full before:h-0 before:left-0 before:right-0 before:m-auto before:rotate-45 before:-translate-x-16 hover:before:translate-x-32 hover:before:h-full before:transition-all before:duration-700 "
          onClick={() =>
            setStates((prev) => ({ ...prev, isCreatingNewEvent: true }))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>New Event</span>
        </button>
        <div className="pt-5">
          {eventsArray.map((event) => {
            return (
              <button
                className="text-lg w-full text-left capitalize my-1 py-2 ps-1 transition-all duration-500 hover:bg-red-500"
                key={event.eventID}
                // onClick={()=>setID(event,eventID)}
                onClick={() => {
                  const selectedEvent = eventsArray.find(
                    (item) => item.eventID === event.eventID
                  );

                  return (
                    selectedEvent &&
                    setCountDownWindowData({
                      name: selectedEvent.eventName,
                      date: selectedEvent.eventDate,
                      hour: selectedEvent.eventHour,
                      description: selectedEvent.eventDesc,
                    })
                  );
                }}
              >
                {event.eventName}
              </button>
            );
          })}
        </div>
      </div>
      {/* countdown window */}
      <div className="w-full  sm:w-8/12 h-full p-5 relative">
        {Object.keys(countDownWindowData).length && (
          <Counter countDownWindowData={countDownWindowData} />
        )}

        {countDownWindowData ? (
          <div className="text-white flex justify-center items-center h-full capitalize">
            <div>
              <p className="text-center">save your event and enjoy it.</p>
              <p className=" text-center block text-red-500 underline underline-offset-8">
                Don`t loose your momments !!!
              </p>
            </div>
          </div>
        ) : (
          false
        )}
      </div>

      {/* modal */}
      <div
        className={`${
          states.isCreatingNewEvent
            ? "w-10/12 lg:w-3/12 h-fit  p-10 border-2 border-indigo-500"
            : "h-0 w-0 overflow-hidden p-0 border-0 opacity-0"
        }  fixed bottom-0 right-0 left-0 top-0 m-auto z-10 bg-gray-200 rounded-2xl transition-all duration-500 delay-100`}
      >
        <button
          type="button"
          className="absolute right-5 top-5 hover:text-red-500 text-indigo-500"
          onClick={() =>
            setStates((prev) => ({ ...prev, isCreatingNewEvent: false }))
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.7}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="eventName"
              className={`capitalize ${
                states.isEventInput
                  ? "translate-y-0 transition-all duration-500"
                  : "translate-y-5"
              }`}
            >
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              id="eventName"
              className="w-full bg-transparent border-b border-indigo-500 focus:outline-0"
              placeholder=""
              value={formData.eventName}
              onClick={() =>
                setStates((prev) => ({ ...prev, isEventInput: true }))
              }
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="eventDesc"
              className={`capitalize ${
                states.isDescInput
                  ? "translate-y-0 transition-all duration-500"
                  : "translate-y-5"
              }`}
            >
              tell us about it
            </label>
            <textarea
              type="text"
              name="eventDesc"
              id="eventDesc"
              value={formData.eventDesc}
              className="w-full bg-transparent border-b border-indigo-500 focus:outline-0"
              maxLength="35"
              onClick={() =>
                setStates((prev) => ({ ...prev, isDescInput: true }))
              }
              onFocus={() =>
                setStates((prev) => ({ ...prev, isDescInput: true }))
              }
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col pt-4">
            <input
              type="date"
              name="eventDate"
              id="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-b-indigo-500 focus:outline-0 pb-1"
            />
          </div>
          <div className="flex flex-col pt-4">
            <input
              type="time"
              required
              name="eventHour"
              id="eventHour"
              value={formData.eventHour}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-b-indigo-500 focus:outline-0 pb-1"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-3 py-1.5 bg-indigo-500 rounded hover:bg-indigo-400 transition-all duration-500 font-bold text-white"
          >
            Create
          </button>
        </form>
      </div>
      {/* \/////////////////////// */}
    </section>
  );
}

export default App;
