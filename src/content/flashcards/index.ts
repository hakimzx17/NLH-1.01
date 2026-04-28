import type { Flashcard, FlashcardDeck } from './types';

// ---------------------------------------------------------------------------
// Card data per domain (defined first so they can be referenced below)
// ---------------------------------------------------------------------------

const domain1Flashcards: Flashcard[] = [
  {
    id: 'd1-fc-01',
    domainId: 'domain-1',
    lessonId: 'd1-network-components',
    front: 'What layer does a router operate at, and what addressing does it use for forwarding?',
    back: 'Layer 3 (Network layer). Routers forward packets based on IP addresses.',
  },
  {
    id: 'd1-fc-02',
    domainId: 'domain-1',
    lessonId: 'd1-network-components',
    front: 'What layer does a switch operate at, and what addressing does it use?',
    back: 'Layer 2 (Data Link layer). Switches forward frames based on MAC addresses.',
  },
  {
    id: 'd1-fc-03',
    domainId: 'domain-1',
    lessonId: 'd1-network-components',
    front: 'What is the maximum segment length for Cat5e/Cat6 copper Ethernet cable?',
    back: '100 meters.',
  },
  {
    id: 'd1-fc-04',
    domainId: 'domain-1',
    lessonId: 'd1-network-components',
    front: 'What is the difference between physical and logical topology?',
    back: 'Physical topology describes the actual cable layout. Logical topology describes how data flows across the network.',
  },
  {
    id: 'd1-fc-05',
    domainId: 'domain-1',
    lessonId: 'd1-network-components',
    front: 'Why is wireless considered shared media?',
    back: 'Every device on the same channel competes for airtime. Unlike switched Ethernet where each port is its own collision domain, wireless devices must take turns transmitting.',
  },
  {
    id: 'd1-fc-06',
    domainId: 'domain-1',
    lessonId: 'd1-osi-model',
    front: 'List the 7 OSI layers from bottom to top.',
    back: '1. Physical\n2. Data Link\n3. Network\n4. Transport\n5. Session\n6. Presentation\n7. Application',
  },
  {
    id: 'd1-fc-07',
    domainId: 'domain-1',
    lessonId: 'd1-osi-model',
    front: 'What is the PDU at each of the first 4 OSI layers?',
    back: 'Layer 1 (Physical): Bits\nLayer 2 (Data Link): Frames\nLayer 3 (Network): Packets\nLayer 4 (Transport): Segments (TCP) or Datagrams (UDP)',
  },
  {
    id: 'd1-fc-08',
    domainId: 'domain-1',
    lessonId: 'd1-osi-model',
    front: 'Which OSI layer handles encryption and compression?',
    back: 'Layer 6 — Presentation layer.',
  },
  {
    id: 'd1-fc-09',
    domainId: 'domain-1',
    lessonId: 'd1-osi-model',
    front: 'What is encapsulation?',
    back: 'The process of adding headers (and sometimes trailers) at each OSI layer as data moves down the stack. Each layer wraps the PDU from the layer above with its own header.',
  },
  {
    id: 'd1-fc-10',
    domainId: 'domain-1',
    lessonId: 'd1-osi-model',
    front: 'What is the difference between TCP and UDP?',
    back: 'TCP is connection-oriented, reliable, and provides ordered delivery with flow control and error recovery. UDP is connectionless, unreliable, and has lower overhead — suitable for real-time applications like VoIP and video streaming.',
  },
  {
    id: 'd1-fc-11',
    domainId: 'domain-1',
    lessonId: 'd1-ip-addressing',
    front: 'What is a MAC address and how many bits is it?',
    back: 'A MAC (Media Access Control) address is a 48-bit physical address burned into the NIC. It is typically represented as 6 pairs of hexadecimal digits (e.g., AA:BB:CC:DD:EE:FF).',
  },
  {
    id: 'd1-fc-12',
    domainId: 'domain-1',
    lessonId: 'd1-ip-addressing',
    front: 'What is the difference between IPv4 and IPv6 address length?',
    back: 'IPv4 uses 32-bit addresses (e.g., 192.168.1.1). IPv6 uses 128-bit addresses (e.g., 2001:0db8::1).',
  },
  {
    id: 'd1-fc-13',
    domainId: 'domain-1',
    lessonId: 'd1-ip-addressing',
    front: 'What are the three IPv4 private address ranges (RFC 1918)?',
    back: '10.0.0.0/8 (10.0.0.0 – 10.255.255.255)\n172.16.0.0/12 (172.16.0.0 – 172.31.255.255)\n192.168.0.0/16 (192.168.0.0 – 192.168.255.255)',
  },
  {
    id: 'd1-fc-14',
    domainId: 'domain-1',
    lessonId: 'd1-ip-addressing',
    front: 'What is a loopback address in IPv4 and IPv6?',
    back: 'IPv4: 127.0.0.1\nIPv6: ::1\nUsed to test the local TCP/IP stack without sending traffic onto the network.',
  },
  {
    id: 'd1-fc-15',
    domainId: 'domain-1',
    lessonId: 'd1-subnetting-basics',
    front: 'What does CIDR notation /24 mean in terms of subnet mask and host count?',
    back: 'Subnet mask: 255.255.255.0\nHost bits: 8\nUsable hosts: 2^8 - 2 = 254',
  },
  {
    id: 'd1-fc-16',
    domainId: 'domain-1',
    lessonId: 'd1-subnetting-basics',
    front: 'How do you calculate the number of usable hosts in a subnet?',
    back: '2^(host bits) - 2. Subtract 2 because the network address (all host bits = 0) and broadcast address (all host bits = 1) cannot be assigned to hosts.',
  },
  {
    id: 'd1-fc-17',
    domainId: 'domain-1',
    lessonId: 'd1-subnetting-basics',
    front: 'What is the subnet mask for /27?',
    back: '255.255.255.224\n(27 network bits = 255.255.255 + 11100000 = 128+64+32 = 224)',
  },
  {
    id: 'd1-fc-18',
    domainId: 'domain-1',
    lessonId: 'd1-subnetting-basics',
    front: 'What is VLSM and why is it useful?',
    back: 'Variable Length Subnet Masking allows different subnets within the same network to use different subnet mask lengths. This conserves IP addresses by matching subnet size to actual host requirements.',
  },
];

