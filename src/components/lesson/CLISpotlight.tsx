import { ChevronDown, Terminal } from 'lucide-react';

type CLISpotlightProps = {
  title: string;
  commands: string[];
  explanation: string;
};

export function CLISpotlight({ title, commands, explanation }: CLISpotlightProps) {
  return (
    <details className="cli-spotlight">
      <summary className="cli-spotlight__summary">
        <span className="cli-spotlight__summary-copy">
          <span className="cli-spotlight__summary-icon" aria-hidden="true">
            <Terminal size={16} />
          </span>
          <span className="cli-spotlight__title">{title}</span>
        </span>
        <ChevronDown className="cli-spotlight__chevron" size={18} aria-hidden="true" />
      </summary>
      <div className="cli-spotlight__content">
        <div className="cli-spotlight__code" role="region" aria-label={`${title} CLI commands`}>
          {commands.map((line, index) => {
            const promptMatch = line.match(/^(\S+?[>#])\s*(.*)/);
            if (promptMatch) {
              return (
                <span className="cli-spotlight__code-line" key={index}>
                  <span className="prompt">{promptMatch[1]}</span>
                  <span className="command">{promptMatch[2]}</span>
                </span>
              );
            }
            return <span className="cli-spotlight__code-line" key={index}>{line}</span>;
          })}
        </div>
        <p className="cli-spotlight__explanation">{explanation}</p>
      </div>
    </details>
  );
}
