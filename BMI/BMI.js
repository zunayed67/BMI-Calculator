let currentUnits = "metric";

function setUnits(units) {
  currentUnits = units;
  document.querySelectorAll(".unit-option").forEach((option) => {
    option.classList.remove("active");
  });
  event.target.classList.add("active");

  const weightUnit = document.getElementById("weightUnit");
  const heightUnit = document.getElementById("heightUnit");
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");

  if (units === "metric") {
    weightUnit.textContent = "kg";
    heightUnit.textContent = "cm";
    weightInput.placeholder = "Enter weight in kg";
    heightInput.placeholder = "Enter height in cm";
  } else {
    weightUnit.textContent = "lbs";
    heightUnit.textContent = "in";
    weightInput.placeholder = "Enter weight in lbs";
    heightInput.placeholder = "Enter height in inches";
  }

  // Clear previous results
  document.getElementById("result").style.display = "none";
  weightInput.value = "";
  heightInput.value = "";
}

function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  if (!weight || !height || weight <= 0 || height <= 0) {
    alert("Please enter valid weight and height values.");
    return;
  }

  let bmi;
  if (currentUnits === "metric") {
    // Convert cm to meters and calculate BMI
    bmi = weight / (height / 100) ** 2;
  } else {
    // Imperial units: BMI = (weight in pounds * 703) / (height in inches ^ 2)
    bmi = (weight * 703) / height ** 2;
  }

  bmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place

  displayResult(bmi);
}

function displayResult(bmi) {
  const resultDiv = document.getElementById("result");
  const bmiValue = document.getElementById("bmiValue");
  const bmiCategory = document.getElementById("bmiCategory");
  const bmiDescription = document.getElementById("bmiDescription");

  bmiValue.textContent = bmi;

  let category = "";
  let description = "";
  let categoryClass = "";

  if (bmi < 18.5) {
    category = "Underweight";
    description =
      "You may need to gain weight. Consider consulting a healthcare provider.";
    categoryClass = "underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal Weight";
    description = "Congratulations! You have a healthy weight.";
    categoryClass = "normal";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    description =
      "You may need to lose weight. Consider a balanced diet and exercise.";
    categoryClass = "overweight";
  } else {
    category = "Obese";
    description =
      "It's recommended to consult a healthcare provider for guidance.";
    categoryClass = "obese";
  }

  bmiCategory.textContent = category;
  bmiDescription.textContent = description;

  // Remove previous category classes and add new one
  resultDiv.className = "result " + categoryClass;
  resultDiv.style.display = "block";
}
