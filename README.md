# Student Task Manager

A task management web application built with **HTML, CSS, and TypeScript**.  
This project helps students create, manage, filter, and track their daily tasks.

## Features

- Add new tasks
- Complete and undo tasks
- Delete tasks
- Filter tasks by:
  - All
  - Pending
  - Completed
- View task statistics:
  - Total tasks
  - Completed tasks
  - Pending tasks
- Save tasks using browser `localStorage`
- Light and dark mode
- Press **Enter** to add a task
- Simple task entrance animation
- Responsive layout for smaller screens

## Technologies Used

- **HTML5** — page structure
- **CSS3** — styling, themes, and animations
- **TypeScript** — application logic and type safety
- **LocalStorage** — persistent browser storage
- **npm** — project/package management

## Project Structure

```text
student-task-manager/
│
├── index.html
├── style.css
├── package.json
├── package-lock.json
├── tsconfig.json
│
├── src/
│   └── app.ts
│
└── dist/
    └── app.js
```

## How It Works

The main task data is stored in a TypeScript array:

```typescript
let tasks: Task[] = [];
```

Each task follows the `Task` interface:

```typescript
interface Task {
    id: number;
    title: string;
    completed: boolean;
}
```

Tasks are saved in `localStorage` so they remain available after refreshing the browser.

### Data Flow

```text
User Action
    ↓
TypeScript Function
    ↓
Update tasks array
    ↓
Save to localStorage
    ↓
Refresh the UI
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Open the project

```bash
cd student-task-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Compile TypeScript

```bash
npx tsc
```

This converts:

```text
src/app.ts
```

into:

```text
dist/app.js
```

### 5. Run the project

Open `index.html` in your browser.

You can also use a VS Code extension such as **Live Server** for easier development.

## TypeScript Concepts Practiced

This project is designed for beginners and demonstrates:

- Interfaces
- Type aliases
- Union types
- Type annotations
- Type assertions
- Functions
- Arrays
- `find()`
- `filter()`
- DOM manipulation
- Event listeners
- `localStorage`
- `JSON.stringify()`
- `JSON.parse()`
- `try...catch`

## Example

Add a task:

```text
Learn TypeScript
```

The task can then be:

```text
Learn TypeScript    [Complete] [Delete]
```

After completing it:

```text
Learn TypeScript    [Undo] [Delete]
```

## Learning Goal

The purpose of this project is to understand how TypeScript works with the browser DOM and how typed application logic can be used to build a small real-world project.

This project can be extended later with:

- Task editing
- Due dates
- Priority levels
- Search
- Categories
- Drag and drop
- Notifications
- Backend/database integration
- User authentication

## Author

**Nitai Das**

B.Tech Information Technology Student  
Aspiring Software Developer
