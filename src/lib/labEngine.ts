import type {
  LabDefinition,
  LabDeviceRuntimeState,
  LabGuidedAssist,
  LabInterfaceRuntimeState,
  LabObjective,
  LabObjectiveProgress,
  LabRoutingProcessState,
  LabTopologyLink,
} from '../content/types';

export type LabCliMode = 'user-exec' | 'privileged-exec' | 'global-config' | 'interface-config' | 'router-config';

export type LabTranscriptEntry = {
  id: string;
  prompt: string;
  command: string;
  output: string[];
  tone: 'normal' | 'error' | 'info';
};

export type LabSessionState = {
  cli: {
    mode: LabCliMode;
    activeDeviceId: string;
    selectedInterfaceId: string | null;
    selectedProcessId: string | null;
  };
  devices: Record<string, LabDeviceRuntimeState>;
  transcript: LabTranscriptEntry[];
  commandHistory: string[];
  objectiveProgress: LabObjectiveProgress[];
  completionPercent: number;
  isComplete: boolean;
};

export type LabHistoryDirection = 'up' | 'down';

export type LabHistoryResult = {
  nextIndex: number | null;
  nextInput: string;
};

type ExpectedInterfaceData = {
  interfaceId: string;
  description: string;
  ipAddress: string;
  subnetMask: string;
};

type ExpectedOspfData = {
  processId: string;
  network: string;
  wildcard: string;
  area: string;
};

function cloneInterfaceState(interfaceState: LabInterfaceRuntimeState): LabInterfaceRuntimeState {
  return { ...interfaceState };
}

function cloneRoutingProcessState(processState: LabRoutingProcessState): LabRoutingProcessState {
  return {
    ...processState,
    networks: processState.networks.map((network) => ({ ...network })),
  };
}

function cloneDeviceState(deviceState: LabDeviceRuntimeState): LabDeviceRuntimeState {
  const interfaces: Record<string, LabInterfaceRuntimeState> = {};
  const ospfProcesses: Record<string, LabRoutingProcessState> = {};

  Object.entries(deviceState.interfaces).forEach(([interfaceId, interfaceState]) => {
    interfaces[interfaceId] = cloneInterfaceState(interfaceState);
  });

  Object.entries(deviceState.ospfProcesses).forEach(([processId, processState]) => {
    ospfProcesses[processId] = cloneRoutingProcessState(processState);
  });

  return {
    ...deviceState,
    interfaces,
    ospfProcesses,
  };
}

function cloneDevices(devices: Record<string, LabDeviceRuntimeState>): Record<string, LabDeviceRuntimeState> {
  const cloned: Record<string, LabDeviceRuntimeState> = {};

  Object.entries(devices).forEach(([deviceId, deviceState]) => {
    cloned[deviceId] = cloneDeviceState(deviceState);
  });

  return cloned;
}

function resolveObjectiveProgress(
  definition: LabDefinition,
  devices: Record<string, LabDeviceRuntimeState>,
): LabObjectiveProgress[] {
  return definition.objectives.map((objective) => ({
    objectiveId: objective.id,
    isComplete: evaluateObjective(objective, devices),
  }));
}

function calculateCompletionPercent(objectiveProgress: LabObjectiveProgress[]): number {
  if (objectiveProgress.length === 0) {
    return 0;
  }

  const completeCount = objectiveProgress.filter((objective) => objective.isComplete).length;
  return Math.round((completeCount / objectiveProgress.length) * 100);
}

function buildSessionState(
  definition: LabDefinition,
  devices: Record<string, LabDeviceRuntimeState>,
  transcript: LabTranscriptEntry[],
  commandHistory: string[],
  mode: LabCliMode,
  activeDeviceId: string,
  selectedInterfaceId: string | null,
  selectedProcessId: string | null,
): LabSessionState {
  const objectiveProgress = resolveObjectiveProgress(definition, devices);
  const completionPercent = calculateCompletionPercent(objectiveProgress);

  return {
    cli: {
      mode,
      activeDeviceId,
      selectedInterfaceId,
      selectedProcessId,
    },
    devices,
    transcript,
    commandHistory,
    objectiveProgress,
    completionPercent,
    isComplete: objectiveProgress.every((objective) => objective.isComplete),
  };
}

