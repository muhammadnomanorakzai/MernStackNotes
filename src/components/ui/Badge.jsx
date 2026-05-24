import { DIFFICULTY_TONES } from "../../utils/topicHelpers.js";

function Badge({ difficulty }) {
  const tone = DIFFICULTY_TONES[difficulty] ?? DIFFICULTY_TONES.Beginner;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tone.badge}`}
    >
      {difficulty}
    </span>
  );
}

export default Badge;
