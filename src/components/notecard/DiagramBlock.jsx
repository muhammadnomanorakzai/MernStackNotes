import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";
import SectionCard from "../ui/SectionCard.jsx";

mermaid.initialize({
  securityLevel: "loose",
  startOnLoad: false,
  theme: "dark",
});

function DiagramBlock({ diagram, title }) {
  const uid = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const { svg: output } = await mermaid.render(`diagram-${uid}`, diagram.trim());
        if (!cancelled) {
          setSvg(output);
          setError("");
        }
      } catch {
        if (!cancelled) {
          setError("Diagram could not be rendered.");
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [diagram, uid]);

  return (
    <SectionCard accent="border-l-[#06B6D4]" icon="04" title="Visual memory anchor">
      <div className="overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#0D1117] p-4">
        {error ? (
          <p className="text-sm text-rose-300">{error}</p>
        ) : (
          <div
            aria-label={`${title} diagram`}
            className="mermaid-diagram overflow-x-auto text-slate-100 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </SectionCard>
  );
}

export default DiagramBlock;
