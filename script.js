const cardNameInput = document.getElementById('input-name');
const cardNumberInput = document.getElementById('input-number');
const expiry = Array.from(document.querySelectorAll('#expiry'));
const cardCVCInput = document.getElementById('input-cvc');
const confirmBtn = document.getElementById('confirm-btn');

const cardHolderName = document.querySelector('#card-holder-name');
const cardHolderNumber = document.querySelector('#card-holder-number');
const cardHolderExpMM = document.querySelector('.date-mm');
const cardHolderExpYY = document.querySelector('.date-yy');
const cardHolderCVC = document.querySelector('.CVC');
const completedSection = document.getElementById('completed-box');
const continueBtn = document.getElementById('continue-btn');
const form = document.getElementById('right-box');
const expiryErrorMsg = document.getElementById('expiry-error');


function inputName() {
    let formattedName = cardNameInput.value;

    formattedName = formattedName.substring(0, 12);
    cardNameInput.value = formattedName;

    cardHolderName.innerHTML = cardNameInput.value;
    cardHolderName.innerHTML = cardNameInput.placeholder;
    if(cardHolderName.innerHTML == ''){
        cardHolderName.innerHTML = cardNameInput.placeholder;
    }else {
        cardHolderName.innerHTML = cardNameInput.value;
    }
}

function inputCardNum(){
    let cardNoInput = cardNumberInput.value;

    // Do not allow users to write invalid characters
    let formattedCardNo = cardNoInput.replace(/[^\d]/g, "");
    formattedCardNo = formattedCardNo.substring(0, 16);

    // Split the card number is groups of 4
    let cardNoSection = formattedCardNo.match(/\d{1,4}/g);
    if (cardNoSection !== null) {
        formattedCardNo = cardNoSection.join(" ");
    }
    // If the formmattedCardNumber is different to what is shown, change the value
    if(cardNoInput !== formattedCardNo) {
        cardNumberInput.value = formattedCardNo;
    }
    if(cardNumberInput.value === "") {
        cardHolderNumber.innerHTML = cardNumberInput.placeholder;
    }else{
        cardHolderNumber.innerHTML = cardNumberInput.value;
    }

}

function inputMM() {
    let formattedMM = expiry[0].value;
    formattedMM = formattedMM.substring(0, 2);
    expiry[0].value = formattedMM;
    if(expiry[0].value === "") {
        cardHolderExpMM.innerHTML = "00";
    }else {
        cardHolderExpMM.innerHTML = expiry[0].value;
    }
}

function inputYY() {
    let formattedYY = expiry[1].value;
    formattedYY = formattedYY.substring(0, 2);
    expiry[1].value = formattedYY;
    if(expiry[1].value === "") {
        cardHolderExpYY.innerHTML = "00";
    }else {
        cardHolderExpYY.innerHTML = expiry[1].value;
    }
}

function inputCvc() {
    let formattedCvc = cardCVCInput.value;

    formattedCvc = formattedCvc.substring(0, 3);
    cardCVCInput.value = formattedCvc
    if(cardCVCInput.value == '') {
        cardHolderCVC.innerHTML = '000';
    }else {
        cardHolderCVC.innerHTML = cardCVCInput.value;
    }
}

function messageValidate(){
    function validateName() {
        let cardHolderExp = /^[A-Z a-z]+$/;
        let errorMsg = document.getElementById('errorMsg');
        let inputNameErr = document.getElementsByClassName('card-name-input')
        if (cardNameInput.value.match(cardHolderExp)) {
            errorMsg.textContent = "";
        }
        else {
            errorMsg.innerHTML = "Please enter cardholder name!";
            inputNameErr.classList.add('inputError');
        }
    }
    function validateCardNo() {
        let cardNoError = document.getElementById('card-num-error');
        if (cardNumberInput.value.lenght < 16) {
            cardNoError.innerHTML = 'Wrong format!';
        }else if (cardNumberInput.value === "") {
            cardNoError.innerHTML = "Can't be blank!"
        }else {
            cardNoError.innerHTML = "";
        }
    }
    function validateExpiry() {
        let expMonth = /^(0[0-9]|1[1-2]){2}$/
        let expYear = /^[0-9][0-2]{4}$/

        if (expiry[0].value.match(expMonth)){
            expiryErrorMsg.innerHTML = "";
        } else if(
            expiry[0].value.match(expMonth) &&
            expiry[1].value.match(expYear)
        ) {
            expiryErrorMsg.innerHTML = "";
        } else if (expiry[0] === "") {
            expiryErrorMsg.innerHTML = "Can't be blank!"
        }else {
            expiryErrorMsg.innerHTML = "Wrong format!"
        }
    }
    function validateCVC() {
        let cvcErrorMsg = document.getElementById('error-cvc');
        let cvcExp = /^[0-9]{3}$/;
        if (cardCVCInput.value === "") {
            cvcErrorMsg.innerHTML = "Can't be blank!"
        } else if (cardCVCInput.value.match(cvcExp)) {
            cvcErrorMsg.innerHTML = "";
        }else {
            cvcErrorMsg.innerHTML = 'Wrong format!';
        }
    }
    validateName();
    validateCardNo();
    validateExpiry();
    validateCVC();
    if (
        cardHolderName.innerHTML == cardNameInput.placeholder ||
        cardHolderNumber.innerHTML == cardNumberInput.placeholder ||
        cardHolderExpMM.innerHTML == "00" ||
        cardHolderExpYY.innerhtml == "0000" ||
        cardHolderCVC.innerHTML == "000" ||
        (cardNumberInput.value.lenght > 0 && cardNumberInput.value.lenght < 16)
    ) {
        return false;
    }else {
        return true;
    }
}


//Submit button
confirmBtn.addEventListener('click', function() {
    messageValidate();
    if (messageValidate() == false) {
        event.preventDefault();
    }else {
        event.preventDefault();

        form.classList.add('hidden');
        completedSection.classList.remove('hidden');
    }
});


//Continue Button
continueBtn.addEventListener('click', function() {
    event.preventDefault();
    completedSection.classList.add('hidden');
    form.classList.remove('hidden');
    cardHolderName.innerHTML = cardNameInput.placeholder;
    cardHolderNumber.innerHTML = cardNumberInput.placeholder;
    cardHolderExpMM.innerHTML = '00';
    cardHolderExpYY.innerHTML = '00';
    cardHolderCVC.innerHTML = '000';
    cardNameInput.value = '';
    cardNumberInput.value = '';
    expiry[0].value = '';
    expiry[1].value = '';
    cardCVCInput.value = '';
    errorMsg.innerHTML = '';
    // cardNoError.innerHTML = '';
    expiryErrorMsg.innerHTML = '';
    // cvcErrorMsg.innerHTML = '';
});