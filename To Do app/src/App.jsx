import { useState, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

import Nav from "./components/Nav";
import InfoWindow from "./components/InfoWindow";
import TaskForm from "./components/TaskForm";

function App() {
  const [profileInfo, setProfileInfo] = useState(
    JSON.parse(localStorage.getItem("To-Do-App"))
      ? JSON.parse(localStorage.getItem("To-Do-App"))
      : {
          tasksData: {
            completedTasks: [],
            uncompletedTasks: [],
          },
        }
  );
  const [selectedTask, setSelectedTask] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // store the selected task in selected state (recive form nav)
  // that must show to user
  const handleNavClick = (task) => {
    setSelectedTask(task);
    setProfileInfo(JSON.parse(localStorage.getItem("To-Do-App")));
  };

  // function that handke the process of creating new task
  const createNewTask = (data) => {
    console.log("create new task");
    // const prevDataBase = JSON.parse(localStorage.getItem("To-Do-App"));
    const prevDataBase = profileInfo;
    let newDataBase = {
      tasksData: {
        completedTasks: [...prevDataBase.tasksData.completedTasks],
        uncompletedTasks: [
          ...prevDataBase.tasksData.uncompletedTasks,
          {
            ...data,
            taskID: uuidv4(),
            isTaskCompleted: false,
            taskCreateDate: new Date(),
            taskCompletedDate: null,
          },
        ],
      },
    };

    localStorage.setItem("To-Do-App", JSON.stringify(newDataBase));
    setIsModalOpen(false);
    setProfileInfo(JSON.parse(localStorage.getItem("To-Do-App")));
  };

  const updateSelectedTask = (updatedDate) => {
    setProfileInfo((prevProfile) => {
      return {
        ...prevProfile,
        tasksData: {
          ...prevProfile.tasksData,
          uncompletedTasks: prevProfile.tasksData.uncompletedTasks.map(
            (uncompletedTask) => {
              if (uncompletedTask.taskID === selectedTask.taskID) {
                return {
                  ...uncompletedTask,
                  taskName: updatedDate.taskName,
                  taskDescription: updatedDate.taskDescription,
                };
              }
              return uncompletedTask;
            }
          ),
        },
      };
    });

    setSelectedTask(updatedDate);
    return true;
  };

  const deleteTheTask = (taskForDeletion) => {
    setProfileInfo((prevProfile) => {
      return {
        tasksData: {
          uncompletedTasks: prevProfile.tasksData.uncompletedTasks.filter(
            (uncompletedTask) => {
              return (
                uncompletedTask.taskID !== taskForDeletion.taskID &&
                uncompletedTask
              );
            }
          ),
           completedTasks: prevProfile.tasksData.completedTasks.filter(
            (completedTask) => {
              return (
                completedTask.taskID !== taskForDeletion.taskID && completedTask
              );
            }
          ),
        },
      };
    });

    setSelectedTask(null);
  };

  const completeTheTask = (completedTask) => {
    setProfileInfo((prevProfile) => {
      return {
        tasksData: {
          uncompletedTasks: prevProfile.tasksData.uncompletedTasks.filter(
            (uncompletedTask) => {
              return (
                uncompletedTask.taskID !== completedTask.taskID &&
                uncompletedTask
              );
            }
          ),
          completedTasks: [
            ...prevProfile.tasksData.completedTasks,
            {
              ...completedTask,
              isTaskCompleted: true,
              taskCompletedDate: new Date(),
            },
          ],
        },
      };
    });

    setSelectedTask(null);
    return localStorage.setItem("To-Do-App", JSON.stringify(profileInfo));
  };

  useEffect(() => {
    localStorage.setItem("To-Do-App", JSON.stringify(profileInfo));
  }, []);

  useEffect(() => {
    // Save updated profileInfo to localStorage
    localStorage.setItem("To-Do-App", JSON.stringify(profileInfo));
  }, [profileInfo]);

  return isModalOpen ? (
    <section className="w-full h-full bg-transparent relative">
      <button
        type="button"
        className="absolute top-5 right-5 bg-stone-600 p-3 rounded-full text-white focus:outline-0 hover:bg-red-500 hover:text-slate-100 transition-all duration-500 z-20"
        onClick={() => setIsModalOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 "
        >
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>

      <div className="fixed top-0 bottom-0 left-0 right-0 m-auto h-fit">
        <TaskForm onSaveNewTask={createNewTask} flag={false} />
      </div>
    </section>
  ) : (
    <>
      <Nav onNavClick={handleNavClick} data={profileInfo} />
      <InfoWindow
        currentTask={selectedTask}
        onUpdateTheTask={updateSelectedTask}
        onDeleteTheTask={deleteTheTask}
        onCompleteTheTask={completeTheTask}
      />
      {/* modal for creating new task */}

      {/* buttin that create new task */}
      <button
        className="fixed end-3 bottom-4 h-16 group rounded-e-full overflow-hidden"
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-center items-center h-full">
          <div className=" h-full ps-5 pe-10 rounded-s-full translate-x-44 transition-all duration-500 bg-zinc-700 flex items-center text-white group-hover:translate-x-5 capitalize">
            create new Task
          </div>

          <div className="relative p-5 z-20  bg-gradient-to-r from-green-400 to-green-600 rounded-full my-10">
            <span className="animate-ping absolute inline-flex h-full w-full top-0 bottom-0 left-0 right-0 m-auto -z-10 rounded-full bg-gradient-to-t from-green-400 via-green-600 to-green-400 opacity-75 group-hover:animate-none"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </div>
        </div>
      </button>
    </>
  );
}

export default App;
