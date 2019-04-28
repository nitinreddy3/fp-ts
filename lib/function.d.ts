import { HKT } from './HKT';
/**
 * @since 2.0.0
 */
export declare const identity: <A>(a: A) => A;
/**
 * @since 2.0.0
 */
export declare const unsafeCoerce: <A, B>(a: A) => B;
/**
 * Thunk type
 */
export declare type Lazy<A> = () => A;
/**
 * @example
 * import { FunctionN } from 'fp-ts/lib/function'
 *
 * export const sum: FunctionN<[number, number], number> = (a, b) => a + b
 *
 * @since 2.0.0
 */
export declare type FunctionN<A extends Array<unknown>, B> = (...args: A) => B;
export declare type Curried2<A, B, C> = (a: A) => (b: B) => C;
export declare type Curried3<A, B, C, D> = (a: A) => (b: B) => (c: C) => D;
export declare type Curried4<A, B, C, D, E> = (a: A) => (b: B) => (c: C) => (d: D) => E;
export declare type Curried5<A, B, C, D, E, F> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => F;
export declare type Curried6<A, B, C, D, E, F, G> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => G;
export declare type Curried7<A, B, C, D, E, F, G, H> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => H;
export declare type Curried8<A, B, C, D, E, F, G, H, I> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => I;
export declare type Curried9<A, B, C, D, E, F, G, H, I, J> = (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => J;
export declare type Predicate<A> = (a: A) => boolean;
export declare type Refinement<A, B extends A> = (a: A) => a is B;
/**
 * @since 2.0.0
 */
export declare const not: <A>(predicate: Predicate<A>) => Predicate<A>;
/**
 * @since 2.0.0
 */
export declare function or<A, B1 extends A, B2 extends A>(p1: Refinement<A, B1>, p2: Refinement<A, B2>): Refinement<A, B1 | B2>;
export declare function or<A>(p1: Predicate<A>, p2: Predicate<A>): Predicate<A>;
/**
 * @since 2.0.0
 */
export declare const and: <A>(p1: Predicate<A>, p2: Predicate<A>) => Predicate<A>;
export declare type Endomorphism<A> = (a: A) => A;
export declare type BinaryOperation<A, B> = (a1: A, a2: A) => B;
export declare type Kleisli<F, A, B> = (a: A) => HKT<F, B>;
export declare type Cokleisli<F, A, B> = (fa: HKT<F, A>) => B;
/**
 * @since 2.0.0
 */
export declare const constant: <A>(a: A) => Lazy<A>;
/**
 * A thunk that returns always `true`
 *
 * @since 2.0.0
 */
export declare const constTrue: () => boolean;
/**
 * A thunk that returns always `false`
 *
 * @since 2.0.0
 */
export declare const constFalse: () => boolean;
/**
 * A thunk that returns always `null`
 *
 * @since 2.0.0
 */
export declare const constNull: () => null;
/**
 * A thunk that returns always `undefined`
 *
 * @since 2.0.0
 */
export declare const constUndefined: () => undefined;
/**
 * A thunk that returns always `void`
 *
 * @since 2.0.0
 */
export declare const constVoid: () => void;
/**
 * Flips the order of the arguments to a function of two arguments.
 *
 * @since 2.0.0
 */
export declare const flip: <A, B, C>(f: Curried2<A, B, C>) => Curried2<B, A, C>;
/**
 * The `on` function is used to change the domain of a binary operator.
 *
 * @since 2.0.0
 */
export declare const on: <B, C>(op: BinaryOperation<B, C>) => <A>(f: (a: A) => B) => BinaryOperation<A, C>;
/**
 * @since 2.0.0
 */
export declare function compose<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C;
export declare function compose<A, B, C, D>(cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => D;
export declare function compose<A, B, C, D, E>(de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => E;
export declare function compose<A, B, C, D, E, F>(ef: (e: E) => F, de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => F;
export declare function compose<A, B, C, D, E, F, G>(fg: (f: F) => G, ef: (e: E) => F, de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => G;
export declare function compose<A, B, C, D, E, F, G, H>(gh: (g: G) => H, fg: (f: F) => G, ef: (e: E) => F, de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => H;
export declare function compose<A, B, C, D, E, F, G, H, I>(hi: (h: H) => I, gh: (g: G) => H, fg: (f: F) => G, ef: (e: E) => F, de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => I;
export declare function compose<A, B, C, D, E, F, G, H, I, J>(ij: (i: I) => J, hi: (h: H) => I, gh: (g: G) => H, fg: (f: F) => G, ef: (e: E) => F, de: (d: D) => E, cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => J;
/**
 * @since 2.0.0
 */
export declare function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C;
export declare function pipe<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D;
export declare function pipe<A, B, C, D, E>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (a: A) => E;
export declare function pipe<A, B, C, D, E, F>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): (a: A) => F;
export declare function pipe<A, B, C, D, E, F, G>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): (a: A) => G;
export declare function pipe<A, B, C, D, E, F, G, H>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): (a: A) => H;
export declare function pipe<A, B, C, D, E, F, G, H, I>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): (a: A) => I;
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J): (a: A) => J;
/**
 * @since 2.0.0
 */
export declare const concat: <A>(x: A[], y: A[]) => A[];
/**
 * @since 2.0.0
 */
export declare function curried(f: Function, n: number, acc: Array<any>): (this: any, x: any) => any;
/**
 * @since 2.0.0
 */
export declare function curry<A, B, C>(f: FunctionN<[A, B], C>): Curried2<A, B, C>;
export declare function curry<A, B, C, D>(f: FunctionN<[A, B, C], D>): Curried3<A, B, C, D>;
export declare function curry<A, B, C, D, E>(f: FunctionN<[A, B, C, D], E>): Curried4<A, B, C, D, E>;
export declare function curry<A, B, C, D, E, F>(f: FunctionN<[A, B, C, D, E], F>): Curried5<A, B, C, D, E, F>;
export declare function curry<A, B, C, D, E, F, G>(f: FunctionN<[A, B, C, D, E, F], G>): Curried6<A, B, C, D, E, F, G>;
export declare function curry<A, B, C, D, E, F, G, H>(f: FunctionN<[A, B, C, D, E, F, G], H>): Curried7<A, B, C, D, E, F, G, H>;
export declare function curry<A, B, C, D, E, F, G, H, I>(f: FunctionN<[A, B, C, D, E, F, G, H], I>): Curried8<A, B, C, D, E, F, G, H, I>;
export declare function curry<A, B, C, D, E, F, G, H, I, J>(f: FunctionN<[A, B, C, D, E, F, G, H, I], J>): Curried9<A, B, C, D, E, F, G, H, I, J>;
/**
 * @since 2.0.0
 */
export declare const tuple: <T extends any[]>(...t: T) => T;
/**
 * Applies a function to an argument ($)
 *
 * @since 2.0.0
 */
export declare const apply: <A, B>(f: (a: A) => B) => (a: A) => B;
/**
 * Applies an argument to a function (#)
 *
 * @since 2.0.0
 */
export declare const applyFlipped: <A>(a: A) => <B>(f: (a: A) => B) => B;
/**
 * For use with phantom fields
 *
 * @since 2.0.0
 */
export declare const phantom: any;
/**
 * @since 2.0.0
 */
export declare const increment: (n: number) => number;
/**
 * @since 2.0.0
 */
export declare const decrement: (n: number) => number;