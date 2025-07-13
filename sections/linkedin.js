// LinkedIn Posts functionality
let currentEditingPost = null;

document.addEventListener('DOMContentLoaded', function() {
    initializePostForm();
    initializeEditForm();
    loadSavedPosts();
});

// Initialize post form
function initializePostForm() {
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewPost();
        });
    }
}

// Initialize edit form
function initializeEditForm() {
    const editForm = document.getElementById('editPostForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updatePost();
        });
    }
}

// Post editor functions
function openPostEditor() {
    document.getElementById('postEditorModal').style.display = 'block';
}

function closePostEditor() {
    document.getElementById('postEditorModal').style.display = 'none';
    document.getElementById('postForm').reset();
}

function closeEditModal() {
    document.getElementById('editPostModal').style.display = 'none';
    document.getElementById('editPostForm').reset();
    currentEditingPost = null;
}

// Add new post
function addNewPost() {
    const type = document.getElementById('postType').value;
    const content = document.getElementById('postContent').value;
    const hashtags = document.getElementById('postHashtags').value;
    
    if (!type || !content.trim()) {
        window.portfolioUtils.showNotification('Please fill all required fields', 'error');
        return;
    }
    
    const fullContent = content + (hashtags ? '\n\n' + hashtags : '');
    
    // Create new post element
    const newPost = createPostElement({
        type,
        content: fullContent,
        date: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0
    });
    
    // Add to the beginning of posts container
    const postsContainer = document.querySelector('.linkedin-posts');
    postsContainer.insertBefore(newPost, postsContainer.firstChild);
    
    // Add animation class
    newPost.classList.add('new-post');
    
    // Save to localStorage
    savePost({ type, content: fullContent, date: new Date().toISOString(), likes: 0, comments: 0, shares: 0 });
    
    // Update analytics
    updateAnalytics();
    
    // Close modal
    closePostEditor();
    
    // Show success message
    window.portfolioUtils.showNotification('Post published successfully!');
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'linkedin-post fade-in visible';
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">NV</div>
            <div class="post-info">
                <h4>Nareshchandra V</h4>
                <div class="post-meta">
                    <span class="post-date">${post.date}</span>
                    <span class="post-type">${post.type}</span>
                </div>
            </div>
            <div class="post-actions">
                <button onclick="editPost(this)" title="Edit Post"><i class="fas fa-edit"></i></button>
                <button onclick="deletePost(this)" title="Delete Post"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-metrics">
            <span onclick="likePost(this)"><i class="fas fa-thumbs-up"></i> ${post.likes} likes</span>
            <span><i class="fas fa-comment"></i> ${post.comments} comments</span>
            <span><i class="fas fa-share"></i> ${post.shares} shares</span>
        </div>
    `;
    return postDiv;
}

// Edit post
function editPost(button) {
    const postElement = button.closest('.linkedin-post');
    const content = postElement.querySelector('.post-content').textContent;
    const type = postElement.querySelector('.post-type').textContent;
    
    document.getElementById('editPostType').value = type;
    document.getElementById('editPostContent').value = content;
    
    currentEditingPost = postElement;
    document.getElementById('editPostModal').style.display = 'block';
}

// Update post
function updatePost() {
    if (!currentEditingPost) return;
    
    const type = document.getElementById('editPostType').value;
    const content = document.getElementById('editPostContent').value;
    
    if (!type || !content.trim()) {
        window.portfolioUtils.showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Update the post element
    currentEditingPost.querySelector('.post-content').textContent = content;
    currentEditingPost.querySelector('.post-type').textContent = type;
    
    // Update saved posts
    updateSavedPost(currentEditingPost, { type, content });
    
    // Close modal
    closeEditModal();
    
    // Show success message
    window.portfolioUtils.showNotification('Post updated successfully!');
}

// Delete post
function deletePost(button) {
    if (confirm('Are you sure you want to delete this post?')) {
        const postElement = button.closest('.linkedin-post');
        
        // Remove from saved posts
        removeSavedPost(postElement);
        
        // Remove from DOM with animation
        postElement.style.transition = 'all 0.3s ease';
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            postElement.remove();
            updateAnalytics();
        }, 300);
        
        window.portfolioUtils.showNotification('Post deleted successfully!');
    }
}

// Like post functionality
function likePost(element) {
    const currentLikes = parseInt(element.textContent.match(/\d+/)[0]);
    const newLikes = currentLikes + 1;
    element.innerHTML = `<i class="fas fa-thumbs-up"></i> ${newLikes} likes`;
    
    // Update analytics
    updateAnalytics();
    
    // Save updated likes
    const postElement = element.closest('.linkedin-post');
    updateSavedPostMetrics(postElement, 'likes', newLikes);
}

// Save post to localStorage
function savePost(post) {
    let posts = JSON.parse(localStorage.getItem('linkedinPosts') || '[]');
    posts.unshift({
        ...post,
        id: Date.now(),
        dateAdded: new Date().toISOString()
    });
    localStorage.setItem('linkedinPosts', JSON.stringify(posts));
}

// Update saved post
function updateSavedPost(postElement, updates) {
    let posts = JSON.parse(localStorage.getItem('linkedinPosts') || '[]');
    const postIndex = Array.from(document.querySelectorAll('.linkedin-post')).indexOf(postElement);
    
    if (posts[postIndex]) {
        posts[postIndex] = { ...posts[postIndex], ...updates };
        localStorage.setItem('linkedinPosts', JSON.stringify(posts));
    }
}

// Remove saved post
function removeSavedPost(postElement) {
    let posts = JSON.parse(localStorage.getItem('linkedinPosts') || '[]');
    const postIndex = Array.from(document.querySelectorAll('.linkedin-post')).indexOf(postElement);
    
    if (postIndex > -1 && posts[postIndex]) {
        posts.splice(postIndex, 1);
        localStorage.setItem('linkedinPosts', JSON.stringify(posts));
    }
}

// Update saved post metrics
function updateSavedPostMetrics(postElement, metric, value) {
    let posts = JSON.parse(localStorage.getItem('linkedinPosts') || '[]');
    const postIndex = Array.from(document.querySelectorAll('.linkedin-post')).indexOf(postElement);
    
    if (posts[postIndex]) {
        posts[postIndex][metric] = value;
        localStorage.setItem('linkedinPosts', JSON.stringify(posts));
    }
}

// Load saved posts
function loadSavedPosts() {
    const posts = JSON.parse(localStorage.getItem('linkedinPosts') || '[]');
    const postsContainer = document.querySelector('.linkedin-posts');
    
    posts.forEach(post => {
        const postElement = createPostElement({
            ...post,
            date: window.portfolioUtils.formatDate(post.dateAdded)
        });
        postsContainer.appendChild(postElement);
    });
}

// Update analytics
function updateAnalytics() {
    const posts = document.querySelectorAll('.linkedin-post');
    let totalViews = 0;
    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;
    
    posts.forEach(post => {
        const metrics = post.querySelector('.post-metrics');
        const likes = parseInt(metrics.children[0].textContent.match(/\d+/)[0]) || 0;
        const comments = parseInt(metrics.children[1].textContent.match(/\d+/)[0]) || 0;
        const shares = parseInt(metrics.children[2].textContent.match(/\d+/)[0]) || 0;
        
        totalLikes += likes;
        totalComments += comments;
        totalShares += shares;
        totalViews += likes * 3 + comments * 5 + shares * 8; // Estimated views
    });
    
    // Update analytics cards
    const analyticsCards = document.querySelectorAll('.analytics-card .analytics-content h4');
    if (analyticsCards.length >= 4) {
        analyticsCards[0].textContent = totalViews.toLocaleString();
        analyticsCards[1].textContent = totalLikes.toLocaleString();
        analyticsCards[2].textContent = totalComments.toLocaleString();
        analyticsCards[3].textContent = totalShares.toLocaleString();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const postModal = document.getElementById('postEditorModal');
    const editModal = document.getElementById('editPostModal');
    
    if (event.target === postModal) {
        closePostEditor();
    }
    if (event.target === editModal) {
        closeEditModal();
    }
}

// Initialize analytics on load
setTimeout(() => {
    updateAnalytics();
}, 100);
