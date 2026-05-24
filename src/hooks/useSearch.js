import { useDeferredValue, useEffect, useMemo, useState } from "react";

export function useSearch(allTopics) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const deferredQuery = useDeferredValue(debouncedQuery);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    if (!normalized) {
      return allTopics;
    }

    return allTopics.filter((topic) => {
      const haystack = [
        topic.title,
        topic.category,
        topic.definition,
        topic.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [allTopics, deferredQuery]);

  return { results, query, setQuery };
}
