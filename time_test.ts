import { Time } from "./time.ts";
import { assertEquals } from "@std/assert";

Deno.test("Time.seconds", () => {
  assertEquals(Time.seconds(1), 1000);
  assertEquals(Time.seconds(2), 2000);
});

Deno.test("Time.minutes", () => {
  assertEquals(Time.minutes(1), 60000);
  assertEquals(Time.minutes(2), 120000);
});

Deno.test("Time.hours", () => {
  assertEquals(Time.hours(1), 3600000);
  assertEquals(Time.hours(2), 7200000);
});

Deno.test("Time.days", () => {
  assertEquals(Time.days(1), 86400000);
  assertEquals(Time.days(2), 172800000);
});

Deno.test("Time.weeks", () => {
  assertEquals(Time.weeks(1), 604800000);
  assertEquals(Time.weeks(2), 1209600000);
});

Deno.test("Time.now", () => {
  const now = Time.now();
  assertEquals(now instanceof Date, true);
});

Deno.test("Time.add", () => {
  const date = new Date("2024-01-01T00:00:00.000Z");
  const newDate = Time.add(date, Time.seconds(10));
  assertEquals(newDate.getTime(), date.getTime() + 10000);
});

Deno.test("Time.addMonths", ()=> {
  const date = new Date("2024-01-01T00:00:00.000Z");
  const amount = 1
  const newDate = Time.addMonths(date, amount);
  const expected = new Date("2024-02-01T00:00:00.000Z");
  assertEquals(newDate.toISOString(), expected.toISOString());
})

Deno.test("Time.addYears", ()=> {
  const date = new Date("2024-01-01T00:00:00.000Z");
  const amount = 1
  const newDate = Time.addYears(date, amount);
  const expected = new Date("2025-01-01T00:00:00.000Z");
  assertEquals(newDate.toISOString(), expected.toISOString());
})

Deno.test("Time.compare", () => {
  const date1 = new Date("2024-01-01T00:00:00.000Z");
  const date2 = new Date("2024-01-01T00:00:10.000Z");
  assertEquals(Time.compare(date1, date2) < 0, true);
  assertEquals(Time.compare(date2, date1) > 0, true);
  assertEquals(Time.compare(date1, date1), 0);
});

Deno.test("Time.format - default format (dd/MM/yyyy)", () => {
  const date = new Date("2024-01-02T00:00:00Z");
  assertEquals(Time.format(date, "dd/MM/yyyy", true), "02/01/2024");
});

Deno.test("Time.format - time format (HH:mm)", () => {
  const date = new Date("2024-01-01T13:05:00Z");
  assertEquals(Time.format(date, "HH:mm", true), "13:05");
});

Deno.test("Time.format - UTC handling", () => {
  const date = new Date("2024-01-01T23:59:00.000Z");
  const localHours = date.getHours().toString().padStart(2, '0');
  const localMinutes = date.getMinutes().toString().padStart(2, '0');
  assertEquals(Time.format(date, "HH:mm", false), `${localHours}:${localMinutes}`);
  
  assertEquals(Time.format(date, "HH:mm", true), "23:59");
});

Deno.test("Time.parse", () => {
  const dateString = "2024-01-01T00:00:00.000Z";
  const date = Time.parse(dateString);
  assertEquals(date.toISOString(), dateString);
});

Deno.test("Time.before", () => {
  const date1 = new Date("2024-01-01T00:00:00.000Z");
  const date2 = new Date("2024-01-01T00:00:10.000Z");
  assertEquals(Time.before(date1, date2), true);
  assertEquals(Time.before(date2, date1), false);
});

Deno.test("Time.after", () => {
  const date1 = new Date("2024-01-01T00:00:00.000Z");
  const date2 = new Date("2024-01-01T00:00:10.000Z");
  assertEquals(Time.after(date1, date2), false);
  assertEquals(Time.after(date2, date1), true);
});

Deno.test("Time.truncate", () => {
  const date = new Date("2024-02-03T01:10:00.000Z");
  const truncatedDate = Time.truncate(date, Time.minutes(60));
  assertEquals(truncatedDate.toISOString(), "0001-01-01T01:00:00.000Z");
  assertEquals(Time.truncate(date, Time.hours(24)).toISOString(), "2024-02-03T00:00:00.000Z")
});