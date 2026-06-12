type CharsetPool = {
    enabled: boolean
    chars: string
    min: number
}

const charsets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    special: "!@#$%^&*"
} as const

function parseNumberInput(element: HTMLInputElement | null, fallback: number): number {
    const value = Number.parseInt(element?.value ?? "", 10)
    return Number.isFinite(value) ? value : fallback
}

function getRandomInt(max: number): number {
    const array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    return array[0] % max
}

function pickRandomChar(chars: string): string {
    return chars[getRandomInt(chars.length)]
}

function shuffle<T>(items: T[]): T[] {
    const shuffled = [...items]

    for (let index = shuffled.length - 1; index > 0; index--) {
        const swapIndex = getRandomInt(index + 1)
        const current = shuffled[index]
        shuffled[index] = shuffled[swapIndex]
        shuffled[swapIndex] = current
    }

    return shuffled
}

function makePassword(): void {
    const lengthInput = document.getElementById("length") as HTMLInputElement
    const displayInput = document.getElementById("generatedPassword") as HTMLInputElement

    const len: number = parseNumberInput(lengthInput, 0)
    const pools: CharsetPool[] = [
        {
            enabled: Boolean((document.getElementById("useUpper") as HTMLInputElement)?.checked),
            chars: charsets.uppercase,
            min: 0
        },
        {
            enabled: Boolean((document.getElementById("useLower") as HTMLInputElement)?.checked),
            chars: charsets.lowercase,
            min: 0
        },
        {
            enabled: Boolean((document.getElementById("useNum") as HTMLInputElement)?.checked),
            chars: charsets.numbers,
            min: parseNumberInput(document.getElementById("minNum") as HTMLInputElement, 0)
        },
        {
            enabled: Boolean((document.getElementById("useSpecial") as HTMLInputElement)?.checked),
            chars: charsets.special,
            min: parseNumberInput(document.getElementById("minSpecial") as HTMLInputElement, 0)
        }
    ]

    const activePools = pools.filter((pool) => pool.enabled)

    if (activePools.length === 0) {
        updateDisplay(displayInput, "Select at least one charset")
        return
    }

    const requiredChars = activePools.flatMap((pool) => Array.from({ length: pool.min }, () => pickRandomChar(pool.chars)))
    const requiredLength = requiredChars.length

    if (len < requiredLength || len > 128) {
        updateDisplay(displayInput, "Invalid value")
        return
    }

    const availableChars = activePools.map((pool) => pool.chars).join("")
    const remainingLength = len - requiredLength
    const passwordChars = [
        ...requiredChars,
        ...Array.from({ length: remainingLength }, () => pickRandomChar(availableChars))
    ]

    updateDisplay(displayInput, shuffle(passwordChars).join(""))
}

const updateDisplay = (display: HTMLInputElement, value: string) => {
    display.value = value
}

const btn = document.getElementById("generateButton")
btn?.addEventListener("click", makePassword)