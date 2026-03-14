let slider = document.getElementById("length") as HTMLInputElement
let output = document.getElementById("lengthOutput") as HTMLSpanElement

output.innerHTML = slider.value

slider.oninput = () => {
    output.innerHTML = slider.value
}