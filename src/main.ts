import getChar from "./table"
import rollDice from "./dice"

function makePassword(): void {
    const lengthInput = document.getElementById("length") as HTMLInputElement
    const displayInput = document.getElementById("generatedPassword") as HTMLInputElement
    
    const len: number = lengthInput ? parseInt(lengthInput.value) : 0
    let pass: string = ""

    if (len <= 5 || len > 64) {
        updateDisplay(displayInput, "Invalid value")
        return
    }

    for (let i = 0; i < len; i++) {
        let char: string | undefined = "\0"
        
        while (!char || char === "\0" || char === " ") {
            const table = (rollDice() % 2) + 1
            const row = rollDice()
            const col = rollDice()
            char = getChar(table, row, col)
        }
        pass += char
    }

    if (displayInput) {
        updateDisplay(displayInput, pass)
    }
}

const updateDisplay = (display: HTMLInputElement, value: string) => {
    display.value = value
}

const btn = document.getElementById("generateButton");
btn?.addEventListener("click", makePassword);