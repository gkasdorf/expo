/**
 * Result of a `runAsync` call.
 */
export interface RunResult {
  /**
   * The last inserted row ID.
   */
  lastInsertRowid: number;

  /**
   * The number of rows affected.
   */
  changes: number;
}

/**
 * Bind parameters to the prepared statement.
 * You can either pass the parameters in the following forms:
 *
 * @example
 * - Variadic arguments for unnamed parameters.
 * ```ts
 * const statement = await db.prepareAsync('SELECT * FROM test WHERE value = ? AND intValue = ?');
 * await statement.getAsync('test1', 789);
 * ```
 *
 * @example
 * - A single array for unnamed parameters.
 * ```ts
 * const statement = await db.prepareAsync('SELECT * FROM test WHERE value = ? AND intValue = ?');
 * await statement.getAsync(['test1', 789]);
 * ```
 *
 * @example
 * - A single object for [named parameters](https://www.sqlite.org/lang_expr.html)
 *
 *   Through we support multiple named parameter forms like `:VVV`, `@VVV`, and `$VVV`. We recommend using `$VVV` because JavaScript allows using `$` in identifiers without escaping.
 * ```ts
 * const statement = await db.prepareAsync('SELECT * FROM test WHERE value = $value AND intValue = $intValue');
 * await statement.getAsync({ $value: 'test1', $intValue: 789 });
 * ```
 */
export type BindValue = string | number | null | boolean;
export type BindParams = Record<string, BindValue> | BindValue[];
export type VariadicBindParams = BindValue[];

type Row = any;
type AnyDatabase = any;

/**
 * A class that represents an instance of the SQLite statement.
 */
export declare class NativeStatement {
  //#region Asynchronous API

  public arrayRunAsync(database: AnyDatabase, params: BindParams): Promise<RunResult>;
  public objectRunAsync(database: AnyDatabase, params: BindParams): Promise<RunResult>;

  public arrayGetAsync(database: AnyDatabase, params: BindParams): Promise<Row | null | undefined>;
  public objectGetAsync(database: AnyDatabase, params: BindParams): Promise<Row | null | undefined>;

  public arrayGetAllAsync(database: AnyDatabase, params: BindParams): Promise<Row[]>;
  public objectGetAllAsync(database: AnyDatabase, params: BindParams): Promise<Row[]>;

  public resetAsync(database: AnyDatabase): Promise<void>;
  public finalizeAsync(database: AnyDatabase): Promise<void>;

  //#endregion

  //#region Synchronous API

  public arrayRunSync(database: AnyDatabase, params: BindParams): RunResult;
  public objectRunSync(database: AnyDatabase, params: BindParams): RunResult;

  public arrayGetSync(database: AnyDatabase, params: BindParams): Row | null | undefined;
  public objectGetSync(database: AnyDatabase, params: BindParams): Row | null | undefined;

  public arrayGetAllSync(database: AnyDatabase, params: BindParams): Row[];
  public objectGetAllSync(database: AnyDatabase, params: BindParams): Row[];

  public resetSync(database: AnyDatabase): void;
  public finalizeSync(database: AnyDatabase): void;

  //#endregion
}
