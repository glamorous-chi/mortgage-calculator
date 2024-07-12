const repaymentButton = document.querySelector("#repayment-button");
const thirdSection = document.querySelector(".third-section");
const secondSection = document.querySelector(".second-section");
const mortgageAmt = document.querySelector("#mortgage-amount");
const mortgageTerm = document.querySelector("#mortgage-term");
const interestRate = document.querySelector("#interest-rate");
const formInput = document.querySelector(".form-input");
const amount = document.querySelector("#amount");
const total = document.querySelector("#total");
const underline = document.querySelector(".underline");
const styledInput = document.querySelector(".styled-input");
const placeholder = document.querySelector(".placeholder");
const amountError = document.querySelector("#amount-error");
const interestError = document.querySelector("#interest-error");
const interestRateError = document.querySelector("#interest-rate-error");
const yearsPlaceholder = document.querySelector("#years-placeholder");
const poundsPlaceholder = document.querySelector("#pounds-placeholder");
const percentPlaceholder = document.querySelector("#percent-placeholder");
const yearsInput = document.querySelector("#years-input");
const poundsInput = document.querySelector("#pounds-input");
const percentInput = document.querySelector("#percent-input");
const output = document.getElementById("formattedNumber");
const customRadio = document.querySelector(".custom-radio");

let mortgageAmtValue = 0;

mortgageAmt.addEventListener("input", function (e) {
  mortgageAmtValue = mortgageAmt.value.trim().toLocaleString("en-US");
  if (mortgageAmtValue.length >= 1 && !isNaN(mortgageAmtValue)) {
    formInput.style.border = "1px solid hsl(202, 55% ,16%)";
    amountError.innerHTML = "";
    poundsPlaceholder.style.backgroundColor = "hsl(202,86%,94%)";
    poundsPlaceholder.style.color = "black";
  }
  if (mortgageAmtValue.length === 0 || isNaN(mortgageAmtValue)) {
    poundsInput.style.border = "1px solid red";
    amountError.textContent = "This field is required";
    amountError.style.color = "red";
    poundsInput.style.border = "1px solid red";
  }
  if (isNaN(mortgageAmtValue)) {
    poundsInput.style.border = "1px solid red";
    amountError.textContent = "Must be a number";
    amountError.style.color = "red";
    poundsInput.style.border = "1px solid red";
  } else {
    poundsInput.style.border = "1px solid hsl(202, 55% ,16%)"; //This is the default color given
  }
});

let mortgageTermValue = 0;
mortgageTerm.addEventListener("input", function (e) {
  const mortgageTermValueTrim = mortgageTerm.value.trim();
  mortgageTermValue = mortgageTermValueTrim * 12;
  // console.log(mortgageTermValue);
  if (mortgageTermValueTrim.length >= 1) {
    yearsInput.style.border = "1px solid hsl(202, 55% ,16%)";
    interestError.textContent = "";
    yearsPlaceholder.style.backgroundColor = "hsl(202,86%,94%)";
    yearsPlaceholder.style.color = "black";
  }
  if (mortgageTermValueTrim.length === 0 || isNaN(mortgageTermValueTrim)) {
    yearsInput.style.border = "1px solid red";
    interestError.textContent = "This field is required";
    interestError.style.color = "red";
    yearsInput.style.border.color = "1px solid red";
  }
  if (isNaN(mortgageTermValueTrim)) {
    yearsInput.style.border = "1px solid red";
    interestError.textContent = "Must be a number";
    interestError.style.color = "red";
    yearsInput.style.border = "1px solid red";
  } else {
    yearsInput.style.border = "1px solid hsl(202, 55% ,16%)"; //This is the default color given
  }
});

let interestRateValue = 0;
interestRate.addEventListener("input", function (e) {
  const interestRateValueTrim = interestRate.value.trim();
  interestRateValue = interestRateValueTrim / (100 * 12);
  // console.log(interestRateValue);
  if (interestRateValueTrim.length >= 1) {
    percentInput.style.border = "1px solid hsl(202, 55% ,16%)";
    interestRateError.textContent = "";
    percentPlaceholder.style.backgroundColor = "hsl(202,86%,94%)";
    percentPlaceholder.style.color = "black";
  }
  if (interestRateValueTrim.length === 0) {
    percentInput.style.border = "1px solid red";
    interestRateError.textContent = "This field is required";
    interestRateError.style.color = "red";
    interestRateError.style.border = "red";
    percentInput.style.border = "1px solid red";
  }
  if (isNaN(interestRateValueTrim)) {
    percentInput.style.border = "1px solid red";
    interestRateError.textContent = "Must be a number";
    interestRateError.style = "red";
    percentInput.style.border = "1px solid red";
  } else {
    percentInput.style.border = "1px solid hsl(202, 55% ,16%)"; //This is the default color given
  }
});

formInput.addEventListener("focus", function (event) {
  if (formInput.value.trim().length < 1 || isNaN(formInput.value.trim())) {
    formInput.style.border = "1px solid red";
  }
});

let isAmountValid = null;
let ismortgageTermValueValid = null;
let isinterestRateValueValid = null;

