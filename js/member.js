
window.addEventListener('load', () => {
    memberInfo();
});


/**
 * 회원가입 시 회원의 정보를 테이블에 저장하는 메소드
 */
const memberInfo = () => {
    const storedMemberList = JSON.parse(localStorage.getItem("memberList"));
    const tableBody = document.querySelector("table#tb-member tbody");
    storedMemberList.forEach((member) => {
        tableBody.innerHTML += `<tr><td>${member.id}</td>
<td>${member.email}</td>
<td>${member.password}</td>
<td>${formatDatetime(member.date)}</td></tr>`
    });
}


/**
 * 날짜 format
 */
const formatDatetime = (millis) => {
    const d = new Date(millis);
    const f = (n) => n.toString().padStart(2, "0");
    const yy = d.getFullYear().toString().substring(2);
    const MM = f(d.getMonth() + 1);
    const dd = f(d.getDate());
    const hh = f(d.getHours());
    const mm = f(d.getMinutes());
    return `${yy}/${MM}/${dd} ${hh}:${mm}`;
}