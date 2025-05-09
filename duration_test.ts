import { Duration } from "./duration.ts";
import { assertEquals, assertFalse } from "@std/assert"

Deno.test("duration", async (ctx) => {
    let ok = await ctx.step("seconds", () => {
        const duration = Duration.seconds(1);
        assertEquals(duration, 1000);
    })
    assertFalse(!ok);
    ok = await ctx.step("minutes", () => {
        const duration = Duration.minutes(1);
        assertEquals(duration, 60 * 1000);
    })
    assertFalse(!ok)
    ok = await ctx.step("hours", () => {
        const duration = Duration.hours(1);
        assertEquals(duration, 60 * 60 * 1000);
    })
    assertFalse(!ok)
    ok = await ctx.step("days", () => {
        const duration = Duration.days(1);
        assertEquals(duration, 24 * 60 * 60 * 1000);
    })
    assertFalse(!ok)
    ok = await ctx.step("weeks", () => {
        const duration = Duration.weeks(1);
        assertEquals(duration, 7 * 24 * 60 * 60 * 1000);
    })
    assertFalse(!ok)

});