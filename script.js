document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    const pages = {
        "stitch-pickup": `
            <h2>Arm stitch calculator</h2>
            <form id="arm-stitch-form" class="row g-2 was-validated" novalidate>

            <!-- Total stitches to be picked up -->
            <div class="col-sm-3">
                <label for="total-stitches" class="form-label">Total stitches to be picked up</label>
                <input type="number" id="total-stitches" class="form-control input-field w-100" min="10" max="300" required>
                <div class="invalid-feedback">Please enter an amount between 10 and 300.</div>
            </div>

            <!-- Max stitches between markers -->
            <div class="col-sm-3">
                <label for="max-stitches" class="form-label">Max stitches between markers</label>
                <input type="number" id="max-stitches" class="form-control input-field w-100" value="11" min="5" max="15" required>
                <div class="invalid-feedback">Please enter an amount between 5 and 15.</div>
            </div>

            <!-- Button to calculate-->
            <div class="col-sm-12">
                <button type="button" id="calculate-button" class="btn btn-primary">Calculate</button>
            </div>

            <!-- Checkbox for even number of sections-->
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="even-number" name="even" value="something">
                <label class="form-check-label">Do you prefer an even number of</label>
            </div>

            </form>

            <div id="result-container" class="container mt-2">
                <!-- Result box-->
                <div id="result-box" class="card  w-100">
                    <div class="card-body">
                        <h6 class="card-subtitle text-muted">Amount of markers:</h6>
                        <p id="amount-of-markers"></p>
                        <h6 class="card-subtitle text-muted">Stitches between markers:</h6>
                        <p id="stitch-counts"></p>
                    </div>
                </div>
            </div>
        `
        ,

        "about": `
            <div id="about" class="container-fluid">
               <h2>About me</h2>
             </div>
        `
    };

    //Handling navigation
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = e.target.getAttribute("data-page");
            content.innerHTML = pages[page] || `<p>Page not found</p>`
            if (page === "stitch-pickup") {
                setupStitchPickup();
            }
        });
    });

    function setupStitchPickup() {
        const button = document.getElementById("calculate-button")
        button.addEventListener("click", () => {
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
        });
    }
});