const domain2Flashcards: Flashcard[] = [
  {
    id: 'd2-fc-01',
    domainId: 'domain-2',
    lessonId: 'd2-vlans',
    front: 'What is a VLAN and why is it used?',
    back: 'A VLAN (Virtual Local Area Network) segments a physical switch into multiple logical broadcast domains. It improves security, reduces broadcast traffic, and allows logical grouping of devices regardless of physical location.',
  },
  {
    id: 'd2-fc-02',
    domainId: 'domain-2',
    lessonId: 'd2-vlans',
    front: 'What is a trunk port and which protocol tags frames on trunks?',
    back: 'A trunk port carries traffic for multiple VLANs. IEEE 802.1Q inserts a VLAN tag into the Ethernet frame header to identify which VLAN the frame belongs to.',
  },
  {
    id: 'd2-fc-03',
    domainId: 'domain-2',
    lessonId: 'd2-vlans',
    front: 'What is the native VLAN on an 802.1Q trunk?',
    back: 'The native VLAN is the VLAN whose traffic is sent untagged on a trunk. By default, it is VLAN 1. Both sides of the trunk must agree on the native VLAN or a native VLAN mismatch occurs.',
  },
  {
    id: 'd2-fc-04',
    domainId: 'domain-2',
    lessonId: 'd2-inter-vlan-routing',
    front: 'What is router-on-a-stick?',
    back: 'A single router physical interface connected to a switch trunk port, with subinterfaces (e.g., Gi0/0.10, Gi0/0.20) each assigned to a different VLAN. The router routes between VLANs using 802.1Q encapsulation.',
  },
  {
    id: 'd2-fc-05',
    domainId: 'domain-2',
    lessonId: 'd2-stp',
    front: 'What problem does STP solve?',
    back: 'STP (Spanning Tree Protocol) prevents Layer 2 switching loops by blocking redundant paths. Without STP, broadcast storms, MAC table instability, and multiple frame copies would occur.',
  },
  {
    id: 'd2-fc-06',
    domainId: 'domain-2',
    lessonId: 'd2-stp',
    front: 'How is the root bridge elected in STP?',
    back: 'The switch with the lowest Bridge ID wins. Bridge ID = priority (default 32768) + MAC address. Lower priority wins first; if tied, lower MAC address breaks the tie.',
  },
];

