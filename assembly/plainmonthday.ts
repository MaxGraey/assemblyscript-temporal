import { checkDateTimeRange, coalesce, toPaddedString } from "./utils";
import { RegExp } from "assemblyscript-regex";
import { PlainDateTime } from "./plaindatetime";
import { PlainDate } from "./plaindate";

export class MonthDayLike {
  month: i32 = -1;
  day: i32 = -1;
  referenceISOYear: i32 = 1972;
}

export class PlainMonthDay {
  @inline
  private static fromPlainMonthDay(monthDay: PlainMonthDay): PlainMonthDay {
    return new PlainMonthDay(
      monthDay.month,
      monthDay.day,
      monthDay.referenceISOYear
    );
  }

  private static fromMonthDayLike(monthDay: MonthDayLike): PlainMonthDay {
    if (monthDay.month == -1 || monthDay.day == -1) {
      throw new TypeError("missing required property");
    }
    return new PlainMonthDay(
      monthDay.month,
      monthDay.day,
      monthDay.referenceISOYear
    );
  }

  private static fromString(monthDay: string): PlainMonthDay {
    const dateRegex = new RegExp("^(?:--)?(\\d{2})-?(\\d{2})$", "i");
    const match = dateRegex.exec(monthDay);
    if (match != null) {
      return new PlainMonthDay(
        I32.parseInt(match.matches[1]),
        I32.parseInt(match.matches[2])
      );
    } else {
      const datetime = PlainDateTime.from(monthDay);
      return new PlainMonthDay(datetime.month, datetime.day);
    }
  }

  @inline
  static from<T = MonthDayLike>(monthDay: T): PlainMonthDay {
    if (isString<T>()) {
      // @ts-ignore: cast
      return this.fromString(<string>monthDay);
    } else {
      if (isReference<T>()) {
        if (monthDay instanceof PlainMonthDay) {
          return this.fromPlainMonthDay(monthDay);
        } else if (monthDay instanceof MonthDayLike) {
          return this.fromMonthDayLike(monthDay);
        }
      }
      throw new TypeError("invalid date type");
    }
  }

  constructor(
    readonly month: i32,
    readonly day: i32,
    readonly referenceISOYear: i32 = 1972
  ) {
    if (!checkDateTimeRange(referenceISOYear, month, day, 12)) {
      throw new RangeError("DateTime outside of supported range");
    }
  }

  @inline
  get monthCode(): string {
    return (this.month >= 10 ? "M" : "M0") + this.month.toString();
  }

  toString(): string {
    return toPaddedString(this.month) + "-" + toPaddedString(this.day);
  }

  toPlainDate(year: i32): PlainDate {
    return new PlainDate(year, this.month, this.day);
  }

  @inline
  equals(other: PlainMonthDay): bool {
    if (this === other) return true;
    return (
      this.month == other.month &&
      this.day == other.day &&
      this.referenceISOYear == other.referenceISOYear
    );
  }

  with(monthDay: MonthDayLike): PlainMonthDay {
    return new PlainMonthDay(
      coalesce(monthDay.month, this.month),
      coalesce(monthDay.day, this.day),
      coalesce(monthDay.referenceISOYear, this.referenceISOYear, 1972)
    );
  }
}