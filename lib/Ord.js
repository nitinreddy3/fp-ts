"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file The `Ord` type class represents types which support comparisons with a _total order_.
 *
 * Instances should satisfy the laws of total orderings:
 *
 * 1. Reflexivity: `S.compare(a, a) <= 0`
 * 2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
 * 3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`
 *
 * See [Getting started with fp-ts: Ord](https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e)
 */
var Ordering_1 = require("./Ordering");
var Eq_1 = require("./Eq");
/**
 * @since 2.0.0
 */
exports.unsafeCompare = function (x, y) {
    return x < y ? -1 : x > y ? 1 : 0;
};
/**
 * @since 2.0.0
 */
exports.ordString = __assign({}, Eq_1.eqString, { compare: exports.unsafeCompare });
/**
 * @since 2.0.0
 */
exports.ordNumber = __assign({}, Eq_1.eqNumber, { compare: exports.unsafeCompare });
/**
 * @since 2.0.0
 */
exports.ordBoolean = __assign({}, Eq_1.eqBoolean, { compare: exports.unsafeCompare });
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
exports.lessThan = function (O) { return function (x, y) {
    return O.compare(x, y) === -1;
}; };
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
exports.greaterThan = function (O) { return function (x, y) {
    return O.compare(x, y) === 1;
}; };
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
exports.lessThanOrEq = function (O) { return function (x, y) {
    return O.compare(x, y) !== 1;
}; };
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
exports.greaterThanOrEq = function (O) { return function (x, y) {
    return O.compare(x, y) !== -1;
}; };
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
exports.min = function (O) { return function (x, y) {
    return O.compare(x, y) === 1 ? y : x;
}; };
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
exports.max = function (O) { return function (x, y) {
    return O.compare(x, y) === -1 ? y : x;
}; };
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
exports.clamp = function (O) {
    var minO = exports.min(O);
    var maxO = exports.max(O);
    return function (low, hi) { return function (x) { return maxO(minO(x, hi), low); }; };
};
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
exports.between = function (O) {
    var lessThanO = exports.lessThan(O);
    var greaterThanO = exports.greaterThan(O);
    return function (low, hi) { return function (x) { return (lessThanO(x, low) || greaterThanO(x, hi) ? false : true); }; };
};
/**
 * @since 2.0.0
 */
exports.fromCompare = function (compare) {
    var optimizedCompare = function (x, y) { return (x === y ? 0 : compare(x, y)); };
    return {
        equals: function (x, y) { return optimizedCompare(x, y) === 0; },
        compare: optimizedCompare
    };
};
/**
 * @since 2.0.0
 */
function contramap(O, f) {
    return exports.fromCompare(function (x, y) { return O.compare(f(x), f(y)); });
}
exports.contramap = contramap;
/**
 * @since 2.0.0
 */
exports.getSemigroup = function () {
    return {
        concat: function (x, y) { return exports.fromCompare(function (a, b) { return Ordering_1.semigroupOrdering.concat(x.compare(a, b), y.compare(a, b)); }); }
    };
};
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/lib/Ord'
 *
 * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @since 2.0.0
 */
exports.getTupleOrd = function () {
    var ords = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
    }
    var len = ords.length;
    return exports.fromCompare(function (x, y) {
        var i = 0;
        for (; i < len - 1; i++) {
            var r = ords[i].compare(x[i], y[i]);
            if (r !== 0) {
                return r;
            }
        }
        return ords[i].compare(x[i], y[i]);
    });
};
/**
 * @since 2.0.0
 */
exports.getDualOrd = function (O) {
    return exports.fromCompare(function (x, y) { return O.compare(y, x); });
};
/**
 * @since 2.0.0
 */
exports.ordDate = contramap(exports.ordNumber, function (date) { return date.valueOf(); });