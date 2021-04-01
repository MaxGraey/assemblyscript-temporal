## assemblyscript-temporal

An implementation of temporal within AssemblyScript, with an initial focus on non-timezone-aware classes and functionality.

### Why?

AssemblyScript has minimal `Date` support, however, the JS Date API itself is terrible and people tend not to use it that often. As a result libraries like moment / luxon have become staple replacements. However, there is now a [relatively mature TC39 proposal](https://github.com/tc39/proposal-temporal) that adds greatly improved date support to JS. The goal of this project is to implement Temporal for AssemblyScript.

### Usage

This library currently supports the following types:

#### `PlainDateTime`

A `PlainDateTime` represents a calendar date and wall-clock time that does not carry time zone information, e.g. December 7th, 1995 at 3:00 PM (in the Gregorian calendar). For detailed documentation see the [TC39 Temporal proposal website](https://tc39.es/proposal-temporal/docs/plaindatetime.html), this implementation follows the specification as closely as possible.

You can create a `PlainDateTime` from individual components, a string or an object literal:

```
datetime = new PlainDateTime(1976, 11, 18, 15, 23, 30, 123, 456, 789);
datetime.year; // 2019;
datetime.month; // 11;
// ...
datetime.nanosecond; // 789;

datetime = PlainDateTime.fromString("1976-11-18T12:34:56");
datetime.toString(); // "1976-11-18T12:34:56"

datetime = PlainDateTime.from({ year: 1966, month: 3, day: 3 });
datetime.toString(); // "1966-03-03T00:00:00"
``` 

There are various ways you can manipulate a date:

```
// use 'with' to copy a date but with various property values overriden
datetime = new PlainDateTime(1976, 11, 18, 15, 23, 30, 123, 456, 789);
datetime.with({ year: 2019 }).toString(); // "2019-11-18T15:23:30.123456789"

// use 'add' or 'substract' to add / subtract a duration
datetime = PlainDateTime.from("2020-01-12T15:00");
datetime.add<DurationLike>({ months: 1 }).toString(); // "2020-02-12T15:00:00");

// add /  subtract support Duration objects or object literals
datetime.add(new Duration(1)).toString(); // "2021-01-12T15:00:00");

``` 

You can compare dates and check for equality

```
dt1 = PlainDateTime.fromString("1976-11-18");
dt2 = PlainDateTime.fromString("2019-10-29");
PlainDateTime.compare(dt1, dt1); // 0
PlainDateTime.compare(dt1, dt2); // -1
dt1.equals(dt1); // true
```

Currently `PlainDateTime` only supports the ISO 8601 (Gregorian) calendar. 

#### `PlainDate`

A `PlainDate` object represents a calendar date that is not associated with a particular time or time zone, e.g. August 24th, 2006. For detailed documentation see the [TC39 Temporal proposal website](https://tc39.es/proposal-temporal/docs/plaindate.html), this implementation follows the specification as closely as possible.

The `PlainDate` API is almost identical to `PlainDateTime`, so see above for API usage examples.


## Contributing

This project is open source, MIT licenced and your contributions are very much welcomed.