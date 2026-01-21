// Zorgt voor schone start per bezoek
localStorage.clear();

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const nextButtons = document.querySelectorAll(".next-btn");
  const backButtons = document.querySelectorAll(".back-btn");

  let currentStep = 0;

  function showStep(index) {
    steps.forEach(step => step.classList.remove("active"));
    steps[index].classList.add("active");
  }

  // VOLGENDE
  nextButtons.forEach(button => {
    button.addEventListener("click", () => {

      if (currentStep === 0) saveStep1Answers();
      if (currentStep === 2) saveReflection();
      if (currentStep === 3) saveStep4Answers();

      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }

      if (currentStep === steps.length - 1) {
        loadResults();
      }
    });
  });

  // TERUG
  backButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });
    // ---------- RANDOMIZER (SLOTMACHINE) ----------

  const profileOptions = {
  gender: [
    'Vrouw',
    'Man',
    'Non-binair',
    'Genderfluïde',
    'Intersekse'
],
  orientation: [
    'Heteroseksueel',
    'Queer',
    'Biseksueel',
    'Panseksueel',
    'Aseksueel'
],
  lifephase: [
    'Tussen 20-29',
    'Tussen 30-39',
    'Tussen 40-49',
    'Tussen 50-59',
    'Tussen 60-65',
    'Boven de 65'
],
  ethnicity: [
    'Turks, geboren in Turkije, opgegroeid in Nederland',
    'Fries, geboren en opgegroeid in Friesland',
    'Indisch, vader geboren in Nederlands-Indië, moeder Nederlands',
    'Afro-Surinaams, geboren in Surname, met ouders geëmigreerd naar Nederland',
    'Irakees, geboren in Irak, met ouders gevlucht naar Nederland',
    'Duits, geboren en opgegroeid in duitsland, verhuisd naar Nederland'
],
  vision: [
    'Moslima, bewust een hoofddoek, eet halal en bid 5x per dag',
    'Actief bij Extinction Rebellion',
    'Politiek actief voor de PVV',
    'Atheïstisch',
    'Conservatief en behoudend',
    'Vrijwilliger bij vluchtelingenwerk'
],
  ability: [
    'Burn out gehad en aan het opbouwen',
    'Sinds een ongeluk in een rolstoel',
    'Kampt met behoorlijk gehoorverlies',
    'Last van toennemend gezichtsverlies',
    'Regelmatig epeleptische aanvallen',
    'hoogsensitief'
],
   class: [
    'Kind uit een academisch gezin',
    'Opgegroeid op een boerenbedrijf',
    'Ouders beide gewerkt in een textielfabriek',
    'Opgegroeid in een onderwijs familie',
    'De enige in de familie die heeft gestudeerd',
    'Opgegroeid met alleenstaande moeder in de bijstand'
]
  };

  const randomButtons = document.querySelectorAll(".random-btn");

  randomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.key;
      const resultEl = document.getElementById(`${key}-result`);
      const options = profileOptions[key];

      let counter = 0;

      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * options.length);
        resultEl.textContent = options[randomIndex];
        counter++;
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * options.length);
        resultEl.textContent = options[finalIndex];
      }, 1200);
    });
  });
});

// ---------- OPSLAAN FUNCTIES ----------

function saveStep1Answers() {
  localStorage.setItem("q1", document.getElementById("q1").value);
  localStorage.setItem("q2", document.getElementById("q2").value);
  localStorage.setItem("q3", document.getElementById("q3").value);
}

function saveReflection() {
  localStorage.setItem("reflection", document.getElementById("reflection").value);
}

function saveStep4Answers() {
  localStorage.setItem("end-q1", document.getElementById("end-q1").value);
  localStorage.setItem("end-q2", document.getElementById("end-q2").value);
  localStorage.setItem("end-q3", document.getElementById("end-q3").value);
}

function loadResults() {
  document.getElementById("before-q1").textContent = localStorage.getItem("q1") || "";
  document.getElementById("before-q2").textContent = localStorage.getItem("q2") || "";
  document.getElementById("before-q3").textContent = localStorage.getItem("q3") || "";

  document.getElementById("after-q1").textContent = localStorage.getItem("end-q1") || "";
  document.getElementById("after-q2").textContent = localStorage.getItem("end-q2") || "";
  document.getElementById("after-q3").textContent = localStorage.getItem("end-q3") || "";
}
// ---------- PDF DOWNLOAD ----------

const downloadBtn = document.getElementById("download-pdf");

if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const element = document.getElementById("pdf-content");
    const hiddenElements = document.querySelectorAll(".no-pdf");

    // Verberg elementen die niet in de PDF mogen
    hiddenElements.forEach(el => {
      el.style.display = "none";
    });

    const options = {
      margin: 10,
      filename: "reflectie-overzicht.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        // Toon elementen weer
        hiddenElements.forEach(el => {
          el.style.display = "";
        });
      });
  });
}