const domain3Flashcards: Flashcard[] = [
  {
    id: 'd3-fc-01',
    domainId: 'domain-3',
    lessonId: 'd3-routing-concepts',
    front: 'What is longest-prefix match?',
    back: 'When a router has multiple routes that match a destination IP, it chooses the route with the most specific (longest) subnet mask. For example, /28 is preferred over /24.',
  },
  {
    id: 'd3-fc-02',
    domainId: 'domain-3',
    lessonId: 'd3-static-routes',
    front: 'What is a floating static route?',
    back: 'A static route with a higher administrative distance than the primary route. It sits in the routing table as a backup and only becomes active when the primary route fails.',
  },
  {
    id: 'd3-fc-03',
    domainId: 'domain-3',
    lessonId: 'd3-ospf',
    front: 'What is the default administrative distance of OSPF?',
    back: '110.',
  },
  {
    id: 'd3-fc-04',
    domainId: 'domain-3',
    lessonId: 'd3-ospf',
    front: 'What are the OSPF neighbor states in order?',
    back: 'Down → Init → 2-Way → ExStart → Exchange → Loading → Full',
  },
];

const domain4Flashcards: Flashcard[] = [
  {
    id: 'd4-fc-01',
    domainId: 'domain-4',
    lessonId: 'd4-nat',
    front: 'What is the difference between NAT and PAT?',
    back: 'NAT (Network Address Translation) maps one inside local address to one inside global address. PAT (Port Address Translation, also called NAT overload) maps multiple inside local addresses to a single inside global address using different port numbers.',
  },
  {
    id: 'd4-fc-02',
    domainId: 'domain-4',
    lessonId: 'd4-dhcp',
    front: 'What are the four steps of the DHCP process (DORA)?',
    back: 'Discover (client broadcasts looking for a server)\nOffer (server responds with an available IP)\nRequest (client requests the offered IP)\nAcknowledgment (server confirms the lease)',
  },
  {
    id: 'd4-fc-03',
    domainId: 'domain-4',
    lessonId: 'd4-dns',
    front: 'What is the difference between recursive and iterative DNS queries?',
    back: 'Recursive: the DNS server does all the work and returns the final answer to the client.\nIterative: the DNS server returns a referral to another server, and the client (or resolver) must query again.',
  },
];

const domain5Flashcards: Flashcard[] = [
  {
    id: 'd5-fc-01',
    domainId: 'domain-5',
    lessonId: 'd5-acls',
    front: 'What is the implicit deny at the end of every ACL?',
    back: 'Every ACL ends with an invisible "deny any" statement. If no explicit permit rule matches the traffic, it is denied. This is why you must always include permit statements before the implicit deny.',
  },
  {
    id: 'd5-fc-02',
    domainId: 'domain-5',
    lessonId: 'd5-acls',
    front: 'What is the difference between standard and extended ACLs?',
    back: 'Standard ACLs (1-99, 1300-1999) filter based on source IP address only.\nExtended ACLs (100-199, 2000-2699) filter based on source IP, destination IP, protocol, and port numbers.',
  },
  {
    id: 'd5-fc-03',
    domainId: 'domain-5',
    lessonId: 'd5-layer2-security',
    front: 'What does DHCP Snooping do?',
    back: 'DHCP Snooping builds a binding table of legitimate DHCP leases and blocks rogue DHCP servers. It distinguishes trusted ports (connected to legitimate DHCP servers) from untrusted ports.',
  },
];

