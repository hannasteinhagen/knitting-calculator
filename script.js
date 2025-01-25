const button = document.getElementById("calculate-button")

function calculateArmStitches() {
    const totalStitches = Number(document.getElementById("total-stitches").value);
    const maxStitches = Number(document.getElementById("max-stitches").value);
    const checkbox = document.getElementById("even-number");

    //Calculate amount of sections
    const sectionAmount = Math.ceil(totalStitches/maxStitches) + (checkbox.checked && Math.ceil(totalStitches/maxStitches) % 2 !== 0 ? 1 : 0);

    //Add number of markers to card
    document.getElementById("amount-of-markers").innerHTML = sectionAmount;

    //Calculating number of stitches per section
    const startingValue = Math.floor(totalStitches/sectionAmount);
    let remainingStitches = totalStitches - (startingValue * sectionAmount);
    const sections = new Array(sectionAmount);
    for (let i = 0; i < sectionAmount; i++) {
        sections[i] = startingValue;
    }

    let index = 0;
    while (remainingStitches != 0) {
        sections[index] += 1;
        remainingStitches -= 1;
        index += 1;
    }

    //Turn section-array into string
    let StitchAmountString = "";
    for (let i= 0; i < sections.length; i++) {
        StitchAmountString += `${sections[i]} `;
    }

    //Add stitch amounts to card
    document.getElementById("stitch-counts").innerHTML = StitchAmountString;

}

//Event listener for button
button.addEventListener("click", calculateArmStitches);