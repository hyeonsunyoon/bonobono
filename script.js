document.addEventListener("DOMContentLoaded", () => {
    const draggableContainer = document.getElementById("draggableContainer");
    const staticImage = document.getElementById("staticImage");

    // 이미지 랜덤 위치에 배치
    function placeImageRandomly(element, offsetX = 0, offsetY = 0) {
        const maxWidth = window.innerWidth - element.offsetWidth - offsetX;
        const maxHeight = window.innerHeight - element.offsetHeight - offsetY;
        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight);

        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
    }

    placeImageRandomly(draggableContainer);
    placeImageRandomly(staticImage);

    // 충돌 감지 함수
    function isColliding(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    // 드래그 기능
    let isDragging = false;
    let offsetX, offsetY;

    function startDrag(e) {
        isDragging = true;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        offsetX = clientX - draggableContainer.getBoundingClientRect().left;
        offsetY = clientY - draggableContainer.getBoundingClientRect().top;
        draggableContainer.style.transition = "none";
        e.preventDefault(); // 터치 이벤트에서 클릭을 방지하기 위해 기본 동작 방지
    }

    function onDrag(e) {
        if (isDragging) {
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            const x = clientX - offsetX;
            const y = clientY - offsetY;
            draggableContainer.style.left = `${x}px`;
            draggableContainer.style.top = `${y}px`;

            // 충돌 감지 및 처리
            if (isColliding(draggableContainer, staticImage)) {
                placeImageRandomly(draggableContainer);
                placeImageRandomly(staticImage);
            }
        }
    }

    function endDrag() {
        isDragging = false;
        draggableContainer.style.transition = "left 0.1s ease-out, top 0.1s ease-out";
    }

    draggableContainer.addEventListener("mousedown", startDrag);
    draggableContainer.addEventListener("touchstart", startDrag, { passive: false });

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchmove", onDrag, { passive: false });

    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);

    // 창 크기 변경 시 이미지 위치 재조정
    window.addEventListener("resize", () => {
        placeImageRandomly(draggableContainer);
        placeImageRandomly(staticImage);
    });
});
