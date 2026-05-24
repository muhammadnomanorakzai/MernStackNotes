import { useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

function AppLayout({ allTopics, selectedTopic, selectedTopicId, onSelectTopic, children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed((current) => !current);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0F] text-slate-100">
      <div className="flex h-full flex-col md:flex-row">
        <Sidebar
          allTopics={allTopics}
          onSelectTopic={onSelectTopic}
          onToggleSidebar={handleToggleSidebar}
          selectedTopicId={selectedTopicId}
          sidebarCollapsed={sidebarCollapsed}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            allTopics={allTopics}
            onToggleSidebar={handleToggleSidebar}
            selectedTopic={selectedTopic}
            sidebarCollapsed={sidebarCollapsed}
          />
          <main className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_32%),linear-gradient(180deg,rgba(17,17,24,0.45),rgba(10,10,15,0))]">
            <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
