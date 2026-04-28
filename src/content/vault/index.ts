import type { VaultCategory, VaultItem } from './types';

export const vaultCategories: { id: VaultCategory; label: string; description: string }[] = [
  {
    id: 'ccna-must-know',
    label: 'CCNA Must-Know',
    description: 'Ports, protocols, subnet masks, CIDR blocks, and binary conversion shortcuts.',
  },
  {
    id: 'osi-tcp-ip',
    label: 'OSI / TCP-IP',
    description: 'Layer names, PDUs, protocols per layer, and encapsulation order.',
  },
  {
    id: 'cli-reference',
    label: 'CLI Command Reference',
    description: 'Mode-aware IOS command references organized by task and verification workflow.',
  },
  {
    id: 'protocol-facts',
    label: 'Protocol Facts',
    description: 'OSPF, EIGRP, STP, VTP, CDP, LLDP — key facts, timers, AD values.',
  },
  {
    id: 'glossary',
    label: 'Glossary',
    description: 'Networking terms with concise definitions linked to source lessons.',
  },
  {
    id: 'exam-traps',
    label: 'Exam Traps',
    description: 'Common misconceptions, trick question patterns, and exam favorites.',
  },
];

export const vaultItems: VaultItem[] = [
  // CCNA Must-Know
  {
    id: 'vault-ports-protocols',
    category: 'ccna-must-know',
    title: 'Common Ports and Protocols',
    content: `FTP: 20/21 (TCP) — File transfer
SSH: 22 (TCP) — Secure remote access
Telnet: 23 (TCP) — Unencrypted remote access (avoid in production)
SMTP: 25 (TCP) — Email sending
DNS: 53 (TCP/UDP) — Name resolution
DHCP: 67/68 (UDP) — Dynamic IP assignment
HTTP: 80 (TCP) — Unencrypted web
HTTPS: 443 (TCP) — Encrypted web (TLS/SSL)
SNMP: 161/162 (UDP) — Network management
Syslog: 514 (UDP) — Log collection
NTP: 123 (UDP) — Time synchronization
OSPF: 89 (IP protocol) — Link-state routing
EIGRP: 88 (IP protocol) — Advanced distance vector`,
    tags: ['ports', 'protocols', 'TCP', 'UDP'],
  },
  {
    id: 'vault-subnet-masks',
    category: 'ccna-must-know',
    title: 'Subnet Mask Cheat Sheet',
    content: `/8  — 255.0.0.0       — 16,777,214 hosts
/9  — 255.128.0.0     — 8,388,606 hosts
/16 — 255.255.0.0     — 65,534 hosts
/24 — 255.255.255.0   — 254 hosts
/25 — 255.255.255.128 — 126 hosts
/26 — 255.255.255.192 — 62 hosts
/27 — 255.255.255.224 — 30 hosts
/28 — 255.255.255.240 — 14 hosts
/29 — 255.255.255.248 — 6 hosts
/30 — 255.255.255.252 — 2 hosts (point-to-point links)
/31 — 255.255.255.254 — 0 usable (RFC 3021, point-to-point only)
/32 — 255.255.255.255 — Single host route`,
    tags: ['subnet', 'CIDR', 'mask', 'hosts'],
    relatedLessonId: 'd1-subnetting-basics',
  },
  {
    id: 'vault-administrative-distances',
    category: 'ccna-must-know',
    title: 'Administrative Distances',
    content: `Connected interface: 0
Static route: 1
EIGRP summary: 5
eBGP: 20
EIGRP (internal): 90
IGRP: 100
OSPF: 110
IS-IS: 115
RIP: 120
EIGRP (external): 170
iBGP: 200
Unknown/unreachable: 255

Lower AD = more trusted. When two routing sources provide the same route, the one with the lower AD wins.`,
    tags: ['AD', 'routing', 'trust', 'metrics'],
    relatedLessonId: 'd3-routing-concepts',
  },

  // OSI / TCP-IP
  {
    id: 'vault-osi-layers',
    category: 'osi-tcp-ip',
    title: 'OSI Model — All 7 Layers',
    content: `Layer 7 — Application: HTTP, FTP, SMTP, DNS (user-facing protocols)
Layer 6 — Presentation: Encryption, compression, translation (SSL/TLS, JPEG)
Layer 5 — Session: Dialog control, session management (NetBIOS, RPC)
Layer 4 — Transport: Segments/Datagrams, port numbers (TCP, UDP)
Layer 3 — Network: Packets, logical addressing, routing (IP, ICMP, OSPF)
Layer 2 — Data Link: Frames, MAC addresses, switching (Ethernet, ARP)
Layer 1 — Physical: Bits, cables, signals (copper, fiber, wireless)

Mnemonic: "All People Seem To Need Data Processing" (top to bottom)
Mnemonic: "Please Do Not Throw Sausage Pizza Away" (bottom to top)`,
    tags: ['OSI', 'layers', 'model', 'PDU'],
    relatedLessonId: 'd1-osi-model',
  },
  {
    id: 'vault-encapsulation',
    category: 'osi-tcp-ip',
    title: 'Encapsulation Order',
    content: `Data flows DOWN the stack at the sender (encapsulation):
1. Application creates data
2. Transport adds TCP/UDP header → Segment
3. Network adds IP header → Packet
4. Data Link adds Ethernet header + trailer → Frame
5. Physical converts to bits → Bits on wire

Data flows UP the stack at the receiver (decapsulation):
Bits → Frame → Packet → Segment → Data

Each layer strips its own header and passes the payload up.`,
    tags: ['encapsulation', 'decapsulation', 'PDU', 'flow'],
    relatedLessonId: 'd1-osi-model',
  },
  {
    id: 'vault-tcp-ip-model',
    category: 'osi-tcp-ip',
    title: 'TCP/IP Model (4 Layers)',
    content: `Layer 4 — Application: Combines OSI Layers 5-7 (HTTP, DNS, SMTP)
Layer 3 — Transport: Maps to OSI Layer 4 (TCP, UDP)
Layer 2 — Internet: Maps to OSI Layer 3 (IP, ICMP, ARP)
Layer 1 — Network Access: Combines OSI Layers 1-2 (Ethernet, Wi-Fi)

The TCP/IP model is the practical model used in real networking. The OSI model is the conceptual reference model used for troubleshooting and learning.`,
    tags: ['TCP/IP', 'model', 'layers', 'comparison'],
    relatedLessonId: 'd1-osi-model',
  },

  // CLI Reference
  {
    id: 'vault-cli-basics',
    category: 'cli-reference',
    title: 'IOS Mode Navigation',
    content: `Router>                    — User EXEC mode (limited commands)
Router> enable             — Enter privileged EXEC mode
Router#                    — Privileged EXEC mode (full access)
Router# configure terminal — Enter global configuration mode
Router(config)#            — Global configuration mode
Router(config)# interface Gi0/0 — Enter interface config mode
Router(config-if)#         — Interface configuration mode
Router(config-if)# exit    — Go back one level
Router(config-if)# end     — Return directly to privileged EXEC
Router# disable            — Return to user EXEC mode
Router# show running-config — View current configuration
Router# copy running-config startup-config — Save configuration`,
    tags: ['IOS', 'modes', 'navigation', 'basics'],
    relatedLessonId: 'd1-network-components',
  },
  {
    id: 'vault-cli-interface',
    category: 'cli-reference',
    title: 'Interface Configuration Commands',
    content: `Router(config)# interface Gi0/0
Router(config-if)# description Link to Core Switch
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown        — Enable the interface
Router(config-if)# shutdown           — Disable the interface
Router(config-if)# duplex full        — Set duplex mode
Router(config-if)# speed 1000         — Set speed in Mbps
Router(config-if)# no ip address      — Remove IP address
Router# show ip interface brief       — Quick interface status overview
Router# show interfaces Gi0/0         — Detailed interface info`,
    tags: ['interface', 'IP', 'shutdown', 'configuration'],
    relatedLessonId: 'd1-network-components',
  },
  {
    id: 'vault-cli-vlan',
    category: 'cli-reference',
    title: 'VLAN Configuration Commands',
    content: `Switch(config)# vlan 10
Switch(config-vlan)# name SALES
Switch(config-vlan)# exit
Switch(config)# interface Fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10

— Trunk configuration —
Switch(config)# interface Gi0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk native vlan 99
Switch(config-if)# switchport trunk allowed vlan 10,20,30

— Verify —
Switch# show vlan brief
Switch# show interfaces trunk`,
    tags: ['VLAN', 'trunk', '802.1Q', 'switchport'],
    relatedLessonId: 'd2-vlans',
  },

  // Protocol Facts
  {
    id: 'vault-ospf-facts',
    category: 'protocol-facts',
    title: 'OSPF Key Facts',
    content: `Type: Link-state routing protocol
Algorithm: Dijkstra (SPF — Shortest Path First)
Administrative Distance: 110
Metric: Cost (based on bandwidth)
Multicast addresses: 224.0.0.5 (all OSPF routers), 224.0.0.6 (DR/BDR)
Protocol number: 89
Wildcard mask: inverse of subnet mask (e.g., /24 = 0.0.0.255)
Areas: Backbone area is always Area 0
Router ID selection: 1) Manually configured, 2) Highest loopback IP, 3) Highest active interface IP
Neighbor states: Down → Init → 2-Way → ExStart → Exchange → Loading → Full
LSA Types: Type 1 (Router), Type 2 (Network), Type 3 (Summary), Type 4 (ASBR Summary), Type 5 (External)`,
    tags: ['OSPF', 'link-state', 'SPF', 'LSA', 'areas'],
    relatedLessonId: 'd3-ospf',
  },
  {
    id: 'vault-stp-facts',
    category: 'protocol-facts',
    title: 'STP Key Facts',
    content: `Purpose: Prevent Layer 2 switching loops
Standard: IEEE 802.1D (original), 802.1w (RSTP), 802.1s (MST)
Bridge ID: Priority (default 32768) + MAC address
Root bridge election: Lowest Bridge ID wins
Port roles: Root, Designated, Non-Designated (Blocked)
Port states (802.1D): Blocking → Listening → Learning → Forwarding → Disabled
Port states (RSTP): Discarding → Learning → Forwarding
BPDU: Bridge Protocol Data Unit — sent every 2 seconds
Hello time: 2 seconds
Forward delay: 15 seconds
Max age: 20 seconds
PortFast: Skips listening/learning on access ports (use only on end-device ports)
BPDU Guard: Shuts down PortFast port if BPDU received`,
    tags: ['STP', 'RSTP', 'loops', 'bridge', 'BPDU'],
    relatedLessonId: 'd2-stp',
  },

  // Glossary
  {
    id: 'vault-glossary-broadcast',
    category: 'glossary',
    title: 'Broadcast Domain',
    content: `A broadcast domain is a logical segment of a network where any device can send a broadcast frame that reaches all other devices in the same domain. Routers break broadcast domains; switches do not (by default). VLANs create separate broadcast domains on a single switch.

Too large a broadcast domain = broadcast storms, wasted bandwidth, poor performance.`,
    tags: ['broadcast', 'domain', 'segmentation', 'VLAN'],
    relatedLessonId: 'd1-network-components',
  },
  {
    id: 'vault-glossary-collision',
    category: 'glossary',
    title: 'Collision Domain',
    content: `A collision domain is a network segment where data packets can collide with each other. Each switch port is its own collision domain. Hubs share a single collision domain across all ports.

Switches eliminate collisions by giving each port its own collision domain (full-duplex). This is why modern switched networks rarely experience collisions.`,
    tags: ['collision', 'domain', 'switch', 'hub', 'duplex'],
    relatedLessonId: 'd1-network-components',
  },
  {
    id: 'vault-glossary-nat',
    category: 'glossary',
    title: 'NAT (Network Address Translation)',
    content: `NAT translates private (inside local) IP addresses to public (inside global) IP addresses. This allows multiple devices on a private network to share a single public IP.

Inside Local: Private IP before translation (e.g., 192.168.1.10)
Inside Global: Public IP after translation (e.g., 203.0.113.5)
Outside Local: External device's IP as seen from inside
Outside Global: External device's real public IP

PAT (Port Address Translation) is NAT overload — multiple inside addresses map to one public IP using different port numbers.`,
    tags: ['NAT', 'PAT', 'translation', 'private', 'public'],
    relatedLessonId: 'd4-nat',
  },

  // Exam Traps
  {
    id: 'vault-trap-router-vs-switch',
    category: 'exam-traps',
    title: 'Router vs Switch — The Classic Trap',
    content: `The exam will describe a device and ask you to identify it. Key distinctions:

"Forwarding based on MAC addresses" = Switch (Layer 2)
"Forwarding based on IP addresses" = Router (Layer 3)
"Builds a MAC address table" = Switch
"Maintains a routing table" = Router
"Connects different networks" = Router
"Connects devices within the same network" = Switch

The exam also tests frame vs packet terminology. Frames exist at Layer 2. Packets exist at Layer 3.`,
    tags: ['trap', 'router', 'switch', 'Layer 2', 'Layer 3'],
    relatedLessonId: 'd1-network-components',
  },
  {
    id: 'vault-trap-acl-order',
    category: 'exam-traps',
    title: 'ACL Processing Order Trap',
    content: `ACLs are processed top-down, first-match. Once a packet matches a rule, processing stops. This means:

1. Specific rules MUST come before general rules
2. If you put "permit any" first, nothing after it is ever evaluated
3. Every ACL has an implicit "deny any" at the end

Exam trap: They'll show you an ACL with "permit any" at the top and ask what happens to specific traffic below it. Answer: it never reaches those rules.`,
    tags: ['ACL', 'order', 'first-match', 'implicit deny', 'trap'],
    relatedLessonId: 'd5-acls',
  },
  {
    id: 'vault-trap-std-acl-placement',
    category: 'exam-traps',
    title: 'Standard ACL Placement Rule',
    content: `Standard ACLs filter on source IP only. Because they cannot specify a destination, they should be placed as CLOSE TO THE DESTINATION as possible.

Extended ACLs filter on source, destination, protocol, and port. They should be placed as CLOSE TO THE SOURCE as possible (to drop unwanted traffic early and save bandwidth).

Exam trap: They'll ask where to place a standard ACL. If you say "close to the source," that's wrong — that's the rule for extended ACLs.`,
    tags: ['ACL', 'placement', 'standard', 'extended', 'trap'],
    relatedLessonId: 'd5-acls',
  },
];

export function getVaultCategories() {
  return vaultCategories;
}

export function getVaultCategoryById(id: string) {
  return vaultCategories.find((cat) => cat.id === id) ?? null;
}

export function getVaultItemsByCategory(category: VaultCategory): VaultItem[] {
  return vaultItems.filter((item) => item.category === category);
}

export function getVaultItemById(id: string): VaultItem | null {
  return vaultItems.find((item) => item.id === id) ?? null;
}

export function searchVaultItems(query: string): VaultItem[] {
  const lowerQuery = query.toLowerCase();
  return vaultItems.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}
