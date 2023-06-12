window.addEventListener('load', () => {
    createImageSlider(".backBtn", ".nextBtn", ".img-container");
    createImageSlider(".backBtn2", ".nextBtn2", ".img-container2");
    typingText();
    btnEffect();
    travelModal();
});


/**
 * 이미지 슬라이더 메소드
 */
const createImageSlider = (backBtnclass, nextBtnclass, container) => {
    const IMAGE_WIDTH = 100; // 현재 사진의 위치
    let pages = 0; // 현재 사진의 인덱스
    let positionValue = 0; // 클릭 이벤트가 발생할 때마다 사진이 이동할 값

    let backBtn = document.querySelector(backBtnclass);
    let nextBtn = document.querySelector(nextBtnclass);
    let images = document.querySelector(container);

    backBtn.addEventListener('click', () => {
        if (pages > 0) {
            positionValue += IMAGE_WIDTH;
            images.style.transform = `translateX(${positionValue}vw)`;
            pages -= 1;
        }
    });

    nextBtn.addEventListener('click', () => {
        if (pages < 2) {
            positionValue -= IMAGE_WIDTH;
            images.style.transform = `translateX(${positionValue}vw)`;
            pages += 1;
        }
    });
}


/**
 * 메인 이미지에 글자 타이핑
 */
const typingText = () => {
    const str = "KIMDAMHEE\nMINI PAGE";
    const textBox = document.querySelector(".main-img-text");

    let i = 0; // 텍스트의 인덱스
    setInterval(() => {
        let ch = str[i++];
        textBox.innerHTML += ch;
        if (i > str.length) { // 길이가 넘어가면 내용 초기화
            textBox.textContent = "";
            i = 0;
        }
    }, 300)
}

/**
 * 모달창 관련
 */
const travelModal = () => {
    const modal = document.getElementById("modal");
    const travelBtn1 = document.getElementById("travel-btn1");
    const travelBtn2 = document.getElementById("travel-btn2");
    const travelBtn3 = document.getElementById("travel-btn3");
    const closeModalBtn = document.getElementById("close-modal");
    
    function openModal(imgSrc1, imgSrc2, title) {
        const img = document.getElementById("modal-img1");
        const img2 = document.getElementById("modal-img2");
        img.src = imgSrc1;
        img2.src = imgSrc2;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // 스크롤바 제거
    
        const h2 = document.querySelector(".modal-h2");
        h2.innerHTML = title;
    
        startSlide();
    }
    
    travelBtn1.addEventListener("click", () => {
        openModal("./image/스페인1.jpg", "./image/스페인2.jpg", "스페인");
    });
    
    travelBtn2.addEventListener("click", () => {
        openModal("./image/스위스1.jpg", "./image/스위스2.jpg", "스위스");
    });
    
    travelBtn3.addEventListener("click", () => {
        openModal("./image/베트남1.jpg", "./image/베트남2.jpg", "베트남");
    });
    
    // 모달창 닫기
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    const startSlide = () => {
        let pages = 0;
        let positionValue = 0;
        const imagesContainer = document.querySelector(".modal-img-container");
      
        slideInterval = setInterval(() => {
          if (pages < 1) {
            positionValue -= 42;
            imagesContainer.style.transform = `translateX(${positionValue}vw)`;
            pages += 1;
          } else {
            positionValue = 0;
            imagesContainer.style.transform = `translateX(${positionValue}vw)`;
            pages = 0;
          }
        }, 3000);
    }
}

/**
 * 세계지도 버튼 마우스오버/마우스 아웃 효과
 */
const btnEffect = () => {
    const travelBtns = document.getElementsByClassName("tBtn");
    Array.from(travelBtns).forEach(btn => {
        btn.addEventListener('mouseover', (e) => {
            e.target.style.background = "rgba(162, 52, 52, 0.836)";
        }, false);
        btn.addEventListener('mouseout', (e) => {
            e.target.style.background = "rgba(219, 79, 79, 0.598)";
        }, false);
    });
}
