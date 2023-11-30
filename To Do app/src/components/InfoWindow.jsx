import { useState } from "react";
import TaskForm from "./TaskForm";

function InfoWindow({
  currentTask,
  onUpdateTheTask,
  createNewTask,
  isUpDateProc,
  onDeleteTheTask,
  onCompleteTheTask,
}) {
  const [isEdit, setIsEdit] = useState(false);
  // const [task, setTask] = useState(false);

  return (
    <section className="h-full">
      {currentTask ? (
        <section className={`flex`}>
          <div
            className={`p-4 bg-zinc-200 h-full transition-all duration-500 ${
              isEdit ? "translate-x-0 w-full md:w-5/12" : "-translate-x-96 w-0"
            }`}
            id="update-tab"
          >
            <div className="flex justify-between items-center">
              <h1 className="capitalize text-2xl font-semibold text-slate-600 underline decoration-red-500 underline-offset-4">
                <span className="text-green-600">Update </span> tab
              </h1>
              <button
                type="button"
                className="cursor-pointer  hover:text-red-600 hover:-rotate-90 transition-all duration-500 bg-slate-400 hover:rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                  onClick={() => setIsEdit(false)}
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            <h3 className="pt-6 pb-3 text-slate-700 font-semibold">
              Feel free to make changes to your task !!!
            </h3>
            <div>
              <TaskForm
                onSaveNewTask={createNewTask}
                selectedTask={currentTask}
                upDateTheTask={onUpdateTheTask}
                flag={isEdit}
              />
            </div>
          </div>

          <div className="w-full pt-10">
            <div
              id="header"
              className=" w-fit mx-auto border-b-4 border-green-500 px-4 pb-5 relative"
            >
              <h1 className="flex justify-center items-center gap-3">
                <span className="h-1 w-5 mt-1 bg-red-500 rounded-s-full"></span>
                <span className="capitalize text-xl sm:text-4xl">
                  {currentTask.taskName}
                </span>
                <span className="h-1 w-10 mt-1 bg-red-500 rounded-e-full"></span>
              </h1>

              <div className="flex justify-center items-center absolute -bottom-3 left-0 right-0 w-fit px-1 mx-auto  bg-white">
                <button
                  type="button"
                  title="Edit the Task"
                  className=" text-red-500"
                  onClick={() => setIsEdit(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
                </button>

                <button
                  type="button"
                  title="Delete the Task"
                  className=" text-red-500"
                  onClick={() => onDeleteTheTask(currentTask)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {!currentTask.isTaskCompleted && (
                  <button
                    type="button"
                    title="Task completed"
                    className=" text-red-500"
                    onClick={() => onCompleteTheTask(currentTask)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: currentTask.taskDescription }}
              className="flex justify-center pt-10"
            />
          </div>
        </section>
      ) : (
        <section className="text-xl text-center flex flex-col items-center justify-center relative -z-10 h-full bg-home bg-no-repeat bg-center">
          Arrange your work,
          <p className="">Never forgot what to do!!!</p>
        </section>
      )}
    </section>
  );
}
export default InfoWindow;

// || tasksInfo.defaultOne
