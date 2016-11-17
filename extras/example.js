"use strict";

const Getopt = require("../index");

function test(opt)
{
    let ch;

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
    for (let argi = opt.optind; argi < opt.args.length; argi++)
        console.log("arg=%s", opt.args[argi]);
}

test(new Getopt(process.argv, "ab:"));
test(new Getopt(process.argv, ":ab:"));
test(new Getopt(process.argv, "ab:", false));
