import type { LessonDefinition } from '../types';

export const d1WirelessBasics: LessonDefinition = {
  id: 'd1-wireless-basics',
  domainId: 'domain-1',
  moduleLabel: '1.8',
  title: 'Wireless Network Fundamentals',
  estimatedMinutes: 26,
  hook: 'Every person in this room is connected to a wireless network right now. But behind that invisible connection is a carefully engineered system of frequencies, channels, authentication methods, and access point coordination. The CCNA tests wireless because it is no longer optional — it is the primary access method in most organizations. This lesson gives you the RF fundamentals, 802.11 standards, and architecture knowledge the exam demands.',

  sections: [
    {
      id: 'rf-fundamentals',
      heading: 'Radio Frequency Fundamentals',
      body: 'Wireless networks transmit data using radio waves. Understanding RF basics is essential for the CCNA.\n\n**Frequency bands** used in Wi-Fi:\n\n**2.4 GHz band:** The original Wi-Fi band. Range: 2.400 to 2.4835 GHz. Three non-overlapping channels in most regulatory domains: 1, 6, and 11. Longer range and better wall penetration than 5 GHz, but more crowded (microwaves, Bluetooth, cordless phones all use 2.4 GHz).\n\n**5 GHz band:** More spectrum available, more non-overlapping channels (up to 25 depending on regulatory domain). Shorter range than 2.4 GHz but significantly less interference. Supports higher data rates. This is the preferred band for modern Wi-Fi deployments.\n\n**6 GHz band (Wi-Fi 6E/7):** Newest band, 1200 MHz of spectrum. Massive capacity, very low interference. Requires Wi-Fi 6E or Wi-Fi 7 capable devices. Not heavily tested on the current CCNA but worth knowing.\n\n**Channels and overlap:** In the 2.4 GHz band, channels are 20 MHz wide but only 5 MHz apart. Channel 1 uses 2.401-2.421 GHz, channel 6 uses 2.426-2.446 GHz, and channel 11 uses 2.451-2.471 GHz. These three do not overlap. Adjacent channels (like 1 and 2) overlap significantly, causing interference. This is why 1, 6, and 11 are the only channels you should use in 2.4 GHz deployments.\n\n**Channel width:** Wider channels = higher throughput but more spectrum used. 20 MHz is standard. 40 MHz doubles throughput (used in 5 GHz). 80 MHz and 160 MHz are available in 5/6 GHz for Wi-Fi 6/7.',
      estimatedReadingMinutes: 5,
    },
    {
      id: '80211-standards',
      heading: 'IEEE 802.11 Standards Evolution',
      body: 'The IEEE 802.11 family defines Wi-Fi standards. The CCNA focuses on the standards you will encounter in production:\n\n**802.11b (1999):** 2.4 GHz only. Max theoretical speed: 11 Mbps. DSSS modulation. Obsolete but still tested.\n\n**802.11a (1999):** 5 GHz only. Max theoretical speed: 54 Mbps. OFDM modulation. Never gained consumer traction but was important in enterprise.\n\n**802.11g (2003):** 2.4 GHz only. Max theoretical speed: 54 Mbps. OFDM modulation. Backward compatible with 802.11b. Was the dominant standard for years.\n\n**802.11n (Wi-Fi 4, 2009):** 2.4 GHz and 5 GHz. Max theoretical speed: 600 Mbps (real world ~150 Mbps). Introduced MIMO (Multiple Input Multiple Output) — multiple antennas for spatial streams. Channel widths: 20 MHz or 40 MHz.\n\n**802.11ac (Wi-Fi 5, 2013):** 5 GHz only. Max theoretical speed: 6.9 Gbps. Wider channels (80 MHz, 160 MHz). MU-MIMO (downlink only). Beamforming. This is the current minimum standard for new deployments.\n\n**802.11ax (Wi-Fi 6, 2019):** 2.4 GHz and 5 GHz. Max theoretical speed: 9.6 Gbps. OFDMA (Orthogonal Frequency Division Multiple Access) — divides channels into subcarriers for multiple simultaneous clients. MU-MIMO (uplink and downlink). Target Wake Time (TWT) for IoT battery savings. BSS Coloring for better coexistence in dense environments.\n\nThe exam tests your ability to identify which standard supports which frequency, speed, and key features. Focus on 802.11n, 802.11ac, and 802.11ax.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'wireless-architecture',
      heading: 'Wireless Network Architecture',
      body: 'Wireless networks operate in different architectural modes:\n\n**Autonomous (Standalone) APs:** Each access point operates independently. Configuration, authentication, and roaming decisions are handled locally. Suitable for small deployments (home, small office). Does not scale well — each AP must be configured individually.\n\n**Controller-based (Lightweight) APs:** Access points are managed by a central Wireless LAN Controller (WLC). The APs (called lightweight APs or LAPs) handle only the RF functions — the WLC handles authentication, roaming, QoS, and configuration. The protocol between AP and WLC is **CAPWAP** (Control And Provisioning of Wireless Access Points).\n\nCAPWAP creates two tunnels between the AP and WLC:\n- **Control tunnel (UDP 5246):** Management traffic, configuration, and control messages\n- **Data tunnel (UDP 5247):** Client data traffic (optional — can be configured for local switching)\n\n**Cloud-managed APs:** Similar to controller-based but the controller lives in the cloud (Cisco Meraki, Cisco DNA Center). APs register with the cloud controller over the internet. Centralized management without on-premises hardware.\n\nThe exam focuses heavily on controller-based architecture and CAPWAP. Know the two UDP ports, the split of functions between AP and WLC, and the advantages of centralized management.',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'wireless-security',
      heading: 'Wireless Security Methods',
      body: 'Wireless security is critical because radio waves extend beyond physical boundaries — anyone within range can attempt to connect. The CCNA tests these authentication and encryption methods:\n\n**WEP (Wired Equivalent Privacy):** Original 802.11 security. Uses RC4 encryption with static keys. Broken and trivially crackable. Never use in production. Tested on the exam as "what NOT to use."\n\n**WPA (Wi-Fi Protected Access):** Interim replacement for WEP. Uses TKIP (Temporal Key Integrity Protocol) for encryption. Better than WEP but still vulnerable. Obsolete.\n\n**WPA2:** Current minimum standard. Uses AES-CCMP encryption. Two modes:\n- **WPA2-Personal (PSK):** Pre-shared key (password). All clients share the same password. Suitable for home and small office.\n- **WPA2-Enterprise (802.1X):** Uses a RADIUS server for individual user authentication. Each user has unique credentials. Required for enterprise deployments.\n\n**WPA3:** Latest standard. Uses SAE (Simultaneous Authentication of Equals) instead of PSK, making offline dictionary attacks much harder. WPA3-Enterprise uses 192-bit encryption. Mandatory for Wi-Fi 6E certification.\n\n**802.1X/EAP:** The enterprise authentication framework. The client (supplicant) authenticates through the AP (authenticator) to a RADIUS server (authentication server). Common EAP types: EAP-TLS (certificate-based, most secure), PEAP (password-based with TLS tunnel), EAP-FAST (Cisco-proprietary, uses PAC instead of certificates).\n\nThe exam will ask you to choose the most appropriate security method for a scenario. Enterprise = WPA2/WPA3-Enterprise with 802.1X. Home = WPA2/WPA3-Personal with PSK.',
      estimatedReadingMinutes: 5,
    },
    {
      id: 'wireless-components',
      heading: 'Wireless Network Components',
      body: 'A wireless network involves several key components:\n\n**SSID (Service Set Identifier):** The network name. Broadcast by APs in beacon frames. Clients use the SSID to identify and connect to the desired network. An AP can broadcast multiple SSIDs, each mapped to a different VLAN.\n\n**BSS (Basic Service Set):** A single AP and its associated clients. Identified by the BSSID, which is the AP\'s MAC address.\n\n**ESS (Extended Service Set):** Multiple APs sharing the same SSID, connected to the same distribution system (wired network). Enables client roaming between APs. This is how enterprise Wi-Fi works.\n\n**Roaming:** When a wireless client moves from one AP\'s coverage area to another, it disconnects from the first AP and associates with the second. In an ESS with the same SSID, this happens seamlessly. The client decides when to roam based on signal strength — the network cannot force a client to roam.\n\n**Antenna types:**\n- **Omnidirectional:** Radiates signal in all directions (360 degrees horizontally). Most common in indoor deployments.\n- **Directional:** Focuses signal in a specific direction. Used for point-to-point links, outdoor coverage, and long-range connections.\n- **Semi-directional:** Focuses signal in a wide arc. Used for covering hallways or outdoor areas.\n\n**Coverage vs capacity:** More APs does not always mean better Wi-Fi. In dense environments, too many APs on overlapping channels cause co-channel interference. Proper wireless design balances coverage (signal everywhere) with capacity (enough bandwidth per client).',
      estimatedReadingMinutes: 4,
    },
    {
      id: 'wireless-troubleshooting',
      heading: 'Common Wireless Issues',
      body: 'The CCNA tests wireless troubleshooting scenarios:\n\n**Weak signal:** Client has connectivity but slow speeds. Causes: distance from AP, physical obstructions (concrete walls, metal), interference from other devices. Fix: add APs, reposition existing APs, or switch to 5 GHz (less interference but shorter range).\n\n**Co-channel interference:** Multiple APs on the same channel competing for airtime. Causes: poor channel planning, too many APs in a small area. Fix: use non-overlapping channels (1, 6, 11 in 2.4 GHz), reduce transmit power, or add 5 GHz capacity.\n\n**Hidden node problem:** Two clients can hear the AP but cannot hear each other. They transmit simultaneously, causing collisions at the AP. Fix: enable RTS/CTS (Request to Send / Clear to Send) mechanism.\n\n**Authentication failures:** Client cannot connect despite correct credentials. Causes: wrong security type (WPA2 vs WPA3), RADIUS server unreachable, expired certificates, wrong EAP type. Fix: verify security settings match on client and AP, check RADIUS connectivity.\n\n**Roaming issues:** Client stays connected to a distant AP instead of roaming to a closer one. Causes: client\'s roaming threshold is too aggressive, AP transmit power too high. Fix: adjust AP power levels, enable 802.11k/v/r roaming assistance protocols.',
      estimatedReadingMinutes: 4,
    },
  ],

  callouts: [
    {
      type: 'why-matters',
      title: 'Why This Matters',
      body: 'Wireless is the primary access method in most organizations. Understanding RF behavior, 802.11 standards, and wireless architecture is essential for the CCNA and for real-world network engineering. The exam tests wireless heavily because every network engineer will deploy, troubleshoot, or secure wireless networks.',
    },
    {
      type: 'exam-trap',
      title: 'Exam Trap',
      body: 'The exam will ask "which 802.11 standard operates only in the 5 GHz band?" The answer is 802.11a or 802.11ac. 802.11n and 802.11ax operate in both 2.4 GHz and 5 GHz. Also watch for questions about WEP — it is always the wrong answer for "which security method should you use?"',
    },
    {
      type: 'remember',
      title: 'Remember This',
      body: '2.4 GHz: 3 non-overlapping channels (1, 6, 11), longer range, more interference. 5 GHz: more channels, shorter range, less interference. CAPWAP: UDP 5246 (control), UDP 5247 (data). WPA2 = AES-CCMP minimum. WPA3 = SAE. Enterprise = 802.1X with RADIUS.',
    },
    {
      type: 'real-world',
      title: 'Real World',
      body: 'In enterprise deployments, the golden rule is: design for capacity, not coverage. It is better to have more APs at lower transmit power (reducing co-channel interference) than fewer APs at maximum power. A proper wireless site survey identifies dead zones, interference sources, and optimal AP placement before any hardware is installed.',
    },
    {
      type: 'analogy',
      title: 'Analogy',
      body: 'Think of wireless channels like lanes on a highway. In 2.4 GHz, you only have 3 lanes (channels 1, 6, 11) and they are narrow. In 5 GHz, you have many more lanes and they can be wider. Co-channel interference is like multiple cars trying to use the same lane at the same time — they have to take turns, which slows everyone down.',
    },
  ],

  cliSpotlights: [
    {
      id: 'wlc-show-ap',
      title: 'Checking AP Status on a WLC',
      commands: [
        '(WLC) > show ap summary',
        '(WLC) > show ap config general <AP-name>',
        '(WLC) > show client summary',
      ],
      explanation: 'On a Cisco WLC, `show ap summary` lists all registered access points with their MAC address, model, status, and number of connected clients. `show ap config general` shows detailed AP configuration including channel, power level, and SSIDs. `show client summary` lists all connected wireless clients with their MAC, AP association, SSID, and IP address. These are the first commands to run when troubleshooting wireless connectivity.',
    },
    {
      id: 'ap-capwap-status',
      title: 'Verifying CAPWAP Tunnel Status',
      commands: [
        'AP# show capwap client config',
        'AP# show capwap client status',
      ],
      explanation: 'From the AP side, `show capwap client config` displays the configured WLC addresses and CAPWAP settings. `show capwap client status` shows the current tunnel state — whether the AP is joined to a WLC, the WLC IP address, and the tunnel uptime. If the AP cannot establish a CAPWAP tunnel, it will operate in standalone mode (if configured) or remain non-functional.',
    },
  ],

  checkpoints: [
    {
      id: 'cp-wifi-standard',
      question: 'Which 802.11 standard introduced OFDMA and operates in both 2.4 GHz and 5 GHz bands?',
      options: [
        { id: 'a', text: '802.11n', isCorrect: false },
        { id: 'b', text: '802.11ac', isCorrect: false },
        { id: 'c', text: '802.11ax', isCorrect: true },
        { id: 'd', text: '802.11g', isCorrect: false },
      ],
      hint: 'This is the most recent widely deployed standard, also known as Wi-Fi 6.',
    },
    {
      id: 'cp-wireless-security',
      question: 'An enterprise needs the most secure wireless authentication method. Which should they deploy?',
      options: [
        { id: 'a', text: 'WPA2-Personal with a strong PSK', isCorrect: false },
        { id: 'b', text: 'WPA2-Enterprise with 802.1X and EAP-TLS', isCorrect: true },
        { id: 'c', text: 'WEP with 128-bit keys', isCorrect: false },
        { id: 'd', text: 'Open authentication with MAC filtering', isCorrect: false },
      ],
      hint: 'Enterprise environments require individual user authentication, not shared passwords.',
    },
  ],

  visualBlocks: [
    {
      id: 'wireless-architecture',
      type: 'diagram',
      title: 'Controller-Based Wireless Architecture',
      description: 'Shows how lightweight APs connect to a WLC via CAPWAP tunnels, with clients connecting wirelessly to APs.',
      svgContent: `<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg">
        <text x="300" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="700">Controller-Based Wireless Architecture</text>
        
        <!-- WLC -->
        <rect x="220" y="45" width="160" height="50" rx="8" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="2"/>
        <text x="300" y="67" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">WLC</text>
        <text x="300" y="82" text-anchor="middle" fill="#a78bfa" font-size="9">Wireless LAN Controller</text>
        
        <!-- CAPWAP tunnels -->
        <line x1="260" y1="95" x2="120" y2="160" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6,3"/>
        <line x1="340" y1="95" x2="480" y2="160" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6,3"/>
        <text x="160" y="120" fill="#fcd34d" font-size="9">CAPWAP</text>
        <text x="380" y="120" fill="#fcd34d" font-size="9">CAPWAP</text>
        <text x="160" y="132" fill="#94a3b8" font-size="8">UDP 5246/5247</text>
        <text x="380" y="132" fill="#94a3b8" font-size="8">UDP 5246/5247</text>
        
        <!-- APs -->
        <rect x="60" y="160" width="120" height="40" rx="6" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="120" y="178" text-anchor="middle" fill="#67e8f9" font-size="11" font-weight="600">AP-1 (LAP)</text>
        <text x="120" y="192" text-anchor="middle" fill="#22d3ee" font-size="9">Ch: 36, 5 GHz</text>
        
        <rect x="420" y="160" width="120" height="40" rx="6" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="480" y="178" text-anchor="middle" fill="#67e8f9" font-size="11" font-weight="600">AP-2 (LAP)</text>
        <text x="480" y="192" text-anchor="middle" fill="#22d3ee" font-size="9">Ch: 44, 5 GHz</text>
        
        <!-- Wireless signals -->
        <path d="M 80 210 Q 60 230 80 250" fill="none" stroke="rgba(34,197,94,0.3)" stroke-width="1"/>
        <path d="M 75 205 Q 50 230 75 255" fill="none" stroke="rgba(34,197,94,0.2)" stroke-width="1"/>
        <path d="M 85 205 Q 110 230 85 255" fill="none" stroke="rgba(34,197,94,0.2)" stroke-width="1"/>
        
        <path d="M 520 210 Q 500 230 520 250" fill="none" stroke="rgba(34,197,94,0.3)" stroke-width="1"/>
        <path d="M 515 205 Q 490 230 515 255" fill="none" stroke="rgba(34,197,94,0.2)" stroke-width="1"/>
        <path d="M 525 205 Q 550 230 525 255" fill="none" stroke="rgba(34,197,94,0.2)" stroke-width="1"/>
        
        <!-- Clients -->
        <rect x="40" y="255" width="80" height="35" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1"/>
        <text x="80" y="270" text-anchor="middle" fill="#93c5fd" font-size="10">Client-1</text>
        <text x="80" y="283" text-anchor="middle" fill="#64748b" font-size="8">SSID: CorpNet</text>
        
        <rect x="140" y="260" width="80" height="35" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1"/>
        <text x="180" y="275" text-anchor="middle" fill="#93c5fd" font-size="10">Client-2</text>
        <text x="180" y="288" text-anchor="middle" fill="#64748b" font-size="8">SSID: CorpNet</text>
        
        <rect x="420" y="255" width="80" height="35" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1"/>
        <text x="460" y="270" text-anchor="middle" fill="#93c5fd" font-size="10">Client-3</text>
        <text x="460" y="283" text-anchor="middle" fill="#64748b" font-size="8">SSID: CorpNet</text>
        
        <rect x="520" y="260" width="80" height="35" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" stroke-width="1"/>
        <text x="560" y="275" text-anchor="middle" fill="#93c5fd" font-size="10">Client-4</text>
        <text x="560" y="288" text-anchor="middle" fill="#64748b" font-size="8">SSID: Guest</text>
        
        <!-- Legend -->
        <rect x="150" y="300" width="300" height="18" rx="4" fill="rgba(30,41,59,0.8)"/>
        <text x="300" y="312" text-anchor="middle" fill="#94a3b8" font-size="9">Dashed lines = CAPWAP tunnels (control + data) between APs and WLC</text>
      </svg>`,
    },
  ],

  summaryPoints: [
    '2.4 GHz has 3 non-overlapping channels (1, 6, 11). 5 GHz has many more channels and less interference.',
    '802.11n (Wi-Fi 4): 2.4/5 GHz, MIMO, up to 600 Mbps. 802.11ac (Wi-Fi 5): 5 GHz only, up to 6.9 Gbps. 802.11ax (Wi-Fi 6): 2.4/5 GHz, OFDMA, up to 9.6 Gbps.',
    'Controller-based architecture uses CAPWAP tunnels: UDP 5246 (control), UDP 5247 (data).',
    'WPA2 uses AES-CCMP encryption. WPA2-Personal = PSK. WPA2-Enterprise = 802.1X with RADIUS.',
    'WPA3 uses SAE instead of PSK, making offline dictionary attacks much harder.',
    'SSID = network name. BSS = single AP + clients. ESS = multiple APs with same SSID for roaming.',
    'Co-channel interference occurs when multiple APs share the same channel, forcing them to take turns.',
    'Design wireless for capacity, not just coverage. More APs at lower power beats fewer APs at maximum power.',
  ],
};
