import "./App.css";
import { Dock, DockIcon } from "@/components/magicui/dock";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-3xl font-bold mb-6">我的待办事项</h1>

      <Dock className="bg-white/20 dark:bg-black/20 shadow-lg">
        <DockIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </DockIcon>

        <DockIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M7 12h10" />
            <path d="M3 18h18" />
          </svg>
        </DockIcon>

        <DockIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 12H3" />
            <path d="m15 16-4-4 4-4" />
            <path d="M21 12h-6" />
          </svg>
        </DockIcon>

        <DockIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12H3" />
            <path d="m16 7 5 5-5 5" />
          </svg>
        </DockIcon>

        <DockIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </DockIcon>
      </Dock>
    </div>
  );
}

export default App;
