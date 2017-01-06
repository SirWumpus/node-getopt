/*
 * getopt.js
 *
 * Copyright 2001, 2016 by Anthony Howe.  All rights reserved.
 *
 * MIT License, see LICENSE.md
 */
"use strict";

/**
 * Parse an array of strings for options according to opts.
 *
 * An argument that starts with a leading minus (-) is an option,
 * "-f", or a list of options, "-fgh". Options and arguments can
 * appear in any order until a "--" argument is seen, which
 * indicates the remainder are only arguments.
 *
 * @param args
 *  Array of string arguments.
 *
 * @param opts
 *  String of allowed option letters and modifiers. A letter followed
 *  by a colon (:) requires an argument as the suffix or the next
 *  argument:
 *
 *      -f{arg}
 *      -f {arg}
 *
 * @param opterr
 *  OPTIONAL boolean.  True (default) to write error messages to
 *  console.error().  A leading colon (:) in opts string will also
 *  disable error messages.
 */
function Getopt(args, opts, opterr)
{
	this.optind = 2;
	this.offset = 1;
	this.args = args;
	this.opts = opts;
	if (opts.charAt(0) === ':') {
		this.opterr = false;
	} else if (typeof opterr === 'boolean') {
		this.opterr = opterr;
	}
}

Getopt.prototype = {
	STOP: -1,
	UNKNOWN: '?',
	MISSING: ':',

	/* Old school getopt(3) */
	optind: null,
	optopt: null,
	optarg: null,
	opterr: true,

	/**
	 * @return
	 *  Next option character or -1 (STOP) for end of arguments;
	 *  otherwise '?' (UNKNOWN) for an unknown option or ':'
	 *  (MISSING) for a missing option argument if the options
	 *  string has a leading colon (:).
	 */
	next: function () {
		let index;

		/* End of arguments? */
		if (this.args.length <= this.optind)
			return this.STOP;

		/* Argument is an option? */
		if (this.offset <= 1 && this.args[this.optind].charAt(0) != '-')
			return this.STOP;

		if (this.args[this.optind].length <= this.offset)
			return this.STOP;

		/* Next option letter. */
		this.optopt = this.args[this.optind].charAt(this.offset++);

		/* "--" explicit end of options? */
		if (this.offset == 2 && this.optopt == '-' && this.args[this.optind].length == 2) {
			this.optind++;
			return this.STOP;
		}

		if (this.optopt == ':' || (index = this.opts.indexOf(this.optopt)) < 0) {
			/* Not an option! */
			if (this.opterr)
				console.error("unknown option -%s", this.optopt);
			return this.UNKNOWN;
		}

		/* Option expects an argument? */
		if (index+1 < this.opts.length && this.opts.charAt(index+1) == ':') {
			if (this.offset < this.args[this.optind].length) {
				/* -f{arg} */
				this.optarg = this.args[this.optind++].substring(this.offset);
			} else if (this.args.length <= ++this.optind) {
				if (this.opts.charAt(0) == ':')
					return this.MISSING;
				if (this.opterr)
					console.error("Option -%s argument missing.", this.optopt);
				return this.UNKNOWN;
			} else {
				/* -f {arg} */
				this.optarg = this.args[this.optind++];
			}
			this.offset = 1;
		} else if (this.args[this.optind].length <= this.offset) {
			/* Next argument. */
			this.offset = 1;
			this.optind++;
		}

		return this.optopt;
	}
};

module.exports = Getopt;
