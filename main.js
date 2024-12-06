document.getElementById('upload-form').addEventListener('submit', function (event) {
    event.preventDefault(); // prevent default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const fileInput = document.getElementById('file-upload');
    const uploadStatus = document.getElementById('upload-status');

    // Check if file is selected
    if (fileInput.files.length === 0) {
        uploadStatus.textContent = '請選擇要上傳的檔案！';
        uploadStatus.style.color = 'red';
        return;
    }

    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('file', fileInput.files[0]);

    uploadStatus.textContent = '上傳中...';
    uploadStatus.style.color = 'blue';

    // Send POST request to Flask backend
    fetch('http://localhost:5001/upload', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`網路錯誤: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('成功:', data);
            uploadStatus.textContent = '提交成功！';
            uploadStatus.style.color = 'green';
        })
        .catch(error => {
            console.error('錯誤:', error);
            uploadStatus.textContent = '提交失敗，請稍後再試。';
            uploadStatus.style.color = 'red';
        });
});
