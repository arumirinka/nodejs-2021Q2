const Task = require('./task.model');

let taskData = [];

const getAllTasksBID = async boardId => {
  const res = taskData.filter(task => task.boardId === boardId);
  return res.length > 0 ? res : undefined;
};

const getTaskById = async (boardId, id) => {
  const res = await taskData.find(
    task => task.boardId === boardId && task.id === id
  );
  return res;
};

const addTask = async (task, boardId) => {
  const newTask = new Task({ ...task, boardId });
  taskData.push(newTask);
  return newTask;
};

const updateTask = async (taskId, updTask) => {
  const { id, title, order, description, userId, boardId, columnId } = updTask;
  taskData.forEach((task, i) => {
    if (task.id === taskId) {
      taskData[i].id = id;
      taskData[i].title = title;
      taskData[i].order = order;
      taskData[i].description = description;
      taskData[i].userId = userId;
      taskData[i].boardId = boardId;
      taskData[i].columnId = columnId;
    }
  });
  return updTask;
};

const deleteTask = async (boardId, taskId) => {
  const i = taskData.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  taskData.splice(i, 1);
};

const deleteTasksOnBoardDeletion = async boardId => {
  taskData = taskData.filter(task => task.boardId !== boardId);
};

module.exports = {
  getAllTasksBID,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  deleteTasksOnBoardDeletion
};
