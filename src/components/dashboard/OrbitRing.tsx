type OrbitRingProps = {
  percent: number;
};

export function OrbitRing({ percent }: OrbitRingProps) {
  const displayPercent = `${Math.round(percent)}%`;

  return (
    <div aria-label={`${displayPercent} CCNA progress`} className="dashboard-orbit" role="img">
      <div aria-hidden="true" className="dashboard-orbit__glow" />
      <div aria-hidden="true" className="dashboard-orbit__ring dashboard-orbit__ring--outer" />
      <div aria-hidden="true" className="dashboard-orbit__cycle dashboard-orbit__cycle--outer">
        <span className="dashboard-orbit__satellite dashboard-orbit__satellite--primary" />
      </div>
      <div aria-hidden="true" className="dashboard-orbit__ring dashboard-orbit__ring--field" />
      <div aria-hidden="true" className="dashboard-orbit__cycle dashboard-orbit__cycle--inner">
        <span className="dashboard-orbit__satellite dashboard-orbit__satellite--secondary" />
      </div>
      <div aria-hidden="true" className="dashboard-orbit__ring dashboard-orbit__ring--inner" />
      <div className="dashboard-orbit__core">
        <span className="dashboard-orbit__value">{displayPercent}</span>
        <span className="dashboard-orbit__label">CCNA PROGRESS</span>
      </div>
    </div>
  );
}
