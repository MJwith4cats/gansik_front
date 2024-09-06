//쳇gpt를 사용해서 임시로 만든겁니다!!
  async function loadProducts() {
    try {
      const response = await fetch('https://your-server-endpoint/products'); // 서버에서 상품 데이터 가져오기
      const products = await response.json();

      const productContainer = document.querySelector('.product-list');
      productContainer.innerHTML = ''; // 기존의 HTML 초기화

      products.forEach(product => {
        const productItem = `
          <a href="${product.url}" class="product-total">
            <div class="product-item">
              <img src="${product.image}" alt="${product.name}">
              <h2 class="product-name">${product.name}</h2>
              <p class="product-price">₩${product.price.toLocaleString()}</p>
              <button class="busket" type="button">
                <i class="bi bi-bag"></i>
              </button>
            </div>
          </a>
        `;
        productContainer.innerHTML += productItem; // HTML에 새로운 상품 추가
      });
    } catch (error) {
      console.error('상품 데이터를 불러오는 중 오류 발생:', error);
    }
  }

  // 페이지 로드 시 상품을 불러옵니다.
  document.addEventListener('DOMContentLoaded', loadProducts);

// 서버에서 받아오는 데이터
//   [
//     {
//       "id": 1,
//       "name": "상품 1",
//       "price": 10000,
//       "image": "https://via.placeholder.com/180",
//       "url": "http://127.0.0.1:5500/gansik/상품1.html"
//     },
//     {
//       "id": 2,
//       "name": "상품 2",
//       "price": 20000,
//       "image": "https://via.placeholder.com/180",
//       "url": "http://127.0.0.1:5500/gansik/상품2.html"
//     }
//     // 추가 상품 정보...
//   ]
