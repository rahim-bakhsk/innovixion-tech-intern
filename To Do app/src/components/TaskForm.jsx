// import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect } from "react";

const TaskForm = ({ upDateTheTask, selectedTask, flag, onSaveNewTask }) => {
  const [data, setData] = useState(selectedTask);

  useEffect(() => {
    setData(selectedTask);
  }, [selectedTask]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (formData) => {
    if (flag) {
      if (formData.taskName == undefined) {
        selectedTask = {
          ...selectedTask,
          taskName: data.taskName,
        };
      }

      if (formData.taskDescription == undefined) {
        selectedTask = {
          ...selectedTask,
          taskDescription: data.taskDescription,
        };
      } else {
        selectedTask = {
          ...selectedTask,
          taskName: formData.taskName,
          taskDescription: formData.taskDescription,
        };
      }
      upDateTheTask(selectedTask);
    } else {
      onSaveNewTask(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="taskName"
          className="block text-gray-600 font-semibold mb-2"
        >
          Task Name:
        </label>
        <Controller
          name="taskName"
          control={control}
          // rules={!flag && { required: "Task Name is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              value={flag ? data.taskName : field.value || ""}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => {
                setData(field.onChange(e.target.value));
              }}
            />
          )}
        />
        {errors.taskName && (
          <p className="text-red-500">{errors.taskName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="taskDescription"
          className="block text-gray-600 font-semibold mb-2"
        >
          Task Description:
        </label>
        <Controller
          name="taskDescription"
          control={control}
          // rules={!flag && { required: "Task Description is required" }}
          render={({ field }) => (
            <Editor
              apiKey="4vuset0wydcuph5dygrfgfqyq8if1as320a53ghb2t2k8c0a"
              value={flag ? data.taskDescription : field.value || ""}
              onEditorChange={(content) => {
                setData(content);
                return setValue("taskDescription", content, {
                  shouldValidate: true,
                });
              }}
              init={{
                directionality: "ltr", // Set direction to left-to-right
                statusbar: false,
                menubar: false,
                height: "300px",
                plugins:
                  "mentions anchor autolink charmap codesample image link lists media searchreplace table wordcount checklist mediaembed",
                toolbar:
                  "undo redo | bold italic underline strikethrough | link image media table | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
              }}
            />
          )}
        />
        {errors.taskDescription && (
          <p className="text-red-500">{errors.taskDescription.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-0 focus:ring focus:border-2 focus:border-green-700"
      >
        {flag ? "update" : "create"}
      </button>
    </form>
  );
};

export default TaskForm;
