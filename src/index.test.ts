/*!
 * deep-aplus <https://github.com/nknapp/deep-aplus>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

import { describe, it, expect } from "vitest";

import { deepAplus } from "./index.js";

function delay<T>(value: T, delayMs = 1): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delayMs));
}

describe("deep-aplus:", async () => {
  it("simpleObject", async () => {
    const result: { a: string; b: string } = await deepAplus({
      a: "a",
      b: delay("b"),
    });
    expect(result).toEqual({
      a: "a",
      b: "b",
    });
  });

  it("nestedObject", async () => {
    expect(
      await deepAplus({
        a: "a",
        b: { c: delay("c") },
      }),
    ).toEqual({
      a: "a",
      b: { c: "c" },
    });
  });

  it("nestedObjectPromise", async () => {
    expect(
      await deepAplus({
        a: "a",
        b: delay({ c: delay("c", 2) }),
      }),
    ).toEqual({
      a: "a",
      b: { c: "c" },
    });
  });

  it("simpleArray", async () => {
    expect(await deepAplus(["a", delay("b")])).toEqual(["a", "b"]);
  });

  it("nestedArray", async () => {
    expect(await deepAplus(["a", [delay("b")]])).toEqual(["a", ["b"]]);
  });

  it("nestedArrayPromise", async () => {
    expect(await deepAplus(["a", delay(["b", delay("c", 2)])])).toEqual([
      "a",
      ["b", "c"],
    ]);
  });
  it("nestedObjectInArray", async () => {
    expect(
      await deepAplus([
        "a",
        delay({
          b: "b",
          c: delay("c", 2),
        }),
      ]),
    ).toEqual(["a", { b: "b", c: "c" }]);
  });

  it("nestedArrayInObject", async () => {
    expect(
      await deepAplus([
        "a",
        delay({
          a: "a",
          b: delay(["b", delay("c", 2)]),
        }),
      ]),
    ).toEqual(["a", { a: "a", b: ["b", "c"] }]);
  });

  it("number", async () => {
    expect(await deepAplus(2)).toEqual(2);
  });
  it("arrayWithoutPromise", async () => {
    expect(await deepAplus([2, 3])).toEqual([2, 3]);
  });
  it("promise", async () => {
    expect(await deepAplus(delay(2))).toEqual(2);
  });
  it("promiseWithNestedStuff", async () => {
    expect(
      await deepAplus([
        [
          "a",
          delay({
            b: "b",
            c: delay("c", 2),
          }),
        ],
        {
          a: "a",
          b: delay(["b", delay("c", 2)]),
        },
      ]),
    ).toEqual([["a", { b: "b", c: "c" }], { a: "a", b: ["b", "c"] }]);
  });

  it("should reject the promise if any promise inside the structure is rejected", async () => {
    const input = {
      a: "a",
      b: delay("b").then(async () => {
        throw new Error("Intented error");
      }),
    };
    await expect(deepAplus(input)).rejects.toThrow();
  });

  it("should handle empty arrays correctly", async () => {
    expect(await deepAplus([])).toEqual([]);
  });

  it("should handle empty objects correctly", async () => {
    expect(await deepAplus({})).toEqual({});
  });

  it("should not interfere with the inner workings of classes", async () => {
    class TestClass {
      promise: Promise<"a"> = Promise.resolve("a");
      someFunction() {}
    }
    const input = {
      a: delay(new TestClass()),
    };
    const result = await deepAplus(input);
    expect(result.a.someFunction).toBeInstanceOf(Function);
    expect(result.a.promise).toBeInstanceOf(Promise);
  });
});

