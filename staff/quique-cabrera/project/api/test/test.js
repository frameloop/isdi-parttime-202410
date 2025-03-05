fetch('http://localhost:8080')
    .then(res => res.text())
    .then(text => console.log('Server response:', text))
    .catch(error => console.error('Fetch error:', error));