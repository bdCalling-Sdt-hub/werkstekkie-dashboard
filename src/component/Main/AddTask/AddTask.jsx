import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AssignedCustomer from "./AssignedCustomer";

const AddTask = () => {
  const [tasks, setTasks] = useState([
    "Attend leadership workshop",
    "Lead a team meeting",
  ]);

  const addTask = () => setTasks([...tasks, ""]);
  const removeTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    setTasks(reorderedTasks);
  };

  const updateTask = (index, value) =>
    setTasks(tasks.map((task, i) => (i === index ? value : task)));

  return (
    <section className="md:grid md:grid-cols-4 md:gap-4 items-start w-full">
      {/* Main Content */}
      <div className="col-span-4 md:col-span-3 max-w-4xl mx-auto p-6 bg-[#6666661A] text-white rounded-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Task</h2>
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Task Type</label>
          <select
            className="w-full p-3 bg-transparent text-gray-300 border border-gray-600 rounded-md focus:outline-none"
            defaultValue="Daily"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Task Class Name</label>
          <input
            type="text"
            className="w-full p-3 bg-transparent text-gray-300 border border-gray-600 rounded-md focus:outline-none "
            placeholder="Task name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Task Description</label>
          <textarea
            className="w-full p-3 bg-transparent text-gray-300 border border-gray-600 rounded-md focus:outline-none "
            placeholder="Description"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Tasks</label>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={`task-${index}`}
                      draggableId={`task-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center space-x-2"
                        >
                          <span
                            {...provided.dragHandleProps}
                            className="cursor-grab text-gray-400"
                          >
                            &#9776;
                          </span>
                          <input
                            type="text"
                            className="flex-grow p-3 bg-transparent text-gray-300 border border-gray-600 rounded-md focus:outline-none  "
                            placeholder={`Task ${index + 1}`}
                            value={task}
                            onChange={(e) => updateTask(index, e.target.value)}
                          />
                          <button
                            onClick={() => removeTask(index)}
                            className="p-2  text-red-500 rounded-md "
                          >
                            ✖
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <br />
          <button
            onClick={addTask}
            className="w-full p-3 bg-transparent text-gray-400 rounded-md hover:text-white border border-gray-600"
          >
            + Add new task
          </button>
        </div>

        <div className="flex justify-end">
          <button
            className="mt-6 px-7 py-3 bg-[#004838] hover:bg-[#004838] text-white rounded-md focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>

      {/* Assigned Customer Component */}
      <div className="col-span-4 md:col-span-1 w-full mt-6 md:mt-0">
        <AssignedCustomer />
      </div>
    </section>
  );
};

export default AddTask;
