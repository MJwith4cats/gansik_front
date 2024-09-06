
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            var addr = '';

            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            document.getElementById("postcode").value = data.zonecode;
            document.getElementById("roadAddress").value = addr;
            document.getElementById("detailAddress").focus();
        }
    }).open();
}

function validateEmail() {
    var email = document.getElementById("email").value;
    var emailMessage = document.getElementById("emailMessage");

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        emailMessage.textContent = "";
        emailMessage.className = "message";
    } else if (!emailPattern.test(email)) {
        emailMessage.textContent = "유효한 이메일 주소를 입력해주세요.";
        emailMessage.className = "message";
    } else {
        emailMessage.textContent = "유효한 이메일 주소입니다.";
        emailMessage.className = "message success";
    }
}

function sendEmailVerification() {
    var email = document.getElementById("email").value;
    var emailMessage = document.getElementById("emailMessage");

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailMessage.textContent = "유효한 이메일 주소를 입력해주세요.";
        emailMessage.className = "message";
        return;
    }

    fetch('/mailSend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail: email })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("인증번호가 이메일로 전송되었습니다.");
                document.getElementById("emailVerificationContainer").style.display = "block";
            } else {
                emailMessage.textContent = "이메일 전송에 실패했습니다. 다시 시도해주세요.";
                emailMessage.className = "message";
            }
        })
        .catch(error => {
            emailMessage.textContent = "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.";
            emailMessage.className = "message";
        });
}

function verifyEmailCode() {
    var emailCode = document.getElementById("emailCode").value;
    var emailCodeMessage = document.getElementById("emailCodeMessage");

    fetch(`/mailCheck?userNumber=${emailCode}`)
        .then(response => response.json())
        .then(isMatch => {
            if (isMatch) {
                alert("인증번호가 확인되었습니다.");
                emailCodeMessage.textContent = "인증이 완료되었습니다.";
                emailCodeMessage.className = "message success";
            } else {
                emailCodeMessage.textContent = "인증번호가 일치하지 않습니다. 다시 확인해주세요.";
                emailCodeMessage.className = "message";
            }
        })
        .catch(error => {
            emailCodeMessage.textContent = "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.";
            emailCodeMessage.className = "message";
        });
}

function checkPasswordMatch() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var passwordMessage = document.getElementById("passwordMessage");
    var passwordValidationMessage = document.getElementById("passwordValidationMessage");

    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,16}$/;

    if (password === "") {
        passwordValidationMessage.textContent = "";
    } else if (!passwordPattern.test(password)) {
        passwordValidationMessage.textContent = "비밀번호는 8자 이상 16자 이하, 대문자, 소문자, 숫자, 특수문자(!@#$%)를 각각 하나 이상 포함해야 합니다.";
        return;
    } else {
        passwordValidationMessage.textContent = "";
    }

    if (confirmPassword === "") {
        passwordMessage.textContent = "";
        return;
    }

    if (password === confirmPassword) {
        passwordMessage.textContent = "비밀번호가 일치합니다.";
        passwordMessage.className = "message success";
    } else {
        passwordMessage.textContent = "비밀번호가 일치하지 않습니다.";
        passwordMessage.className = "message";
    }
}

function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("유효한 이메일 주소를 입력해주세요.");
        return false;
    }

    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,16}$/;
    if (!passwordPattern.test(password)) {
        alert("비밀번호는 8자 이상 16자 이하, 대문자, 소문자, 숫자, 특수문자(!@#$%)를 각각 하나 이상 포함해야 합니다.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        return false;
    }
    return true;
}
