import { useState } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SectionCard from "../ui/SectionCard.jsx";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);

function PreBlock({ children, ...props }) {
  return (
    <pre {...props} className="m-0 overflow-x-auto bg-transparent p-5 text-[0.9rem]">
      {children}
    </pre>
  );
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const language = code.includes("useState") || code.includes("<") ? "jsx" : "javascript";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <SectionCard accent="border-l-[#F97316]" icon="06" title="Code example">
      <div className="overflow-hidden rounded-2xl border border-orange-400/15 bg-[#0D1117]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">
          <span>{language}</span>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium normal-case tracking-normal text-slate-300 transition hover:border-white/20 hover:text-white"
            onClick={handleCopy}
            type="button"
          >
            <CopyIcon />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <SyntaxHighlighter
          PreTag={PreBlock}
          language={language}
          style={atomDark}
          wrapLongLines
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </SectionCard>
  );
}

export default CodeBlock;
