import { Link } from 'react-router-dom';

import { Card } from '../components/ui/Card';
import { getButtonClassName } from '../components/ui/buttonClassName';

export function NotFoundPage() {
  return (
    <section className="page page--narrow">
      <Card className="not-found-card" accent>
        <p className="page-header__eyebrow">404</p>
        <h1>Route not found</h1>
        <p>
          The path does not exist in the current Milestone 0 scaffold. The router is active, but this specific route
          is outside the PRD navigation map.
        </p>
        <Link className={getButtonClassName()} to="/">
          Return to dashboard
        </Link>
      </Card>
    </section>
  );
}
