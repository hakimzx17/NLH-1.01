import type { CSSProperties } from 'react';

import type { LessonSimulationSceneProps } from '../../content/simulations/types';

type DeviceId = 'host' | 'switch' | 'router' | 'server';
type DeviceTone = 'muted' | 'active' | 'complete';
type ConnectorId = 'host-switch' | 'switch-router' | 'router-server';

type SceneState = {
  activeConnector: ConnectorId;
  packetLabel: string;
  packetStyle: CSSProperties;
  tones: Record<DeviceId, DeviceTone>;
};

const SCENE_STATE_BY_STEP: Record<string, SceneState> = {
  'host-builds-frame': {
    activeConnector: 'host-switch',
    packetLabel: 'Ethernet frame',
    packetStyle: { left: '11%', top: '38%' },
    tones: {
      host: 'active',
      switch: 'muted',
      router: 'muted',
      server: 'muted',
    },
  },
  'switch-learns-mac': {
    activeConnector: 'host-switch',
    packetLabel: 'MAC lookup',
    packetStyle: { left: '32%', top: '34%' },
    tones: {
      host: 'complete',
      switch: 'active',
      router: 'muted',
      server: 'muted',
    },
  },
  'router-routes-packet': {
    activeConnector: 'switch-router',
    packetLabel: 'IP routing',
    packetStyle: { left: '53%', top: '30%' },
    tones: {
      host: 'complete',
      switch: 'complete',
      router: 'active',
      server: 'muted',
    },
  },
  'server-receives-data': {
    activeConnector: 'router-server',
    packetLabel: 'Delivered',
    packetStyle: { left: '76%', top: '34%' },
    tones: {
      host: 'complete',
      switch: 'complete',
      router: 'complete',
      server: 'active',
    },
  },
};

type DeviceNodeProps = {
  id: DeviceId;
  label: string;
  role: string;
  tone: DeviceTone;
};

function DeviceNode({ id, label, role, tone }: DeviceNodeProps) {
  return (
    <div className={`simulation-scene__node simulation-scene__node--${tone}`} data-device-id={id}>
      <span className="simulation-scene__node-role">{role}</span>
      <strong className="simulation-scene__node-label">{label}</strong>
    </div>
  );
}

export function NetworkComponentsSimulationScene({ activeStep, activeStepIndex, totalSteps, isPlaying, reducedMotion }: LessonSimulationSceneProps) {
  const sceneState = SCENE_STATE_BY_STEP[activeStep.id] ?? SCENE_STATE_BY_STEP['host-builds-frame'];

  return (
    <div className="simulation-scene" aria-label="Network components simulation viewport">
      <div className="simulation-scene__legend" aria-hidden="true">
        <span className="simulation-scene__legend-item simulation-scene__legend-item--active">Active role</span>
        <span className="simulation-scene__legend-item simulation-scene__legend-item--complete">Completed role</span>
        <span className="simulation-scene__legend-item simulation-scene__legend-item--muted">Upcoming role</span>
      </div>

      <div className="simulation-scene__track">
        <div className={`simulation-scene__connector ${sceneState.activeConnector === 'host-switch' ? 'simulation-scene__connector--active' : ''}`} />
        <div className={`simulation-scene__connector ${sceneState.activeConnector === 'switch-router' ? 'simulation-scene__connector--active' : ''}`} />
        <div className={`simulation-scene__connector ${sceneState.activeConnector === 'router-server' ? 'simulation-scene__connector--active' : ''}`} />

        <DeviceNode id="host" label="Study PC" role="End device" tone={sceneState.tones.host} />
        <DeviceNode id="switch" label="Access Switch" role="Layer 2" tone={sceneState.tones.switch} />
        <DeviceNode id="router" label="Default Gateway" role="Layer 3" tone={sceneState.tones.router} />
        <DeviceNode id="server" label="Content Server" role="Remote host" tone={sceneState.tones.server} />

        <div
          className={`simulation-scene__packet ${isPlaying ? 'simulation-scene__packet--playing' : ''}`}
          style={{
            ...sceneState.packetStyle,
            transitionDuration: reducedMotion ? '0ms' : '420ms',
          }}
        >
          <span className="simulation-scene__packet-label">{sceneState.packetLabel}</span>
        </div>
      </div>

      <div className="simulation-scene__footer">
        <p className="simulation-scene__footer-copy">
          Step {activeStepIndex + 1} of {totalSteps} · {activeStep.stateLabel}
        </p>
      </div>
    </div>
  );
}
