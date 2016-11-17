Classic POSIX getopt(3)
=======================

This is a classic implementation of `getopt(3)` for NodeJS.  There is no GNU long option name support and there never will be. 


API
---
### new Getopt(argv, opts[, opterr])

Parse an array of strings for options according to opts.

An argument that starts with a leading minus (-) is an option, "-f", or a list of options, "-fgh". Options and arguments can appear in any order until a "--" argument is seen, which indicates the remainder are only arguments.

**Parameters**
 * `argv` : Array of string arguments.

 * `opts` : String of allowed option letters and modifiers. A letter followed by a colon (:) requires an argument as the suffix or the next argument, `-f{arg}` or `-f {arg}`.

 * `opterr` : OPTIONAL boolean.  True (default) to write error messages to console.error().  A leading colon (:) in opts string will also disable error messages.

### next()

**Return**  
Next option character or -1 (STOP) for end of arguments; otherwise '?' (UNKNOWN) for an unknown option or ':' (MISSING) for a missing option argument if the options string has a leading colon (:).

### optarg

The option argument parsed for an option letter followed by a colon (:) in the options string, eg. "x:".

### optind

The index of the next argv argument for a subsequent call to `Getopt.next()`.

### optopt

The last option character parsed.



Example
-------

```lang=javascript

const Getopt = require("classic-getopt");

var ch;
var opt = new Getopt(process.argv, "ab:");

while ((ch = opt.next()) !== -1) {
    switch (ch) {
    case 'a':
        console.log("-a");
        break;
    case 'b':
        console.log("-b %s", opt.optarg);
        break;
    default:
        console.log("usage: getopt [-a][-b string] ...");
        return;
    }
}

console.log("optind=%d", opt.optind);
for (var argi = opt.optind; argi < opt.args.length; argi++)
    console.log("arg=%s", opt.args[argi]);
```

## Copyright

Copyright 2016 by Anthony Howe.  All rights reserved.

## MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