const domain6Flashcards: Flashcard[] = [
  {
    id: 'd6-fc-01',
    domainId: 'domain-6',
    lessonId: 'd6-controller-based-networking',
    front: 'What is the key difference between traditional and controller-based networking?',
    back: 'Traditional: each device is configured individually (device-by-device).\nController-based: a central controller (like Cisco DNA Center) manages and pushes configurations to all devices from a single point.',
  },
  {
    id: 'd6-fc-02',
    domainId: 'domain-6',
    lessonId: 'd6-rest-apis',
    front: 'What HTTP method is used to create, read, update, and delete resources in a REST API?',
    back: 'Create: POST\nRead: GET\nUpdate: PUT (full) or PATCH (partial)\nDelete: DELETE',
  },
  {
    id: 'd6-fc-03',
    domainId: 'domain-6',
    lessonId: 'd6-data-formats',
    front: 'What are the key differences between JSON, YAML, and XML?',
    back: 'JSON: uses braces and key-value pairs, most common in APIs.\nYAML: uses indentation, human-readable, common in configuration (Ansible).\nXML: uses tags, more verbose, older but still used in some enterprise systems.',
  },
];

// ---------------------------------------------------------------------------
// Deck metadata with computed card counts
// ---------------------------------------------------------------------------

const _flashcardData: Record<string, Flashcard[]> = {
  'domain-1': domain1Flashcards,
  'domain-2': domain2Flashcards,
  'domain-3': domain3Flashcards,
  'domain-4': domain4Flashcards,
  'domain-5': domain5Flashcards,
  'domain-6': domain6Flashcards,
};

const _allCards = [
  ...domain1Flashcards,
  ...domain2Flashcards,
  ...domain3Flashcards,
  ...domain4Flashcards,
  ...domain5Flashcards,
  ...domain6Flashcards,
];

const _deckMeta: Omit<FlashcardDeck, 'cardCount'>[] = [
  {
    id: 'domain-1',
    domainId: 'domain-1',
    title: 'Network Fundamentals',
    description: 'Core concepts: OSI model, TCP/IP, device roles, addressing, topologies, and media types.',
  },
  {
    id: 'domain-2',
    domainId: 'domain-2',
    title: 'Network Access',
    description: 'VLANs, STP, EtherChannel, wireless LAN architecture, and Layer 2 protocols.',
  },
  {
    id: 'domain-3',
    domainId: 'domain-3',
    title: 'IP Connectivity',
    description: 'Routing concepts, static routes, OSPFv2, IPv6 routing, and FHRP.',
  },
  {
    id: 'domain-4',
    domainId: 'domain-4',
    title: 'IP Services',
    description: 'NAT, DHCP, DNS, NTP, SNMP, Syslog, QoS, and management protocols.',
  },
  {
    id: 'domain-5',
    domainId: 'domain-5',
    title: 'Security Fundamentals',
    description: 'ACLs, Layer 2 security, AAA, VPN concepts, and wireless security.',
  },
  {
    id: 'domain-6',
    domainId: 'domain-6',
    title: 'Automation & Programmability',
    description: 'Controller-based networking, REST APIs, data formats, and SDN.',
  },
];

export const flashcardDecks: FlashcardDeck[] = _deckMeta.map((meta) => ({
  ...meta,
  cardCount: (_flashcardData[meta.id] ?? []).length,
}));

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getDeckByDomainId(domainId: string): FlashcardDeck | null {
  return flashcardDecks.find((deck) => deck.id === domainId) ?? null;
}

export function getFlashcardsByDomainId(domainId: string): Flashcard[] {
  return _allCards.filter((card) => card.domainId === domainId);
}

export function getFlashcardById(cardId: string): Flashcard | null {
  return _allCards.find((card) => card.id === cardId) ?? null;
}

export function getFlashcardsByLessonId(lessonId: string): Flashcard[] {
  return _allCards.filter((card) => card.lessonId === lessonId);
}

export function getDeckCardCount(domainId: string): number {
  return getFlashcardsByDomainId(domainId).length;
}

export function getAllFlashcards(): Flashcard[] {
  return _allCards;
}
