import type { LabDefinition } from '../types';

export const d1NetworkComponentsLab: LabDefinition = {
  id: 'lab-d1-network-components',
  lessonId: 'd1-network-components',
  title: 'Branch Topology Bring-Up',
  summary:
    'Use a deterministic IOS lab to rename the branch router, bring up the LAN gateway interface, and seed the first OSPF process while the topology reacts in real time.',
  scenario:
    'A small branch office has already been cabled, but the gateway router is still sitting at its factory prompt. Operations needs the router renamed to match the diagram, the LAN-facing GigabitEthernet0/0 interface addressed and brought online, and a starter OSPF process added so the branch can advertise the user subnet upstream. This lab is intentionally guided so you can practice IOS mode changes without guessing.',
  topology: {
    devices: [
      {
        id: 'pc1',
        label: 'PC-1',
        type: 'pc',
        x: 88,
        y: 112,
        note: 'End-user workstation on the branch LAN.',
      },
      {
        id: 'sw1',
        label: 'SW1',
        type: 'switch-l2',
        x: 258,
        y: 112,
        note: 'Access switch that aggregates branch endpoints.',
      },
      {
        id: 'r1',
        label: 'R1',
        type: 'router',
        x: 434,
        y: 112,
        note: 'Branch router and default gateway for the users VLAN.',
      },
      {
        id: 'dist1',
        label: 'DIST',
        type: 'switch-l3',
        x: 434,
        y: 284,
        note: 'Layer 3 distribution switch feeding secured services.',
      },
      {
        id: 'srv1',
        label: 'SRV1',
        type: 'server',
        x: 628,
        y: 58,
        note: 'Application server behind the firewall path.',
      },
      {
        id: 'fw1',
        label: 'FW1',
        type: 'firewall',
        x: 628,
        y: 224,
        note: 'Security edge between the branch and upstream cloud.',
      },
      {
        id: 'cloud1',
        label: 'ISP',
        type: 'cloud',
        x: 812,
        y: 164,
        note: 'Cloud edge representing the WAN/Internet handoff.',
      },
    ],
    links: [
      {
        id: 'pc1-sw1',
        sourceId: 'pc1',
        targetId: 'sw1',
        type: 'copper',
        label: 'Copper access link',
      },
      {
        id: 'sw1-r1',
        sourceId: 'sw1',
        targetId: 'r1',
        type: 'copper',
        label: 'GigabitEthernet0/0',
        stateBinding: {
          deviceId: 'r1',
          interfaceId: 'GigabitEthernet0/0',
        },
      },
      {
        id: 'r1-dist1',
        sourceId: 'r1',
        targetId: 'dist1',
        type: 'fiber',
        label: 'Fiber uplink',
      },
      {
        id: 'dist1-fw1',
        sourceId: 'dist1',
        targetId: 'fw1',
        type: 'fiber',
        label: 'Secured services path',
      },
      {
        id: 'srv1-fw1',
        sourceId: 'srv1',
        targetId: 'fw1',
        type: 'copper',
        label: 'Server access',
      },
      {
        id: 'fw1-cloud1',
        sourceId: 'fw1',
        targetId: 'cloud1',
        type: 'serial',
        label: 'Serial WAN circuit',
      },
    ],
  },
  objectives: [
    {
      id: 'hostname-router',
      title: 'Rename the router',
      description: 'Set the branch router hostname to EDGE so the IOS prompt matches the authored topology.',
      validation: {
        type: 'hostname',
        deviceId: 'r1',
        expectedHostname: 'EDGE',
      },
    },
    {
      id: 'bring-up-lan-interface',
      title: 'Bring up the LAN gateway interface',
      description:
        'Configure GigabitEthernet0/0 with the authored address, add the LAN Gateway description, and remove shutdown.',
      validation: {
        type: 'interface',
        deviceId: 'r1',
        interfaceId: 'GigabitEthernet0/0',
        expected: {
          description: 'LAN Gateway',
          ipAddress: '192.168.10.1',
          subnetMask: '255.255.255.0',
          adminUp: true,
        },
      },
    },
    {
      id: 'seed-ospf',
      title: 'Seed OSPF process 1',
      description: 'Add the 192.168.10.0/24 network to OSPF area 0 so the branch LAN can be advertised upstream.',
      validation: {
        type: 'ospf-network',
        deviceId: 'r1',
        processId: '1',
        expected: {
          network: '192.168.10.0',
          wildcard: '0.0.0.255',
          area: '0',
        },
      },
    },
  ],
  hints: [
    {
      id: 'hint-mode-sequence',
      title: 'Remember the IOS ladder',
      body: 'You must climb through IOS modes in order: user EXEC -> privileged EXEC -> global configuration -> interface or router configuration.',
    },
    {
      id: 'hint-interface-alias',
      title: 'Abbreviations work here',
      body: 'The lab accepts IOS-style abbreviations such as `conf t`, `int g0/0`, and `sh ip int br` when the shortcut is unambiguous.',
    },
    {
      id: 'hint-verification',
      title: 'Use show commands to verify',
      body: 'Once the interface is up, `show ip interface brief` should display GigabitEthernet0/0 as `up/up` with 192.168.10.1 assigned.',
    },
  ],
  initialState: {
    activeDeviceId: 'r1',
    devices: {
      r1: {
        deviceId: 'r1',
        hostname: 'Router',
        type: 'router',
        interfaces: {
          'GigabitEthernet0/0': {
            id: 'GigabitEthernet0/0',
            label: 'GigabitEthernet0/0',
            ipAddress: null,
            subnetMask: null,
            description: '',
            adminUp: false,
            protocolUp: false,
          },
          'GigabitEthernet0/1': {
            id: 'GigabitEthernet0/1',
            label: 'GigabitEthernet0/1',
            ipAddress: null,
            subnetMask: null,
            description: '',
            adminUp: false,
            protocolUp: false,
          },
          'Serial0/0/0': {
            id: 'Serial0/0/0',
            label: 'Serial0/0/0',
            ipAddress: null,
            subnetMask: null,
            description: 'WAN handoff',
            adminUp: false,
            protocolUp: false,
          },
        },
        ospfProcesses: {},
      },
    },
  },
};
