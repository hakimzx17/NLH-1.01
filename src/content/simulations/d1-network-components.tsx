import { NetworkComponentsSimulationScene } from '../../components/simulation/NetworkComponentsSimulationScene';

import type { LessonSimulationDefinition } from './types';
import { SIMULATION_SPEED_OPTIONS } from './types';

export const d1NetworkComponentsSimulation: LessonSimulationDefinition = {
  lessonId: 'd1-network-components',
  title: 'Packet path across the core network roles',
  summary:
    'Follow one request from a host to a remote server and watch where switching ends, routing begins, and why each device role matters.',
  learningGoals: [
    'See that the end device originates traffic but does not forward for anyone else.',
    'Watch the switch make a Layer 2 forwarding decision based on the destination MAC address.',
    'Watch the router take over at Layer 3 and choose the next network based on the IP destination.',
    'Connect the motion on screen to the lesson language used in theory and the upcoming lab.',
  ],
  speedOptions: SIMULATION_SPEED_OPTIONS,
  steps: [
    {
      id: 'host-builds-frame',
      label: 'Host builds the frame',
      caption:
        'The study PC creates the data and wraps it in an Ethernet frame. Because the destination lives on another network, the frame is aimed at the default gateway instead of the final server.',
      instruction: 'Notice that the host originates the traffic but does not decide the full path through the network.',
      stateLabel: 'Host prepares traffic at the edge',
      dwellMs: 2400,
    },
    {
      id: 'switch-learns-mac',
      label: 'Switch forwards within the LAN',
      caption:
        'The access switch reads the frame header, checks its MAC table, and forwards the frame toward the gateway port. This is a Layer 2 decision based on MAC addressing.',
      instruction: 'Switches stay local to the LAN. They forward frames inside the same network segment.',
      stateLabel: 'Layer 2 forwarding by MAC address',
      dwellMs: 2600,
    },
    {
      id: 'router-routes-packet',
      label: 'Router chooses the next network',
      caption:
        'At the gateway, the router removes the incoming frame, examines the destination IP address, and uses its routing table to decide where the packet should go next.',
      instruction: 'This is the key role change from switching to routing: MAC-based forwarding ends and IP-based path selection begins.',
      stateLabel: 'Layer 3 forwarding by IP address',
      dwellMs: 2800,
    },
    {
      id: 'server-receives-data',
      label: 'Destination network delivers the data',
      caption:
        'The packet reaches the server-side network and is delivered to the content server. The full path only worked because each device stayed in its own job: host, switch, router, then host again.',
      instruction: 'Use this mental sequence when you troubleshoot: identify which role should own the next decision.',
      stateLabel: 'Traffic arrives after each role does its part',
      dwellMs: 2400,
    },
  ],
  Scene: NetworkComponentsSimulationScene,
};
