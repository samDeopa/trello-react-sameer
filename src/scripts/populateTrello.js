import axios from "axios";

const TRELLO_KEY = import.meta.env.VITE_API_KEY;
const TRELLO_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const BASE_URL = "https://api.trello.com/1";

const backgroundOptions = [
  "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/6566fcc49ee3c03f225dc13229ffb5af/photo-1742156345582-b857d994c84e.webp",
  "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/cosmos/small.jpg",
  "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/canyon/small.jpg",
  "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/ocean/small.jpg",
  "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/river/small.jpg",
];

const listNames = [
  "To Do",
  "In Progress",
  "Review",
  "Done",
  "Backlog",
  "Sprint Planning",
  "Development",
  "Testing",
  "Deployment",
  "Blocked",
  "Icebox",
  "Completed",
];

const cardNames = [
  "Implement User Authentication",
  "Create Database Schema",
  "Design UI Mockups",
  "Write API Documentation",
  "Fix Critical Security Issue",
  "Optimize Database Queries",
  "Setup CI/CD Pipeline",
  "Conduct Load Testing",
  "Refactor Legacy Code",
  "Add Analytics Dashboard",
  "Implement Payment Gateway",
  "Create Onboarding Tutorial",
];

const checklistNames = [
  "Implementation Steps",
  "Quality Assurance",
  "Deployment Checklist",
  "Testing Scenarios",
  "Code Review Points",
  "Security Checks",
];

const checklistItems = [
  "Write unit tests",
  "Update documentation",
  "Peer review",
  "Performance testing",
  "Security audit",
  "UX validation",
  "Cross-browser testing",
  "Mobile responsiveness check",
];

async function createBoard(name, backgroundUrl) {
  try {
    const response = await axios.post(`${BASE_URL}/boards`, {
      name,
      prefs_background_url: backgroundUrl,
      key: TRELLO_KEY,
      token: TRELLO_TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating board:", error.message);
  }
}

async function createList(boardId, name) {
  try {
    const response = await axios.post(`${BASE_URL}/lists`, {
      name,
      idBoard: boardId,
      key: TRELLO_KEY,
      token: TRELLO_TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating list:", error.message);
  }
}

async function createCard(listId, name) {
  try {
    const response = await axios.post(`${BASE_URL}/cards`, {
      name,
      idList: listId,
      key: TRELLO_KEY,
      token: TRELLO_TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating card:", error.message);
  }
}

async function createChecklist(cardId, name) {
  try {
    const response = await axios.post(`${BASE_URL}/checklists`, {
      name,
      idCard: cardId,
      key: TRELLO_KEY,
      token: TRELLO_TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating checklist:", error.message);
  }
}

async function addChecklistItem(checklistId, name) {
  try {
    const response = await axios.post(
      `${BASE_URL}/checklists/${checklistId}/checkItems`,
      {
        name,
        key: TRELLO_KEY,
        token: TRELLO_TOKEN,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding checklist item:", error.message);
  }
}

async function populateTrello() {
  console.log("Starting.....");

  try {
    // Create 5 boards
    for (let i = 1; i <= 5; i++) {
      const boardName = `Project ${
        ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"][i - 1]
      } Roadmap`;
      const board = await createBoard(
        boardName,
        backgroundOptions[i % backgroundOptions.length]
      );

      console.log(`Created board: ${boardName}`);

      // Create lists (12 for first board, 4 for others)
      const numLists = i === 1 ? 12 : 4;
      const lists = [];
      for (let j = 0; j < numLists; j++) {
        const listName = listNames[j % listNames.length];
        const list = await createList(board.id, `${listName} ${j + 1}`);
        lists.push(list);
        console.log(`  Created list: ${listName}`);

        // Create cards (1-15 per list)
        const numCards = Math.floor(Math.random() * 15) + 1;
        for (let k = 0; k < numCards; k++) {
          const cardName =
            cardNames[Math.floor(Math.random() * cardNames.length)];
          const card = await createCard(list.id, `${cardName} (${k + 1})`);
          console.log(`    Created card: ${cardName}`);

          // Create checklists (0-4 per card)
          const numChecklists = Math.floor(Math.random() * 5);
          for (let l = 0; l < numChecklists; l++) {
            const checklistName =
              checklistNames[Math.floor(Math.random() * checklistNames.length)];
            const checklist = await createChecklist(card.id, checklistName);
            console.log(`      Created checklist: ${checklistName}`);

            // Add 2-4 items per checklist
            const numItems = Math.floor(Math.random() * 3) + 2;
            for (let m = 0; m < numItems; m++) {
              const itemName =
                checklistItems[
                  Math.floor(Math.random() * checklistItems.length)
                ];
              await addChecklistItem(checklist.id, itemName);
              console.log(`        Added checklist item: ${itemName}`);
            }
          }
        }
      }
    }
    console.log("Population complete!");
  } catch (error) {
    console.error("Error in population script:", error);
  }
}

export default populateTrello;
