"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A = require("./Array");
var Semigroup_1 = require("./Semigroup");
var Option_1 = require("./Option");
var function_1 = require("./function");
exports.URI = 'NonEmptyArray';
/**
 * @since 2.0.0
 */
exports.getShow = function (S) {
    var SA = A.getShow(S);
    return {
        show: function (arr) { return "make(" + S.show(arr[0]) + ", " + SA.show(arr.slice(1)) + ")"; }
    };
};
/**
 * @since 2.0.0
 */
function make(head, tail) {
    return [head].concat(tail);
}
exports.make = make;
/**
 * @since 2.0.0
 */
function head(nea) {
    return nea[0];
}
exports.head = head;
/**
 * @since 2.0.0
 */
function tail(nea) {
    return nea.slice(1);
}
exports.tail = tail;
/**
 * @since 2.0.0
 */
function min(ord) {
    var S = Semigroup_1.getMeetSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.min = min;
/**
 * @since 2.0.0
 */
function max(ord) {
    var S = Semigroup_1.getJoinSemigroup(ord);
    return function (nea) { return nea.reduce(S.concat); };
}
exports.max = max;
/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @since 2.0.0
 */
function fromArray(as) {
    return as.length > 0 ? Option_1.some(as) : Option_1.none;
}
exports.fromArray = fromArray;
/**
 * Builds a `NonEmptyArray` from a provably (compile time) non empty `Array`.
 *
 * @since 2.0.0
 */
function fromNonEmptyArray(as) {
    return as;
}
exports.fromNonEmptyArray = fromNonEmptyArray;
/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @since 2.0.0
 */
exports.getSemigroup = function () {
    return {
        concat: function (x, y) { return x.concat(y); }
    };
};
/**
 * @example
 * import { fromNonEmptyArray, getEq, make } from 'fp-ts/lib/NonEmptyArray'
 * import { eqNumber } from 'fp-ts/lib/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(make(1, [2]), fromNonEmptyArray([1, 2])), true)
 * assert.strictEqual(E.equals(make(1, [2]), fromNonEmptyArray([1, 3])), false)
 *
 * @since 2.0.0
 */
exports.getEq = A.getEq;
/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { make, group } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(group(ordNumber)([1, 2, 1, 1]), [
 *   make(1, []),
 *   make(2, []),
 *   make(1, [1])
 * ])
 *
 * @since 2.0.0
 */
exports.group = function (E) { return function (as) {
    var len = as.length;
    if (len === 0) {
        return A.empty;
    }
    var r = [];
    var head = as[0];
    var nea = fromNonEmptyArray([head]);
    for (var i = 1; i < len; i++) {
        var x = as[i];
        if (E.equals(x, head)) {
            nea.push(x);
        }
        else {
            r.push(nea);
            head = x;
            nea = fromNonEmptyArray([head]);
        }
    }
    r.push(nea);
    return r;
}; };
/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { make, groupSort } from 'fp-ts/lib/NonEmptyArray'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(groupSort(ordNumber)([1, 2, 1, 1]), [make(1, [1, 1]), make(2, [])])
 *
 * @since 2.0.0
 */
exports.groupSort = function (O) {
    return function_1.compose(exports.group(O), A.sort(O));
};
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { make, groupBy } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy(['foo', 'bar', 'foobar'], a => String(a.length)), {
 *   '3': make('foo', ['bar']),
 *   '6': make('foobar', [])
 * })
 *
 * @since 2.0.0
 */
exports.groupBy = function (as, f) {
    var r = {};
    for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
        var a = as_1[_i];
        var k = f(a);
        if (r.hasOwnProperty(k)) {
            r[k].push(a);
        }
        else {
            r[k] = make(a, []);
        }
    }
    return r;
};
/**
 * @since 2.0.0
 */
function last(nea) {
    return nea[nea.length - 1];
}
exports.last = last;
/**
 * @since 2.0.0
 */
function sort(O) {
    return A.sort(O);
}
exports.sort = sort;
function findFirst(nea, predicate) {
    return A.findFirst(nea, predicate);
}
exports.findFirst = findFirst;
function findLast(nea, predicate) {
    return A.findLast(nea, predicate);
}
exports.findLast = findLast;
/**
 * @since 2.0.0
 */
function findIndex(nea, predicate) {
    return A.findIndex(nea, predicate);
}
exports.findIndex = findIndex;
/**
 * @since 2.0.0
 */
function findLastIndex(nea, predicate) {
    return A.findLastIndex(nea, predicate);
}
exports.findLastIndex = findLastIndex;
/**
 * @since 2.0.0
 */
function insertAt(i, a, nea) {
    return A.insertAt(i, a, nea);
}
exports.insertAt = insertAt;
/**
 * @since 2.0.0
 */
function updateAt(i, a, nea) {
    return A.updateAt(i, a, nea);
}
exports.updateAt = updateAt;
/**
 * @since 2.0.0
 */
function modifyAt(i, nea, f) {
    return A.modifyAt(i, nea, f);
}
exports.modifyAt = modifyAt;
/**
 * @since 2.0.0
 */
exports.copy = function (nea) {
    return A.copy(nea);
};
function filter(nea, predicate) {
    return filterWithIndex(nea, function (_, a) { return predicate(a); });
}
exports.filter = filter;
/**
 * @since 2.0.0
 */
function filterWithIndex(nea, predicate) {
    return fromArray(nea.filter(function (a, i) { return predicate(i, a); }));
}
exports.filterWithIndex = filterWithIndex;
var mapWithIndex = function (fa, f) {
    return fa.map(function (a, i) { return f(i, a); });
};
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
exports.snoc = A.snoc;
/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/lib/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @since 2.0.0
 */
exports.cons = A.cons;
/**
 * @since 2.0.0
 */
exports.nonEmptyArray = {
    URI: exports.URI,
    map: A.array.map,
    mapWithIndex: mapWithIndex,
    of: A.array.of,
    ap: A.array.ap,
    chain: A.array.chain,
    extend: A.array.extend,
    extract: head,
    reduce: A.array.reduce,
    foldMap: A.array.foldMap,
    reduceRight: A.array.reduceRight,
    traverse: A.array.traverse,
    sequence: A.array.sequence,
    reduceWithIndex: A.array.reduceWithIndex,
    foldMapWithIndex: A.array.foldMapWithIndex,
    reduceRightWithIndex: A.array.reduceRightWithIndex,
    traverseWithIndex: A.array.traverseWithIndex
};