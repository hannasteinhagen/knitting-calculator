document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    const pages = {
        "stitch-pickup": `
            <h2>Picking up stitches evenly</h2>

            <p>
                <a class="btn btn btn-outline-primary" data-bs-toggle="collapse" href="#how-to" role="button" aria-expanded="false" aria-controls="how-to">How to use</a>
            </p>


            <div id="how-to" class="collapse">
                <div class="col-sm-6">
                    When picking up a larger amount of stitches I find it helps to divide the edge you're picking up from into smaller sections. 
                    This calculator can help you with that process. Just enter the total number of stitches you're going to pick up and the length of your
                    edge if you like to know the length of each section. It doesn't matter which unit your length input is - the output will be in the same unit.
                    When working in the round, it might be handier to have an even number of sections, 
                    so that you only have to measure one half of your edge.
                </div>
            </div>


            <form id="stitch-pickup-form" class="row g-2 was-validated mt-2" novalidate>
            
                <!-- length -->
                <div class="col-sm-2">
                    <label for="length" class="form-label">Length of your edge</label>
                    <input type="number" step="0.1" id="length" class="form-control input-field w-100 min="1">
                </div>

                <!-- Total stitches to be picked up -->
                <div class="col-sm-2">
                    <label for="total-stitches" class="form-label">Total stitches</label>
                    <input type="number" id="total-stitches" class="form-control input-field w-100" min="10" max="300" required>
                    <div class="invalid-feedback">Please enter an amount between 10 and 300.</div>
                </div>

                <!-- Checkbox for even number of sections-->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="even-number" name="even" value="something">
                        <label class="form-check-label">Do you prefer an even number of sections?</label>
                    </div>

                <!-- Button to calculate-->
                <div class="col-sm-12">
                    <button type="button" id="calculate-button" class="btn btn-primary">Calculate</button>
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
                        <h6 class="card-subtitle text-muted">Length per section:</h6>
                        <p id="length-per-section"></p>
                    </div>
                </div>
            </div>
        `
        ,

        "about": `
            <div id="about" class="container-fluid">
                <h2>About me</h2>
                <div id="abut-me-card" class="card">
                    <div class="card-body">
                        <p class="card-text">
                            My name is Hanna and I live in Trondheim, Norway. I recently started coding a bit and this is one of my first projects. 
                            If you have any type of feedback or requests for calculators I could add here, feel free to head over to my Instagram: 
                        </p>
                        <a href="https://www.instagram.com/norveganknitting/" target="_blank">@norveganknitting</a>
                    </div>

                </div>
             </div>
        `
    };

    //Default page
    const defaultPage = "about";
    content.innerHTML = pages[defaultPage];

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
            const checkbox = document.getElementById("even-number");
            const length = document.getElementById("length").value;
            const minPerSection = 6;
            const maxPerSection = 11;

            //Find possible interval for #sections
            const minSections = Math.ceil(totalStitches/maxPerSection);
            const maxSections = Math.floor(totalStitches/minPerSection);

            let bestDistribution = null;
            let minDeviation = Infinity;

            for (let numSections = minSections; numSections <= maxSections; numSections++) {
                //Continue to next iteration if checkbox is checked and sections is odd amount
                if (checkbox && numSections % 2 !== 0) {
                    continue;
                }

                //Calculate leftover stitches
                const leftoverStitches = totalStitches % numSections;

                if (leftoverStitches == 0) {
                    break;
                }

                else if (leftoverStitches < minDeviation) {
                    bestDistribution = numSections;
                    minDeviation = leftoverStitches;
                }
            
            }

            //Array for stitch distribution
            let sections = new Array(bestDistribution);
            for (let i = 0; i < bestDistribution; i++) {
                sections[i] = Math.floor(totalStitches / bestDistribution);
            }
            
            //Distribute leftover stitches
            const step = Math.floor(bestDistribution / minDeviation);
            let index = 0;

            for (let i = 0; i < minDeviation; i++) {
                sections[index]++;
                index += step;
            }

            //Turn sections array into string
            let StitchAmountString = "";
            for (let i = 0; i < sections.length; i++) {
                StitchAmountString += sections[i] + " ";
            }

            //Add number of markers to card
            document.getElementById("amount-of-markers").innerHTML = bestDistribution;
            //Add stitch amounts to card
            document.getElementById("stitch-counts").innerHTML = StitchAmountString;
            //Add length per section
            document.getElementById("length-per-section").innerHTML = (length / bestDistribution).toFixed(2);
        });
    }
});

