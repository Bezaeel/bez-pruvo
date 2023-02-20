/**
 * Versatile object used mainly for unknown data types
 */
export default interface Obj<V = any> {
  [key: string]: any;
}
