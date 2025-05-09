export type Duration = number;

export const Duration = {
    seconds: (amount: number): Duration => amount * 1000,
    minutes: (amount: number): Duration => amount * 60 * Duration.seconds(1),
    hours: (amount: number): Duration => amount * 60 * Duration.minutes(1),
    days: (amount: number): Duration => amount * 24 * Duration.hours(1),
    weeks: (amount: number): Duration => amount * 7 * Duration.days(1),
}