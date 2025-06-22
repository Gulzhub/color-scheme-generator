const colorForm = document.getElementById("controls");

colorForm.addEventListener("submit", fetchColors);

function fetchColors(e) {
  e.preventDefault();

  const inputColor = document.getElementById("color").value;
  const inputScheme = document.getElementById("scheme").value;

  let colorValues = document.querySelectorAll("p.color-code");
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${inputColor.slice(
      1
    )}&format=json&mode=${inputScheme.toLowerCase()}&count=5`,
    { method: "GET" }
  )
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < 5; i++) {
        // const colorStrip
        const hexValue = data.colors[i].hex.value;
        document.getElementById(`color-${i + 1}`).style.backgroundColor =
          hexValue;
        colorValues[i].textContent = hexValue;
      }
    });
  attachCopyEvents();
}

function attachCopyEvents() {
  let colorValues = document.querySelectorAll("p.color-code");
  colorValues.forEach((el) => {
    el.addEventListener("click", () => {
      const hex = el.textContent;

      // Copy to clipboard
      navigator.clipboard.writeText(hex).then(() => {
        el.textContent = "Copied!";
        setTimeout(() => {
          el.textContent = hex;
        }, 1000);
      });
    });
  });
}
