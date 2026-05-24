import { useEffect, useMemo } from "react";
import { Navigate, Route, Routes, matchPath, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import EmptyState from "./components/ui/EmptyState.jsx";
import NoteCard from "./components/notecard/NoteCard.jsx";
import { allTopics } from "./data/index.js";
import { getTopicById } from "./utils/topicHelpers.js";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTopicId = useMemo(() => {
    const match = matchPath("/topic/:topicId", location.pathname);
    return match?.params?.topicId ?? null;
  }, [location.pathname]);

  const selectedTopic = useMemo(
    () => getTopicById(allTopics, selectedTopicId),
    [selectedTopicId],
  );

  useEffect(() => {
    if (selectedTopicId && !selectedTopic) {
      navigate("/", { replace: true });
    }
  }, [navigate, selectedTopic, selectedTopicId]);

  const handleSelectTopic = (topicId) => {
    navigate(`/topic/${topicId}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            allTopics={allTopics}
            selectedTopic={selectedTopic}
            selectedTopicId={selectedTopicId}
            onSelectTopic={handleSelectTopic}
          >
            <EmptyState allTopics={allTopics} onSelectTopic={handleSelectTopic} />
          </AppLayout>
        }
      />
      <Route
        path="/topic/:topicId"
        element={
          <AppLayout
            allTopics={allTopics}
            selectedTopic={selectedTopic}
            selectedTopicId={selectedTopicId}
            onSelectTopic={handleSelectTopic}
          >
            {selectedTopic ? (
              <NoteCard key={selectedTopic.id} topic={selectedTopic} allTopics={allTopics} />
            ) : null}
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
