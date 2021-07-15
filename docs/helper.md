## Helper

| method                 | desc                                | example                                                            |
| ---------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| clearHTML(string)      | cleansing HTML tag                  | `clearHTML(‘<’) `result: `&lt;`                                        |
| clearMarkdown(string)  | cleansing Markdown tag              |                                                                    |
| isIN(array, index)     | check index in array, true or false | `IsIN(\[1,2,3\], 2)` true                                    |
| forEach(obj, fn)       | for each object / array             | `forEach({one:1, two:2}, (v,i) => { .. })`                           |
| allReplace(text, JSON) | multiple replace text               | `allReplace('Hasanudin', {'a':4, 's': 5, 'n\|u': 'o'})` H454oodio |
| random(list)           | random array item                   | `random([‘one’,’two’,’three’])`                                        |
| random(min, max)       | random number                       | `random(0,100)`                                                      |
| Button                 | helper button for Bot API           |                                                                    |
| cleanObject            | remove JSON from null, false, undefined, '', 0 | `cleanObject({one:1, empty: undefined, nol:0})` { one:1 } |
| dateFormat             | any                                 | any                                                                |

## dateFormat

Helper for date format.

```javascript
let dateFormat = bot.Helper.dateFormat

let now = new Date();

dateFormat(now); // 'Sat Jul 10 2021 19:25:54'
dateFormat(now, 'isoDateTime'); // '2021-07-10T19:25:54+0700'

dateFormat(now, "fullDate"); // 'Saturday, July 10, 2021'
dateFormat(now, 'yyyy-mm-dd'); // '2021-32-10'
```

### Mask

| Mask             | Description                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `d`              | Day of the month as digits; no leading zero for single-digit days.                                                                                                                    |
| `dd`             | Day of the month as digits; leading zero for single-digit days.                                                                                                                       |
| `ddd`            | Day of the week as a three-letter abbreviation.                                                                                                                                       |
| `dddd`           | Day of the week as its full name.                                                                                                                                                     |
| `m`              | Month as digits; no leading zero for single-digit months.                                                                                                                             |
| `mm`             | Month as digits; leading zero for single-digit months.                                                                                                                                |
| `mmm`            | Month as a three-letter abbreviation.                                                                                                                                                 |
| `mmmm`           | Month as its full name.                                                                                                                                                               |
| `yy`             | Year as last two digits; leading zero for years less than 10.                                                                                                                         |
| `yyyy`           | Year represented by four digits.                                                                                                                                                      |
| `h`              | Hours; no leading zero for single-digit hours (12-hour clock).                                                                                                                        |
| `hh`             | Hours; leading zero for single-digit hours (12-hour clock).                                                                                                                           |
| `H`              | Hours; no leading zero for single-digit hours (24-hour clock).                                                                                                                        |
| `HH`             | Hours; leading zero for single-digit hours (24-hour clock).                                                                                                                           |
| `M`              | Minutes; no leading zero for single-digit minutes.<br>Uppercase M unlike CF `timeFormat`'s m to avoid conflict with months.                                                           |
| `MM`             | Minutes; leading zero for single-digit minutes.<br>Uppercase MM unlike CF `timeFormat`'s mm to avoid conflict with months.                                                            |
| `s`              | Seconds; no leading zero for single-digit seconds.                                                                                                                                    |
| `ss`             | Seconds; leading zero for single-digit seconds.                                                                                                                                       |
| `l` _or_ `L`     | Milliseconds. `l` gives 3 digits. `L` gives 2 digits.                                                                                                                                 |
| `t`              | Lowercase, single-character time marker string: _a_ or _p_.<br>No equivalent in CF.                                                                                                   |
| `tt`             | Lowercase, two-character time marker string: _am_ or _pm_.<br>No equivalent in CF.                                                                                                    |
| `T`              | Uppercase, single-character time marker string: _A_ or _P_.<br>Uppercase T unlike CF's t to allow for user-specified casing.                                                          |
| `TT`             | Uppercase, two-character time marker string: _AM_ or _PM_.<br>Uppercase TT unlike CF's tt to allow for user-specified casing.                                                         |
| `Z`              | US timezone abbreviation, e.g. _EST_ or _MDT_. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. _GMT-0500_<br>No equivalent in CF.                 |
| `o`              | GMT/UTC timezone offset, e.g. _\-0500_ or _+0230_.<br>No equivalent in CF.                                                                                                            |
| `S`              | The date's ordinal suffix (_st_, _nd_, _rd_, or _th_). Works well with `d`.<br>No equivalent in CF.                                                                                   |
| `'…'` _or_ `"…"` | Literal character sequence. Surrounding quotes are removed.<br>No equivalent in CF.                                                                                                   |
| `UTC:`           | Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.<br>No equivalent in CF. |

### Mask Name

| Name           | Mask                           | Example                  |
| -------------- | ------------------------------ | ------------------------ |
| default        | `ddd mmm dd yyyy HH:MM:ss`     | Sat Jun 09 2007 17:46:21 |
| **dateTime**   | `yyyy-MM-dd HH:mm:ss`          | 2007-06-09 22:46:21      |
| shortDate      | `m/d/yy`                       | 6/9/07                   |
| mediumDate     | `mmm d, yyyy`                  | Jun 9, 2007              |
| longDate       | `mmmm d, yyyy`                 | June 9, 2007             |
| fullDate       | `dddd, mmmm d, yyyy`           | Saturday, June 9, 2007   |
| shortTime      | `h:MM TT`                      | 5:46 PM                  |
| mediumTime     | `h:MM:ss TT`                   | 5:46:21 PM               |
| longTime       | `h:MM:ss TT Z`                 | 5:46:21 PM EST           |
| isoDate        | `yyyy-mm-dd`                   | 2007-06-09               |
| isoTime        | `HH:MM:ss`                     | 17:46:21                 |
| isoDateTime    | `yyyy-mm-dd'T'HH:MM:ss`        | 2007-06-09T17:46:21      |
| isoUtcDateTime | `UTC:yyyy-mm-dd'T'HH:MM:ss'Z'` | 2007-06-09T22:46:21Z     |

[Ref-detail](https://blog.stevenlevithan.com/archives/date-time-format)

