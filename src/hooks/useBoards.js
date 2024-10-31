import { useBoardOperations } from './useBoardOperations';
import { useBoardLists } from './useBoardLists';
import { useBoardTasks } from './useBoardTasks';

const useBoards = (boardId) => {
  const { boards, addBoard, deleteBoard, updateBoard } = useBoardOperations();
  const { boardLists, addBoardList, updateBoardList, deleteBoardList, updateListsOrder } = useBoardLists(boardId);
  const { boardTasks, addBoardTask, deleteBoardTask, updateTaskLabels, updateTasksOrder, moveTaskBetweenLists, updateTaskName, updateTaskDescription, updateTaskImages, updateTaskTags, updateTaskDueDate, updateTaskPriority, removeTaskImage, getAllTasks } = useBoardTasks(boardId, boardLists);

  return {
    boards,
    addBoard,
    deleteBoard,
    updateBoard,
    boardLists,
    addBoardList,
    updateBoardList,
    deleteBoardList,
    updateListsOrder,
    boardTasks,
    getAllTasks,
    addBoardTask,
    deleteBoardTask,
    updateTaskLabels,
    updateTasksOrder,
    moveTaskBetweenLists,
    updateTaskName,
    updateTaskDescription,
    updateTaskTags,
    updateTaskDueDate,
    updateTaskPriority,
    updateTaskImages,
    removeTaskImage
  };
};

export default useBoards;