export function createLabSession(definition: LabDefinition): LabSessionState {
  const devices = cloneDevices(definition.initialState.devices);

  return buildSessionState(
    definition,
    devices,
    [],
    [],
    'user-exec',
    definition.initialState.activeDeviceId,
    null,
    null,
  );
}

function getActiveDevice(state: LabSessionState): LabDeviceRuntimeState {
  const device = state.devices[state.cli.activeDeviceId];

  if (!device) {
    throw new Error(`Missing active lab device for ${state.cli.activeDeviceId}`);
  }

  return device;
}

function getPromptSuffix(mode: LabCliMode): string {
  switch (mode) {
    case 'user-exec':
      return '>';
    case 'privileged-exec':
      return '#';
    case 'global-config':
      return '(config)#';
    case 'interface-config':
      return '(config-if)#';
    case 'router-config':
      return '(config-router)#';
  }
}

export function getLabPrompt(state: LabSessionState): string {
  const device = getActiveDevice(state);
  return `${device.hostname}${getPromptSuffix(state.cli.mode)}`;
}

function tokenMatches(inputToken: string, expectedToken: string): boolean {
  return expectedToken.toLowerCase().startsWith(inputToken.toLowerCase());
}

function interfaceAliasMatches(inputToken: string, interfaceId: string): boolean {
  const normalizedInput = inputToken.toLowerCase();
  const normalizedInterface = interfaceId.toLowerCase();

  if (normalizedInterface.startsWith(normalizedInput)) {
    return true;
  }

  const aliases = buildInterfaceAliases(interfaceId);
  return aliases.some((alias) => alias.startsWith(normalizedInput));
}

function buildInterfaceAliases(interfaceId: string): string[] {
  const normalized = interfaceId.toLowerCase();

  if (normalized.startsWith('gigabitethernet')) {
    const short = interfaceId.slice('GigabitEthernet'.length);
    return [`gi${short}`.toLowerCase(), `gig${short}`.toLowerCase(), `g${short}`.toLowerCase()];
  }

  if (normalized.startsWith('serial')) {
    const short = interfaceId.slice('Serial'.length);
    return [`se${short}`.toLowerCase(), `ser${short}`.toLowerCase(), `s${short}`.toLowerCase()];
  }

  return [];
}

function resolveInterfaceId(inputToken: string, device: LabDeviceRuntimeState): string | null {
  const matches = Object.keys(device.interfaces).filter((interfaceId) => interfaceAliasMatches(inputToken, interfaceId));
  return matches.length === 1 ? matches[0] : null;
}

function commandMatches(input: string, command: string, device: LabDeviceRuntimeState): boolean {
  const inputTokens = input.trim().split(/\s+/);
  const commandTokens = command.trim().split(/\s+/);

  if (inputTokens.length > commandTokens.length) {
    return false;
  }

  return inputTokens.every((token, index) => {
    const expectedToken = commandTokens[index];

    if (Object.prototype.hasOwnProperty.call(device.interfaces, expectedToken)) {
      return interfaceAliasMatches(token, expectedToken);
    }

    return tokenMatches(token, expectedToken);
  });
}

function findUniqueCommandMatch(input: string, commands: string[], device: LabDeviceRuntimeState): string | null {
  const matches = commands.filter((command) => commandMatches(input, command, device));
  return matches.length === 1 ? matches[0] : null;
}

function findExpectedHostname(definition: LabDefinition): string | null {
  const objective = definition.objectives.find((item) => item.validation.type === 'hostname');
  return objective?.validation.type === 'hostname' ? objective.validation.expectedHostname : null;
}

function findExpectedInterface(definition: LabDefinition): ExpectedInterfaceData | null {
  const objective = definition.objectives.find((item) => item.validation.type === 'interface');

  if (!objective || objective.validation.type !== 'interface') {
    return null;
  }

  return {
    interfaceId: objective.validation.interfaceId,
    description: objective.validation.expected.description,
    ipAddress: objective.validation.expected.ipAddress,
    subnetMask: objective.validation.expected.subnetMask,
  };
}

