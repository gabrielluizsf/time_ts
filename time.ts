import { Duration } from "./duration.ts";

/**
  * This module contains Time class for working with dates and times.
  *
  * @example
  * ```ts
  * import { Time } from "@i9si-sistemas/time";
  *
  * const startDate = Time.now();
  * console.log(startDate);
  * const endDate = Time.add(date, Time.hours(10));
  * console.log(endDate);
  * ```
   *
   * @module
   */


/** This class provides static methods for working with dates and times. */
export class Time {
  /**
   * Returns duration in seconds
   * @param amount Number of seconds
   * @returns Duration in milliseconds
   */
  static seconds(amount: number): Duration {
    return Duration.seconds(amount);
  }

  /**
   * Returns duration in minutes
   * @param amount Number of minutes
   * @returns Duration in milliseconds
   */
  static minutes(amount: number): Duration {
    return Duration.minutes(amount);
  }

  /**
   * Returns duration in hours
   * @param amount Number of hours
   * @returns Duration in milliseconds
   */
  static hours(amount: number): Duration {
    return Duration.hours(amount);
  }

  /**
   * Returns duration in days
   * @param amount Number of days
   * @returns Duration in milliseconds
   */
  static days(amount: number): Duration {
    return Duration.days(amount);
  }

  /**
   * Returns duration in weeks
   * @param amount Number of weeks
   * @returns Duration in milliseconds
   */
  static weeks(amount: number): Duration {
    return Duration.weeks(amount);
  }

  /**
   * Returns the current date and time
   * @returns Current Date object
   */
  static now(): Date {
    return new Date();
  }

  /**
   * Adds a specified duration to a date
   * @param date Initial date
   * @param duration Duration in milliseconds to add
   * @returns New Date object with added duration
   */
  static add(date: Date, duration: Duration): Date {
    return new Date(date.getTime() + duration);
  }

  /**
   * Adds a specified number of months to a date
   * @param date Initial date
   * @param amount Number of months to add
   * @returns New Date object with added months
   */
  static addMonths(date: Date, amount: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + amount);
    return newDate;
  }

  /**
   * Adds a specified number of years to a date
   * @param date Initial date
   * @param amount Number of years to add
   * @returns New Date object with added years
   */
  static addYears(date: Date, amount: number): Date {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + amount);
    return newDate;
  }

  /**
   * Compares two dates
   * @param date1 First date to compare
   * @param date2 Second date to compare
   * @returns Negative number if date1 is before date2, zero if equal, positive if date1 is after
   */
  static compare(date1: Date, date2: Date): number {
    return date1.getTime() - date2.getTime();
  }

  /**
   * Formats a date to a string in the specified format
   * @param date Date to be formatted
   * @param layout Desired format ("dd/MM/yyyy" or "HH:mm")
   * @param useUTC Whether to use UTC (default: false)
   * @returns Formatted date string
   */
  static format(date: Date, layout: string = "dd/MM/yyyy", useUTC: boolean = false): string {
    const day = useUTC ? date.getUTCDate() : date.getDate();
    const month = (useUTC ? date.getUTCMonth() : date.getMonth()) + 1;
    const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
    const hours = useUTC ? date.getUTCHours() : date.getHours();
    const minutes = useUTC ? date.getUTCMinutes() : date.getMinutes();

    const pad = (num: number) => String(num).padStart(2, '0');

    if (layout === "HH:mm") {
      return `${pad(hours)}:${pad(minutes)}`;
    }

    return `${pad(day)}/${pad(month)}/${year}`;
  }

  /**
   * Parses an ISO 8601 formatted string into a Date object
   * @param dateString String representing date in ISO 8601 format
   * @returns Parsed Date object
   */
  static parse(dateString: string): Date {
    return new Date(dateString);
  }

  /**
   * Checks if a date is before another date
   * @param date1 Date to check
   * @param date2 Date to compare against
   * @returns True if date1 is before date2, otherwise false
   */
  static before(date1: Date, date2: Date): boolean {
    return Time.compare(date1, date2) < 0;
  }

  /**
   * Checks if a date is after another date
   * @param date1 Date to check
   * @param date2 Date to compare against
   * @returns True if date1 is after date2, otherwise false
   */
  static after(date1: Date, date2: Date): boolean {
    return Time.compare(date1, date2) > 0;
  }

  /**
 * Truncates the date down to the nearest multiple of duration since the zero time (epoch).
 * If d <= 0, returns the original date (copy) unchanged.
 * @param date Date to be truncated
 * @param d Duration to truncate to (in ms)
 * @returns New truncated Date object
 */
  static truncate(date: Date, d: Duration): Date {
    if (d <= 0) return new Date(date.getTime());

    const ms = date.getTime();
    const truncated = ms - (ms % d);
    const result = new Date(truncated);
    switch (d) {
      case Time.minutes(60):
        result.setUTCFullYear(1, 0, 1);
        break;
      case Time.days(1):
        result.setUTCHours(0, 0, 0, 0);
        break;
    }
    return result;
  }
}