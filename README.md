# 🕒 Time

Minimalist date and time manipulation library for TypeScript.

## 📦 Installation

- Deno:
    ```sh
    deno add jsr:@i9si-sistemas/time
    ```
- Node:
    ```sh
    npx jsr add @i9si-sistemas/time
    ```
- Bun:
    ```sh
    bun add @i9si-sistemas/time
    ```


## 🧩 Features

* Duration helpers: `seconds`, `minutes`, `hours`, `days`, `weeks`
* Date arithmetic: `add`, `addMonths`, `addYears`
* Comparison: `compare`, `before`, `after`
* Formatting & parsing: `format`, `parse`
* Truncation: `truncate`
* Simple API using standard `Date`

---

## 🚀 Usage

### 📅 Now

```ts
import { Time } from "@i9si-sistemas/time";
const now = Time.now();
console.log(now instanceof Date); // true
```

---

### ⏱️ Durations

```ts
import { Time } from "@i9si-sistemas/time";
Time.seconds(2); // 2000
Time.minutes(1); // 60000
Time.hours(1);   // 3600000
Time.days(1);    // 86400000
Time.weeks(1);   // 604800000
```

---

### ➕ Add Time

```ts
import { Time } from "@i9si-sistemas/time";
const date = new Date("2024-01-01T00:00:00.000Z");
const result = Time.add(date, Time.seconds(10));
console.log(result.toISOString());
// "2024-01-01T00:00:10.000Z"
```

---

### 📆 Add Months & Years

```ts
import { Time } from "@i9si-sistemas/time";
Time.addMonths(new Date("2024-01-01T00:00:00.000Z"), 1).toISOString();
// "2024-02-01T00:00:00.000Z"

Time.addYears(new Date("2024-01-01T00:00:00.000Z"), 1).toISOString();
// "2025-01-01T00:00:00.000Z"
```

---

### 🔍 Compare Dates

```ts
import { Time } from "@i9si-sistemas/time";
const a = new Date("2024-01-01T00:00:00.000Z");
const b = new Date("2024-01-01T00:00:10.000Z");

Time.before(a, b);  // true
Time.after(b, a);   // true
```

---

### 🧾 Format Date

```ts
import { Time } from "@i9si-sistemas/time";
Time.format(new Date("2024-01-02T00:00:00Z"), "dd/MM/yyyy", true);
// "02/01/2024"

Time.format(new Date("2024-01-01T13:05:00Z"), "HH:mm", true);
// "13:05"
```

---

### 📥 Parse ISO Date

```ts
import { Time } from "@i9si-sistemas/time";
Time.parse("2024-01-01T00:00:00.000Z").toISOString();
// "2024-01-01T00:00:00.000Z"
```

---

### 🧹 Truncate Date

```ts
import { Time } from "@i9si-sistemas/time";
const date = new Date("2024-02-03T01:10:00.000Z");

Time.truncate(date, Time.minutes(60)).toISOString();
// "0001-01-01T01:00:00.000Z"

Time.truncate(date, Time.hours(24)).toISOString();
// "2024-02-03T00:00:00.000Z"
```


## 📄 License

Licensed under the [MIT License](LICENSE).