function findExpectedOspf(definition: LabDefinition): ExpectedOspfData | null {
  const objective = definition.objectives.find((item) => item.validation.type === 'ospf-network');

  if (!objective || objective.validation.type !== 'ospf-network') {
    return null;
  }

  return {
    processId: objective.validation.processId,
    network: objective.validation.expected.network,
    wildcard: objective.validation.expected.wildcard,
    area: objective.validation.expected.area,
  };
}

function getShowCommands(): string[] {
  return ['show ip interface brief', 'show running-config', 'show version'];
}

function getContextCommands(definition: LabDefinition, state: LabSessionState): string[] {
  const expectedHostname = findExpectedHostname(definition) ?? 'EDGE';
  const expectedInterface = findExpectedInterface(definition);
  const expectedOspf = findExpectedOspf(definition);
  const showCommands = getShowCommands();

  switch (state.cli.mode) {
    case 'user-exec':
      return ['enable'];
    case 'privileged-exec':
      return ['disable', 'configure terminal', ...showCommands, 'exit'];
    case 'global-config': {
      const commands = ['hostname ' + expectedHostname, 'end', 'exit', ...showCommands.map((command) => `do ${command}`)];

      Object.keys(getActiveDevice(state).interfaces).forEach((interfaceId) => {
        commands.push(`interface ${interfaceId}`);
      });

      if (expectedOspf) {
        commands.push(`router ospf ${expectedOspf.processId}`);
      }

      return commands;
    }
    case 'interface-config': {
      const commands = ['end', 'exit', ...showCommands.map((command) => `do ${command}`)];

      if (expectedInterface) {
        commands.push(`description ${expectedInterface.description}`);
        commands.push(`ip address ${expectedInterface.ipAddress} ${expectedInterface.subnetMask}`);
      }

      commands.push('no shutdown');
      return commands;
    }
    case 'router-config': {
      const commands = ['end', 'exit', ...showCommands.map((command) => `do ${command}`)];

      if (expectedOspf) {
        commands.push(`network ${expectedOspf.network} ${expectedOspf.wildcard} area ${expectedOspf.area}`);
      }

      return commands;
    }
  }
}

function createTranscriptEntry(
  state: LabSessionState,
  command: string,
  output: string[],
  tone: LabTranscriptEntry['tone'],
): LabTranscriptEntry {
  return {
    id: `cmd-${state.transcript.length + 1}`,
    prompt: getLabPrompt(state),
    command,
    output,
    tone,
  };
}

function getHistoryWithCommand(history: string[], command: string): string[] {
  return [...history, command];
}

function buildErrorState(
  definition: LabDefinition,
  state: LabSessionState,
  command: string,
  output: string[],
): LabSessionState {
  return buildSessionState(
    definition,
    cloneDevices(state.devices),
    [...state.transcript, createTranscriptEntry(state, command, output, 'error')],
    getHistoryWithCommand(state.commandHistory, command),
    state.cli.mode,
    state.cli.activeDeviceId,
    state.cli.selectedInterfaceId,
    state.cli.selectedProcessId,
  );
}

function createInfoState(
  definition: LabDefinition,
  state: LabSessionState,
  command: string,
  output: string[],
): LabSessionState {
  return buildSessionState(
    definition,
    cloneDevices(state.devices),
    [...state.transcript, createTranscriptEntry(state, command, output, 'info')],
    getHistoryWithCommand(state.commandHistory, command),
    state.cli.mode,
    state.cli.activeDeviceId,
    state.cli.selectedInterfaceId,
    state.cli.selectedProcessId,
  );
}

function evaluateObjective(objective: LabObjective, devices: Record<string, LabDeviceRuntimeState>): boolean {
  switch (objective.validation.type) {
    case 'hostname': {
      const device = devices[objective.validation.deviceId];
      return device?.hostname === objective.validation.expectedHostname;
    }
    case 'interface': {
      const device = devices[objective.validation.deviceId];
      const interfaceState = device?.interfaces[objective.validation.interfaceId];

      if (!interfaceState) {
        return false;
      }

      return (
        interfaceState.description === objective.validation.expected.description
        && interfaceState.ipAddress === objective.validation.expected.ipAddress
        && interfaceState.subnetMask === objective.validation.expected.subnetMask
        && interfaceState.adminUp === objective.validation.expected.adminUp
      );
    }
    case 'ospf-network': {
      const device = devices[objective.validation.deviceId];
      const process = device?.ospfProcesses[objective.validation.processId];
      const expected = objective.validation.expected;

      if (!process) {
        return false;
      }

      return process.networks.some(
        (network) =>
          network.network === expected.network
          && network.wildcard === expected.wildcard
          && network.area === expected.area,
      );
    }
  }
}