const isFormValid = () => {
  const mortgageAmountValue = mortgageAmt.value.trim();
  const mortgageTermValue = mortgageTerm.value.trim();
  const interestRateValue = interestRate.value.trim();

  isAmountValid =
    mortgageAmountValue.length >= 1 && !isNaN(mortgageAmountValue);
  ismortgageTermValueValid =
    mortgageTermValue.length >= 1 && !isNaN(mortgageTermValue);
  isinterestRateValueValid =
    interestRateValue.length >= 1 && !isNaN(interestRateValue);
  return isAmountValid && ismortgageTermValueValid && isinterestRateValueValid;
};

let monthlyAmount = 0;
const monthlyRepayments = () => {
  monthlyAmount =
    (mortgageAmtValue *
      (interestRateValue * (1 + interestRateValue) ** mortgageTermValue)) /
    ((1 + interestRateValue) ** mortgageTermValue - 1);
  console.log(monthlyAmount);
};
let monthlyRepaymentsOverTerm = 0;
const monthlyRepaymentsOverTermm = () => {
  monthlyRepaymentsOverTerm = monthlyAmount * mortgageTermValue;
  console.log(monthlyRepaymentsOverTerm.toLocaleString("en-US"));
};

repaymentButton.addEventListener("click", (e) => {
  if (!isFormValid()) {
    e.preventDefault();
    repaymentButton.style.color = "grey";

    if (!isAmountValid) {
      poundsPlaceholder.style.backgroundColor = "red";
      poundsPlaceholder.style.color = "white";
      poundsInput.style.border = "1px solid red";

      amountError.textContent = "This field is required";
      amountError.style.color = "red";
      amountError.style.fontSize = "0.85rem";
    }

    if (!ismortgageTermValueValid) {
      yearsPlaceholder.style.backgroundColor = "red";
      yearsPlaceholder.style.color = "white";
      yearsInput.style.border = "1px solid red";

      interestError.textContent = "This field is required";
      interestError.style.color = "red";
      interestError.style.fontSize = "0.85rem";
    }

    if (!isinterestRateValueValid) {
      percentPlaceholder.style.backgroundColor = "red";
      percentPlaceholder.style.color = "white";
      percentInput.style.border = "1px solid red";

      interestRateError.textContent = "This field is required";
      interestRateError.style.color = "red";
      interestRateError.style.fontSize = "0.85rem";
    } else if (
      !isAmountValid &&
      !ismortgageTermValueValid &&
      !isinterestRateValueValid
    ) {
      poundsPlaceholder.style.backgroundColor = "red";
      poundsPlaceholder.style.color = "white";
      poundsInput.style.border = "1px solid red";

      yearsPlaceholder.style.backgroundColor = "red";
      yearsPlaceholder.style.color = "white";
      yearsInput.style.border = "1px solid red";

      percentPlaceholder.style.backgroundColor = "red";
      percentPlaceholder.style.color = "white";
      percentInput.style.border = "1px solid red";

      amountError.textContent = "This field is required";
      amountError.style.color = "red";
      amountError.style.fontSize = "0.85rem";

      interestError.textContent = "This field is required";
      interestError.style.color = "red";
      interestError.style.fontSize = "0.85rem";

      interestRateError.textContent = "This field is required";
      interestRateError.style.color = "red";
      interestRateError.style.fontSize = "0.85rem";
    }
    return;
  }

  thirdSection.style.display = "flex";
  thirdSection.style.flexDirection = "column";
  secondSection.style.display = "none";
  monthlyRepayments();
  monthlyRepaymentsOverTermm();
  amount.textContent = `£${monthlyAmount.toLocaleString("en-US")}`;
  total.textContent = `£${monthlyRepaymentsOverTerm.toLocaleString("en-US")}`;
});

const formReset = () => {
  poundsPlaceholder.style.backgroundColor = "hsl(202,86%,94%)";
  poundsPlaceholder.style.color = "black";
  poundsInput.style.border = "1px solid hsl(202, 55% ,16%)";

  yearsPlaceholder.style.backgroundColor = "hsl(202,86%,94%)";
  yearsPlaceholder.style.color = "black";
  yearsInput.style.border = "1px solid hsl(202, 55% ,16%)";

  percentPlaceholder.style.backgroundColor = "hsl(202,86%,94%)";
  percentPlaceholder.style.color = "black";
  percentInput.style.border = "1px solid hsl(202, 55% ,16%)";

  amountError.textContent = "";
  amountError.style.color = "";
  amountError.style.fontSize = "";

  interestError.textContent = "";
  interestError.style.color = "";
  interestError.style.fontSize = "";

  interestRateError.textContent = "";
  interestRateError.style.color = "";
  interestRateError.style.fontSize = "";
  return;
};
underline.addEventListener("click", (e) => {
  mortgageAmt.value = "";
  mortgageTerm.value = "";
  interestRate.value = "";
  amount.textContent = `£0`;
  total.textContent = `£0`;
  // secondSection.style.display = "grid";
  // thirdSection.style.display = "none";

  formReset();
});
