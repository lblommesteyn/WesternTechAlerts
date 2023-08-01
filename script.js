document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const user = {
      fullName: formData.get('user_name'),
      phoneNumber: formData.get('user_phone'),
      program: formData.get('user_program'),
      year: formData.get('user_year'),
    };
  
    // Send the form data to the backend server
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Optionally, you can clear the form after successful submission
        document.getElementById('userForm').reset();
      })
      .catch((error) => console.error('Error:', error));
  });
  