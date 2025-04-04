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
  return trelloApi.post(`https://api.trello.com/1/boards/`, {
    name: board.title,
    defaultLists: false,
    prefs_background_url:
      "https://images.unsplash.com/photo-1742156345582-b857d994c84e?ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzQzNzYwNDk4fA&ixlib=rb-4.0.3&w=2560&h=2048&q=90",
    prefs_permissionLevel: "org",
  });
};

export const getBoard = (id) => {
  return trelloApi.get(`https://trello.com/1/board/${id}`);
};

export const getList = (boardId) => {
  return trelloApi.get(`https://api.trello.com/1/boards/${boardId}/lists`);
};

export const createList = (boardId, listName) => {
  return trelloApi.post(`https://api.trello.com/1/boards/${boardId}/lists`, {
    name: listName,
  });
};

export const deleteList = (listId) => {
  return trelloApi.delete(`https://api.trello.com/1/lists/${listId}/closed`, {
    value: true,
  });
};

export const getTasksInList = (listId) => {
  return trelloApi.get(`https://api.trello.com/1/lists/${listId}/cards`);
};

export const createCard = (listId, title) => {
  return trelloApi.post(`https://trello.com/1/cards`, {
    idList: listId,
    name: title,
    closed: false,
    isTemplate: false,
    dueComplete: false,
  });
};
export default trelloApi;
