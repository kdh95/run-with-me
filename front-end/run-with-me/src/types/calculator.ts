export type CalculationMode = 'pace' | 'time';
export type Environment = 'outdoor' | 'indoor';
export type DistanceUnit = 'km' | 'miles';

export interface TimeInputState {
  hours: string;
  minutes: string;
  seconds: string;
}

export interface PaceInputState {
  minutes: string;
  seconds: string;
}