function formatShowVersion(device: LabDeviceRuntimeState): string[] {
  return [
    'Cisco IOS Software, IOS XE Software (Lab Image), Version 17.9.1',
    `Device uptime is 2 hours, 14 minutes`,
    'System image file is "flash:lab-reference-image.bin"',
    `Configured hostname is ${device.hostname}`,
    'Configuration register is 0x2102',
  ];
}

function getStatusLabel(interfaceState: LabInterfaceRuntimeState): string {
  return interfaceState.adminUp ? 'up' : 'administratively down';
}

function getProtocolLabel(interfaceState: LabInterfaceRuntimeState): string {
  return interfaceState.protocolUp ? 'up' : 'down';
}

function formatShowIpInterfaceBrief(device: LabDeviceRuntimeState): string[] {
  const header = 'Interface              IP-Address      OK? Method Status                Protocol';
  const separator = '--------------------------------------------------------------------------------';
  const interfaceLines = Object.values(device.interfaces)
    .sort((left, right) => left.label.localeCompare(right.label))
    .map((interfaceState) => {
      const interfaceLabel = interfaceState.label.padEnd(22, ' ');
      const ipAddress = (interfaceState.ipAddress ?? 'unassigned').padEnd(15, ' ');
      const status = getStatusLabel(interfaceState).padEnd(21, ' ');
      const protocol = getProtocolLabel(interfaceState);

      return `${interfaceLabel}${ipAddress}YES manual ${status}${protocol}`;
    });

  return [header, separator, ...interfaceLines];
}

function formatShowRunningConfig(device: LabDeviceRuntimeState): string[] {
  const lines: string[] = [
    'Building configuration...',
    '',
    'Current configuration : 412 bytes',
    '!',
    `hostname ${device.hostname}`,
    '!',
  ];

  Object.values(device.interfaces)
    .sort((left, right) => left.label.localeCompare(right.label))
    .forEach((interfaceState) => {
      lines.push(`interface ${interfaceState.label}`);

      if (interfaceState.description.length > 0) {
        lines.push(` description ${interfaceState.description}`);
      }

      if (interfaceState.ipAddress && interfaceState.subnetMask) {
        lines.push(` ip address ${interfaceState.ipAddress} ${interfaceState.subnetMask}`);
      }

      lines.push(interfaceState.adminUp ? ' no shutdown' : ' shutdown');
      lines.push('!');
    });

  Object.values(device.ospfProcesses)
    .sort((left, right) => left.processId.localeCompare(right.processId))
    .forEach((process) => {
      lines.push(`router ospf ${process.processId}`);

      process.networks.forEach((network) => {
        lines.push(` network ${network.network} ${network.wildcard} area ${network.area}`);
      });

      lines.push('!');
    });

  lines.push('end');
  return lines;
}

function executeShowCommand(command: string, device: LabDeviceRuntimeState): string[] | null {
  if (command === 'show version') {
    return formatShowVersion(device);
  }

  if (command === 'show ip interface brief') {
    return formatShowIpInterfaceBrief(device);
  }

  if (command === 'show running-config') {
    return formatShowRunningConfig(device);
  }

  return null;
}

function ensureOspfProcess(device: LabDeviceRuntimeState, processId: string): void {
  if (!device.ospfProcesses[processId]) {
    device.ospfProcesses[processId] = {
      processId,
      networks: [],
    };
  }
}

function handleHelp(definition: LabDefinition, state: LabSessionState, command: string): LabSessionState {
  const device = getActiveDevice(state);
  const contextCommands = getContextCommands(definition, state);
  const query = command.replace(/\?/g, '').trim();
  const matches = query.length === 0
    ? contextCommands
    : contextCommands.filter((candidate) => commandMatches(query, candidate, device));
  const output = matches.length > 0
    ? ['Available commands in this mode:', ...matches.map((candidate) => `  ${candidate}`)]
    : ['% No contextual help entries match that input'];

  return createInfoState(definition, state, command, output);
}

