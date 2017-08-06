import { foo } from "../src/index"

describe("foo", () => {
  it("returns foo", () => {
    expect(foo()).toEqual('bar')
  })
})
