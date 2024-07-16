import { describe, expectTypeOf, it } from "vitest";
import { ResolvePromises } from "./index";

describe("typechecks", () => {
  it("promise", () => {
    expectTypeOf<ResolvePromises<Promise<"a">>>().toEqualTypeOf<"a">();
  });

  it("promises in object", () => {
    expectTypeOf<
      ResolvePromises<{ a: Promise<"a">; b: Promise<"b"> }>
    >().toEqualTypeOf<{ a: "a"; b: "b" }>();
  });

  it("promises in array", () => {
    expectTypeOf<ResolvePromises<[Promise<"a">, Promise<"b">]>>().toEqualTypeOf<
      ["a", "b"]
    >();
  });

  it("nested promises", () => {
    expectTypeOf<ResolvePromises<Promise<Promise<"a">>>>().toEqualTypeOf<"a">();
  });

  it("arrays", () => {
    expectTypeOf<ResolvePromises<Array<Promise<"a">>>>().toEqualTypeOf<"a"[]>();
  });
  it("complex", () => {
    type Complex = {
      a: "a";
      b: Promise<{
        c: Promise<"d">;
      }>;
    };
    expectTypeOf<ResolvePromises<Complex>>().toEqualTypeOf<{
      a: "a";
      b: { c: "d" };
    }>();
  });
});
