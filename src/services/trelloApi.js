import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_AUTH_TOKEN;

const trelloApi = axios.create({
  baseURL: "https://api.trello.com/1",
  headers: {
    Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_token="${apiToken}"`,
  },
});

export const getBoards = () => {
  const fields = ["name", "url", "starred", "prefs"];
  return trelloApi.get(`/members/me/boards/?fields=${fields.join(",")}`);
};

export const createBoard = (board) => {
  return trelloApi.post(`/boards/`, {
    name: board.title,
    defaultLists: false,
    //removing the w=400 parameter from the imageURL
    prefs_background_url: board.prefs_background.substring(
      0,
      board.prefs_background.length - 6
    ),
    prefs_permissionLevel: "org",
  });
};

export const getBoard = (id) => {
  return trelloApi.get(`/board/${id}`);
};

export const getList = (boardId) => {
  return trelloApi.get(`/boards/${boardId}/lists`);
};

export const createList = (boardId, listName) => {
  return trelloApi.post(`/boards/${boardId}/lists`, {
    name: listName,
  });
};

export const archiveList = (listId) => {
  return trelloApi.put(`/lists/${listId}`, {
    closed: true,
  });
};

export const getTasksInList = (listId) => {
  return trelloApi.get(`/lists/${listId}/cards`);
};

export const createCard = (listId, title) => {
  return trelloApi.post(`/cards`, {
    idList: listId,
    name: title,
    closed: false,
    isTemplate: false,
    dueComplete: false,
  });
};

export const archiveCardItem = (taskId) => {
  return trelloApi.put(`cards/${taskId}`, { closed: true });
};

export const updateDueComplete = (taskId, completed) => {
  return trelloApi.put(`/cards/${taskId}`, {
    dueComplete: completed,
  });
};

export const getChecklists = (cardId) => {
  return trelloApi.get(`/cards/${cardId}/checklists`);
};

export const updateChecklistItem = (cardId, checkItemId, completed) => {
  return trelloApi.put(`/cards/${cardId}/checkItem/${checkItemId}`, {
    state: completed ? "complete" : "incomplete",
  });
};

export const createChecklist = (cardId, name) => {
  return trelloApi.post(`/cards/${cardId}/checklists`, {
    name: name,
  });
};

export const addChecklistItem = (checklistId, name) => {
  return trelloApi.post(`/checklists/${checklistId}/checkItems`, {
    name: name,
    checked: false,
  });
};

export const deleteCheckList = (checklistId) => {
  return trelloApi.delete(`/checklists/${checklistId}`);
};

export const deleteChecklistItem = (checklistId, itemId) => {
  return trelloApi.delete(`/checklists/${checklistId}/checkItems/${itemId}`);
};
export default trelloApi;
