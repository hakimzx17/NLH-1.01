import { Bookmark } from 'lucide-react';

type SummaryCardProps = {
  title?: string;
  points: string[];
};

export function SummaryCard({ title = 'Lesson Summary', points }: SummaryCardProps) {
  return (
    <div className="summary-card">
      <h3 className="summary-card__title">
        <Bookmark size={18} />
        {title}
      </h3>
      <ul className="summary-card__list">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
