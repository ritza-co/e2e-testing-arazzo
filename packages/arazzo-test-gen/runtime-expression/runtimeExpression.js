// @generated by Peggy 4.1.1.
//
// https://peggyjs.org/


function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = (this.location.source && (typeof this.location.source.offset === "function"))
      ? this.location.source.offset(s)
      : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, ' ');
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = (last - s.column) || 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + offset_s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
          + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { expression: peg$parseexpression };
  var peg$startRuleFunction = peg$parseexpression;

  var peg$c0 = "$url";
  var peg$c1 = "$method";
  var peg$c2 = "$statuscode";
  var peg$c3 = "$request.";
  var peg$c4 = "$response.";
  var peg$c5 = "$message.";
  var peg$c6 = "$inputs.";
  var peg$c7 = "$outputs.";
  var peg$c8 = "$steps.";
  var peg$c9 = "$workflows.";
  var peg$c10 = "$sourcedescriptions.";
  var peg$c11 = "$components.";
  var peg$c12 = "$components.parameters.";
  var peg$c13 = "header.";
  var peg$c14 = "query.";
  var peg$c15 = "path.";
  var peg$c16 = "body";
  var peg$c17 = "#";
  var peg$c18 = "/";
  var peg$c19 = "~";

  var peg$r0 = /^[\x01-\x7F]/;
  var peg$r1 = /^[!#-'*-+\--.0-9A-Z\^-z|~]/;
  var peg$r2 = /^[0-9]/;
  var peg$r3 = /^[A-Za-z]/;
  var peg$r4 = /^[\0-.0-}\x7F-\uD7FF\uE000-\uFFFF]/;
  var peg$r5 = /^[\uD800-\uDBFF]/;
  var peg$r6 = /^[\uDC00-\uDFFF]/;
  var peg$r7 = /^[0-1]/;

  var peg$e0 = peg$literalExpectation("$url", true);
  var peg$e1 = peg$literalExpectation("$method", true);
  var peg$e2 = peg$literalExpectation("$statusCode", true);
  var peg$e3 = peg$literalExpectation("$request.", true);
  var peg$e4 = peg$literalExpectation("$response.", true);
  var peg$e5 = peg$literalExpectation("$message.", true);
  var peg$e6 = peg$literalExpectation("$inputs.", true);
  var peg$e7 = peg$literalExpectation("$outputs.", true);
  var peg$e8 = peg$literalExpectation("$steps.", true);
  var peg$e9 = peg$literalExpectation("$workflows.", true);
  var peg$e10 = peg$literalExpectation("$sourceDescriptions.", true);
  var peg$e11 = peg$literalExpectation("$components.", true);
  var peg$e12 = peg$literalExpectation("$components.parameters.", true);
  var peg$e13 = peg$literalExpectation("header.", true);
  var peg$e14 = peg$literalExpectation("query.", true);
  var peg$e15 = peg$literalExpectation("path.", true);
  var peg$e16 = peg$literalExpectation("body", true);
  var peg$e17 = peg$literalExpectation("#", false);
  var peg$e18 = peg$classExpectation([["\x01", "\x7F"]], false, false);
  var peg$e19 = peg$literalExpectation("/", false);
  var peg$e20 = peg$classExpectation(["!", ["#", "'"], ["*", "+"], ["-", "."], ["0", "9"], ["A", "Z"], ["^", "z"], "|", "~"], false, false);
  var peg$e21 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e22 = peg$classExpectation([["A", "Z"], ["a", "z"]], false, false);
  var peg$e23 = peg$classExpectation([["\0", "."], ["0", "}"], ["\x7F", "\uD7FF"], ["\uE000", "\uFFFF"]], false, false);
  var peg$e24 = peg$classExpectation([["\uD800", "\uDBFF"]], false, false);
  var peg$e25 = peg$classExpectation([["\uDC00", "\uDFFF"]], false, false);
  var peg$e26 = peg$literalExpectation("~", false);
  var peg$e27 = peg$classExpectation([["0", "1"]], false, false);

  var peg$currPos = options.peg$currPos | 0;
  var peg$savedPos = peg$currPos;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = peg$currPos;
  var peg$maxFailExpected = options.peg$maxFailExpected || [];
  var peg$silentFails = options.peg$silentFails | 0;

  var peg$result;

  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {}
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseexpression() {
    var s0, s1, s2;

    s0 = input.substr(peg$currPos, 4);
    if (s0.toLowerCase() === peg$c0) {
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e0); }
    }
    if (s0 === peg$FAILED) {
      s0 = input.substr(peg$currPos, 7);
      if (s0.toLowerCase() === peg$c1) {
        peg$currPos += 7;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e1); }
      }
      if (s0 === peg$FAILED) {
        s0 = input.substr(peg$currPos, 11);
        if (s0.toLowerCase() === peg$c2) {
          peg$currPos += 11;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e2); }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = input.substr(peg$currPos, 9);
          if (s1.toLowerCase() === peg$c3) {
            peg$currPos += 9;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e3); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsesource();
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = input.substr(peg$currPos, 10);
            if (s1.toLowerCase() === peg$c4) {
              peg$currPos += 10;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e4); }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsesource();
              if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = input.substr(peg$currPos, 9);
              if (s1.toLowerCase() === peg$c5) {
                peg$currPos += 9;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e5); }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parsesource();
                if (s2 !== peg$FAILED) {
                  s1 = [s1, s2];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = input.substr(peg$currPos, 8);
                if (s1.toLowerCase() === peg$c6) {
                  peg$currPos += 8;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$e6); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parsename();
                  s1 = [s1, s2];
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = input.substr(peg$currPos, 9);
                  if (s1.toLowerCase() === peg$c7) {
                    peg$currPos += 9;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$e7); }
                  }
                  if (s1 !== peg$FAILED) {
                    s2 = peg$parsename();
                    s1 = [s1, s2];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = input.substr(peg$currPos, 7);
                    if (s1.toLowerCase() === peg$c8) {
                      peg$currPos += 7;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$e8); }
                    }
                    if (s1 !== peg$FAILED) {
                      s2 = peg$parsename();
                      s1 = [s1, s2];
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      s1 = input.substr(peg$currPos, 11);
                      if (s1.toLowerCase() === peg$c9) {
                        peg$currPos += 11;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$e9); }
                      }
                      if (s1 !== peg$FAILED) {
                        s2 = peg$parsename();
                        s1 = [s1, s2];
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                      if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        s1 = input.substr(peg$currPos, 20);
                        if (s1.toLowerCase() === peg$c10) {
                          peg$currPos += 20;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$e10); }
                        }
                        if (s1 !== peg$FAILED) {
                          s2 = peg$parsename();
                          s1 = [s1, s2];
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                        if (s0 === peg$FAILED) {
                          s0 = peg$currPos;
                          s1 = input.substr(peg$currPos, 12);
                          if (s1.toLowerCase() === peg$c11) {
                            peg$currPos += 12;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$e11); }
                          }
                          if (s1 !== peg$FAILED) {
                            s2 = peg$parsename();
                            s1 = [s1, s2];
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                          if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            s1 = input.substr(peg$currPos, 23);
                            if (s1.toLowerCase() === peg$c12) {
                              peg$currPos += 23;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) { peg$fail(peg$e12); }
                            }
                            if (s1 !== peg$FAILED) {
                              s2 = peg$parsename();
                              s1 = [s1, s2];
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsesource() {
    var s0;

    s0 = peg$parseheader_reference();
    if (s0 === peg$FAILED) {
      s0 = peg$parsequery_reference();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepath_reference();
        if (s0 === peg$FAILED) {
          s0 = peg$parsebody_reference();
        }
      }
    }

    return s0;
  }

  function peg$parsename() {
    var s0, s1;

    s0 = [];
    s1 = peg$parseCHAR();
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parseCHAR();
    }

    return s0;
  }

  function peg$parseheader_reference() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = input.substr(peg$currPos, 7);
    if (s1.toLowerCase() === peg$c13) {
      peg$currPos += 7;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e13); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsetoken();
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsequery_reference() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = input.substr(peg$currPos, 6);
    if (s1.toLowerCase() === peg$c14) {
      peg$currPos += 6;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e14); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsename();
      s1 = [s1, s2];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepath_reference() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = input.substr(peg$currPos, 5);
    if (s1.toLowerCase() === peg$c15) {
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e15); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsename();
      s1 = [s1, s2];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebody_reference() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = input.substr(peg$currPos, 4);
    if (s1.toLowerCase() === peg$c16) {
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e16); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s3 = peg$c17;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e17); }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parsejson_pointer();
        s3 = [s3, s4];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s1 = [s1, s2];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseCHAR() {
    var s0;

    s0 = input.charAt(peg$currPos);
    if (peg$r0.test(s0)) {
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e18); }
    }

    return s0;
  }

  function peg$parsetoken() {
    var s0, s1;

    s0 = [];
    s1 = peg$parsetchar();
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parsetchar();
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsejson_pointer() {
    var s0, s1, s2, s3;

    s0 = [];
    s1 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 47) {
      s2 = peg$c18;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e19); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsereference_token();
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s2 = peg$c18;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e19); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsereference_token();
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsetchar() {
    var s0;

    s0 = input.charAt(peg$currPos);
    if (peg$r1.test(s0)) {
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e20); }
    }

    return s0;
  }

  function peg$parsereference_token() {
    var s0, s1;

    s0 = [];
    s1 = peg$parseunescaped();
    if (s1 === peg$FAILED) {
      s1 = peg$parseescaped();
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parseunescaped();
      if (s1 === peg$FAILED) {
        s1 = peg$parseescaped();
      }
    }

    return s0;
  }

  function peg$parseDIGIT() {
    var s0;

    s0 = input.charAt(peg$currPos);
    if (peg$r2.test(s0)) {
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e21); }
    }

    return s0;
  }

  function peg$parseALPHA() {
    var s0;

    s0 = input.charAt(peg$currPos);
    if (peg$r3.test(s0)) {
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e22); }
    }

    return s0;
  }

  function peg$parseunescaped() {
    var s0, s1, s2;

    s0 = input.charAt(peg$currPos);
    if (peg$r4.test(s0)) {
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e23); }
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = input.charAt(peg$currPos);
      if (peg$r5.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e24); }
      }
      if (s1 !== peg$FAILED) {
        s2 = input.charAt(peg$currPos);
        if (peg$r6.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e25); }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseescaped() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 126) {
      s1 = peg$c19;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e26); }
    }
    if (s1 !== peg$FAILED) {
      s2 = input.charAt(peg$currPos);
      if (peg$r7.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e27); }
      }
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (options.peg$library) {
    return /** @type {any} */ ({
      peg$result,
      peg$currPos,
      peg$FAILED,
      peg$maxFailExpected,
      peg$maxFailPos
    });
  }
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

const peg$allowedStartRules = [
  "expression"
];

export {
  peg$allowedStartRules as StartRules,
  peg$SyntaxError as SyntaxError,
  peg$parse as parse
};
