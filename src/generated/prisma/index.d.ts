
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Link
 * Привязка игрока Minecraft к Telegram-аккаунту.
 * Один игрок — один Telegram chat_id (уникальность по обоим полям).
 */
export type Link = $Result.DefaultSelection<Prisma.$LinkPayload>
/**
 * Model PendingLink
 * Ожидающий код привязки: игрок ввёл /tg link в игре, сервер сгенерировал код
 * и зарегистрировал его здесь. Когда игрок пришлёт /link <код> боту в Telegram,
 * код валидируется и создаётся Link.
 */
export type PendingLink = $Result.DefaultSelection<Prisma.$PendingLinkPayload>
/**
 * Model OutboundMessage
 * Очередь исходящих сообщений. TargradCore вызывает /api/internal/send,
 * мы кладём запись сюда. Отправка идёт в webhook-обработчике или в том же запросе.
 * На Vercel без фоновой очереди нельзя держать long-running task, поэтому
 * в простом варианте отправляем синхронно в /api/internal/send.
 * Эта таблица — для логирования и повтора при сбое Telegram API.
 */
export type OutboundMessage = $Result.DefaultSelection<Prisma.$OutboundMessagePayload>
/**
 * Model WebhookEvent
 * Журнал входящих обновлений от Telegram webhook.
 * Полезно для отладки и аудита: что бот получал и что отвечал.
 */
