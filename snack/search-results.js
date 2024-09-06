//쳇gpt를 사용해서 임시로 넣은겁니다. 근데 진짜 잘 작동되었으면 좋겠다.....
document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the server
    fetch('http://localhost:3000/products') // 서버에서 데이터를 받아오는 경로를 수정해야 합니다.
      .then(response => response.json())
      .then(data => {
        const productList = document.querySelector('.product-list');
        let totalProducts = data.length; // 서버에서 받은 상품 수

        // 총 상품 수 업데이트
        document.querySelector('.total span').textContent = totalProducts;

        // 제품 리스트를 비우고 데이터 추가
        productList.innerHTML = ''; 
        data.forEach(product => {
          // 각각의 제품 아이템을 동적으로 생성
          const productItem = `
            <a href="product-details.html?id=${product.id}" class="product-total">
              <div class="product-item">
                <img src="${product.imageUrl}" alt="상품이미지">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-price">₩${product.price}</p>
                <button class="busket" type="button">
                  <i class="bi bi-bag"></i>
                </button>
              </div>
            </a>
          `;
          productList.innerHTML += productItem;
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  });


//   서버에서 받아오는 데이터
//   [
//     {
//       "id": 1,
//       "name": "상품 A",
//       "price": 10000,
//       "imageUrl": "https://via.placeholder.com/180"
//     },
//     {
//       "id": 2,
//       "name": "상품 B",
//       "price": 20000,
//       "imageUrl": "https://via.placeholder.com/180"
//     }
//   ]