function parseHostnameCommand(command: string): string | null {
  const tokens = command.trim().split(/\s+/);

  if (tokens.length !== 2) {
    return null;
  }

  return tokenMatches(tokens[0], 'hostname') ? tokens[1] : null;
}

function parseInterfaceCommand(command: string, device: LabDeviceRuntimeState): string | null {
  const tokens = command.trim().split(/\s+/);

  if (tokens.length !== 2 || !tokenMatches(tokens[0], 'interface')) {
    return null;
  }

  return resolveInterfaceId(tokens[1], device);
}

function parseRouterOspfCommand(command: string): string | null {
  const tokens = command.trim().split(/\s+/);

  if (tokens.length !== 3) {
    return null;
  }

  if (!tokenMatches(tokens[0], 'router') || !tokenMatches(tokens[1], 'ospf')) {
    return null;
  }

  return tokens[2];
}

function parseDescriptionCommand(command: string): string | null {
  const tokens = command.trim().split(/\s+/);

  if (tokens.length < 2 || !tokenMatches(tokens[0], 'description')) {
    return null;
  }

  return tokens.slice(1).join(' ');
}

function parseIpAddressCommand(command: string): { ipAddress: string; subnetMask: string } | null {
  const tokens = command.trim().split(/\s+/);

  if (tokens.length !== 4) {
    return null;
  }

  if (!tokenMatches(tokens[0], 'ip') || !tokenMatches(tokens[1], 'address')) {
    return null;
  }

  return {
    ipAddress: tokens[2],
    subnetMask: tokens[3],
  };
}

function parseNoShutdownCommand(command: string): boolean {
  const tokens = command.trim().split(/\s+/);

  return tokens.length === 2 && tokenMatches(tokens[0], 'no') && tokenMatches(tokens[1], 'shutdown');
}

function parseNetworkCommand(command: string): { network: string; wildcard: string; area: string } | null {
  const tokens = command.trim().split(/\s+/);

  if (tokens.length !== 5) {
    return null;
  }

  if (!tokenMatches(tokens[0], 'network') || !tokenMatches(tokens[3], 'area')) {
    return null;
  }

  return {
    network: tokens[1],
    wildcard: tokens[2],
    area: tokens[4],
  };
}

function extractDoShowCommand(command: string, device: LabDeviceRuntimeState): string | null {
  const tokens = command.trim().split(/\s+/);

  if (tokens.length < 2 || !tokenMatches(tokens[0], 'do')) {
    return null;
  }

  const showCommand = tokens.slice(1).join(' ');
  return findUniqueCommandMatch(showCommand, getShowCommands(), device);
}

