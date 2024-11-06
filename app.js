const cards = document.querySelectorAll(".card");

// 배경을 변경할 함수
function changeBackground(event) {
  const card = event.currentTarget;
  const backgroundImage = card.getAttribute("data-background"); // 카드에 설정된 배경 이미지 URL 가져오기

  // 기존에 추가된 배경 요소가 있으면 제거
  const existingBackground = document.querySelector(".background-blur");
  if (existingBackground) {
    existingBackground.remove();
  }

  // 새로운 배경 요소를 동적으로 생성
  const backgroundElement = document.createElement("div");
  backgroundElement.classList.add("background-blur"); // class 추가하여 스타일을 설정
  backgroundElement.style.position = "absolute";
  backgroundElement.style.top = "0";
  backgroundElement.style.left = "0";
  backgroundElement.style.width = "100vw";
  backgroundElement.style.height = "100vh";
  backgroundElement.style.backgroundImage = `url(${backgroundImage})`; // 배경 이미지 설정
  backgroundElement.style.backgroundSize = "cover";
  backgroundElement.style.backgroundPosition = "center";
  backgroundElement.style.filter = "blur(8px)"; // 배경 이미지에 블러 효과 적용
  backgroundElement.style.zIndex = "-1"; // 콘텐츠 위에 배경이 표시되지 않도록 설정

  // 배경 이미지 위에 투명도 있는 오버레이 추가
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)"; // 검정색에 반투명도 적용
  overlay.style.zIndex = "1"; // 배경 이미지 위로 오버레이가 표시되도록 설정
  // body의 배경을 교체
  // 배경 이미지와 오버레이를 함께 추가
  backgroundElement.appendChild(overlay);
  document.body.appendChild(backgroundElement);
}

// 각 카드에 hover 이벤트 리스너 추가
cards.forEach((card) => {
  card.addEventListener("mouseenter", changeBackground); // 카드에 hover되었을 때 배경 변경
  card.addEventListener("mouseleave", () => {
    const backgroundElement = document.querySelector(".background-blur");
    if (backgroundElement) {
      document.body.removeChild(backgroundElement); // hover를 벗어났을 때 배경 원래대로 복구
    }
  });
});
