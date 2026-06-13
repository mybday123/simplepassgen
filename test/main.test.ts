import { describe, it, expect, afterEach, beforeEach } from "vitest"
import {
    parseNumberInput,
    pickRandomChar,
    shuffle,
    countMatches,
    isPasswordValid,
    syncMinimumFields,
    makePassword,
    type CharsetPool
} from "../src/main"

describe("parseNumberInput", () => {
    it("returns the parsed number when the value is valid", () => {
        const el = document.createElement("input")
        el.value = "12"

        expect(parseNumberInput(el, 5)).toBe(12)
    })

    it("returns the fallback when the value is empty", () => {
        const el = document.createElement("input")
        el.value = ""

        expect(parseNumberInput(el, 5)).toBe(5)
    })

    it("returns the fallback when the value is not a number", () => {
        const el = document.createElement("input")
        el.value = "abc"

        expect(parseNumberInput(el, 5)).toBe(5)
    })

    it("returns the fallback when the element is null", () => {
        expect(parseNumberInput(null, 7)).toBe(7)
    })
})

describe("countMatches", () => {
    it("counts how many characters in value exist in chars", () => {
        expect(countMatches("a1b2!", "0123456789")).toBe(2)
    })

    it("returns 0 when there are no matching characters", () => {
        expect(countMatches("abcde", "0123456789")).toBe(0)
    })
})

describe("isPasswordValid", () => {
    const numberPool: CharsetPool = { enabled: true, chars: "0123456789", min: 2 }
    const specialPool: CharsetPool = { enabled: true, chars: "!@#$%^&*", min: 1 }
    const disabledPool: CharsetPool = { enabled: false, chars: "0123456789", min: 5 }

    it("returns true when every enabled pool meets its minimum", () => {
        expect(isPasswordValid("Ab12!cd", [numberPool, specialPool])).toBe(true)
    })

    it("returns false when an enabled pool does not meet its minimum", () => {
        expect(isPasswordValid("Ab1!cd", [numberPool, specialPool])).toBe(false)
    })

    it("ignores pools that are disabled", () => {
        expect(isPasswordValid("Ab12!cd", [numberPool, specialPool, disabledPool])).toBe(true)
    })
})

describe("shuffle", () => {
    it("returns an array with the same elements (multiset equality)", () => {
        const input = [1, 2, 3, 4, 5]
        const result = shuffle(input)

        expect(result).toHaveLength(input.length)
        expect([...result].sort()).toEqual([...input].sort())
    })

    it("does not mutate the original array", () => {
        const input = [1, 2, 3]
        shuffle(input)

        expect(input).toEqual([1, 2, 3])
    })
})

describe("pickRandomChar", () => {
    const originalGetRandomValues = globalThis.crypto.getRandomValues

    afterEach(() => {
        globalThis.crypto.getRandomValues = originalGetRandomValues
    })

    it("picks the character at the index returned by the RNG", () => {
        globalThis.crypto.getRandomValues = ((array: Uint32Array) => {
            array[0] = 1
            return array
        }) as typeof globalThis.crypto.getRandomValues

        // chars.length === 4, mocked RNG returns 1 % 4 === 1 -> index 1 -> "b"
        expect(pickRandomChar("abcd")).toBe("b")
    })
})

describe("syncMinimumFields", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input type="checkbox" id="useNum" />
            <input type="checkbox" id="useSpecial" />
            <input type="number" id="minNum" />
            <input type="number" id="minSpecial" />
        `
    })

    it("disables minNum when useNum is unchecked", () => {
        const useNum = document.getElementById("useNum") as HTMLInputElement
        const minNum = document.getElementById("minNum") as HTMLInputElement

        useNum.checked = false
        syncMinimumFields()

        expect(minNum.disabled).toBe(true)
    })

    it("enables minNum when useNum is checked", () => {
        const useNum = document.getElementById("useNum") as HTMLInputElement
        const minNum = document.getElementById("minNum") as HTMLInputElement

        useNum.checked = true
        syncMinimumFields()

        expect(minNum.disabled).toBe(false)
    })
})

describe("makePassword", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input type="number" id="length" value="10" />
            <input type="text" id="generatedPassword" />
            <input type="checkbox" id="useUpper" checked />
            <input type="checkbox" id="useLower" checked />
            <input type="checkbox" id="useNum" />
            <input type="checkbox" id="useSpecial" />
            <input type="number" id="minNum" value="0" />
            <input type="number" id="minSpecial" value="0" />
        `
    })

    it("generates a password with the requested length", () => {
        makePassword()

        const result = document.getElementById("generatedPassword") as HTMLInputElement
        expect(result.value).toHaveLength(10)
    })

    it("generates a password that satisfies the active charset rules", () => {
        const useNum = document.getElementById("useNum") as HTMLInputElement
        const minNum = document.getElementById("minNum") as HTMLInputElement

        useNum.checked = true
        minNum.value = "2"

        makePassword()

        const result = document.getElementById("generatedPassword") as HTMLInputElement
        expect(countMatches(result.value, "0123456789")).toBeGreaterThanOrEqual(2)
    })

    it("shows an error message when no charset is selected", () => {
        const useUpper = document.getElementById("useUpper") as HTMLInputElement
        const useLower = document.getElementById("useLower") as HTMLInputElement

        useUpper.checked = false
        useLower.checked = false

        makePassword()

        const result = document.getElementById("generatedPassword") as HTMLInputElement
        expect(result.value).toBe("Select at least one charset")
    })
})