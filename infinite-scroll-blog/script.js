const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const endMessage = document.getElementById('endMessage');

let limit = 10;
let page = 1;
const totalPosts = 100;

async function fetchPosts(page, limit) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    return await res.json();
}

function showPosts(posts) {
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post';
        postEl.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
        postContainer.appendChild(postEl);
    });
}

async function loadMorePosts() {
    if ((page - 1) * limit >= totalPosts) {
        loader.style.display = 'none';
        endMessage.style.display = 'block';
        return;
    }

    loader.style.display = 'block';

    setTimeout(async () => {
        const posts = await fetchPosts(page, limit);
        showPosts(posts);
        loader.style.display = 'none';
        page++;
    }, 2000);
}

function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

window.addEventListener(
    'scroll',
    throttle(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        scrollTopBtn.style.display = scrollTop > 300 ? 'block' : 'none';

        if (scrollTop + clientHeight >= scrollHeight - 50) {
            loadMorePosts();
        }
    }, 300)
);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

loadMorePosts();
