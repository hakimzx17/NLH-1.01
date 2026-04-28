import { Beaker, BookOpen, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CalloutBlock } from './CalloutBlock';
import { CLISpotlight } from './CLISpotlight';
import { ConceptCheckpoint } from './ConceptCheckpoint';
import { SummaryCard } from './SummaryCard';
import { VisualBlock } from './VisualBlock';
import type { LessonDefinition } from '../../content/types';

type TheoryTabProps = {
  lesson: LessonDefinition;
  lessonId: string;
};

function renderBody(body: string) {
  return body.split('\n\n').map((paragraph, index) => {
    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
      }
      return <span key={partIndex}>{part}</span>;
    });

    return <p key={index}>{rendered}</p>;
  });
}

export function TheoryTab({ lesson, lessonId }: TheoryTabProps) {
  return (
    <div className="theory-content">
      <div className="theory-hook">
        {lesson.hook}
      </div>

      {lesson.sections.map((section) => (
        <section className="theory-section" key={section.id} aria-label={section.heading}>
          <div className="theory-section__header">
            <h2 className="theory-section__heading">{section.heading}</h2>
            <span className="theory-section__reading-time">{section.estimatedReadingMinutes} min read</span>
          </div>
          <div className="theory-section__body">
            {renderBody(section.body)}
          </div>
        </section>
      ))}

      {lesson.callouts.map((callout, index) => (
        <CalloutBlock key={`callout-${index}`} type={callout.type} title={callout.title}>
          {callout.body}
        </CalloutBlock>
      ))}

      {lesson.cliSpotlights.length > 0 && (
        <section className="theory-section" aria-label="CLI Commands">
          <div className="theory-section__header">
            <h2 className="theory-section__heading">CLI Commands</h2>
          </div>
          <div className="theory-cli-list">
            {lesson.cliSpotlights.map((cli) => (
              <CLISpotlight
                key={cli.id}
                title={cli.title}
                commands={cli.commands}
                explanation={cli.explanation}
              />
            ))}
          </div>
        </section>
      )}

      {lesson.visualBlocks.map((block) => (
        <VisualBlock
          key={block.id}
          title={block.title}
          description={block.description}
          svgContent={block.svgContent}
        />
      ))}

      {lesson.checkpoints.map((checkpoint) => (
        <ConceptCheckpoint key={checkpoint.id} checkpoint={checkpoint} />
      ))}

      <SummaryCard points={lesson.summaryPoints} />

      <div className="continuation-actions">
        <Link className="continuation-action" to={`/lesson/${lessonId}/simulation`}>
          <span className="continuation-action__icon">
            <Beaker size={20} />
          </span>
          <span>Open Simulation</span>
          <span className="continuation-action__label">Visual concept reinforcement</span>
        </Link>
        <Link className="continuation-action" to={`/lesson/${lessonId}/lab`}>
          <span className="continuation-action__icon">
            <BookOpen size={20} />
          </span>
          <span>Open Practice Lab</span>
          <span className="continuation-action__label">Hands-on CLI experience</span>
        </Link>
        <Link className="continuation-action" to={`/lesson/${lessonId}/quiz`}>
          <span className="continuation-action__icon">
            <ClipboardList size={20} />
          </span>
          <span>Take Lesson Quiz</span>
          <span className="continuation-action__label">10 questions, 80% to pass</span>
        </Link>
      </div>
    </div>
  );
}
