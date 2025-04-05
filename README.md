# Trello React Clone

This project is a **Trello clone** built using React, Material UI, and Vite. It replicates key functionalities of Trello including boards, lists, cards, and checklists. State management is handled with React Context and useReducer, and the app integrates with the Trello API to manage data.

## Features

- **Board Management:** View board details, including background images and settings.
- **Task Lists (Columns):** Each board contains multiple task lists arranged horizontally with smooth scrolling.
- **Cards and Tasks:** Each list displays cards representing tasks.
- **Checklists:** Each card can have one or more checklists with items that can be toggled, added, or deleted.
- **Modals:** Task details and checklist management are handled via modals.
- **Centralized State Management:** Uses React Context and useReducer to share state across components.
- **Responsive Design:** Implemented using Material UI’s sx prop and custom styles.
- **API Integration:** Communicates with the Trello API for boards, lists, cards, and checklists.

## Technologies

- **React** – Frontend library for building user interfaces.
- **Material UI** – Component library for designing the UI.
- **Vite** – Fast development server and build tool.
- **React Router** – For client-side routing.
- **Axios** – For API requests.
- **Context API & useReducer** – For state management.

## Project Structure

```
trello-react-sameer/
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── trello-icon.png
├── src/
│   ├── components/
│   │   ├── AddTaskList/
│   │   │   └── AddTaskList.jsx
│   │   ├── BoardAppBar/
│   │   │   └── BoardAppBar.jsx
│   │   ├── common/
│   │   │   └── Header.jsx
│   │   ├── modals/
│   │   │   └── TaskDetailsModal.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── context/
│   │   └── TaskDetailsContext.jsx
│   ├── pages/
│   │   └── Board.jsx
│   ├── services/
│   │   └── trelloApi.js
│   ├── App.jsx
│   └── index.jsx
├── .env                      # Contains environment variables (API keys, etc.)
├── .gitignore                # Ensure .env is listed here
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (or Yarn)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/samDeopa/trello-react-sameer.git
   cd trello-react-sameer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Trello API credentials:
   ```env
   VITE_API_KEY=your_trello_api_key
   VITE_AUTH_TOKEN=your_trello_auth_token
   ```

### Running the Project

Start the development server:

```bash
npm run dev
```

Then, open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the project for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Trello API Documentation](https://developer.atlassian.com/cloud/trello/rest/)
- [Material UI Documentation](https://mui.com/)
- [Vite Documentation](https://vitejs.dev/)
