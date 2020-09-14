import { compressRecurrenceRules } from './aggregate_recurrence_rules';

describe('when the expected output should contain zero elements', () => {
  const input = [];
  const expectedOutput = [];

  test('returns expected compressed values', () => {
    expect(compressRecurrenceRules(input)).toEqual(expectedOutput);
  });
});

describe('when the expected output should contain one element', () => {
  const input = [
    { dayOfWeek: 'monday', startTime: '00:00:00', endTime: '23:59:59', },
    { dayOfWeek: 'tuesday', startTime: '00:00:00', endTime: '23:59:59', },
    { dayOfWeek: 'wednesday', startTime: '00:00:00', endTime: '23:59:59' },
    { dayOfWeek: 'thursday', startTime: '00:00:00', endTime: '23:59:59' },
    { dayOfWeek: 'friday', startTime: '00:00:00', endTime: '23:59:59' },
    { dayOfWeek: 'saturday', startTime: '00:00:00', endTime: '23:59:59' },
    { dayOfWeek: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];
  const expectedOutput = [
    { beginDay: 'monday', endDay: 'sunday', startTime: '00:00:00', endTime: '23:59:59', },
  ];

  test('returns expected compressed values', () => {
    expect(compressRecurrenceRules(input)).toEqual(expectedOutput);
  });
});

describe('when the expected output should contain two elements', () => {
  const input = [
    { dayOfWeek: 'monday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'tuesday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'wednesday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'thursday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'friday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'saturday', startTime: '00:00:00', endTime: '23:59:59' },
    { dayOfWeek: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];
  const expectedOutput = [
    { beginDay: 'monday', endDay: 'friday', startTime: '08:00:00', endTime: '15:59:59' },
    { beginDay: 'saturday', endDay: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];

  test('returns expected compressed values', () => {
    expect(compressRecurrenceRules(input)).toEqual(expectedOutput);
  });
});

describe('when the expected output should contain three elements', () => {
  const input = [
    { dayOfWeek: 'monday', startTime: '07:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'tuesday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'wednesday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'thursday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'friday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'saturday', startTime: '00:00:00', endTime: '23:59:59' },
    { dayOfWeek: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];
  const expectedOutput = [
    { beginDay: 'monday', endDay: 'monday', startTime: '07:00:00', endTime: '15:59:59' },
    { beginDay: 'tuesday', endDay: 'friday', startTime: '08:00:00', endTime: '15:59:59' },
    { beginDay: 'saturday', endDay: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];

  test('returns expected compressed values', () => {
    expect(compressRecurrenceRules(input)).toEqual(expectedOutput);
  });
});

describe('when a non-compressable value is isolated in the middle of the others', () => {
  const input = [
    { dayOfWeek: 'monday', startTime: '07:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'tuesday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'wednesday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'thursday', startTime: '08:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'friday', startTime: '07:00:00', endTime: '15:59:59' },
    { dayOfWeek: 'saturday', startTime: '00:00:00', endTime: '23:59:59' },
    { dayOfWeek: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];
  const expectedOutput = [
    { beginDay: 'monday', endDay: 'monday', startTime: '07:00:00', endTime: '15:59:59' },
    { beginDay: 'tuesday', endDay: 'thursday', startTime: '08:00:00', endTime: '15:59:59' },
    { beginDay: 'friday', endDay: 'friday', startTime: '07:00:00', endTime: '15:59:59' },
    { beginDay: 'saturday', endDay: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];

  test('returns expected compressed values', () => {
    expect(compressRecurrenceRules(input)).toEqual(expectedOutput);
  });
});

describe('when days are non-contiguous', () => {
  const input = [
    { dayOfWeek: 'monday', startTime: '00:00:00', endTime: '23:59:59', },
    { dayOfWeek: 'tuesday', startTime: '00:00:00', endTime: '23:59:59', },
    { dayOfWeek: 'saturday', startTime: '00:00:00', endTime: '23:59:59' },
    { dayOfWeek: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];
  const expectedOutput = [
    { beginDay: 'monday', endDay: 'tuesday', startTime: '00:00:00', endTime: '23:59:59' },
    { beginDay: 'saturday', endDay: 'sunday', startTime: '00:00:00', endTime: '23:59:59' },
  ];

  test('returns expected compressed values', () => {
    expect(compressRecurrenceRules(input)).toEqual(expectedOutput);
  });
});
