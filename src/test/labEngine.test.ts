import { getLessonLab } from '../content/labs';
import {
  completeLabCommand,
  createLabSession,
  executeLabCommand,
  getLabHelp,
  navigateLabHistory,
  type LabSessionState,
} from '../lib/labEngine';

function getReferenceDefinition() {
  const definition = getLessonLab('d1-network-components');

  if (!definition) {
    throw new Error('Expected reference lab definition to exist');
  }

  return definition;
}

function runSequence(commands: string[]): LabSessionState {
  const definition = getReferenceDefinition();

  return commands.reduce(
    (state, command) => executeLabCommand(definition, state, command),
    createLabSession(definition),
  );
}

describe('labEngine', () => {
  it('produces deterministic state for the reference command sequence', () => {
    const commands = [
      'enable',
      'conf t',
      'hostname EDGE',
      'int g0/0',
      'description LAN Gateway',
      'ip address 192.168.10.1 255.255.255.0',
      'no shut',
      'exit',
      'router ospf 1',
      'network 192.168.10.0 0.0.0.255 area 0',
      'end',
      'sh ip int br',
    ];

    const firstRun = runSequence(commands);
    const secondRun = runSequence(commands);

    expect(firstRun.isComplete).toBe(true);
    expect(firstRun.completionPercent).toBe(100);
    expect(firstRun.devices.r1.hostname).toBe('EDGE');
    expect(firstRun.devices.r1.interfaces['GigabitEthernet0/0'].adminUp).toBe(true);
    expect(firstRun.devices.r1.ospfProcesses['1'].networks).toEqual([
      {
        network: '192.168.10.0',
        wildcard: '0.0.0.255',
        area: '0',
      },
    ]);

    expect(
      firstRun.transcript.map((entry) => ({
        prompt: entry.prompt,
        command: entry.command,
        output: entry.output,
        tone: entry.tone,
      })),
    ).toEqual(
      secondRun.transcript.map((entry) => ({
        prompt: entry.prompt,
        command: entry.command,
        output: entry.output,
        tone: entry.tone,
      })),
    );
  });

  it('supports contextual help, tab completion, and deterministic typo feedback', () => {
    const definition = getReferenceDefinition();
    const baseSession = createLabSession(definition);
    const privilegedSession = executeLabCommand(definition, baseSession, 'enable');

    expect(completeLabCommand(definition, baseSession, 'en')).toBe('enable');
    expect(completeLabCommand(definition, privilegedSession, 'sh ip int br')).toBe('show ip interface brief');
    expect(getLabHelp(definition, privilegedSession, 'show ?')).toEqual([
      'show ip interface brief',
      'show running-config',
      'show version',
    ]);

    const typoSession = executeLabCommand(definition, privilegedSession, 'shwo ip int br');
    const lastEntry = typoSession.transcript[typoSession.transcript.length - 1];

    expect(lastEntry.output).toEqual(['% Unrecognized command']);
    expect(lastEntry.tone).toBe('error');
  });

  it('navigates command history in a predictable order', () => {
    const history = ['enable', 'conf t', 'hostname EDGE'];

    expect(navigateLabHistory(history, null, 'up')).toEqual({
      nextIndex: 2,
      nextInput: 'hostname EDGE',
    });
    expect(navigateLabHistory(history, 2, 'up')).toEqual({
      nextIndex: 1,
      nextInput: 'conf t',
    });
    expect(navigateLabHistory(history, 1, 'down')).toEqual({
      nextIndex: 2,
      nextInput: 'hostname EDGE',
    });
    expect(navigateLabHistory(history, 2, 'down')).toEqual({
      nextIndex: null,
      nextInput: '',
    });
  });
});
