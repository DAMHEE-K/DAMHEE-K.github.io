window.addEventListener('load', () => {
    signEvent();
}) 


/**
 * 클래스 속성 삭제 메소드
 */ 
const resetClass = (element, classname) => {
    element.classList.remove(classname);
};

/**
 * 회원가입/로그인 창 이벤트
 */
const signEvent = () => {
    // 상단에 있는 Sign Up 버튼을 눌렀을 때 이벤트
    document.getElementsByClassName("show-signup")[0].addEventListener("click", function () {
        let form = document.getElementsByClassName("form")[0];
        resetClass(form, "signin");
        form.classList.add("signup");
        document.getElementById("submit-btn").innerText = "Sign Up";
    });

    
    // 상단에 있는 Sign In 버튼을 눌렀을 때 이벤트
    document.getElementsByClassName("show-signin")[0].addEventListener("click", function () {
        let form = document.getElementsByClassName("form")[0];
        resetClass(form, "signup");
        form.classList.add("signin");
        document.getElementById("submit-btn").innerText = "Sign In";
    });


    // 제출 버튼을 누르면 사용자 입력값을 가지고 회원가입 / 로그인 메소드 호출
    document.querySelector("#submit-btn").addEventListener("click", (e) => {
        e.preventDefault();
    
        const text = document.querySelector("#submit-btn").innerText;
        let idVal = document.getElementById("username").value;
        let emailVal = document.getElementById("email").value;
        let passwordVal = document.getElementById("password").value;
        let checkPassVal = document.getElementById("password2").value;
        
        // submit-btn에 있는 텍스트에 따라 분기처리
        if (text === 'Sign Up') {
            signUp(idVal,emailVal, passwordVal, checkPassVal);
        } else {
            login(idVal, passwordVal);
        }
    });
};


/**
 * 로그인 메소드
 */
const login = (id, password) => {
    const storedMemberList = JSON.parse(localStorage.getItem("memberList"));
    const member = storedMemberList.find((data) => data.id === id && data.password === password)
    if(member) {
        alert("로그인 성공!")
        window.location.href = "index.html"; // 홈페이지 메인으로 이동
    } else {
        alert("로그인 실패!")
    }
}


/**
 * 회원가입 메소드
 */
const signUp = (id, email, password, checkedpass) => {
    const checkId = validationId(id);
    const checkPw = validationPassword(password, checkedpass);
    if(checkPw && checkId) {
        const member = new Member(id, email, password);
        const storedMemberList = JSON.parse(localStorage.getItem("memberList")) || [];
        storedMemberList.push(member);
        localStorage.setItem("memberList", JSON.stringify(storedMemberList))
    
        window.location.href = "index.html";
    }
}

/**
 * 멤버객체
 */
class Member {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.date = Date.now();
    }
};


/**
 * 비밀번호 유효성 검사
 */
const validationPassword = (pass1, pass2) => {
    const regExp = /^(?=.*\d)(?=.*[A-Za-z](?=.*[!&/\\*@])).{8,12}$/
    if (!(pass1 === pass2)) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    } else if (!regExp.test(pass1)) {
        alert('비밀번호는 8~12자리, 숫자/영문자/특수문자를 각각 하나 이상 포함해야 합니다.');
        return false;
    } else {
        return true;
    }
};

/**
 * 아이디 유효성 검사
 */
const validationId = (id) => {
    const regExp = /^[A-Za-z0-9]+$/;
    if(!regExp.test(id)) {
        alert('아이디는 영문자로만 작성해주세요.');
        return false;
    } else {
        return true;
    }
};
