//쳇gpt를 활용해서 임시로 넣은 겁니다!!
document.querySelector('.login-button').addEventListener('click', async function() {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (!username || !password) {
        alert('아이디와 비밀번호를 입력해주세요.');
        return;
    }

    try {
        const response = await fetch('https://your-server-endpoint/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('로그인 요청이 실패했습니다.');
        }

        const data = await response.json();

        if (data.success) {
            alert('로그인 성공!');
            window.location.href = 'http://127.0.0.1:5500/gansik/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.html'; // 로그인 후 이동할 페이지
        } else {
            alert('로그인 실패: ' + data.message);
        }
    } catch (error) {
        alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.error(error);
    }
});