export type WebhookEvent = $Result.DefaultSelection<Prisma.$WebhookEventPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Links
 * const links = await prisma.link.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Links
   * const links = await prisma.link.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.link`: Exposes CRUD operations for the **Link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.link.findMany()
    * ```
    */
  get link(): Prisma.LinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pendingLink`: Exposes CRUD operations for the **PendingLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PendingLinks
    * const pendingLinks = await prisma.pendingLink.findMany()
    * ```
    */
  get pendingLink(): Prisma.PendingLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outboundMessage`: Exposes CRUD operations for the **OutboundMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OutboundMessages
    * const outboundMessages = await prisma.outboundMessage.findMany()
    * ```
    */
  get outboundMessage(): Prisma.OutboundMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEvent`: Exposes CRUD operations for the **WebhookEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEvents
    * const webhookEvents = await prisma.webhookEvent.findMany()
    * ```
    */
  get webhookEvent(): Prisma.WebhookEventDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Link: 'Link',
    PendingLink: 'PendingLink',
    OutboundMessage: 'OutboundMessage',
    WebhookEvent: 'WebhookEvent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "link" | "pendingLink" | "outboundMessage" | "webhookEvent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Link: {
        payload: Prisma.$LinkPayload<ExtArgs>
        fields: Prisma.LinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          findFirst: {
            args: Prisma.LinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          findMany: {
            args: Prisma.LinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          create: {
            args: Prisma.LinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          createMany: {
            args: Prisma.LinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          delete: {
            args: Prisma.LinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          update: {
            args: Prisma.LinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          deleteMany: {
            args: Prisma.LinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          upsert: {
            args: Prisma.LinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          aggregate: {
            args: Prisma.LinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLink>
          }
          groupBy: {
            args: Prisma.LinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.LinkCountArgs<ExtArgs>
            result: $Utils.Optional<LinkCountAggregateOutputType> | number
          }
        }
      }
      PendingLink: {
        payload: Prisma.$PendingLinkPayload<ExtArgs>
        fields: Prisma.PendingLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendingLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendingLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>
          }
          findFirst: {
            args: Prisma.PendingLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendingLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>
          }
          findMany: {
            args: Prisma.PendingLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>[]
          }
          create: {
            args: Prisma.PendingLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>
          }
          createMany: {
            args: Prisma.PendingLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendingLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>[]
          }
          delete: {
            args: Prisma.PendingLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>
          }
          update: {
            args: Prisma.PendingLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>
          }
          deleteMany: {
            args: Prisma.PendingLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendingLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PendingLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>[]
          }
          upsert: {
            args: Prisma.PendingLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingLinkPayload>
          }
          aggregate: {
            args: Prisma.PendingLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendingLink>
          }
          groupBy: {
            args: Prisma.PendingLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendingLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendingLinkCountArgs<ExtArgs>
            result: $Utils.Optional<PendingLinkCountAggregateOutputType> | number
          }
        }
      }
      OutboundMessage: {
        payload: Prisma.$OutboundMessagePayload<ExtArgs>
        fields: Prisma.OutboundMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutboundMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutboundMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>
          }
          findFirst: {
            args: Prisma.OutboundMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutboundMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>
          }
          findMany: {
            args: Prisma.OutboundMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>[]
          }
          create: {
            args: Prisma.OutboundMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>
          }
          createMany: {
            args: Prisma.OutboundMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutboundMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>[]
          }
          delete: {
            args: Prisma.OutboundMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>
          }
          update: {
            args: Prisma.OutboundMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>
          }
          deleteMany: {
            args: Prisma.OutboundMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutboundMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutboundMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>[]
          }
          upsert: {
            args: Prisma.OutboundMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutboundMessagePayload>
          }
          aggregate: {
            args: Prisma.OutboundMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutboundMessage>
          }
          groupBy: {
            args: Prisma.OutboundMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutboundMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutboundMessageCountArgs<ExtArgs>
            result: $Utils.Optional<OutboundMessageCountAggregateOutputType> | number
          }
        }
      }
      WebhookEvent: {
        payload: Prisma.$WebhookEventPayload<ExtArgs>
        fields: Prisma.WebhookEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findFirst: {
            args: Prisma.WebhookEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findMany: {
            args: Prisma.WebhookEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          create: {
            args: Prisma.WebhookEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          createMany: {
            args: Prisma.WebhookEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          delete: {
            args: Prisma.WebhookEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          update: {
            args: Prisma.WebhookEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          upsert: {
            args: Prisma.WebhookEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          aggregate: {
            args: Prisma.WebhookEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEvent>
          }
          groupBy: {
            args: Prisma.WebhookEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEventCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    link?: LinkOmit
    pendingLink?: PendingLinkOmit
    outboundMessage?: OutboundMessageOmit
    webhookEvent?: WebhookEventOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Link
   */

  export type AggregateLink = {
    _count: LinkCountAggregateOutputType | null
    _avg: LinkAvgAggregateOutputType | null
    _sum: LinkSumAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  export type LinkAvgAggregateOutputType = {
    telegramId: number | null
    linkedAt: number | null
  }

  export type LinkSumAggregateOutputType = {
    telegramId: bigint | null
    linkedAt: bigint | null
  }

  export type LinkMinAggregateOutputType = {
    playerUuid: string | null
    telegramId: bigint | null
    playerName: string | null
    linkedAt: bigint | null
  }

  export type LinkMaxAggregateOutputType = {
    playerUuid: string | null
    telegramId: bigint | null
    playerName: string | null
    linkedAt: bigint | null
  }

  export type LinkCountAggregateOutputType = {
    playerUuid: number
    telegramId: number
    playerName: number
    linkedAt: number
    _all: number
  }


  export type LinkAvgAggregateInputType = {
    telegramId?: true
    linkedAt?: true
  }

  export type LinkSumAggregateInputType = {
    telegramId?: true
    linkedAt?: true
  }

  export type LinkMinAggregateInputType = {
    playerUuid?: true
    telegramId?: true
    playerName?: true
    linkedAt?: true
  }

  export type LinkMaxAggregateInputType = {
    playerUuid?: true
    telegramId?: true
    playerName?: true
    linkedAt?: true
  }

  export type LinkCountAggregateInputType = {
    playerUuid?: true
    telegramId?: true
    playerName?: true
    linkedAt?: true
    _all?: true
  }

  export type LinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Link to aggregate.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Links
    **/
    _count?: true | LinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkMaxAggregateInputType
  }

  export type GetLinkAggregateType<T extends LinkAggregateArgs> = {
        [P in keyof T & keyof AggregateLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLink[P]>
      : GetScalarType<T[P], AggregateLink[P]>
  }




  export type LinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkWhereInput
    orderBy?: LinkOrderByWithAggregationInput | LinkOrderByWithAggregationInput[]
    by: LinkScalarFieldEnum[] | LinkScalarFieldEnum
    having?: LinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkCountAggregateInputType | true
    _avg?: LinkAvgAggregateInputType
    _sum?: LinkSumAggregateInputType
    _min?: LinkMinAggregateInputType
    _max?: LinkMaxAggregateInputType
  }

  export type LinkGroupByOutputType = {
    playerUuid: string
    telegramId: bigint
    playerName: string | null
    linkedAt: bigint
    _count: LinkCountAggregateOutputType | null
    _avg: LinkAvgAggregateOutputType | null
    _sum: LinkSumAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  type GetLinkGroupByPayload<T extends LinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkGroupByOutputType[P]>
            : GetScalarType<T[P], LinkGroupByOutputType[P]>
        }
      >
    >


  export type LinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playerUuid?: boolean
    telegramId?: boolean
    playerName?: boolean
    linkedAt?: boolean
  }, ExtArgs["result"]["link"]>

  export type LinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playerUuid?: boolean
    telegramId?: boolean
    playerName?: boolean
    linkedAt?: boolean
  }, ExtArgs["result"]["link"]>

  export type LinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playerUuid?: boolean
    telegramId?: boolean
    playerName?: boolean
    linkedAt?: boolean
  }, ExtArgs["result"]["link"]>

  export type LinkSelectScalar = {
    playerUuid?: boolean
    telegramId?: boolean
    playerName?: boolean
    linkedAt?: boolean
  }

  export type LinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"playerUuid" | "telegramId" | "playerName" | "linkedAt", ExtArgs["result"]["link"]>

  export type $LinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Link"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      playerUuid: string
      telegramId: bigint
      playerName: string | null
      linkedAt: bigint
    }, ExtArgs["result"]["link"]>
    composites: {}
  }

  type LinkGetPayload<S extends boolean | null | undefined | LinkDefaultArgs> = $Result.GetResult<Prisma.$LinkPayload, S>

  type LinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinkCountAggregateInputType | true
    }

  export interface LinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Link'], meta: { name: 'Link' } }
    /**
     * Find zero or one Link that matches the filter.
     * @param {LinkFindUniqueArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LinkFindUniqueArgs>(args: SelectSubset<T, LinkFindUniqueArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Link that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LinkFindUniqueOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LinkFindUniqueOrThrowArgs>(args: SelectSubset<T, LinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Link that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LinkFindFirstArgs>(args?: SelectSubset<T, LinkFindFirstArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Link that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LinkFindFirstOrThrowArgs>(args?: SelectSubset<T, LinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Links
     * const links = await prisma.link.findMany()
     * 
     * // Get first 10 Links
     * const links = await prisma.link.findMany({ take: 10 })
     * 
     * // Only select the `playerUuid`
     * const linkWithPlayerUuidOnly = await prisma.link.findMany({ select: { playerUuid: true } })
     * 
     */
    findMany<T extends LinkFindManyArgs>(args?: SelectSubset<T, LinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Link.
     * @param {LinkCreateArgs} args - Arguments to create a Link.
     * @example
     * // Create one Link
     * const Link = await prisma.link.create({
     *   data: {
     *     // ... data to create a Link
     *   }
     * })
     * 
     */
    create<T extends LinkCreateArgs>(args: SelectSubset<T, LinkCreateArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Links.
     * @param {LinkCreateManyArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const link = await prisma.link.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LinkCreateManyArgs>(args?: SelectSubset<T, LinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Links and returns the data saved in the database.
     * @param {LinkCreateManyAndReturnArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const link = await prisma.link.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Links and only return the `playerUuid`
     * const linkWithPlayerUuidOnly = await prisma.link.createManyAndReturn({
     *   select: { playerUuid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LinkCreateManyAndReturnArgs>(args?: SelectSubset<T, LinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Link.
     * @param {LinkDeleteArgs} args - Arguments to delete one Link.
     * @example
     * // Delete one Link
     * const Link = await prisma.link.delete({
     *   where: {
     *     // ... filter to delete one Link
     *   }
     * })
     * 
     */
    delete<T extends LinkDeleteArgs>(args: SelectSubset<T, LinkDeleteArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Link.
     * @param {LinkUpdateArgs} args - Arguments to update one Link.
     * @example
     * // Update one Link
     * const link = await prisma.link.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LinkUpdateArgs>(args: SelectSubset<T, LinkUpdateArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Links.
     * @param {LinkDeleteManyArgs} args - Arguments to filter Links to delete.
     * @example
     * // Delete a few Links
     * const { count } = await prisma.link.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LinkDeleteManyArgs>(args?: SelectSubset<T, LinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LinkUpdateManyArgs>(args: SelectSubset<T, LinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links and returns the data updated in the database.
     * @param {LinkUpdateManyAndReturnArgs} args - Arguments to update many Links.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Links and only return the `playerUuid`
     * const linkWithPlayerUuidOnly = await prisma.link.updateManyAndReturn({
     *   select: { playerUuid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LinkUpdateManyAndReturnArgs>(args: SelectSubset<T, LinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Link.
     * @param {LinkUpsertArgs} args - Arguments to update or create a Link.
     * @example
     * // Update or create a Link
     * const link = await prisma.link.upsert({
     *   create: {
     *     // ... data to create a Link
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Link we want to update
     *   }
     * })
     */
    upsert<T extends LinkUpsertArgs>(args: SelectSubset<T, LinkUpsertArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkCountArgs} args - Arguments to filter Links to count.
     * @example
     * // Count the number of Links
     * const count = await prisma.link.count({
     *   where: {
     *     // ... the filter for the Links we want to count
     *   }
     * })
    **/
    count<T extends LinkCountArgs>(
      args?: Subset<T, LinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkAggregateArgs>(args: Subset<T, LinkAggregateArgs>): Prisma.PrismaPromise<GetLinkAggregateType<T>>

    /**
     * Group by Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkGroupByArgs['orderBy'] }
        : { orderBy?: LinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Link model
   */
  readonly fields: LinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Link.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Link model
   */
  interface LinkFieldRefs {
    readonly playerUuid: FieldRef<"Link", 'String'>
    readonly telegramId: FieldRef<"Link", 'BigInt'>
    readonly playerName: FieldRef<"Link", 'String'>
    readonly linkedAt: FieldRef<"Link", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * Link findUnique
   */
  export type LinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link findUniqueOrThrow
   */
  export type LinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link findFirst
   */
  export type LinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link findFirstOrThrow
   */
  export type LinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link findMany
   */
  export type LinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Filter, which Links to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link create
   */
  export type LinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data needed to create a Link.
     */
    data: XOR<LinkCreateInput, LinkUncheckedCreateInput>
  }

  /**
   * Link createMany
   */
  export type LinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Links.
     */
    data: LinkCreateManyInput | LinkCreateManyInput[]
  }

  /**
   * Link createManyAndReturn
   */
  export type LinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data used to create many Links.
     */
    data: LinkCreateManyInput | LinkCreateManyInput[]
  }

  /**
   * Link update
   */
  export type LinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data needed to update a Link.
     */
    data: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
    /**
     * Choose, which Link to update.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link updateMany
   */
  export type LinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Links.
     */
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to update.
     */
    limit?: number
  }

  /**
   * Link updateManyAndReturn
   */
  export type LinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data used to update Links.
     */
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to update.
     */
    limit?: number
  }

  /**
   * Link upsert
   */
  export type LinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The filter to search for the Link to update in case it exists.
     */
    where: LinkWhereUniqueInput
    /**
     * In case the Link found by the `where` argument doesn't exist, create a new Link with this data.
     */
    create: XOR<LinkCreateInput, LinkUncheckedCreateInput>
    /**
     * In case the Link was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
  }

  /**
   * Link delete
   */
  export type LinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Filter which Link to delete.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link deleteMany
   */
  export type LinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Links to delete
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to delete.
     */
    limit?: number
  }

  /**
   * Link without action
   */
  export type LinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
  }


  /**
   * Model PendingLink
   */

  export type AggregatePendingLink = {
    _count: PendingLinkCountAggregateOutputType | null
    _avg: PendingLinkAvgAggregateOutputType | null
    _sum: PendingLinkSumAggregateOutputType | null
    _min: PendingLinkMinAggregateOutputType | null
    _max: PendingLinkMaxAggregateOutputType | null
  }

  export type PendingLinkAvgAggregateOutputType = {
    createdAt: number | null
    expiresAt: number | null
  }

  export type PendingLinkSumAggregateOutputType = {
    createdAt: bigint | null
    expiresAt: bigint | null
  }

  export type PendingLinkMinAggregateOutputType = {
    code: string | null
    playerUuid: string | null
    playerName: string | null
    createdAt: bigint | null
    expiresAt: bigint | null
    status: string | null
  }

  export type PendingLinkMaxAggregateOutputType = {
    code: string | null
    playerUuid: string | null
    playerName: string | null
    createdAt: bigint | null
    expiresAt: bigint | null
    status: string | null
  }

  export type PendingLinkCountAggregateOutputType = {
    code: number
    playerUuid: number
    playerName: number
    createdAt: number
    expiresAt: number
    status: number
    _all: number
  }


  export type PendingLinkAvgAggregateInputType = {
    createdAt?: true
    expiresAt?: true
  }

  export type PendingLinkSumAggregateInputType = {
    createdAt?: true
    expiresAt?: true
  }

  export type PendingLinkMinAggregateInputType = {
    code?: true
    playerUuid?: true
    playerName?: true
    createdAt?: true
    expiresAt?: true
    status?: true
  }

  export type PendingLinkMaxAggregateInputType = {
    code?: true
    playerUuid?: true
    playerName?: true
    createdAt?: true
    expiresAt?: true
    status?: true
  }

  export type PendingLinkCountAggregateInputType = {
    code?: true
    playerUuid?: true
    playerName?: true
    createdAt?: true
    expiresAt?: true
    status?: true
    _all?: true
  }

  export type PendingLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingLink to aggregate.
     */
    where?: PendingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingLinks to fetch.
     */
    orderBy?: PendingLinkOrderByWithRelationInput | PendingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PendingLinks
    **/
    _count?: true | PendingLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PendingLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PendingLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendingLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendingLinkMaxAggregateInputType
  }

  export type GetPendingLinkAggregateType<T extends PendingLinkAggregateArgs> = {
        [P in keyof T & keyof AggregatePendingLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendingLink[P]>
      : GetScalarType<T[P], AggregatePendingLink[P]>
  }




  export type PendingLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendingLinkWhereInput
    orderBy?: PendingLinkOrderByWithAggregationInput | PendingLinkOrderByWithAggregationInput[]
    by: PendingLinkScalarFieldEnum[] | PendingLinkScalarFieldEnum
    having?: PendingLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendingLinkCountAggregateInputType | true
    _avg?: PendingLinkAvgAggregateInputType
    _sum?: PendingLinkSumAggregateInputType
    _min?: PendingLinkMinAggregateInputType
    _max?: PendingLinkMaxAggregateInputType
  }

  export type PendingLinkGroupByOutputType = {
    code: string
    playerUuid: string
    playerName: string | null
    createdAt: bigint
    expiresAt: bigint
    status: string
    _count: PendingLinkCountAggregateOutputType | null
    _avg: PendingLinkAvgAggregateOutputType | null
    _sum: PendingLinkSumAggregateOutputType | null
    _min: PendingLinkMinAggregateOutputType | null
    _max: PendingLinkMaxAggregateOutputType | null
  }

  type GetPendingLinkGroupByPayload<T extends PendingLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendingLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendingLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendingLinkGroupByOutputType[P]>
            : GetScalarType<T[P], PendingLinkGroupByOutputType[P]>
        }
      >
    >


  export type PendingLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    playerUuid?: boolean
    playerName?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["pendingLink"]>

  export type PendingLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    playerUuid?: boolean
    playerName?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["pendingLink"]>

  export type PendingLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    playerUuid?: boolean
    playerName?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    status?: boolean
  }, ExtArgs["result"]["pendingLink"]>

  export type PendingLinkSelectScalar = {
    code?: boolean
    playerUuid?: boolean
    playerName?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    status?: boolean
  }

  export type PendingLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"code" | "playerUuid" | "playerName" | "createdAt" | "expiresAt" | "status", ExtArgs["result"]["pendingLink"]>

  export type $PendingLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PendingLink"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      code: string
      playerUuid: string
      playerName: string | null
      createdAt: bigint
      expiresAt: bigint
      status: string
    }, ExtArgs["result"]["pendingLink"]>
    composites: {}
  }

  type PendingLinkGetPayload<S extends boolean | null | undefined | PendingLinkDefaultArgs> = $Result.GetResult<Prisma.$PendingLinkPayload, S>

  type PendingLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PendingLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PendingLinkCountAggregateInputType | true
    }

  export interface PendingLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PendingLink'], meta: { name: 'PendingLink' } }
    /**
     * Find zero or one PendingLink that matches the filter.
     * @param {PendingLinkFindUniqueArgs} args - Arguments to find a PendingLink
     * @example
     * // Get one PendingLink
     * const pendingLink = await prisma.pendingLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendingLinkFindUniqueArgs>(args: SelectSubset<T, PendingLinkFindUniqueArgs<ExtArgs>>): Prisma__PendingLinkClient<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PendingLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendingLinkFindUniqueOrThrowArgs} args - Arguments to find a PendingLink
     * @example
     * // Get one PendingLink
     * const pendingLink = await prisma.pendingLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendingLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, PendingLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendingLinkClient<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingLinkFindFirstArgs} args - Arguments to find a PendingLink
     * @example
     * // Get one PendingLink
     * const pendingLink = await prisma.pendingLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendingLinkFindFirstArgs>(args?: SelectSubset<T, PendingLinkFindFirstArgs<ExtArgs>>): Prisma__PendingLinkClient<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingLinkFindFirstOrThrowArgs} args - Arguments to find a PendingLink
     * @example
     * // Get one PendingLink
     * const pendingLink = await prisma.pendingLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendingLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, PendingLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendingLinkClient<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PendingLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PendingLinks
     * const pendingLinks = await prisma.pendingLink.findMany()
     * 
     * // Get first 10 PendingLinks
     * const pendingLinks = await prisma.pendingLink.findMany({ take: 10 })
     * 
     * // Only select the `code`
     * const pendingLinkWithCodeOnly = await prisma.pendingLink.findMany({ select: { code: true } })
     * 
     */
    findMany<T extends PendingLinkFindManyArgs>(args?: SelectSubset<T, PendingLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PendingLink.
     * @param {PendingLinkCreateArgs} args - Arguments to create a PendingLink.
     * @example
     * // Create one PendingLink
     * const PendingLink = await prisma.pendingLink.create({
     *   data: {
     *     // ... data to create a PendingLink
     *   }
     * })
     * 
     */
    create<T extends PendingLinkCreateArgs>(args: SelectSubset<T, PendingLinkCreateArgs<ExtArgs>>): Prisma__PendingLinkClient<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PendingLinks.
     * @param {PendingLinkCreateManyArgs} args - Arguments to create many PendingLinks.
     * @example
     * // Create many PendingLinks
     * const pendingLink = await prisma.pendingLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendingLinkCreateManyArgs>(args?: SelectSubset<T, PendingLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PendingLinks and returns the data saved in the database.
     * @param {PendingLinkCreateManyAndReturnArgs} args - Arguments to create many PendingLinks.
     * @example
     * // Create many PendingLinks
     * const pendingLink = await prisma.pendingLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PendingLinks and only return the `code`
     * const pendingLinkWithCodeOnly = await prisma.pendingLink.createManyAndReturn({
     *   select: { code: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendingLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, PendingLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PendingLink.
     * @param {PendingLinkDeleteArgs} args - Arguments to delete one PendingLink.
     * @example
     * // Delete one PendingLink
     * const PendingLink = await prisma.pendingLink.delete({
     *   where: {
     *     // ... filter to delete one PendingLink
     *   }
     * })
     * 
     */
    delete<T extends PendingLinkDeleteArgs>(args: SelectSubset<T, PendingLinkDeleteArgs<ExtArgs>>): Prisma__PendingLinkClient<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PendingLink.
     * @param {PendingLinkUpdateArgs} args - Arguments to update one PendingLink.
     * @example
     * // Update one PendingLink
     * const pendingLink = await prisma.pendingLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendingLinkUpdateArgs>(args: SelectSubset<T, PendingLinkUpdateArgs<ExtArgs>>): Prisma__PendingLinkClient<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PendingLinks.
     * @param {PendingLinkDeleteManyArgs} args - Arguments to filter PendingLinks to delete.
     * @example
     * // Delete a few PendingLinks
     * const { count } = await prisma.pendingLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendingLinkDeleteManyArgs>(args?: SelectSubset<T, PendingLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PendingLinks
     * const pendingLink = await prisma.pendingLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendingLinkUpdateManyArgs>(args: SelectSubset<T, PendingLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingLinks and returns the data updated in the database.
     * @param {PendingLinkUpdateManyAndReturnArgs} args - Arguments to update many PendingLinks.
     * @example
     * // Update many PendingLinks
     * const pendingLink = await prisma.pendingLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PendingLinks and only return the `code`
     * const pendingLinkWithCodeOnly = await prisma.pendingLink.updateManyAndReturn({
     *   select: { code: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PendingLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, PendingLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PendingLink.
     * @param {PendingLinkUpsertArgs} args - Arguments to update or create a PendingLink.
     * @example
     * // Update or create a PendingLink
     * const pendingLink = await prisma.pendingLink.upsert({
     *   create: {
     *     // ... data to create a PendingLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PendingLink we want to update
     *   }
     * })
     */
    upsert<T extends PendingLinkUpsertArgs>(args: SelectSubset<T, PendingLinkUpsertArgs<ExtArgs>>): Prisma__PendingLinkClient<$Result.GetResult<Prisma.$PendingLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PendingLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingLinkCountArgs} args - Arguments to filter PendingLinks to count.
     * @example
     * // Count the number of PendingLinks
     * const count = await prisma.pendingLink.count({
     *   where: {
     *     // ... the filter for the PendingLinks we want to count
     *   }
     * })
    **/
    count<T extends PendingLinkCountArgs>(
      args?: Subset<T, PendingLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendingLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PendingLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PendingLinkAggregateArgs>(args: Subset<T, PendingLinkAggregateArgs>): Prisma.PrismaPromise<GetPendingLinkAggregateType<T>>

    /**
     * Group by PendingLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PendingLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendingLinkGroupByArgs['orderBy'] }
        : { orderBy?: PendingLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PendingLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendingLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PendingLink model
   */
  readonly fields: PendingLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PendingLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendingLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PendingLink model
   */
  interface PendingLinkFieldRefs {
    readonly code: FieldRef<"PendingLink", 'String'>
    readonly playerUuid: FieldRef<"PendingLink", 'String'>
    readonly playerName: FieldRef<"PendingLink", 'String'>
    readonly createdAt: FieldRef<"PendingLink", 'BigInt'>
    readonly expiresAt: FieldRef<"PendingLink", 'BigInt'>
    readonly status: FieldRef<"PendingLink", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PendingLink findUnique
   */
  export type PendingLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * Filter, which PendingLink to fetch.
     */
    where: PendingLinkWhereUniqueInput
  }

  /**
   * PendingLink findUniqueOrThrow
   */
  export type PendingLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * Filter, which PendingLink to fetch.
     */
    where: PendingLinkWhereUniqueInput
  }

  /**
   * PendingLink findFirst
   */
  export type PendingLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * Filter, which PendingLink to fetch.
     */
    where?: PendingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingLinks to fetch.
     */
    orderBy?: PendingLinkOrderByWithRelationInput | PendingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingLinks.
     */
    cursor?: PendingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingLinks.
     */
    distinct?: PendingLinkScalarFieldEnum | PendingLinkScalarFieldEnum[]
  }

  /**
   * PendingLink findFirstOrThrow
   */
  export type PendingLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * Filter, which PendingLink to fetch.
     */
    where?: PendingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingLinks to fetch.
     */
    orderBy?: PendingLinkOrderByWithRelationInput | PendingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingLinks.
     */
    cursor?: PendingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingLinks.
     */
    distinct?: PendingLinkScalarFieldEnum | PendingLinkScalarFieldEnum[]
  }

  /**
   * PendingLink findMany
   */
  export type PendingLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * Filter, which PendingLinks to fetch.
     */
    where?: PendingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingLinks to fetch.
     */
    orderBy?: PendingLinkOrderByWithRelationInput | PendingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PendingLinks.
     */
    cursor?: PendingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingLinks.
     */
    skip?: number
    distinct?: PendingLinkScalarFieldEnum | PendingLinkScalarFieldEnum[]
  }

  /**
   * PendingLink create
   */
  export type PendingLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * The data needed to create a PendingLink.
     */
    data: XOR<PendingLinkCreateInput, PendingLinkUncheckedCreateInput>
  }

  /**
   * PendingLink createMany
   */
  export type PendingLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PendingLinks.
     */
    data: PendingLinkCreateManyInput | PendingLinkCreateManyInput[]
  }

  /**
   * PendingLink createManyAndReturn
   */
  export type PendingLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * The data used to create many PendingLinks.
     */
    data: PendingLinkCreateManyInput | PendingLinkCreateManyInput[]
  }

  /**
   * PendingLink update
   */
  export type PendingLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * The data needed to update a PendingLink.
     */
    data: XOR<PendingLinkUpdateInput, PendingLinkUncheckedUpdateInput>
    /**
     * Choose, which PendingLink to update.
     */
    where: PendingLinkWhereUniqueInput
  }

  /**
   * PendingLink updateMany
   */
  export type PendingLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PendingLinks.
     */
    data: XOR<PendingLinkUpdateManyMutationInput, PendingLinkUncheckedUpdateManyInput>
    /**
     * Filter which PendingLinks to update
     */
    where?: PendingLinkWhereInput
    /**
     * Limit how many PendingLinks to update.
     */
    limit?: number
  }

  /**
   * PendingLink updateManyAndReturn
   */
  export type PendingLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * The data used to update PendingLinks.
     */
    data: XOR<PendingLinkUpdateManyMutationInput, PendingLinkUncheckedUpdateManyInput>
    /**
     * Filter which PendingLinks to update
     */
    where?: PendingLinkWhereInput
    /**
     * Limit how many PendingLinks to update.
     */
    limit?: number
  }

  /**
   * PendingLink upsert
   */
  export type PendingLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * The filter to search for the PendingLink to update in case it exists.
     */
    where: PendingLinkWhereUniqueInput
    /**
     * In case the PendingLink found by the `where` argument doesn't exist, create a new PendingLink with this data.
     */
    create: XOR<PendingLinkCreateInput, PendingLinkUncheckedCreateInput>
    /**
     * In case the PendingLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendingLinkUpdateInput, PendingLinkUncheckedUpdateInput>
  }

  /**
   * PendingLink delete
   */
  export type PendingLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
    /**
     * Filter which PendingLink to delete.
     */
    where: PendingLinkWhereUniqueInput
  }

  /**
   * PendingLink deleteMany
   */
  export type PendingLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingLinks to delete
     */
    where?: PendingLinkWhereInput
    /**
     * Limit how many PendingLinks to delete.
     */
    limit?: number
  }

  /**
   * PendingLink without action
   */
  export type PendingLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingLink
     */
    select?: PendingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingLink
     */
    omit?: PendingLinkOmit<ExtArgs> | null
  }


  /**
   * Model OutboundMessage
   */

  export type AggregateOutboundMessage = {
    _count: OutboundMessageCountAggregateOutputType | null
    _avg: OutboundMessageAvgAggregateOutputType | null
    _sum: OutboundMessageSumAggregateOutputType | null
    _min: OutboundMessageMinAggregateOutputType | null
    _max: OutboundMessageMaxAggregateOutputType | null
  }

  export type OutboundMessageAvgAggregateOutputType = {
    telegramId: number | null
    httpStatus: number | null
    createdAt: number | null
    sentAt: number | null
  }

  export type OutboundMessageSumAggregateOutputType = {
    telegramId: bigint | null
    httpStatus: number | null
    createdAt: bigint | null
    sentAt: bigint | null
  }

  export type OutboundMessageMinAggregateOutputType = {
    id: string | null
    telegramId: bigint | null
    text: string | null
    status: string | null
    httpStatus: number | null
    errorBody: string | null
    createdAt: bigint | null
    sentAt: bigint | null
  }

  export type OutboundMessageMaxAggregateOutputType = {
    id: string | null
    telegramId: bigint | null
    text: string | null
    status: string | null
    httpStatus: number | null
    errorBody: string | null
    createdAt: bigint | null
    sentAt: bigint | null
  }

  export type OutboundMessageCountAggregateOutputType = {
    id: number
    telegramId: number
    text: number
    status: number
    httpStatus: number
    errorBody: number
    createdAt: number
    sentAt: number
    _all: number
  }


  export type OutboundMessageAvgAggregateInputType = {
    telegramId?: true
    httpStatus?: true
    createdAt?: true
    sentAt?: true
  }

  export type OutboundMessageSumAggregateInputType = {
    telegramId?: true
    httpStatus?: true
    createdAt?: true
    sentAt?: true
  }

  export type OutboundMessageMinAggregateInputType = {
    id?: true
    telegramId?: true
    text?: true
    status?: true
    httpStatus?: true
    errorBody?: true
    createdAt?: true
    sentAt?: true
  }

  export type OutboundMessageMaxAggregateInputType = {
    id?: true
    telegramId?: true
    text?: true
    status?: true
    httpStatus?: true
    errorBody?: true
    createdAt?: true
    sentAt?: true
  }

  export type OutboundMessageCountAggregateInputType = {
    id?: true
    telegramId?: true
    text?: true
    status?: true
    httpStatus?: true
    errorBody?: true
    createdAt?: true
    sentAt?: true
    _all?: true
  }

  export type OutboundMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboundMessage to aggregate.
     */
    where?: OutboundMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboundMessages to fetch.
     */
    orderBy?: OutboundMessageOrderByWithRelationInput | OutboundMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutboundMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboundMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboundMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OutboundMessages
    **/
    _count?: true | OutboundMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutboundMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutboundMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutboundMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutboundMessageMaxAggregateInputType
  }

  export type GetOutboundMessageAggregateType<T extends OutboundMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateOutboundMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutboundMessage[P]>
      : GetScalarType<T[P], AggregateOutboundMessage[P]>
  }




  export type OutboundMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutboundMessageWhereInput
    orderBy?: OutboundMessageOrderByWithAggregationInput | OutboundMessageOrderByWithAggregationInput[]
    by: OutboundMessageScalarFieldEnum[] | OutboundMessageScalarFieldEnum
    having?: OutboundMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutboundMessageCountAggregateInputType | true
    _avg?: OutboundMessageAvgAggregateInputType
    _sum?: OutboundMessageSumAggregateInputType
    _min?: OutboundMessageMinAggregateInputType
    _max?: OutboundMessageMaxAggregateInputType
  }

  export type OutboundMessageGroupByOutputType = {
    id: string
    telegramId: bigint
    text: string
    status: string
    httpStatus: number | null
    errorBody: string | null
    createdAt: bigint
    sentAt: bigint | null
    _count: OutboundMessageCountAggregateOutputType | null
    _avg: OutboundMessageAvgAggregateOutputType | null
    _sum: OutboundMessageSumAggregateOutputType | null
    _min: OutboundMessageMinAggregateOutputType | null
    _max: OutboundMessageMaxAggregateOutputType | null
  }

  type GetOutboundMessageGroupByPayload<T extends OutboundMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutboundMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutboundMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutboundMessageGroupByOutputType[P]>
            : GetScalarType<T[P], OutboundMessageGroupByOutputType[P]>
        }
      >
    >


  export type OutboundMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    text?: boolean
    status?: boolean
    httpStatus?: boolean
    errorBody?: boolean
    createdAt?: boolean
    sentAt?: boolean
  }, ExtArgs["result"]["outboundMessage"]>

  export type OutboundMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    text?: boolean
    status?: boolean
    httpStatus?: boolean
    errorBody?: boolean
    createdAt?: boolean
    sentAt?: boolean
  }, ExtArgs["result"]["outboundMessage"]>

  export type OutboundMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    text?: boolean
    status?: boolean
    httpStatus?: boolean
    errorBody?: boolean
    createdAt?: boolean
    sentAt?: boolean
  }, ExtArgs["result"]["outboundMessage"]>

  export type OutboundMessageSelectScalar = {
    id?: boolean
    telegramId?: boolean
    text?: boolean
    status?: boolean
    httpStatus?: boolean
    errorBody?: boolean
    createdAt?: boolean
    sentAt?: boolean
  }

  export type OutboundMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "text" | "status" | "httpStatus" | "errorBody" | "createdAt" | "sentAt", ExtArgs["result"]["outboundMessage"]>

  export type $OutboundMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OutboundMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramId: bigint
      text: string
      status: string
      httpStatus: number | null
      errorBody: string | null
      createdAt: bigint
      sentAt: bigint | null
    }, ExtArgs["result"]["outboundMessage"]>
    composites: {}
  }

  type OutboundMessageGetPayload<S extends boolean | null | undefined | OutboundMessageDefaultArgs> = $Result.GetResult<Prisma.$OutboundMessagePayload, S>

  type OutboundMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutboundMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutboundMessageCountAggregateInputType | true
    }

  export interface OutboundMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OutboundMessage'], meta: { name: 'OutboundMessage' } }
    /**
     * Find zero or one OutboundMessage that matches the filter.
     * @param {OutboundMessageFindUniqueArgs} args - Arguments to find a OutboundMessage
     * @example
     * // Get one OutboundMessage
     * const outboundMessage = await prisma.outboundMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutboundMessageFindUniqueArgs>(args: SelectSubset<T, OutboundMessageFindUniqueArgs<ExtArgs>>): Prisma__OutboundMessageClient<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OutboundMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutboundMessageFindUniqueOrThrowArgs} args - Arguments to find a OutboundMessage
     * @example
     * // Get one OutboundMessage
     * const outboundMessage = await prisma.outboundMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutboundMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, OutboundMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutboundMessageClient<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboundMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboundMessageFindFirstArgs} args - Arguments to find a OutboundMessage
     * @example
     * // Get one OutboundMessage
     * const outboundMessage = await prisma.outboundMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutboundMessageFindFirstArgs>(args?: SelectSubset<T, OutboundMessageFindFirstArgs<ExtArgs>>): Prisma__OutboundMessageClient<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OutboundMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboundMessageFindFirstOrThrowArgs} args - Arguments to find a OutboundMessage
     * @example
     * // Get one OutboundMessage
     * const outboundMessage = await prisma.outboundMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutboundMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, OutboundMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutboundMessageClient<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OutboundMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboundMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OutboundMessages
     * const outboundMessages = await prisma.outboundMessage.findMany()
     * 
     * // Get first 10 OutboundMessages
     * const outboundMessages = await prisma.outboundMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outboundMessageWithIdOnly = await prisma.outboundMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutboundMessageFindManyArgs>(args?: SelectSubset<T, OutboundMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OutboundMessage.
     * @param {OutboundMessageCreateArgs} args - Arguments to create a OutboundMessage.
     * @example
     * // Create one OutboundMessage
     * const OutboundMessage = await prisma.outboundMessage.create({
     *   data: {
     *     // ... data to create a OutboundMessage
     *   }
     * })
     * 
     */
    create<T extends OutboundMessageCreateArgs>(args: SelectSubset<T, OutboundMessageCreateArgs<ExtArgs>>): Prisma__OutboundMessageClient<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OutboundMessages.
     * @param {OutboundMessageCreateManyArgs} args - Arguments to create many OutboundMessages.
     * @example
     * // Create many OutboundMessages
     * const outboundMessage = await prisma.outboundMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutboundMessageCreateManyArgs>(args?: SelectSubset<T, OutboundMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OutboundMessages and returns the data saved in the database.
     * @param {OutboundMessageCreateManyAndReturnArgs} args - Arguments to create many OutboundMessages.
     * @example
     * // Create many OutboundMessages
     * const outboundMessage = await prisma.outboundMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OutboundMessages and only return the `id`
     * const outboundMessageWithIdOnly = await prisma.outboundMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutboundMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, OutboundMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OutboundMessage.
     * @param {OutboundMessageDeleteArgs} args - Arguments to delete one OutboundMessage.
     * @example
     * // Delete one OutboundMessage
     * const OutboundMessage = await prisma.outboundMessage.delete({
     *   where: {
     *     // ... filter to delete one OutboundMessage
     *   }
     * })
     * 
     */
    delete<T extends OutboundMessageDeleteArgs>(args: SelectSubset<T, OutboundMessageDeleteArgs<ExtArgs>>): Prisma__OutboundMessageClient<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OutboundMessage.
     * @param {OutboundMessageUpdateArgs} args - Arguments to update one OutboundMessage.
     * @example
     * // Update one OutboundMessage
     * const outboundMessage = await prisma.outboundMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutboundMessageUpdateArgs>(args: SelectSubset<T, OutboundMessageUpdateArgs<ExtArgs>>): Prisma__OutboundMessageClient<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OutboundMessages.
     * @param {OutboundMessageDeleteManyArgs} args - Arguments to filter OutboundMessages to delete.
     * @example
     * // Delete a few OutboundMessages
     * const { count } = await prisma.outboundMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutboundMessageDeleteManyArgs>(args?: SelectSubset<T, OutboundMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboundMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboundMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OutboundMessages
     * const outboundMessage = await prisma.outboundMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutboundMessageUpdateManyArgs>(args: SelectSubset<T, OutboundMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OutboundMessages and returns the data updated in the database.
     * @param {OutboundMessageUpdateManyAndReturnArgs} args - Arguments to update many OutboundMessages.
     * @example
     * // Update many OutboundMessages
     * const outboundMessage = await prisma.outboundMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OutboundMessages and only return the `id`
     * const outboundMessageWithIdOnly = await prisma.outboundMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutboundMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, OutboundMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OutboundMessage.
     * @param {OutboundMessageUpsertArgs} args - Arguments to update or create a OutboundMessage.
     * @example
     * // Update or create a OutboundMessage
     * const outboundMessage = await prisma.outboundMessage.upsert({
     *   create: {
     *     // ... data to create a OutboundMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OutboundMessage we want to update
     *   }
     * })
     */
    upsert<T extends OutboundMessageUpsertArgs>(args: SelectSubset<T, OutboundMessageUpsertArgs<ExtArgs>>): Prisma__OutboundMessageClient<$Result.GetResult<Prisma.$OutboundMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OutboundMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboundMessageCountArgs} args - Arguments to filter OutboundMessages to count.
     * @example
     * // Count the number of OutboundMessages
     * const count = await prisma.outboundMessage.count({
     *   where: {
     *     // ... the filter for the OutboundMessages we want to count
     *   }
     * })
    **/
    count<T extends OutboundMessageCountArgs>(
      args?: Subset<T, OutboundMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutboundMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OutboundMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboundMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutboundMessageAggregateArgs>(args: Subset<T, OutboundMessageAggregateArgs>): Prisma.PrismaPromise<GetOutboundMessageAggregateType<T>>

    /**
     * Group by OutboundMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutboundMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutboundMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutboundMessageGroupByArgs['orderBy'] }
        : { orderBy?: OutboundMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutboundMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutboundMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OutboundMessage model
   */
  readonly fields: OutboundMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OutboundMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutboundMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OutboundMessage model
   */
  interface OutboundMessageFieldRefs {
    readonly id: FieldRef<"OutboundMessage", 'String'>
    readonly telegramId: FieldRef<"OutboundMessage", 'BigInt'>
    readonly text: FieldRef<"OutboundMessage", 'String'>
    readonly status: FieldRef<"OutboundMessage", 'String'>
    readonly httpStatus: FieldRef<"OutboundMessage", 'Int'>
    readonly errorBody: FieldRef<"OutboundMessage", 'String'>
    readonly createdAt: FieldRef<"OutboundMessage", 'BigInt'>
    readonly sentAt: FieldRef<"OutboundMessage", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * OutboundMessage findUnique
   */
  export type OutboundMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * Filter, which OutboundMessage to fetch.
     */
    where: OutboundMessageWhereUniqueInput
  }

  /**
   * OutboundMessage findUniqueOrThrow
   */
  export type OutboundMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * Filter, which OutboundMessage to fetch.
     */
    where: OutboundMessageWhereUniqueInput
  }

  /**
   * OutboundMessage findFirst
   */
  export type OutboundMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * Filter, which OutboundMessage to fetch.
     */
    where?: OutboundMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboundMessages to fetch.
     */
    orderBy?: OutboundMessageOrderByWithRelationInput | OutboundMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboundMessages.
     */
    cursor?: OutboundMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboundMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboundMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboundMessages.
     */
    distinct?: OutboundMessageScalarFieldEnum | OutboundMessageScalarFieldEnum[]
  }

  /**
   * OutboundMessage findFirstOrThrow
   */
  export type OutboundMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * Filter, which OutboundMessage to fetch.
     */
    where?: OutboundMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboundMessages to fetch.
     */
    orderBy?: OutboundMessageOrderByWithRelationInput | OutboundMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OutboundMessages.
     */
    cursor?: OutboundMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboundMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboundMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OutboundMessages.
     */
    distinct?: OutboundMessageScalarFieldEnum | OutboundMessageScalarFieldEnum[]
  }

  /**
   * OutboundMessage findMany
   */
  export type OutboundMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * Filter, which OutboundMessages to fetch.
     */
    where?: OutboundMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OutboundMessages to fetch.
     */
    orderBy?: OutboundMessageOrderByWithRelationInput | OutboundMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OutboundMessages.
     */
    cursor?: OutboundMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OutboundMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OutboundMessages.
     */
    skip?: number
    distinct?: OutboundMessageScalarFieldEnum | OutboundMessageScalarFieldEnum[]
  }

  /**
   * OutboundMessage create
   */
  export type OutboundMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a OutboundMessage.
     */
    data: XOR<OutboundMessageCreateInput, OutboundMessageUncheckedCreateInput>
  }

  /**
   * OutboundMessage createMany
   */
  export type OutboundMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OutboundMessages.
     */
    data: OutboundMessageCreateManyInput | OutboundMessageCreateManyInput[]
  }

  /**
   * OutboundMessage createManyAndReturn
   */
  export type OutboundMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * The data used to create many OutboundMessages.
     */
    data: OutboundMessageCreateManyInput | OutboundMessageCreateManyInput[]
  }

  /**
   * OutboundMessage update
   */
  export type OutboundMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a OutboundMessage.
     */
    data: XOR<OutboundMessageUpdateInput, OutboundMessageUncheckedUpdateInput>
    /**
     * Choose, which OutboundMessage to update.
     */
    where: OutboundMessageWhereUniqueInput
  }

  /**
   * OutboundMessage updateMany
   */
  export type OutboundMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OutboundMessages.
     */
    data: XOR<OutboundMessageUpdateManyMutationInput, OutboundMessageUncheckedUpdateManyInput>
    /**
     * Filter which OutboundMessages to update
     */
    where?: OutboundMessageWhereInput
    /**
     * Limit how many OutboundMessages to update.
     */
    limit?: number
  }

  /**
   * OutboundMessage updateManyAndReturn
   */
  export type OutboundMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * The data used to update OutboundMessages.
     */
    data: XOR<OutboundMessageUpdateManyMutationInput, OutboundMessageUncheckedUpdateManyInput>
    /**
     * Filter which OutboundMessages to update
     */
    where?: OutboundMessageWhereInput
    /**
     * Limit how many OutboundMessages to update.
     */
    limit?: number
  }

  /**
   * OutboundMessage upsert
   */
  export type OutboundMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the OutboundMessage to update in case it exists.
     */
    where: OutboundMessageWhereUniqueInput
    /**
     * In case the OutboundMessage found by the `where` argument doesn't exist, create a new OutboundMessage with this data.
     */
    create: XOR<OutboundMessageCreateInput, OutboundMessageUncheckedCreateInput>
    /**
     * In case the OutboundMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutboundMessageUpdateInput, OutboundMessageUncheckedUpdateInput>
  }

  /**
   * OutboundMessage delete
   */
  export type OutboundMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
    /**
     * Filter which OutboundMessage to delete.
     */
    where: OutboundMessageWhereUniqueInput
  }

  /**
   * OutboundMessage deleteMany
   */
  export type OutboundMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OutboundMessages to delete
     */
    where?: OutboundMessageWhereInput
    /**
     * Limit how many OutboundMessages to delete.
     */
    limit?: number
  }

  /**
   * OutboundMessage without action
   */
  export type OutboundMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutboundMessage
     */
    select?: OutboundMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OutboundMessage
     */
    omit?: OutboundMessageOmit<ExtArgs> | null
  }


  /**
   * Model WebhookEvent
   */

  export type AggregateWebhookEvent = {
    _count: WebhookEventCountAggregateOutputType | null
    _avg: WebhookEventAvgAggregateOutputType | null
    _sum: WebhookEventSumAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  export type WebhookEventAvgAggregateOutputType = {
    updateId: number | null
    fromChatId: number | null
    receivedAt: number | null
  }

  export type WebhookEventSumAggregateOutputType = {
    updateId: bigint | null
    fromChatId: bigint | null
    receivedAt: bigint | null
  }

  export type WebhookEventMinAggregateOutputType = {
    id: string | null
    updateId: bigint | null
    rawPayload: string | null
    eventType: string | null
    fromChatId: bigint | null
    commandText: string | null
    receivedAt: bigint | null
  }

  export type WebhookEventMaxAggregateOutputType = {
    id: string | null
    updateId: bigint | null
    rawPayload: string | null
    eventType: string | null
    fromChatId: bigint | null
    commandText: string | null
    receivedAt: bigint | null
  }

  export type WebhookEventCountAggregateOutputType = {
    id: number
    updateId: number
    rawPayload: number
    eventType: number
    fromChatId: number
    commandText: number
    receivedAt: number
    _all: number
  }


  export type WebhookEventAvgAggregateInputType = {
    updateId?: true
    fromChatId?: true
    receivedAt?: true
  }

  export type WebhookEventSumAggregateInputType = {
    updateId?: true
    fromChatId?: true
    receivedAt?: true
  }

  export type WebhookEventMinAggregateInputType = {
    id?: true
    updateId?: true
    rawPayload?: true
    eventType?: true
    fromChatId?: true
    commandText?: true
    receivedAt?: true
  }

  export type WebhookEventMaxAggregateInputType = {
    id?: true
    updateId?: true
    rawPayload?: true
    eventType?: true
    fromChatId?: true
    commandText?: true
    receivedAt?: true
  }

  export type WebhookEventCountAggregateInputType = {
    id?: true
    updateId?: true
    rawPayload?: true
    eventType?: true
    fromChatId?: true
    commandText?: true
    receivedAt?: true
    _all?: true
  }

  export type WebhookEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvent to aggregate.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEvents
    **/
    _count?: true | WebhookEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebhookEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebhookEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEventMaxAggregateInputType
  }

  export type GetWebhookEventAggregateType<T extends WebhookEventAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEvent[P]>
      : GetScalarType<T[P], AggregateWebhookEvent[P]>
  }




  export type WebhookEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEventWhereInput
    orderBy?: WebhookEventOrderByWithAggregationInput | WebhookEventOrderByWithAggregationInput[]
    by: WebhookEventScalarFieldEnum[] | WebhookEventScalarFieldEnum
    having?: WebhookEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEventCountAggregateInputType | true
    _avg?: WebhookEventAvgAggregateInputType
    _sum?: WebhookEventSumAggregateInputType
    _min?: WebhookEventMinAggregateInputType
    _max?: WebhookEventMaxAggregateInputType
  }

  export type WebhookEventGroupByOutputType = {
    id: string
    updateId: bigint
    rawPayload: string
    eventType: string | null
    fromChatId: bigint | null
    commandText: string | null
    receivedAt: bigint
    _count: WebhookEventCountAggregateOutputType | null
    _avg: WebhookEventAvgAggregateOutputType | null
    _sum: WebhookEventSumAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  type GetWebhookEventGroupByPayload<T extends WebhookEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    updateId?: boolean
    rawPayload?: boolean
    eventType?: boolean
    fromChatId?: boolean
    commandText?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    updateId?: boolean
    rawPayload?: boolean
    eventType?: boolean
    fromChatId?: boolean
    commandText?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    updateId?: boolean
    rawPayload?: boolean
    eventType?: boolean
    fromChatId?: boolean
    commandText?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectScalar = {
    id?: boolean
    updateId?: boolean
    rawPayload?: boolean
    eventType?: boolean
    fromChatId?: boolean
    commandText?: boolean
    receivedAt?: boolean
  }

  export type WebhookEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "updateId" | "rawPayload" | "eventType" | "fromChatId" | "commandText" | "receivedAt", ExtArgs["result"]["webhookEvent"]>

  export type $WebhookEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      updateId: bigint
      rawPayload: string
      eventType: string | null
      fromChatId: bigint | null
      commandText: string | null
      receivedAt: bigint
    }, ExtArgs["result"]["webhookEvent"]>
    composites: {}
  }

  type WebhookEventGetPayload<S extends boolean | null | undefined | WebhookEventDefaultArgs> = $Result.GetResult<Prisma.$WebhookEventPayload, S>

  type WebhookEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookEventCountAggregateInputType | true
    }

  export interface WebhookEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEvent'], meta: { name: 'WebhookEvent' } }
    /**
     * Find zero or one WebhookEvent that matches the filter.
     * @param {WebhookEventFindUniqueArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEventFindUniqueArgs>(args: SelectSubset<T, WebhookEventFindUniqueArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEventFindUniqueOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEventFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEventFindFirstArgs>(args?: SelectSubset<T, WebhookEventFindFirstArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEventFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany()
     * 
     * // Get first 10 WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEventFindManyArgs>(args?: SelectSubset<T, WebhookEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookEvent.
     * @param {WebhookEventCreateArgs} args - Arguments to create a WebhookEvent.
     * @example
     * // Create one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.create({
     *   data: {
     *     // ... data to create a WebhookEvent
     *   }
     * })
     * 
     */
    create<T extends WebhookEventCreateArgs>(args: SelectSubset<T, WebhookEventCreateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookEvents.
     * @param {WebhookEventCreateManyArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEventCreateManyArgs>(args?: SelectSubset<T, WebhookEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEvents and returns the data saved in the database.
     * @param {WebhookEventCreateManyAndReturnArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEventCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookEvent.
     * @param {WebhookEventDeleteArgs} args - Arguments to delete one WebhookEvent.
     * @example
     * // Delete one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.delete({
     *   where: {
     *     // ... filter to delete one WebhookEvent
     *   }
     * })
     * 
     */
    delete<T extends WebhookEventDeleteArgs>(args: SelectSubset<T, WebhookEventDeleteArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookEvent.
     * @param {WebhookEventUpdateArgs} args - Arguments to update one WebhookEvent.
     * @example
     * // Update one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEventUpdateArgs>(args: SelectSubset<T, WebhookEventUpdateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookEvents.
     * @param {WebhookEventDeleteManyArgs} args - Arguments to filter WebhookEvents to delete.
     * @example
     * // Delete a few WebhookEvents
     * const { count } = await prisma.webhookEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEventDeleteManyArgs>(args?: SelectSubset<T, WebhookEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEventUpdateManyArgs>(args: SelectSubset<T, WebhookEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents and returns the data updated in the database.
     * @param {WebhookEventUpdateManyAndReturnArgs} args - Arguments to update many WebhookEvents.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookEventUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookEvent.
     * @param {WebhookEventUpsertArgs} args - Arguments to update or create a WebhookEvent.
     * @example
     * // Update or create a WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.upsert({
     *   create: {
     *     // ... data to create a WebhookEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEvent we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEventUpsertArgs>(args: SelectSubset<T, WebhookEventUpsertArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventCountArgs} args - Arguments to filter WebhookEvents to count.
     * @example
     * // Count the number of WebhookEvents
     * const count = await prisma.webhookEvent.count({
     *   where: {
     *     // ... the filter for the WebhookEvents we want to count
     *   }
     * })
    **/
    count<T extends WebhookEventCountArgs>(
      args?: Subset<T, WebhookEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookEventAggregateArgs>(args: Subset<T, WebhookEventAggregateArgs>): Prisma.PrismaPromise<GetWebhookEventAggregateType<T>>

    /**
     * Group by WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEventGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEvent model
   */
  readonly fields: WebhookEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEvent model
   */
  interface WebhookEventFieldRefs {
    readonly id: FieldRef<"WebhookEvent", 'String'>
    readonly updateId: FieldRef<"WebhookEvent", 'BigInt'>
    readonly rawPayload: FieldRef<"WebhookEvent", 'String'>
    readonly eventType: FieldRef<"WebhookEvent", 'String'>
    readonly fromChatId: FieldRef<"WebhookEvent", 'BigInt'>
    readonly commandText: FieldRef<"WebhookEvent", 'String'>
    readonly receivedAt: FieldRef<"WebhookEvent", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEvent findUnique
   */
  export type WebhookEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findUniqueOrThrow
   */
  export type WebhookEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findFirst
   */
  export type WebhookEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findFirstOrThrow
   */
  export type WebhookEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findMany
   */
  export type WebhookEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEvents to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent create
   */
  export type WebhookEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data needed to create a WebhookEvent.
     */
    data: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
  }

  /**
   * WebhookEvent createMany
   */
  export type WebhookEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
  }

  /**
   * WebhookEvent createManyAndReturn
   */
  export type WebhookEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
  }

  /**
   * WebhookEvent update
   */
  export type WebhookEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data needed to update a WebhookEvent.
     */
    data: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
    /**
     * Choose, which WebhookEvent to update.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent updateMany
   */
  export type WebhookEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent updateManyAndReturn
   */
  export type WebhookEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent upsert
   */
  export type WebhookEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The filter to search for the WebhookEvent to update in case it exists.
     */
    where: WebhookEventWhereUniqueInput
    /**
     * In case the WebhookEvent found by the `where` argument doesn't exist, create a new WebhookEvent with this data.
     */
    create: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
    /**
     * In case the WebhookEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
  }

  /**
   * WebhookEvent delete
   */
  export type WebhookEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Filter which WebhookEvent to delete.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent deleteMany
   */
  export type WebhookEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvents to delete
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to delete.
     */
    limit?: number
  }

  /**
   * WebhookEvent without action
   */
  export type WebhookEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LinkScalarFieldEnum: {
    playerUuid: 'playerUuid',
    telegramId: 'telegramId',
    playerName: 'playerName',
    linkedAt: 'linkedAt'
  };

  export type LinkScalarFieldEnum = (typeof LinkScalarFieldEnum)[keyof typeof LinkScalarFieldEnum]


  export const PendingLinkScalarFieldEnum: {
    code: 'code',
    playerUuid: 'playerUuid',
    playerName: 'playerName',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    status: 'status'
  };

  export type PendingLinkScalarFieldEnum = (typeof PendingLinkScalarFieldEnum)[keyof typeof PendingLinkScalarFieldEnum]


  export const OutboundMessageScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    text: 'text',
    status: 'status',
    httpStatus: 'httpStatus',
    errorBody: 'errorBody',
    createdAt: 'createdAt',
    sentAt: 'sentAt'
  };

  export type OutboundMessageScalarFieldEnum = (typeof OutboundMessageScalarFieldEnum)[keyof typeof OutboundMessageScalarFieldEnum]


  export const WebhookEventScalarFieldEnum: {
    id: 'id',
    updateId: 'updateId',
    rawPayload: 'rawPayload',
    eventType: 'eventType',
    fromChatId: 'fromChatId',
    commandText: 'commandText',
    receivedAt: 'receivedAt'
  };

  export type WebhookEventScalarFieldEnum = (typeof WebhookEventScalarFieldEnum)[keyof typeof WebhookEventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type LinkWhereInput = {
    AND?: LinkWhereInput | LinkWhereInput[]
    OR?: LinkWhereInput[]
    NOT?: LinkWhereInput | LinkWhereInput[]
    playerUuid?: StringFilter<"Link"> | string
    telegramId?: BigIntFilter<"Link"> | bigint | number
    playerName?: StringNullableFilter<"Link"> | string | null
    linkedAt?: BigIntFilter<"Link"> | bigint | number
  }

  export type LinkOrderByWithRelationInput = {
    playerUuid?: SortOrder
    telegramId?: SortOrder
    playerName?: SortOrderInput | SortOrder
    linkedAt?: SortOrder
  }

  export type LinkWhereUniqueInput = Prisma.AtLeast<{
    playerUuid?: string
    telegramId?: bigint | number
    AND?: LinkWhereInput | LinkWhereInput[]
    OR?: LinkWhereInput[]
    NOT?: LinkWhereInput | LinkWhereInput[]
    playerName?: StringNullableFilter<"Link"> | string | null
    linkedAt?: BigIntFilter<"Link"> | bigint | number
  }, "playerUuid" | "telegramId">

  export type LinkOrderByWithAggregationInput = {
    playerUuid?: SortOrder
    telegramId?: SortOrder
    playerName?: SortOrderInput | SortOrder
    linkedAt?: SortOrder
    _count?: LinkCountOrderByAggregateInput
    _avg?: LinkAvgOrderByAggregateInput
    _max?: LinkMaxOrderByAggregateInput
    _min?: LinkMinOrderByAggregateInput
    _sum?: LinkSumOrderByAggregateInput
  }

  export type LinkScalarWhereWithAggregatesInput = {
    AND?: LinkScalarWhereWithAggregatesInput | LinkScalarWhereWithAggregatesInput[]
    OR?: LinkScalarWhereWithAggregatesInput[]
    NOT?: LinkScalarWhereWithAggregatesInput | LinkScalarWhereWithAggregatesInput[]
    playerUuid?: StringWithAggregatesFilter<"Link"> | string
    telegramId?: BigIntWithAggregatesFilter<"Link"> | bigint | number
    playerName?: StringNullableWithAggregatesFilter<"Link"> | string | null
    linkedAt?: BigIntWithAggregatesFilter<"Link"> | bigint | number
  }

  export type PendingLinkWhereInput = {
    AND?: PendingLinkWhereInput | PendingLinkWhereInput[]
    OR?: PendingLinkWhereInput[]
    NOT?: PendingLinkWhereInput | PendingLinkWhereInput[]
    code?: StringFilter<"PendingLink"> | string
    playerUuid?: StringFilter<"PendingLink"> | string
    playerName?: StringNullableFilter<"PendingLink"> | string | null
    createdAt?: BigIntFilter<"PendingLink"> | bigint | number
    expiresAt?: BigIntFilter<"PendingLink"> | bigint | number
    status?: StringFilter<"PendingLink"> | string
  }

  export type PendingLinkOrderByWithRelationInput = {
    code?: SortOrder
    playerUuid?: SortOrder
    playerName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
  }

  export type PendingLinkWhereUniqueInput = Prisma.AtLeast<{
    code?: string
    AND?: PendingLinkWhereInput | PendingLinkWhereInput[]
    OR?: PendingLinkWhereInput[]
    NOT?: PendingLinkWhereInput | PendingLinkWhereInput[]
    playerUuid?: StringFilter<"PendingLink"> | string
    playerName?: StringNullableFilter<"PendingLink"> | string | null
    createdAt?: BigIntFilter<"PendingLink"> | bigint | number
    expiresAt?: BigIntFilter<"PendingLink"> | bigint | number
    status?: StringFilter<"PendingLink"> | string
  }, "code">

  export type PendingLinkOrderByWithAggregationInput = {
    code?: SortOrder
    playerUuid?: SortOrder
    playerName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    _count?: PendingLinkCountOrderByAggregateInput
    _avg?: PendingLinkAvgOrderByAggregateInput
    _max?: PendingLinkMaxOrderByAggregateInput
    _min?: PendingLinkMinOrderByAggregateInput
    _sum?: PendingLinkSumOrderByAggregateInput
  }

  export type PendingLinkScalarWhereWithAggregatesInput = {
    AND?: PendingLinkScalarWhereWithAggregatesInput | PendingLinkScalarWhereWithAggregatesInput[]
    OR?: PendingLinkScalarWhereWithAggregatesInput[]
    NOT?: PendingLinkScalarWhereWithAggregatesInput | PendingLinkScalarWhereWithAggregatesInput[]
    code?: StringWithAggregatesFilter<"PendingLink"> | string
    playerUuid?: StringWithAggregatesFilter<"PendingLink"> | string
    playerName?: StringNullableWithAggregatesFilter<"PendingLink"> | string | null
    createdAt?: BigIntWithAggregatesFilter<"PendingLink"> | bigint | number
    expiresAt?: BigIntWithAggregatesFilter<"PendingLink"> | bigint | number
    status?: StringWithAggregatesFilter<"PendingLink"> | string
  }

  export type OutboundMessageWhereInput = {
    AND?: OutboundMessageWhereInput | OutboundMessageWhereInput[]
    OR?: OutboundMessageWhereInput[]
    NOT?: OutboundMessageWhereInput | OutboundMessageWhereInput[]
    id?: StringFilter<"OutboundMessage"> | string
    telegramId?: BigIntFilter<"OutboundMessage"> | bigint | number
    text?: StringFilter<"OutboundMessage"> | string
    status?: StringFilter<"OutboundMessage"> | string
    httpStatus?: IntNullableFilter<"OutboundMessage"> | number | null
    errorBody?: StringNullableFilter<"OutboundMessage"> | string | null
    createdAt?: BigIntFilter<"OutboundMessage"> | bigint | number
    sentAt?: BigIntNullableFilter<"OutboundMessage"> | bigint | number | null
  }

  export type OutboundMessageOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    text?: SortOrder
    status?: SortOrder
    httpStatus?: SortOrderInput | SortOrder
    errorBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
  }

  export type OutboundMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OutboundMessageWhereInput | OutboundMessageWhereInput[]
    OR?: OutboundMessageWhereInput[]
    NOT?: OutboundMessageWhereInput | OutboundMessageWhereInput[]
    telegramId?: BigIntFilter<"OutboundMessage"> | bigint | number
    text?: StringFilter<"OutboundMessage"> | string
    status?: StringFilter<"OutboundMessage"> | string
    httpStatus?: IntNullableFilter<"OutboundMessage"> | number | null
    errorBody?: StringNullableFilter<"OutboundMessage"> | string | null
    createdAt?: BigIntFilter<"OutboundMessage"> | bigint | number
    sentAt?: BigIntNullableFilter<"OutboundMessage"> | bigint | number | null
  }, "id">

  export type OutboundMessageOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    text?: SortOrder
    status?: SortOrder
    httpStatus?: SortOrderInput | SortOrder
    errorBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    _count?: OutboundMessageCountOrderByAggregateInput
    _avg?: OutboundMessageAvgOrderByAggregateInput
    _max?: OutboundMessageMaxOrderByAggregateInput
    _min?: OutboundMessageMinOrderByAggregateInput
    _sum?: OutboundMessageSumOrderByAggregateInput
  }

  export type OutboundMessageScalarWhereWithAggregatesInput = {
    AND?: OutboundMessageScalarWhereWithAggregatesInput | OutboundMessageScalarWhereWithAggregatesInput[]
    OR?: OutboundMessageScalarWhereWithAggregatesInput[]
    NOT?: OutboundMessageScalarWhereWithAggregatesInput | OutboundMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OutboundMessage"> | string
    telegramId?: BigIntWithAggregatesFilter<"OutboundMessage"> | bigint | number
    text?: StringWithAggregatesFilter<"OutboundMessage"> | string
    status?: StringWithAggregatesFilter<"OutboundMessage"> | string
    httpStatus?: IntNullableWithAggregatesFilter<"OutboundMessage"> | number | null
    errorBody?: StringNullableWithAggregatesFilter<"OutboundMessage"> | string | null
    createdAt?: BigIntWithAggregatesFilter<"OutboundMessage"> | bigint | number
    sentAt?: BigIntNullableWithAggregatesFilter<"OutboundMessage"> | bigint | number | null
  }

  export type WebhookEventWhereInput = {
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    id?: StringFilter<"WebhookEvent"> | string
    updateId?: BigIntFilter<"WebhookEvent"> | bigint | number
    rawPayload?: StringFilter<"WebhookEvent"> | string
    eventType?: StringNullableFilter<"WebhookEvent"> | string | null
    fromChatId?: BigIntNullableFilter<"WebhookEvent"> | bigint | number | null
    commandText?: StringNullableFilter<"WebhookEvent"> | string | null
    receivedAt?: BigIntFilter<"WebhookEvent"> | bigint | number
  }

  export type WebhookEventOrderByWithRelationInput = {
    id?: SortOrder
    updateId?: SortOrder
    rawPayload?: SortOrder
    eventType?: SortOrderInput | SortOrder
    fromChatId?: SortOrderInput | SortOrder
    commandText?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
  }

  export type WebhookEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    updateId?: bigint | number
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    rawPayload?: StringFilter<"WebhookEvent"> | string
    eventType?: StringNullableFilter<"WebhookEvent"> | string | null
    fromChatId?: BigIntNullableFilter<"WebhookEvent"> | bigint | number | null
    commandText?: StringNullableFilter<"WebhookEvent"> | string | null
    receivedAt?: BigIntFilter<"WebhookEvent"> | bigint | number
  }, "id" | "updateId">

  export type WebhookEventOrderByWithAggregationInput = {
    id?: SortOrder
    updateId?: SortOrder
    rawPayload?: SortOrder
    eventType?: SortOrderInput | SortOrder
    fromChatId?: SortOrderInput | SortOrder
    commandText?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
    _count?: WebhookEventCountOrderByAggregateInput
    _avg?: WebhookEventAvgOrderByAggregateInput
    _max?: WebhookEventMaxOrderByAggregateInput
    _min?: WebhookEventMinOrderByAggregateInput
    _sum?: WebhookEventSumOrderByAggregateInput
  }

  export type WebhookEventScalarWhereWithAggregatesInput = {
    AND?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    OR?: WebhookEventScalarWhereWithAggregatesInput[]
    NOT?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookEvent"> | string
    updateId?: BigIntWithAggregatesFilter<"WebhookEvent"> | bigint | number
    rawPayload?: StringWithAggregatesFilter<"WebhookEvent"> | string
    eventType?: StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
    fromChatId?: BigIntNullableWithAggregatesFilter<"WebhookEvent"> | bigint | number | null
    commandText?: StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
    receivedAt?: BigIntWithAggregatesFilter<"WebhookEvent"> | bigint | number
  }

  export type LinkCreateInput = {
    playerUuid: string
    telegramId: bigint | number
    playerName?: string | null
    linkedAt: bigint | number
  }

  export type LinkUncheckedCreateInput = {
    playerUuid: string
    telegramId: bigint | number
    playerName?: string | null
    linkedAt: bigint | number
  }

  export type LinkUpdateInput = {
    playerUuid?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    playerName?: NullableStringFieldUpdateOperationsInput | string | null
    linkedAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type LinkUncheckedUpdateInput = {
    playerUuid?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    playerName?: NullableStringFieldUpdateOperationsInput | string | null
    linkedAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type LinkCreateManyInput = {
    playerUuid: string
    telegramId: bigint | number
    playerName?: string | null
    linkedAt: bigint | number
  }

  export type LinkUpdateManyMutationInput = {
    playerUuid?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    playerName?: NullableStringFieldUpdateOperationsInput | string | null
    linkedAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type LinkUncheckedUpdateManyInput = {
    playerUuid?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    playerName?: NullableStringFieldUpdateOperationsInput | string | null
    linkedAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type PendingLinkCreateInput = {
    code: string
    playerUuid: string
    playerName?: string | null
    createdAt: bigint | number
    expiresAt: bigint | number
    status?: string
  }

  export type PendingLinkUncheckedCreateInput = {
    code: string
    playerUuid: string
    playerName?: string | null
    createdAt: bigint | number
    expiresAt: bigint | number
    status?: string
  }

  export type PendingLinkUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    playerUuid?: StringFieldUpdateOperationsInput | string
    playerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: BigIntFieldUpdateOperationsInput | bigint | number
    expiresAt?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PendingLinkUncheckedUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    playerUuid?: StringFieldUpdateOperationsInput | string
    playerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: BigIntFieldUpdateOperationsInput | bigint | number
    expiresAt?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PendingLinkCreateManyInput = {
    code: string
    playerUuid: string
    playerName?: string | null
    createdAt: bigint | number
    expiresAt: bigint | number
    status?: string
  }

  export type PendingLinkUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    playerUuid?: StringFieldUpdateOperationsInput | string
    playerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: BigIntFieldUpdateOperationsInput | bigint | number
    expiresAt?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PendingLinkUncheckedUpdateManyInput = {
    code?: StringFieldUpdateOperationsInput | string
    playerUuid?: StringFieldUpdateOperationsInput | string
    playerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: BigIntFieldUpdateOperationsInput | bigint | number
    expiresAt?: BigIntFieldUpdateOperationsInput | bigint | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type OutboundMessageCreateInput = {
    id?: string
    telegramId: bigint | number
    text: string
    status?: string
    httpStatus?: number | null
    errorBody?: string | null
    createdAt: bigint | number
    sentAt?: bigint | number | null
  }

  export type OutboundMessageUncheckedCreateInput = {
    id?: string
    telegramId: bigint | number
    text: string
    status?: string
    httpStatus?: number | null
    errorBody?: string | null
    createdAt: bigint | number
    sentAt?: bigint | number | null
  }

  export type OutboundMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    text?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    httpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    errorBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: BigIntFieldUpdateOperationsInput | bigint | number
    sentAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type OutboundMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    text?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    httpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    errorBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: BigIntFieldUpdateOperationsInput | bigint | number
    sentAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type OutboundMessageCreateManyInput = {
    id?: string
    telegramId: bigint | number
    text: string
    status?: string
    httpStatus?: number | null
    errorBody?: string | null
    createdAt: bigint | number
    sentAt?: bigint | number | null
  }

  export type OutboundMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    text?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    httpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    errorBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: BigIntFieldUpdateOperationsInput | bigint | number
    sentAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type OutboundMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    text?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    httpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    errorBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: BigIntFieldUpdateOperationsInput | bigint | number
    sentAt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
  }

  export type WebhookEventCreateInput = {
    id?: string
    updateId: bigint | number
    rawPayload: string
    eventType?: string | null
    fromChatId?: bigint | number | null
    commandText?: string | null
    receivedAt: bigint | number
  }

  export type WebhookEventUncheckedCreateInput = {
    id?: string
    updateId: bigint | number
    rawPayload: string
    eventType?: string | null
    fromChatId?: bigint | number | null
    commandText?: string | null
    receivedAt: bigint | number
  }

  export type WebhookEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    updateId?: BigIntFieldUpdateOperationsInput | bigint | number
    rawPayload?: StringFieldUpdateOperationsInput | string
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    fromChatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    commandText?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type WebhookEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    updateId?: BigIntFieldUpdateOperationsInput | bigint | number
    rawPayload?: StringFieldUpdateOperationsInput | string
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    fromChatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    commandText?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type WebhookEventCreateManyInput = {
    id?: string
    updateId: bigint | number
    rawPayload: string
    eventType?: string | null
    fromChatId?: bigint | number | null
    commandText?: string | null
    receivedAt: bigint | number
  }

  export type WebhookEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    updateId?: BigIntFieldUpdateOperationsInput | bigint | number
    rawPayload?: StringFieldUpdateOperationsInput | string
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    fromChatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    commandText?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type WebhookEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    updateId?: BigIntFieldUpdateOperationsInput | bigint | number
    rawPayload?: StringFieldUpdateOperationsInput | string
    eventType?: NullableStringFieldUpdateOperationsInput | string | null
    fromChatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    commandText?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LinkCountOrderByAggregateInput = {
    playerUuid?: SortOrder
    telegramId?: SortOrder
    playerName?: SortOrder
    linkedAt?: SortOrder
  }

  export type LinkAvgOrderByAggregateInput = {
    telegramId?: SortOrder
    linkedAt?: SortOrder
  }

  export type LinkMaxOrderByAggregateInput = {
    playerUuid?: SortOrder
    telegramId?: SortOrder
    playerName?: SortOrder
    linkedAt?: SortOrder
  }

  export type LinkMinOrderByAggregateInput = {
    playerUuid?: SortOrder
    telegramId?: SortOrder
    playerName?: SortOrder
    linkedAt?: SortOrder
  }

  export type LinkSumOrderByAggregateInput = {
    telegramId?: SortOrder
    linkedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type PendingLinkCountOrderByAggregateInput = {
    code?: SortOrder
    playerUuid?: SortOrder
    playerName?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
  }

  export type PendingLinkAvgOrderByAggregateInput = {
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type PendingLinkMaxOrderByAggregateInput = {
    code?: SortOrder
    playerUuid?: SortOrder
    playerName?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
  }

  export type PendingLinkMinOrderByAggregateInput = {
    code?: SortOrder
    playerUuid?: SortOrder
    playerName?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
  }

  export type PendingLinkSumOrderByAggregateInput = {
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type OutboundMessageCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    text?: SortOrder
    status?: SortOrder
    httpStatus?: SortOrder
    errorBody?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type OutboundMessageAvgOrderByAggregateInput = {
    telegramId?: SortOrder
    httpStatus?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type OutboundMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    text?: SortOrder
    status?: SortOrder
    httpStatus?: SortOrder
    errorBody?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type OutboundMessageMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    text?: SortOrder
    status?: SortOrder
    httpStatus?: SortOrder
    errorBody?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type OutboundMessageSumOrderByAggregateInput = {
    telegramId?: SortOrder
    httpStatus?: SortOrder
    createdAt?: SortOrder
    sentAt?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type WebhookEventCountOrderByAggregateInput = {
    id?: SortOrder
    updateId?: SortOrder
    rawPayload?: SortOrder
    eventType?: SortOrder
    fromChatId?: SortOrder
    commandText?: SortOrder
    receivedAt?: SortOrder
  }

  export type WebhookEventAvgOrderByAggregateInput = {
    updateId?: SortOrder
    fromChatId?: SortOrder
    receivedAt?: SortOrder
  }

  export type WebhookEventMaxOrderByAggregateInput = {
    id?: SortOrder
    updateId?: SortOrder
    rawPayload?: SortOrder
    eventType?: SortOrder
    fromChatId?: SortOrder
    commandText?: SortOrder
    receivedAt?: SortOrder
  }

  export type WebhookEventMinOrderByAggregateInput = {
    id?: SortOrder
    updateId?: SortOrder
    rawPayload?: SortOrder
    eventType?: SortOrder
    fromChatId?: SortOrder
    commandText?: SortOrder
    receivedAt?: SortOrder
  }

  export type WebhookEventSumOrderByAggregateInput = {
    updateId?: SortOrder
    fromChatId?: SortOrder
    receivedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}