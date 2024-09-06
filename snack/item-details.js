
// $(document).ready(function () {
//   let result = 1;

//   // 수량 감소
//   $('.dash').click(() => {
//     result--;
//     result = result < 1 ? 1 : result;
//     $("#result").text(result);
//     updateTotal(); // 총 금액 업데이트
//   });

//   // 수량 증가
//   $('.plus').click(() => {
//     result++;
//     $("#result").text(result);
//     updateTotal(); // 총 금액 업데이트
//   });

//   // 구매 버튼 클릭
//   $('#buy').click(function () {
//     if (confirm("구매 하시겠습니까?")) {
//       alert("구매가 완료되었습니다.");
//     }
//   });

//   // 장바구니 버튼 클릭
//   $('#basket').click(function () {
//     alert("장바구니에 담겼습니다.");
//   });

//   // 총 금액 업데이트 함수
//   function updateTotal() {
//     var wonText = $("#won").text().replace(/,/g, ''); // 콤마 제거
//     var won = parseInt(wonText); // 가격을 정수로 변환
//     var result = parseInt($("#result").text()); // 수량 가져오기
//     var total = won * result; // 총 금액 계산
//     var formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 천 단위 콤마 추가
//     $("#money").text(formattedTotal); // 총 금액 업데이트
//   }

//   // 초기 총 금액 설정
//   updateTotal();
// });


// 쳇gpt로 짠 코드입니다.
document.addEventListener("DOMContentLoaded", function () {
  // 서버에서 상품 데이터를 받아서 화면에 표시
  fetch('https://example.com/api/product/12345')  // 서버에서 데이터를 가져올 URL
    .then(response => response.json())  // 응답을 JSON 형식으로 변환
    .then(data => {
      // 받은 데이터로 HTML 업데이트
      document.querySelector('.product-photo img').src = data.image;  // 상품 이미지
      document.querySelector('.category').textContent = data.category;  // 카테고리
      document.querySelector('h1').textContent = data.name;  // 상품 이름
      document.querySelector('.date').textContent = data.updated_at;  // 수정 날짜
      document.getElementById('won').textContent = data.price.toLocaleString();  // 가격
      document.getElementById('money').textContent = data.price.toLocaleString();  // 총 금액
    })
    .catch(error => console.error("데이터 로드 실패:", error));

  let result = 1;
  let price = parseInt(document.getElementById('won').textContent.replace(/,/g, ''), 10);  // 상품 가격

  // 수량 감소
  document.querySelector('.dash').addEventListener('click', () => {
    result--;
    result = result < 1 ? 1 : result;
    document.getElementById('result').textContent = result;
    updateTotal(result, price);
  });

  // 수량 증가
  document.querySelector('.plus').addEventListener('click', () => {
    result++;
    document.getElementById('result').textContent = result;
    updateTotal(result, price);
  });

  // 총 가격 업데이트 함수
  function updateTotal(quantity, price) {
    const total = quantity * price;
    document.getElementById('money').textContent = total.toLocaleString();
  }

  // '장바구니 담기' 버튼 클릭 시 서버로 전송
  document.getElementById('basket').addEventListener('click', function () {
    fetch('https://example.com/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: 12345,  // 상품 ID
        quantity: result  // 선택한 수량
      })
    })
    .then(response => {
      if (response.ok) {
        alert("장바구니에 담겼습니다.");
      } else {
        throw new Error("장바구니 담기 실패");
      }
    })
    .catch(error => console.error(error));
  });

  // '바로구매' 버튼 클릭 시 서버로 전송
  document.getElementById('buy').addEventListener('click', function () {
    if (confirm("구매 하시겠습니까?")) {
      fetch('https://example.com/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: 12345,  // 상품 ID
          quantity: result  // 선택한 수량
        })
      })
      .then(response => {
        if (response.ok) {
          alert("구매가 완료되었습니다.");
        } else {
          throw new Error("구매 실패");
        }
      })
      .catch(error => console.error(error));
    }
  });
});