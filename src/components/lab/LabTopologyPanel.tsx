import type { ReactElement } from 'react';

import type { LabDefinition, LabTopologyNode } from '../../content/types';
import { isLabLinkActive, type LabSessionState } from '../../lib/labEngine';

type LabTopologyPanelProps = {
  definition: LabDefinition;
  session: LabSessionState;
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
};

function getNodeById(definition: LabDefinition, nodeId: string): LabTopologyNode | undefined {
  return definition.topology.devices.find((node) => node.id === nodeId);
}

function getNodeTypeLabel(type: LabTopologyNode['type']): string {
  switch (type) {
    case 'router':
      return 'Router';
    case 'switch-l2':
      return 'L2 Switch';
    case 'switch-l3':
      return 'L3 Switch';
    case 'pc':
      return 'PC';
    case 'server':
      return 'Server';
    case 'firewall':
      return 'Firewall';
    case 'cloud':
      return 'Cloud';
  }
}

function getLinkClassName(type: string, isActive: boolean): string {
  return [
    'lab-topology__link',
    `lab-topology__link--${type}`,
    isActive ? 'lab-topology__link--active' : 'lab-topology__link--inactive',
  ].join(' ');
}

function renderNodeShape(node: LabTopologyNode, isSelected: boolean): ReactElement {
  const className = [
    'lab-topology__node-body',
    `lab-topology__node-body--${node.type}`,
    isSelected ? 'lab-topology__node-body--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  switch (node.type) {
    case 'router':
      return <ellipse className={className} cx={0} cy={0} rx={44} ry={28} />;
    case 'switch-l2':
    case 'switch-l3':
      return <rect className={className} x={-46} y={-28} width={92} height={56} rx={18} />;
    case 'pc':
      return (
        <g>
          <rect className={className} x={-34} y={-28} width={68} height={48} rx={12} />
          <rect className={className} x={-14} y={24} width={28} height={8} rx={4} />
        </g>
      );
    case 'server':
      return <rect className={className} x={-32} y={-34} width={64} height={68} rx={14} />;
    case 'firewall':
      return <polygon className={className} points="-42,-26 42,-26 56,0 42,26 -42,26 -56,0" />;
    case 'cloud':
      return (
        <path
          className={className}
          d="M-44 8c0-14 10-24 24-24 7 0 13 3 18 9 3-5 9-9 17-9 12 0 21 9 21 21v3c9 1 16 9 16 18 0 10-8 18-18 18h-58c-13 0-22-9-22-20 0-10 7-18 16-20v-2z"
        />
      );
  }
}

function getBoundInterfaceSummary(definition: LabDefinition, session: LabSessionState, selectedNodeId: string): string | null {
  const boundLink = definition.topology.links.find(
    (link) => link.stateBinding?.deviceId === selectedNodeId,
  );

  if (!boundLink?.stateBinding) {
    return null;
  }

  const interfaceState = session.devices[selectedNodeId]?.interfaces[boundLink.stateBinding.interfaceId];

  if (!interfaceState) {
    return null;
  }

  if (!interfaceState.adminUp) {
    return `${interfaceState.label} is still administratively down.`;
  }

  return `${interfaceState.label} is up/up with ${interfaceState.ipAddress ?? 'no address'} assigned.`;
}

export function LabTopologyPanel({ definition, session, selectedNodeId, onSelectNode }: LabTopologyPanelProps) {
  const selectedNode = getNodeById(definition, selectedNodeId) ?? definition.topology.devices[0];
  const selectedDevice = session.devices[selectedNode.id];
  const boundSummary = getBoundInterfaceSummary(definition, session, selectedNode.id);

  return (
    <section className="lab-panel lab-panel--topology" aria-labelledby="lab-topology-title">
      <div className="lab-panel__header">
        <div>
          <p className="lab-panel__eyebrow">Topology panel</p>
          <h2 className="lab-panel__title" id="lab-topology-title">Live device map</h2>
        </div>
        <div className="lab-topology__legend" aria-label="Topology legend">
          <span className="lab-topology__legend-item"><i className="lab-topology__legend-swatch lab-topology__legend-swatch--active" />Active link</span>
          <span className="lab-topology__legend-item"><i className="lab-topology__legend-swatch lab-topology__legend-swatch--inactive" />Waiting on config</span>
        </div>
      </div>

      <div className="lab-topology__canvas-wrap">
        <svg className="lab-topology__canvas" viewBox="0 0 900 380" aria-hidden="true" focusable="false">
          {definition.topology.links.map((link) => {
            const source = getNodeById(definition, link.sourceId);
            const target = getNodeById(definition, link.targetId);

            if (!source || !target) {
              return null;
            }

            const isActive = isLabLinkActive(session, link);
            const midX = (source.x + target.x) / 2;
            const midY = (source.y + target.y) / 2;

            return (
              <g key={link.id}>
                <line
                  className={getLinkClassName(link.type, isActive)}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                />
                <text className="lab-topology__link-label" x={midX} y={midY - 8} textAnchor="middle">
                  {link.label}
                </text>
              </g>
            );
          })}

          {definition.topology.devices.map((node) => {
            const isSelected = node.id === selectedNode.id;

            return (
              <g
                key={node.id}
                className="lab-topology__node"
                onClick={() => onSelectNode(node.id)}
                transform={`translate(${node.x} ${node.y})`}
              >
                {renderNodeShape(node, isSelected)}
                <text className="lab-topology__node-label" x={0} y={6} textAnchor="middle">
                  {node.label}
                </text>
                <text className="lab-topology__node-type" x={0} y={48} textAnchor="middle">
                  {getNodeTypeLabel(node.type)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="lab-topology__device-picker">
        <p className="lab-topology__device-picker-title">Select a device</p>
        <ul className="lab-topology__device-list">
          {definition.topology.devices.map((node) => {
            const isSelected = node.id === selectedNode.id;

            return (
              <li key={node.id}>
                <button
                  type="button"
                  className={`lab-topology__device-button ${isSelected ? 'lab-topology__device-button--selected' : ''}`}
                  onClick={() => onSelectNode(node.id)}
                  aria-pressed={isSelected}
                  aria-controls="lab-topology-details"
                >
                  <span className="lab-topology__device-button-label">{node.label}</span>
                  <span className="lab-topology__device-button-type">{getNodeTypeLabel(node.type)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="lab-topology__details" id="lab-topology-details">
        <div>
          <p className="lab-topology__details-eyebrow">Selected device</p>
          <h3 className="lab-topology__details-title">{selectedNode.label} · {getNodeTypeLabel(selectedNode.type)}</h3>
        </div>
        <p className="lab-topology__details-copy">{selectedNode.note}</p>
        {boundSummary ? <p className="lab-topology__details-callout">{boundSummary}</p> : null}

        {selectedDevice ? (
          <ul className="lab-topology__status-list">
            <li>
              <span>Hostname</span>
              <strong>{selectedDevice.hostname}</strong>
            </li>
            <li>
              <span>Interfaces</span>
              <strong>{Object.keys(selectedDevice.interfaces).length}</strong>
            </li>
            <li>
              <span>OSPF processes</span>
              <strong>{Object.keys(selectedDevice.ospfProcesses).length}</strong>
            </li>
          </ul>
        ) : null}
      </div>
    </section>
  );
}