export function executeLabCommand(definition: LabDefinition, state: LabSessionState, rawCommand: string): LabSessionState {
  const command = rawCommand.trim();

  if (command.length === 0) {
    return state;
  }

  if (command.includes('?')) {
    return handleHelp(definition, state, command);
  }

  const devices = cloneDevices(state.devices);
  const activeDevice = devices[state.cli.activeDeviceId];

  if (!activeDevice) {
    throw new Error(`Missing active lab device for ${state.cli.activeDeviceId}`);
  }

  const matchedCommand = findUniqueCommandMatch(command, getContextCommands(definition, state), activeDevice);
  let nextMode = state.cli.mode;
  let nextSelectedInterfaceId = state.cli.selectedInterfaceId;
  let nextSelectedProcessId = state.cli.selectedProcessId;
  let output: string[] = [];
  let tone: LabTranscriptEntry['tone'] = 'normal';

  switch (state.cli.mode) {
    case 'user-exec': {
      if (matchedCommand === 'enable') {
        nextMode = 'privileged-exec';
        break;
      }

      return buildErrorState(definition, state, command, ['% Unrecognized command']);
    }

    case 'privileged-exec': {
      if (matchedCommand === 'configure terminal') {
        nextMode = 'global-config';
        break;
      }

      if (matchedCommand === 'disable' || matchedCommand === 'exit') {
        nextMode = 'user-exec';
        break;
      }

      if (matchedCommand) {
        const showOutput = executeShowCommand(matchedCommand, activeDevice);

        if (showOutput) {
          output = showOutput;
          tone = 'info';
          break;
        }
      }

      return buildErrorState(definition, state, command, ['% Unrecognized command']);
    }

    case 'global-config': {
      if (matchedCommand === 'end') {
        nextMode = 'privileged-exec';
        nextSelectedInterfaceId = null;
        nextSelectedProcessId = null;
        break;
      }

      if (matchedCommand === 'exit') {
        nextMode = 'privileged-exec';
        nextSelectedInterfaceId = null;
        nextSelectedProcessId = null;
        break;
      }

      const hostname = parseHostnameCommand(command);
      if (hostname) {
        activeDevice.hostname = hostname;
        break;
      }

      const interfaceId = matchedCommand?.startsWith('interface ')
        ? matchedCommand.split(/\s+/)[1]
        : parseInterfaceCommand(command, activeDevice);

      if (interfaceId) {
        nextMode = 'interface-config';
        nextSelectedInterfaceId = interfaceId;
        nextSelectedProcessId = null;
        break;
      }

      const ospfProcessId = matchedCommand?.startsWith('router ospf ')
        ? matchedCommand.split(/\s+/)[2]
        : parseRouterOspfCommand(command);

      if (ospfProcessId) {
        ensureOspfProcess(activeDevice, ospfProcessId);
        nextMode = 'router-config';
        nextSelectedProcessId = ospfProcessId;
        nextSelectedInterfaceId = null;
        break;
      }

      const doShowCommand = extractDoShowCommand(command, activeDevice);
      if (doShowCommand) {
        output = executeShowCommand(doShowCommand, activeDevice) ?? ['% Unrecognized command'];
        tone = output[0]?.startsWith('%') ? 'error' : 'info';
        break;
      }

      return buildErrorState(definition, state, command, ['% Unrecognized command']);
    }

    case 'interface-config': {
      if (matchedCommand === 'end') {
        nextMode = 'privileged-exec';
        nextSelectedInterfaceId = null;
        nextSelectedProcessId = null;
        break;
      }

      if (matchedCommand === 'exit') {
        nextMode = 'global-config';
        nextSelectedInterfaceId = null;
        break;
      }

      const currentInterfaceId = state.cli.selectedInterfaceId;
      const interfaceState = currentInterfaceId ? activeDevice.interfaces[currentInterfaceId] : null;

      if (!interfaceState) {
        throw new Error('Interface config mode requires a selected interface');
      }

      const description = parseDescriptionCommand(command);
      if (description) {
        interfaceState.description = description;
        break;
      }

      const ipAddressCommand = parseIpAddressCommand(command);
      if (ipAddressCommand) {
        interfaceState.ipAddress = ipAddressCommand.ipAddress;
        interfaceState.subnetMask = ipAddressCommand.subnetMask;
        break;
      }

      if (parseNoShutdownCommand(command)) {
        interfaceState.adminUp = true;
        interfaceState.protocolUp = true;
        break;
      }

      const doShowCommand = extractDoShowCommand(command, activeDevice);
      if (doShowCommand) {
        output = executeShowCommand(doShowCommand, activeDevice) ?? ['% Unrecognized command'];
        tone = output[0]?.startsWith('%') ? 'error' : 'info';
        break;
      }

      return buildErrorState(definition, state, command, ['% Unrecognized command']);
    }

    case 'router-config': {
      if (matchedCommand === 'end') {
        nextMode = 'privileged-exec';
        nextSelectedInterfaceId = null;
        nextSelectedProcessId = null;
        break;
      }

      if (matchedCommand === 'exit') {
        nextMode = 'global-config';
        nextSelectedProcessId = null;
        break;
      }

      const processId = state.cli.selectedProcessId;
      if (!processId) {
        throw new Error('Router config mode requires a selected process');
      }

      const networkCommand = parseNetworkCommand(command);
      if (networkCommand) {
        ensureOspfProcess(activeDevice, processId);

        const existingProcess = activeDevice.ospfProcesses[processId];
        const exists = existingProcess.networks.some(
          (network) =>
            network.network === networkCommand.network
            && network.wildcard === networkCommand.wildcard
            && network.area === networkCommand.area,
        );

        if (!exists) {
          existingProcess.networks.push({
            network: networkCommand.network,
            wildcard: networkCommand.wildcard,
            area: networkCommand.area,
          });
        }

        break;
      }

      const doShowCommand = extractDoShowCommand(command, activeDevice);
      if (doShowCommand) {
        output = executeShowCommand(doShowCommand, activeDevice) ?? ['% Unrecognized command'];
        tone = output[0]?.startsWith('%') ? 'error' : 'info';
        break;
      }

      return buildErrorState(definition, state, command, ['% Unrecognized command']);
    }
  }

  return buildSessionState(
    definition,
    devices,
    [...state.transcript, createTranscriptEntry(state, command, output, tone)],
    getHistoryWithCommand(state.commandHistory, command),
    nextMode,
    state.cli.activeDeviceId,
    nextSelectedInterfaceId,
    nextSelectedProcessId,
  );
}

