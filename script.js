
function calculateArmStitches() {
    const totalStitches = Number(document.getElementById("total-stitches").value);
    const maxStitches = Number(document.getElementById("max-stitches").value);
    const checkbox = document.getElementById("even-number");

    //Calculate amount of sections
    const sections = Math.ceil(totalStitches/maxStitches);
    if (checkbox.checked && sections % 2 !==0) {
        sections +=1;
    }


}