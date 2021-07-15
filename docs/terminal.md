## Terminal

as like console command.

Additional :

- `terminal.less` output for logging without prefix _ on the root object
- `terminal.more` output for logging more detail.

Example:

```javascript
let data = {
    _header: "head",
    _etc: {
        t:0,
        s: "_",
        u: 'user',
    }
    _one: 1,
    one: 1, 
    two: { 
        t : 2,
        three: {
            t: 3,
            four: {
                t: 4,
                five: {
                    t: 5,
                    six: {
                        t: 6
                    }
                }
            }
        }
    }
};

console.log(data);
terminal.more(data);
terminal.less(data);
```