export function completeLabCommand(definition: LabDefinition, state: LabSessionState, rawInput: string): string {
  const input = rawInput.trim();

  if (input.length === 0) {
    return rawInput;
  }

  const matchedCommand = findUniqueCommandMatch(input, getContextCommands(definition, state), getActiveDevice(state));
  return matchedCommand ?? rawInput;
}

export function getLabHelp(definition: LabDefinition, state: LabSessionState, rawInput: string): string[] {
  const input = rawInput.replace(/\?/g, '').trim();
  const device = getActiveDevice(state);
  const commands = getContextCommands(definition, state);
  const matches = input.length === 0
    ? commands
    : commands.filter((command) => commandMatches(input, command, device));

  return matches;
}

export function navigateLabHistory(
  history: string[],
  currentIndex: number | null,
  direction: LabHistoryDirection,
): LabHistoryResult {
  if (history.length === 0) {
    return { nextIndex: null, nextInput: '' };
  }

  if (direction === 'up') {
    const nextIndex = currentIndex === null ? history.length - 1 : Math.max(currentIndex - 1, 0);
    return {
      nextIndex,
      nextInput: history[nextIndex],
    };
  }

  if (currentIndex === null) {
    return { nextIndex: null, nextInput: '' };
  }

  const nextIndex = currentIndex + 1;

  if (nextIndex >= history.length) {
    return { nextIndex: null, nextInput: '' };
  }

  return {
    nextIndex,
    nextInput: history[nextIndex],
  };
}

function findObjectiveCompletion(state: LabSessionState, objectiveId: string): boolean {
  return state.objectiveProgress.find((objective) => objective.objectiveId === objectiveId)?.isComplete ?? false;
}

