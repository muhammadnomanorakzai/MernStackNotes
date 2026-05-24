export const CATEGORY_ACCENTS = {
  JavaScript: "border-l-4 border-l-violet-500",
  React: "border-l-4 border-l-sky-500",
  "Node.js": "border-l-4 border-l-emerald-500",
  Express: "border-l-4 border-l-amber-500",
  MongoDB: "border-l-4 border-l-green-500",
  Docker: "border-l-4 border-l-cyan-500",
};

export const DIFFICULTY_TONES = {
  Beginner: {
    badge: "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
    dot: "bg-emerald-400",
  },
  Intermediate: {
    badge: "border-amber-400/25 bg-amber-500/10 text-amber-200",
    dot: "bg-amber-400",
  },
  Advanced: {
    badge: "border-rose-400/25 bg-rose-500/10 text-rose-200",
    dot: "bg-rose-400",
  },
};

export function getTopicById(allTopics, topicId) {
  return allTopics.find((topic) => topic.id === topicId) ?? null;
}

export function getByCategory(allTopics, category) {
  return allTopics.filter((topic) => topic.category === category);
}

export function getByDifficulty(allTopics, difficulty) {
  return allTopics.filter((topic) => topic.difficulty === difficulty);
}

export function getTopicCollections(allTopics) {
  return allTopics.reduce((groups, topic) => {
    if (!groups[topic.category]) {
      groups[topic.category] = [];
    }

    groups[topic.category].push(topic);
    return groups;
  }, {});
}

export function topicMatchesCategory(topic, category) {
  return topic.category === category;
}
