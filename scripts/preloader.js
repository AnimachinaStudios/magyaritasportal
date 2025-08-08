document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress');
    const percentDisplay = document.getElementById('loading-percent');
    const eyeVideo = document.querySelector('.harley-eyes-video');
    
    // Video settings - start at 5 seconds
    eyeVideo.currentTime = 5;
    eyeVideo.loop = true;
    eyeVideo.playsInline = true;
    eyeVideo.muted = true;
    
    // Forced minimum display time (5 seconds)
    const startTime = Date.now();
    const minDisplayTime = 5000;
    
    // Loading simulation
    let progress = 0;
    const loadingInterval = setInterval(() => {
        // Calculate progress based on actual loading and minimum time
        const elapsed = Date.now() - startTime;
        const loadProgress = Math.min((elapsed / minDisplayTime) * 100, 100);
        
        progress = Math.min(progress + 2, loadProgress); // Smooth progress
        progressBar.style.width = `${progress}%`;
        percentDisplay.textContent = Math.floor(progress);
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            // Wait a bit before hiding to ensure video plays
            setTimeout(() => {
                preloader.style.transition = 'opacity 0.8s ease';
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 300);
        }
    }, 50);
    
    // Start video with error handling
    function startVideo() {
        eyeVideo.play().catch(e => {
            console.log("Video autoplay blocked:", e);
            // Add fallback for mobile
            const playButton = document.createElement('div');
            playButton.innerHTML = 'Kattints a betöltéshez';
            playButton.style.position = 'fixed';
            playButton.style.bottom = '20px';
            playButton.style.width = '100%';
            playButton.style.textAlign = 'center';
            playButton.style.color = 'red';
            playButton.style.cursor = 'pointer';
            document.body.appendChild(playButton);
            
            playButton.addEventListener('click', () => {
                eyeVideo.play();
                document.body.removeChild(playButton);
            });
        });
    }
    
    // Start everything
    startVideo();
    
    // Ensure preloader disappears even if load event fires early
    window.addEventListener('load', function() {
        const remainingTime = minDisplayTime - (Date.now() - startTime);
        if (remainingTime > 0) {
            setTimeout(() => {
                progressBar.style.width = '100%';
                percentDisplay.textContent = '100';
            }, remainingTime);
        }
    });
});