export function getGuidedAssist(definition: LabDefinition, state: LabSessionState): LabGuidedAssist | null {
  const activeDevice = getActiveDevice(state);
  const expectedHostname = findExpectedHostname(definition);
  const expectedInterface = findExpectedInterface(definition);
  const expectedOspf = findExpectedOspf(definition);
  const hostnameObjective = definition.objectives.find((objective) => objective.validation.type === 'hostname');
  const interfaceObjective = definition.objectives.find((objective) => objective.validation.type === 'interface');
  const ospfObjective = definition.objectives.find((objective) => objective.validation.type === 'ospf-network');

  if (hostnameObjective && !findObjectiveCompletion(state, hostnameObjective.id) && expectedHostname) {
    if (state.cli.mode === 'user-exec') {
      return {
        command: 'enable',
        explanation: 'Enter privileged EXEC mode before changing device configuration.',
        objectiveId: hostnameObjective.id,
      };
    }

    if (state.cli.mode === 'privileged-exec') {
      return {
        command: 'configure terminal',
        explanation: 'Move into global configuration mode to set the router hostname.',
        objectiveId: hostnameObjective.id,
      };
    }

    if (state.cli.mode === 'interface-config' || state.cli.mode === 'router-config') {
      return {
        command: 'exit',
        explanation: 'Return to global configuration mode before applying the hostname.',
        objectiveId: hostnameObjective.id,
      };
    }

    return {
      command: `hostname ${expectedHostname}`,
      explanation: 'Set the router hostname so the prompt matches the authored topology brief.',
      objectiveId: hostnameObjective.id,
    };
  }

  if (interfaceObjective && !findObjectiveCompletion(state, interfaceObjective.id) && expectedInterface) {
    if (state.cli.mode === 'user-exec') {
      return {
        command: 'enable',
        explanation: 'Privileged EXEC mode is the first step before interface work.',
        objectiveId: interfaceObjective.id,
      };
    }

    if (state.cli.mode === 'privileged-exec') {
      return {
        command: 'configure terminal',
        explanation: 'Enter global configuration mode so you can select the interface.',
        objectiveId: interfaceObjective.id,
      };
    }

    if (state.cli.mode === 'router-config') {
      return {
        command: 'exit',
        explanation: 'Leave router configuration mode before selecting the LAN interface.',
        objectiveId: interfaceObjective.id,
      };
    }

    if (state.cli.mode === 'global-config') {
      return {
        command: `interface ${expectedInterface.interfaceId}`,
        explanation: 'Select the LAN-facing interface before adding its address and description.',
        objectiveId: interfaceObjective.id,
      };
    }

    if (state.cli.selectedInterfaceId !== expectedInterface.interfaceId) {
      return {
        command: 'exit',
        explanation: 'Return to global configuration mode and open the correct interface.',
        objectiveId: interfaceObjective.id,
      };
    }

    const interfaceState = activeDevice.interfaces[expectedInterface.interfaceId];

    if (interfaceState.description !== expectedInterface.description) {
      return {
        command: `description ${expectedInterface.description}`,
        explanation: 'Label the interface so the topology and running configuration stay aligned.',
        objectiveId: interfaceObjective.id,
      };
    }

    if (interfaceState.ipAddress !== expectedInterface.ipAddress || interfaceState.subnetMask !== expectedInterface.subnetMask) {
      return {
        command: `ip address ${expectedInterface.ipAddress} ${expectedInterface.subnetMask}`,
        explanation: 'Apply the authored LAN gateway IP address to the selected interface.',
        objectiveId: interfaceObjective.id,
      };
    }

    if (!interfaceState.adminUp) {
      return {
        command: 'no shutdown',
        explanation: 'Bring the interface administratively up so the topology link turns active.',
        objectiveId: interfaceObjective.id,
      };
    }
  }

  if (ospfObjective && !findObjectiveCompletion(state, ospfObjective.id) && expectedOspf) {
    if (state.cli.mode === 'user-exec') {
      return {
        command: 'enable',
        explanation: 'Re-enter privileged EXEC mode before finishing the routing objective.',
        objectiveId: ospfObjective.id,
      };
    }

    if (state.cli.mode === 'privileged-exec') {
      return {
        command: 'configure terminal',
        explanation: 'OSPF configuration starts from global configuration mode.',
        objectiveId: ospfObjective.id,
      };
    }

    if (state.cli.mode === 'interface-config') {
      return {
        command: 'exit',
        explanation: 'Leave interface configuration mode to start the router process.',
        objectiveId: ospfObjective.id,
      };
    }

    if (state.cli.mode === 'global-config') {
      return {
        command: `router ospf ${expectedOspf.processId}`,
        explanation: 'Enter router configuration mode for the expected OSPF process.',
        objectiveId: ospfObjective.id,
      };
    }

    if (state.cli.selectedProcessId !== expectedOspf.processId) {
      return {
        command: 'exit',
        explanation: 'Return to global configuration mode and open the expected OSPF process.',
        objectiveId: ospfObjective.id,
      };
    }

    return {
      command: `network ${expectedOspf.network} ${expectedOspf.wildcard} area ${expectedOspf.area}`,
      explanation: 'Advertise the LAN subnet inside area 0 so validation can confirm the routing intent.',
      objectiveId: ospfObjective.id,
    };
  }

  if (state.cli.mode !== 'privileged-exec') {
    return {
      command: 'end',
      explanation: 'Return to privileged EXEC mode for a final verification pass.',
      objectiveId: 'verification',
    };
  }

  return {
    command: 'show ip interface brief',
    explanation: 'Verify the LAN interface is up/up and the CLI state matches the topology panel.',
    objectiveId: 'verification',
  };
}

export function isLabLinkActive(state: LabSessionState, link: LabTopologyLink): boolean {
  if (!link.stateBinding) {
    return true;
  }

  const device = state.devices[link.stateBinding.deviceId];
  const interfaceState = device?.interfaces[link.stateBinding.interfaceId];

  if (!interfaceState) {
    return false;
  }

  return interfaceState.adminUp && interfaceState.protocolUp;
}
