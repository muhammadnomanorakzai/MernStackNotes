import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "devnotes-progress-v1";

function readProgressStore() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeProgressStore(store) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function formatRevisionDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
}

export function getRecentlyRevisedTopics(allTopics) {
  const store = readProgressStore();

  return allTopics
    .map((topic) => ({
      ...topic,
      lastRevised: store[topic.id]?.lastRevised ?? null,
    }))
    .filter((topic) => topic.lastRevised)
    .sort((first, second) => new Date(second.lastRevised) - new Date(first.lastRevised))
    .slice(0, 4);
}

function touchTopicProgress(topicId) {
  if (!topicId || typeof window === "undefined") {
    return;
  }

  const store = readProgressStore();
  const mastery = store[topicId]?.mastery ?? 0;
  store[topicId] = {
    mastery,
    lastRevised: formatRevisionDate(new Date()),
  };
  writeProgressStore(store);
}

export function useProgress(topicId, allTopics = []) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handleProgressUpdate = () => {
      setVersion((current) => current + 1);
    };

    window.addEventListener("devnotes-progress-updated", handleProgressUpdate);
    return () => window.removeEventListener("devnotes-progress-updated", handleProgressUpdate);
  }, []);

  useEffect(() => {
    if (!topicId) {
      return;
    }

    touchTopicProgress(topicId);
    window.dispatchEvent(new CustomEvent("devnotes-progress-updated"));
  }, [topicId]);

  const overallMastery = useMemo(() => {
    if (!allTopics.length) {
      return 0;
    }

    const currentVersion = version;
    void currentVersion;
    const store = readProgressStore();
    const total = allTopics.reduce((sum, topic) => sum + (store[topic.id]?.mastery ?? topic.mastery ?? 0), 0);

    return Math.round(total / allTopics.length);
  }, [allTopics, version]);

  const getMastery = () => {
    if (!topicId) {
      return 0;
    }

    const store = readProgressStore();
    return store[topicId]?.mastery ?? 0;
  };

  const setMastery = (value) => {
    if (!topicId || typeof window === "undefined") {
      return;
    }

    const store = readProgressStore();
    store[topicId] = {
      mastery: value,
      lastRevised: store[topicId]?.lastRevised ?? formatRevisionDate(new Date()),
    };
    writeProgressStore(store);
    window.dispatchEvent(new CustomEvent("devnotes-progress-updated"));
  };

  const getLastRevised = () => {
    if (!topicId) {
      return null;
    }

    const store = readProgressStore();
    return store[topicId]?.lastRevised ?? null;
  };

  return { getMastery, setMastery, getLastRevised, overallMastery };
}
