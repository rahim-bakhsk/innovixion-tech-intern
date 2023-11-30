import { useEffect } from "react";
import { useState } from "react";

function Nav({ onNavClick, isSideBarOpen, data }) {
  const [isMobileSideBar, setIsMobileSideBar] = useState(isSideBarOpen);

  return (
    <>
      <header className="flex justify-between items-center px-4 py-5 bg-gray-50 shadow-md shadow-gray-200 ">
        <a
          href="#"
          className="capitalize font-semibold sm:text-lg md:text-xl text-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 inline me-1"
          >
            <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
          </svg>
          to-do
          <span className="text-slate-900 ps-1">App</span>
        </a>

        <button
          type="button"
          className="flex flex-col gap-1 sm:hidden"
          onClick={() => setIsMobileSideBar(true)}
        >
          <span className="h-1 w-7 bg-slate-700"></span>
          <span className="h-1 w-7 bg-slate-700"></span>
          <span className="h-1 w-7 bg-slate-700"></span>
        </button>

        <nav className="items-center gap-1 md:gap-5 hidden sm:flex">
          <div className="relative z-20 capitalize py-2 px-3 font-semibold sm:text-lg md:text-xl flex items-center group hover:text-green-500 cursor-pointer">
            <>
              uncompleted tasks
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 mt-1 text-gray-500 group-hover:text-green-500 transition-all duration-300 group-hover:rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </>

            <div className="w-full h-0 overflow-hidden absolute top-11 translate-y-10 bg-white shadow-gray-300 shadow-md   rounded-lg transition-transform duration-500 group-hover:h-fit group-hover:mx-auto group-hover:translate-y-0 ">
              <ul className="py-3 text-left text-black">
                {data.tasksData.uncompletedTasks.length ? (
                  data.tasksData.uncompletedTasks.map((uncompletedTask) => {
                    return (
                      <li
                        className="border-b-2 border-b-gray-100 px-3 py-2 text-base hover:bg-green-50 transition-colors duration-500 flex items-center"
                        key={uncompletedTask.taskID}
                      >
                        <button
                          onClick={() => onNavClick(uncompletedTask)}
                          className="w-full h-full capitalize text-left "
                        >
                          {uncompletedTask.taskName}
                        </button>

                        <button type="button" className="hover:text-red-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                          </svg>
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <small className="cursor-none px-3">not any task</small>
                )}
              </ul>
            </div>
          </div>

          <div className="relative z-20 capitalize py-2 px-3 font-semibold sm:text-lg md:text-xl flex items-center group hover:text-green-500 cursor-pointer">
            <>
              completed tasks
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 mt-1 text-gray-500 group-hover:text-green-500 transition-all duration-300 group-hover:rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </>

            <div className="w-full h-0 overflow-hidden absolute top-11 translate-y-10 bg-white shadow-gray-300 shadow-md   rounded-lg transition-transform duration-500 group-hover:h-fit group-hover:mx-auto group-hover:translate-y-0 ">
              <ul className="p-3 text-left text-black">
                {data.tasksData.completedTasks.length ? (
                  data.tasksData.completedTasks.map((completedTask) => {
                    return (
                      <li
                        className="border-b-2 border-b-gray-100 py-2 text-base"
                        key={completedTask.taskID}
                      >
                        <button
                          onClick={() => onNavClick(completedTask)}
                          className="w-full text-left"
                        >
                          {completedTask.taskName}
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <small className="cursor-none px-3">not any task</small>
                )}
              </ul>
            </div>
          </div>

          <div className="h-10 w-10 rounded-full ring-white ring-4">
            <img
              src="./src/assets/react.svg"
              alt="profile image"
              className="w-full h-full"
            />
          </div>
        </nav>

        {/* mobile side bar */}
        <div
          className={`h-full absolute top-0 left-0 z-10 bg-gray-100 transition-all duration-500 ${
            isMobileSideBar
              ? "w-8/12 p-3 pt-5 translate-x-0"
              : "w-0 p-0 overflow-hidden -translate-x-96"
          }`}
        >
          <div className="flex justify-between items-center">
            <a
              href="#"
              className="capitalize font-semibold sm:text-lg md:text-xl text-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 inline me-1"
              >
                <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
              </svg>
              to-do
              <span className="text-slate-900 ps-1">App</span>
            </a>
            <button
              type="button"
              className="cursor-pointer  hover:text-red-600 hover:-rotate-90 transition-all duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6"
                onClick={() => setIsMobileSideBar(false)}
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>{" "}
          </div>

          {/* un */}

          <div className="w-full pt-10 group">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold capitalize group-hover:text-green-500">
                uncompleted Task
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 mt-1 text-gray-500 group-hover:text-green-500 transition-all duration-300  group-hover:rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="w-full h-0 overflow-hidden relative top-5 mb-4 bg-white transition-all duration-500 group-hover:h-fit">
              <ul className="py-3 text-left text-black">
                {data.tasksData.uncompletedTasks.length ? (
                  data.tasksData.uncompletedTasks.map((uncompletedTask) => {
                    return (
                      <li
                        className="border-b-2 border-b-gray-100 px-3 py-2 text-base hover:bg-green-50 transition-colors duration-500 flex items-center"
                        key={uncompletedTask.taskID}
                      >
                        <button
                          onClick={() => {
                            setIsMobileSideBar(false);
                            return onNavClick(uncompletedTask);
                          }}
                          className="w-full h-full capitalize text-left "
                        >
                          {uncompletedTask.taskName}
                        </button>

                        <button type="button" className="hover:text-red-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                          </svg>
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <small className="cursor-none px-3">not any task</small>
                )}
              </ul>
            </div>
          </div>

          {/* com */}
          <div className="w-full pt-4 group">
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold capitalize group-hover:text-green-500">
                completed Task
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 mt-1 text-gray-500 group-hover:text-green-500 transition-all duration-300  group-hover:rotate-180"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="w-full h-0 overflow-hidden relative top-5 bg-white transition-all duration-500 group-hover:h-fit">
              <ul className="p-3 text-left text-black">
                {data.tasksData.completedTasks.length ? (
                  data.tasksData.completedTasks.map((completedTask) => {
                    return (
                      <li
                        className="border-b-2 border-b-gray-100 py-2 text-base"
                        key={completedTask.taskID}
                      >
                        <button
                          onClick={() => {
                            setIsMobileSideBar(false);
                            return onNavClick(completedTask);
                          }}
                          className="w-full text-left"
                        >
                          {completedTask.taskName}
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <small className="cursor-none px-3">not any task</small>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Nav;
