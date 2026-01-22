// MOBILE NAVIGATION MENU
const menuButton = document.querySelector('.menu_toggle');
const open = document.querySelector('.open');
const close = document.querySelector('.close');
const navList = document.querySelector('.nav_list');

menuButton.addEventListener('click', function () {
    navList.classList.toggle('active');
    open.classList.toggle('active');
    close.classList.toggle('active');
});

// CLOSE THE NAV WHEN NAVLNKS ARE CLICKED
let navLinks = document.querySelectorAll('.nav_list-link');

navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function () {
        navList.classList.remove('active');
    })
})

// PRICING TABS SWITCH
const priceToggle = document.getElementById('toggle');
const priceGrid = document.querySelector('.price-grid');

priceToggle.addEventListener('change', e => {
    priceGrid.classList.toggle('show-yearly');
});

// Video Controls and Autoplay Handler
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('heroVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  const progressBar = document.getElementById('videoProgress');

  // Check if video element exists
  if (!video) return;

  // Initialize video state
  let isPlaying = true;
  let isMuted = true; // Start muted for autoplay compatibility

  // Update play/pause button icon
  const updatePlayPauseIcon = () => {
    playPauseBtn.querySelector('span').textContent = isPlaying ? '⏸' : '▶';
  };

  // Update mute button icon
  const updateMuteIcon = () => {
    muteBtn.querySelector('span').textContent = isMuted ? '🔇' : '🔊';
    muteBtn.classList.toggle('muted', isMuted);
  };

  // Play/Pause handler
  playPauseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isPlaying) {
      video.pause();
      isPlaying = false;
    } else {
      video.play();
      isPlaying = true;
    }
    updatePlayPauseIcon();
  });

  // Mute/Unmute handler
  muteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isMuted = !isMuted;
    video.muted = isMuted;
    updateMuteIcon();
  });

  // Update progress bar
  video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = progress + '%';
  });

  // Handle video end - loop or show replay
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play();
  });

  // Handle play state changes
  video.addEventListener('play', () => {
    isPlaying = true;
    updatePlayPauseIcon();
  });

  video.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayPauseIcon();
  });

  // Intersection Observer for autoplay on scroll
  const observerOptions = {
    threshold: 0.5, // Trigger when 50% of video is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Video is in view
        if (isMuted) {
          video.play();
        }
      } else {
        // Video is out of view
        video.pause();
      }
    });
  }, observerOptions);

  observer.observe(video);

  // Initialize button icons
  updatePlayPauseIcon();
  updateMuteIcon();

  // Auto-play with sound when user interacts
  document.addEventListener('click', () => {
    if (!isMuted && !isPlaying) {
      video.play();
    }
  }, { once: true });
});