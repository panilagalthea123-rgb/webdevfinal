document.addEventListener('DOMContentLoaded', async () => {
    const submitBtn = document.getElementById('submit-post-btn');
    const postContent = document.getElementById('post-content');
    const contentFeed = document.getElementById('content-feed');
    const atomizeBtns = document.querySelectorAll('.atomize-btn');

    // Keywords that trigger the "Atomization" response
    const BRAINROT_KEYWORDS = /brainrot|low effort|chismis|tanga|sanaol|waley|lowquality|troll/i;

    // --- 1. Atomization Function ---
    function triggerAtomization(message) {
        const overlay = document.createElement('div');
        overlay.classList.add('atomize-overlay');
        overlay.innerHTML = `
            <h1>🚨 CONTENT ATOMIZED! 🚨</h1>
            <p style="font-size: 0.5em; margin: 10px; color: #ff9f1c;">${message}</p>
            <p style="font-size: 0.4em;">User session purged for violating Kislap's standards.</p>
            <p style="font-size: 0.4em; margin-top: 20px; color: #ffffff;">Redirecting to login...</p>
        `;
        document.body.appendChild(overlay);

        setTimeout(() => {
            localStorage.removeItem('isLoggedIn'); // Force logout/ban
            window.location.href = 'pages/login.html'; 
        }, 4000); 
    }

    // --- 2. Simulated Post Creation ---
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const content = postContent.value.trim();
            if (content === '') {
                alert('Please share something meaningful!');
                return;
            }

            if (BRAINROT_KEYWORDS.test(content)) {
                triggerAtomization('Your post contained prohibited low-effort content.');
                return;
            }

            const newPost = document.createElement('article');
            newPost.classList.add('post', 'card');
            newPost.innerHTML = `
                <div class="post-header">
                    <img src="assets/img/user-default.jpg" alt="PFP" class="pfp">
                    <h4>@NewUser_${Math.floor(Math.random() * 1000)} <span class="badge">Aspiring Spark</span></h4>
                </div>
                <p>${content}</p>
                <div class="post-actions">
                    <button class="action-btn like-btn">❤️ 0</button>
                    <button class="action-btn comment-btn">💬 0</button>
                </div>
            `;

            contentFeed.insertBefore(newPost, contentFeed.querySelector('h2').nextElementSibling);
            postContent.value = '';
        });
    }

    // --- 3. Listener for Hardcoded Atomization Buttons ---
    atomizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const post = btn.closest('.post');
            post.style.transition = 'opacity 0.5s';
            post.style.opacity = '0.1';
            triggerAtomization('The reported content has been purged from the platform.');
        });
    });

    // --- 4. Fetch posts from backend ---
    try {
        const res = await api.get("/posts");
        console.log("Posts from backend:", res.data);
    } catch (err) {
        console.error("Backend not responding", err);
    }
});
