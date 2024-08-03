document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        star.addEventListener('click', function () {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
});

function navigateTo(tabId) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Add active class to clicked nav item
    const clickedItem = document.querySelector(`[onclick="navigateTo('${tabId}')"]`);
    clickedItem.classList.add('active');

    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Show the selected tab content
    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');
}

// Initialize the first tab as active
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitFeedback() {
    const rating = document.querySelector('.star-rating .star.selected')?.dataset.value;
    const feedbackText = $('#feedbackDes').val();
    const share = document.querySelector('input[name="share"]:checked').value === 'true';
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const termsAccepted = document.getElementById('terms').checked;

    if (!rating || !feedbackText || !nickname || !email || !termsAccepted) {
        alert('Please fill out all fields and accept the terms.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const feedback = {
        Rating: parseInt(rating),
        FeedbackText: feedbackText,
        Share: share,
        Nickname: nickname,
        Email: email
    };

    fetch('/api/Feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedback)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            document.getElementById('feedback-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your feedback: ' + error.message);
        });
}
