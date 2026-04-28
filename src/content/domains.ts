export type DomainId =
  | 'domain-1'
  | 'domain-2'
  | 'domain-3'
  | 'domain-4'
  | 'domain-5'
  | 'domain-6';

export type DomainDefinition = {
  id: DomainId;
  index: number;
  shortLabel: string;
  title: string;
  examWeightPercent: number;
  lessonsTarget: number;
  description: string;
  focus: string[];
};

export type LessonPreview = {
  id: string;
  domainId: DomainId;
  moduleLabel: string;
  title: string;
  estimatedMinutes: number;
  description: string;
};

export const domains: DomainDefinition[] = [
  {
    id: 'domain-1',
    index: 1,
    shortLabel: 'D1',
    title: 'Network Fundamentals',
    examWeightPercent: 20,
    lessonsTarget: 12,
    description: 'The physical, logical, and addressing foundations that every later domain builds on.',
    focus: ['topologies', 'OSI and TCP/IP', 'IPv4 and IPv6 basics', 'subnetting'],
  },
  {
    id: 'domain-2',
    index: 2,
    shortLabel: 'D2',
    title: 'Network Access',
    examWeightPercent: 20,
    lessonsTarget: 10,
    description: 'Switching, VLANs, wireless access, and the Layer 2 behaviors that make local networks work.',
    focus: ['VLANs', 'STP', 'EtherChannel', 'wireless LANs'],
  },
  {
    id: 'domain-3',
    index: 3,
    shortLabel: 'D3',
    title: 'IP Connectivity',
    examWeightPercent: 25,
    lessonsTarget: 11,
    description: 'Routing concepts, path selection, and the protocols that move packets between networks.',
    focus: ['static routes', 'default routes', 'OSPF', 'first-hop redundancy'],
  },
  {
    id: 'domain-4',
    index: 4,
    shortLabel: 'D4',
    title: 'IP Services',
    examWeightPercent: 10,
    lessonsTarget: 8,
    description: 'The services and management protocols that keep networks usable, visible, and supportable.',
    focus: ['NAT', 'DHCP', 'DNS', 'NTP'],
  },
  {
    id: 'domain-5',
    index: 5,
    shortLabel: 'D5',
    title: 'Security Fundamentals',
    examWeightPercent: 15,
    lessonsTarget: 9,
    description: 'The protective controls that reduce risk across campus, wireless, and routed environments.',
    focus: ['ACLs', 'AAA', 'port security', 'wireless security'],
  },
  {
    id: 'domain-6',
    index: 6,
    shortLabel: 'D6',
    title: 'Automation and Programmability',
    examWeightPercent: 10,
    lessonsTarget: 6,
    description: 'The controller, API, and data-model concepts that connect networking with modern automation.',
    focus: ['DNA Center', 'REST APIs', 'JSON', 'SDN'],
  },
];

