// Review form functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Star rating functionality
    function setupStarRating() {
        const stars = document.querySelectorAll('.star');
        const ratingInput = document.getElementById('rating');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                // Update star display
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            // Hover effect
            star.addEventListener('mouseenter', function() {
                const rating = this.getAttribute('data-rating');
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.style.opacity = '1';
                        s.style.transform = 'scale(1.2)';
                    } else {
                        s.style.opacity = '0.3';
                        s.style.transform = 'scale(1)';
                    }
                });
            });
        });
        
        // Reset on mouse leave
        document.querySelector('.star-rating').addEventListener('mouseleave', function() {
            const currentRating = ratingInput.value;
            stars.forEach((s, i) => {
                if (i < currentRating) {
                    s.style.opacity = '1';
                    s.style.transform = 'scale(1.2)';
                } else {
                    s.style.opacity = '0.3';
                    s.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Form submission
    function setupFormSubmission() {
        const form = document.getElementById('reviewForm');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const reviewData = {
                name: formData.get('customerName'),
                product: formData.get('productType'),
                rating: formData.get('rating'),
                review: formData.get('reviewText'),
                suggestions: formData.get('suggestions')
            };
            
            // Validate required fields
            if (!reviewData.name || !reviewData.product || !reviewData.rating || !reviewData.review) {
                alert('Please fill in all required fields and select a rating.');
                return;
            }
            
            // Simulate form submission (in real implementation, this would send to a server)
            submitReview(reviewData);
        });
    }
    
    // Submit and display review
    function submitReview(reviewData) {
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Save review to local storage
            saveReviewToStorage(reviewData);
            
            // Add review to the page
            addReviewToPage(reviewData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            document.getElementById('reviewForm').reset();
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
                star.style.opacity = '0.3';
                star.style.transform = 'scale(1)';
            });
            document.getElementById('rating').value = '';
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
        }, 1500);
    }
    
    // Save review to local storage
    function saveReviewToStorage(reviewData) {
        let reviews = JSON.parse(localStorage.getItem('crochetReviews') || '[]');
        
        // Add timestamp and ID
        reviewData.id = Date.now();
        reviewData.date = new Date().toLocaleDateString();
        
        reviews.unshift(reviewData); // Add to beginning
        
        // Keep only last 20 reviews
        if (reviews.length > 20) {
            reviews = reviews.slice(0, 20);
        }
        
        localStorage.setItem('crochetReviews', JSON.stringify(reviews));
    }
    
    // Add review to the page and save permanently
    function addReviewToPage(reviewData) {
        const dynamicContainer = document.getElementById('dynamic-reviews');
        const newReviewCard = createReviewCard(reviewData);
        
        // Add to beginning of dynamic container
        dynamicContainer.insertBefore(newReviewCard, dynamicContainer.firstChild);
        
        // Animate in
        setTimeout(() => {
            newReviewCard.classList.add('animate-in');
        }, 100);
        
        // Scroll to new review
        newReviewCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Save review permanently to HTML structure
    function saveReviewToHTML(reviewData) {
        // Create permanent review HTML
        const stars = '⭐'.repeat(parseInt(reviewData.rating));
        const productNames = {
            'flowers': 'Flowers & Flower Tops',
            'hair-accessories': 'Hair Accessories',
            'soft-toys': 'Soft Toys',
            'bags': 'Bags & Accessories',
            'clothing': 'Clothing & Wearables',
            'special': 'Special Items'
        };
        
        const reviewHTML = `
                <div class="review-card">
                    <div class="stars">${stars}</div>
                    <p>"${reviewData.review}"</p>
                    <div class="reviewer">
                        <strong>- ${reviewData.name}</strong>
                        <span>${productNames[reviewData.product] || reviewData.product}</span>
                    </div>
                </div>`;
        
        // Store in localStorage for admin to copy to HTML
        let permanentReviews = JSON.parse(localStorage.getItem('permanentReviews') || '[]');
        permanentReviews.unshift({
            html: reviewHTML,
            data: reviewData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('permanentReviews', JSON.stringify(permanentReviews));
        
        // Show instruction to admin
        console.log('New review HTML to add to index.html:', reviewHTML);
    }
    
    // Create review card HTML with delete button
    function createReviewCard(reviewData) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card new-review';
        reviewCard.setAttribute('data-review-id', reviewData.id);
        
        const stars = '⭐'.repeat(parseInt(reviewData.rating));
        const productNames = {
            'flowers': 'Flowers & Flower Tops',
            'hair-accessories': 'Hair Accessories',
            'soft-toys': 'Soft Toys',
            'bags': 'Bags & Accessories',
            'clothing': 'Clothing & Wearables',
            'special': 'Special Items'
        };
        
        reviewCard.innerHTML = `
            <button class="delete-review-btn" onclick="deleteReview('${reviewData.id}')">×</button>
            <div class="stars">${stars}</div>
            <p>"${reviewData.review}"</p>
            <div class="reviewer">
                <strong>- ${reviewData.name}</strong>
                <span>${productNames[reviewData.product] || reviewData.product}</span>
                <small class="review-date">Just now</small>
            </div>
        `;
        
        return reviewCard;
    }
    
    // Load existing reviews from storage
    function loadStoredReviews() {
        const reviews = JSON.parse(localStorage.getItem('crochetReviews') || '[]');
        const dynamicContainer = document.getElementById('dynamic-reviews');
        
        if (!dynamicContainer) return;
        
        // Clear existing dynamic reviews
        dynamicContainer.innerHTML = '';
        
        reviews.forEach(reviewData => {
            const reviewCard = createStoredReviewCard(reviewData);
            reviewCard.classList.add('stored-review', 'animate-in');
            dynamicContainer.appendChild(reviewCard);
        });
    }
    
    // Create stored review card with proper date and delete button
    function createStoredReviewCard(reviewData) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card stored-review';
        reviewCard.setAttribute('data-review-id', reviewData.id);
        
        const stars = '⭐'.repeat(parseInt(reviewData.rating));
        const productNames = {
            'flowers': 'Flowers & Flower Tops',
            'hair-accessories': 'Hair Accessories',
            'soft-toys': 'Soft Toys',
            'bags': 'Bags & Accessories',
            'clothing': 'Clothing & Wearables',
            'special': 'Special Items'
        };
        
        reviewCard.innerHTML = `
            <button class="delete-review-btn" onclick="deleteReview('${reviewData.id}')">×</button>
            <div class="stars">${stars}</div>
            <p>"${reviewData.review}"</p>
            <div class="reviewer">
                <strong>- ${reviewData.name}</strong>
                <span>${productNames[reviewData.product] || reviewData.product}</span>
                <small class="review-date">${reviewData.date || 'Recent'}</small>
            </div>
        `;
        
        return reviewCard;
    }
    
    // Show success message
    function showSuccessMessage() {
        const form = document.getElementById('reviewForm');
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <h4>Thank You! 🎉</h4>
            <p>Your review has been submitted successfully. We appreciate your feedback!</p>
            <p>Follow us on Instagram for updates and new products.</p>
        `;
        
        form.parentNode.insertBefore(successDiv, form.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Form animations
    function setupFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Custom confirmation modal
    function showDeleteModal(reviewId) {
        const modal = document.createElement('div');
        modal.className = 'delete-modal';
        modal.innerHTML = `
            <div class="delete-modal-content">
                <h3>🗑️ Delete Review</h3>
                <p>Are you sure you want to delete this review? This action cannot be undone.</p>
                <div class="modal-buttons">
                    <button class="modal-btn modal-btn-cancel" onclick="closeDeleteModal()">Cancel</button>
                    <button class="modal-btn modal-btn-delete" onclick="confirmDelete('${reviewId}')">Delete</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDeleteModal();
            }
        });
    }
    
    // Close modal with animation
    window.closeDeleteModal = function() {
        const modal = document.querySelector('.delete-modal');
        if (modal) {
            modal.style.animation = 'modalFadeOut 0.3s ease forwards';
            modal.querySelector('.delete-modal-content').style.animation = 'modalScaleOut 0.3s ease forwards';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };
    
    // Confirm delete with animation
    window.confirmDelete = function(reviewId) {
        // Remove from localStorage
        let reviews = JSON.parse(localStorage.getItem('crochetReviews') || '[]');
        reviews = reviews.filter(review => review.id != reviewId);
        localStorage.setItem('crochetReviews', JSON.stringify(reviews));
        
        // Remove from DOM with animation
        const reviewElement = document.querySelector(`[data-review-id="${reviewId}"]`);
        if (reviewElement) {
            reviewElement.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                reviewElement.remove();
            }, 500);
        }
        
        // Close modal
        closeDeleteModal();
    };
    
    // Delete review function
    window.deleteReview = function(reviewId) {
        showDeleteModal(reviewId);
    };
    
    // Initialize all functionality
    setupStarRating();
    setupFormSubmission();
    loadStoredReviews();
    
    // Setup animations when form comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setupFormAnimations();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const reviewForm = document.querySelector('.review-submission');
    if (reviewForm) {
        observer.observe(reviewForm);
    }
});