const lessonPreviewsByDomain: Record<DomainId, LessonPreview[]> = {
  'domain-1': [
    {
      id: 'd1-network-components',
      domainId: 'domain-1',
      moduleLabel: '1.1',
      title: 'Network Components and Roles',
      estimatedMinutes: 24,
      description: 'Identify the routers, switches, hosts, and media that form a basic network.',
    },
    {
      id: 'd1-osi-model',
      domainId: 'domain-1',
      moduleLabel: '1.2',
      title: 'OSI and TCP/IP Without the Memorization Trap',
      estimatedMinutes: 26,
      description: 'Use the models as troubleshooting tools instead of recitation material.',
    },
    {
      id: 'd1-ip-addressing',
      domainId: 'domain-1',
      moduleLabel: '1.3',
      title: 'IPv4 and IPv6 Addressing Foundations',
      estimatedMinutes: 28,
      description: 'Read host, network, and prefix information with confidence.',
    },
    {
      id: 'd1-subnetting-basics',
      domainId: 'domain-1',
      moduleLabel: '1.4',
      title: 'Subnetting Fundamentals',
      estimatedMinutes: 30,
      description: 'Break address blocks into usable chunks and explain the why behind the math.',
    },
    {
      id: 'd1-basic-network-testing',
      domainId: 'domain-1',
      moduleLabel: '1.5',
      title: 'Basic Network Testing and Troubleshooting',
      estimatedMinutes: 26,
      description: 'Use ping, traceroute, and show commands to diagnose common network failures methodically.',
    },
    {
      id: 'd1-cabling-standards',
      domainId: 'domain-1',
      moduleLabel: '1.6',
      title: 'Cabling Standards and Connectors',
      estimatedMinutes: 22,
      description: 'Choose copper, fiber, console, and crossover cabling based on distance, speed, and device roles.',
    },
    {
      id: 'd1-network-topologies',
      domainId: 'domain-1',
      moduleLabel: '1.7',
      title: 'Network Topologies and Architecture',
      estimatedMinutes: 24,
      description: 'Compare physical and logical topologies, redundancy trade-offs, and enterprise design layers.',
    },
    {
      id: 'd1-wireless-basics',
      domainId: 'domain-1',
      moduleLabel: '1.8',
      title: 'Wireless Network Fundamentals',
      estimatedMinutes: 26,
      description: 'Understand RF behavior, 802.11 standards, AP architectures, and wireless security basics.',
    },
    {
      id: 'd1-ipv6-fundamentals',
      domainId: 'domain-1',
      moduleLabel: '1.9',
      title: 'IPv6 Fundamentals and Addressing',
      estimatedMinutes: 30,
      description: 'Read, compress, configure, and troubleshoot IPv6 addresses and neighbor discovery behavior.',
    },
  ],
  'domain-2': [
    {
      id: 'd2-vlans',
      domainId: 'domain-2',
      moduleLabel: '2.1',
      title: 'Why VLANs Exist',
      estimatedMinutes: 22,
      description: 'Segment broadcast domains and tie the concept back to real campus design.',
    },
    {
      id: 'd2-inter-vlan-routing',
      domainId: 'domain-2',
      moduleLabel: '2.2',
      title: 'Inter-VLAN Routing Paths',
      estimatedMinutes: 27,
      description: 'Compare router-on-a-stick with multilayer switching from a packet path perspective.',
    },
    {
      id: 'd2-stp',
      domainId: 'domain-2',
      moduleLabel: '2.3',
      title: 'Spanning Tree Fundamentals',
      estimatedMinutes: 29,
      description: 'Visualize loops, root bridge election, and why blocked ports are healthy.',
    },
    {
      id: 'd2-etherchannel',
      domainId: 'domain-2',
      moduleLabel: '2.4',
      title: 'EtherChannel Load Sharing',
      estimatedMinutes: 24,
      description: 'Bundle links without accidentally creating a problem STP has to clean up.',
    },
  ],
  'domain-3': [
    {
      id: 'd3-routing-concepts',
      domainId: 'domain-3',
      moduleLabel: '3.1',
      title: 'How Routers Make Forwarding Decisions',
      estimatedMinutes: 27,
      description: 'Use longest-prefix match as the mental model for routing behavior.',
    },
    {
      id: 'd3-static-routes',
      domainId: 'domain-3',
      moduleLabel: '3.2',
      title: 'Static, Default, and Floating Static Routes',
      estimatedMinutes: 25,
      description: 'Compare the control and trade-offs of hand-built routing.',
    },
    {
      id: 'd3-ospf',
      domainId: 'domain-3',
      moduleLabel: '3.3',
      title: 'OSPFv2 Single-Area Basics',
      estimatedMinutes: 30,
      description: 'Understand neighbors, LSAs, and why SPF feels deterministic.',
    },
    {
      id: 'd3-fhrp',
      domainId: 'domain-3',
      moduleLabel: '3.4',
      title: 'First-Hop Redundancy',
      estimatedMinutes: 22,
      description: 'Keep the default gateway resilient without user devices noticing.',
    },
  ],
  'domain-4': [
    {
      id: 'd4-nat',
      domainId: 'domain-4',
      moduleLabel: '4.1',
      title: 'NAT and PAT Translation Stories',
      estimatedMinutes: 25,
      description: 'Watch addresses change and keep the reason for translation grounded in reality.',
    },
    {
      id: 'd4-dhcp',
      domainId: 'domain-4',
      moduleLabel: '4.2',
      title: 'DHCP Leasing and Relay',
      estimatedMinutes: 23,
      description: 'Follow the lease process from discover to acknowledgement.',
    },
    {
      id: 'd4-dns',
      domainId: 'domain-4',
      moduleLabel: '4.3',
      title: 'DNS Resolution Flow',
      estimatedMinutes: 21,
      description: 'Map recursive queries into a sequence that makes troubleshooting easier.',
    },
    {
      id: 'd4-observability',
      domainId: 'domain-4',
      moduleLabel: '4.4',
      title: 'SNMP, Syslog, and NTP',
      estimatedMinutes: 24,
      description: 'Build a mental model for visibility, time, and operational confidence.',
    },
  ],
  'domain-5': [
    {
      id: 'd5-threat-landscape',
      domainId: 'domain-5',
      moduleLabel: '5.1',
      title: 'Threat Types and Security Mindset',
      estimatedMinutes: 24,
      description: 'Anchor the exam objectives in why each security control exists.',
    },
    {
      id: 'd5-acls',
      domainId: 'domain-5',
      moduleLabel: '5.2',
      title: 'ACL Logic Without Guessing',
      estimatedMinutes: 28,
      description: 'Read permit and deny behavior as packet matching rules, not magic incantations.',
    },
    {
      id: 'd5-layer2-security',
      domainId: 'domain-5',
      moduleLabel: '5.3',
      title: 'Layer 2 Security Controls',
      estimatedMinutes: 26,
      description: 'See how snooping, inspection, and port security close common attack paths.',
    },
    {
      id: 'd5-aaa',
      domainId: 'domain-5',
      moduleLabel: '5.4',
      title: 'AAA and Secure Device Access',
      estimatedMinutes: 20,
      description: 'Tie authentication, authorization, and accounting to everyday admin workflows.',
    },
  ],
  'domain-6': [
    {
      id: 'd6-controller-based-networking',
      domainId: 'domain-6',
      moduleLabel: '6.1',
      title: 'Traditional vs Controller-Based Networking',
      estimatedMinutes: 22,
      description: 'Understand why centralized control changes operations and policy rollout.',
    },
    {
      id: 'd6-rest-apis',
      domainId: 'domain-6',
      moduleLabel: '6.2',
      title: 'REST APIs for Network Engineers',
      estimatedMinutes: 21,
      description: 'Learn the request and response language behind modern automation.',
    },
    {
      id: 'd6-data-formats',
      domainId: 'domain-6',
      moduleLabel: '6.3',
      title: 'JSON, YAML, and XML at a Glance',
      estimatedMinutes: 19,
      description: 'Read common automation payloads without feeling like you need to become a developer first.',
    },
    {
      id: 'd6-sdn',
      domainId: 'domain-6',
      moduleLabel: '6.4',
      title: 'Software-Defined Networking Patterns',
      estimatedMinutes: 23,
      description: 'Connect abstract SDN language back to practical network operations.',
    },
  ],
};

export function getDomainById(domainId?: string): DomainDefinition | null {
  return domains.find((domain) => domain.id === domainId) ?? null;
}

export function getDomainLessonPreviews(domainId: DomainId): LessonPreview[] {
  return lessonPreviewsByDomain[domainId];
}

export function getAllLessonPreviews(): LessonPreview[] {
  return Object.values(lessonPreviewsByDomain).flat();
}

export function getLessonPreviewById(lessonId?: string): LessonPreview | null {
  return getAllLessonPreviews().find((lesson) => lesson.id === lessonId) ?? null;
}
