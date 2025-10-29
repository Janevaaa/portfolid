// Wait for the DOM to be fully loaded before we run our script
document.addEventListener("DOMContentLoaded", () => {

    // === STORY DATABASE ===
    // Customize these stories with your own content
    const stories = {
        Bastidileema: {
            title: "Does anyone even knows Basti ??",
            content: "you may found me immature but i think i hate my hometown it's not good i would probably fill this page ranting about it so it is better that i should stop ."
        },
        Really:{
            title : "Really ?? 😣",
            content: " When i was in first year i was exicted stupid and so i used to pick up football from the event , they literally made me a ball boy and i did all this in front of my class girls . ( aaah how i forget this ?? ) "
        },
    };

    // === 3D FLIP FUNCTIONALITY ===
    const flipContainer = document.getElementById('flipContainer');
    const closeBtn = document.getElementById('closeBtn');
    const storyContent = document.getElementById('storyContent');
    const triggerWords = document.querySelectorAll('.trigger-word');

    // Handle trigger word clicks
    triggerWords.forEach(word => {
        word.addEventListener('click', () => {
            const storyKey = word.getAttribute('data-story');
            const story = stories[storyKey];

            if (story) {
                // Update story content
                storyContent.innerHTML = `
                    <h3>${story.title}</h3>
                    <p>${story.content}</p>
                `;

                // Trigger flip animation
                flipContainer.classList.add('flipped');
            }
        });
    });

    // Handle close button
    closeBtn.addEventListener('click', () => {
        flipContainer.classList.remove('flipped');
    });

    // === ORIGINAL IMAGE CHANGE ON SCROLL ===
    const sidebarImage = document.querySelector('.sidebar-image');
    const sections = document.querySelectorAll('.content-section');
    const scrollContainer = document.querySelector('.middle-content');

   // 2. Define the "job" to do when a section enters/leaves
function onSectionIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            // --- 1. IMAGE SWAPPING (Your old code) ---
            const newImage = entry.target.dataset.image;
            if (newImage) {
                sidebarImage.style.opacity = 0;
                setTimeout(() => {
                    sidebarImage.src = newImage;
                    sidebarImage.style.opacity = 1;
                }, 300);
            }

            // --- 2. NEW "SOUL" ANIMATION ---
            // Add the .is-visible class to trigger the CSS animation
            entry.target.classList.add('is-visible');

        }
    });
}

    const options = {
        root: scrollContainer,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(onSectionIntersect, options);

    sections.forEach(section => {
        observer.observe(section);
    });
     
    // ------------- Timeline: horizontal scroll with mouse wheel only -------------
(function setupTimelineScroller() {
  const scroller = document.querySelector('.timeline-scroller');
  if (!scroller) return;

  // convert vertical mouse wheel to horizontal scroll
  const WHEEL_MULT = 1.6;

  scroller.addEventListener('wheel', (ev) => {
    if (ev.shiftKey) return; // allow normal horizontal scroll when shift is held
    ev.preventDefault();
    scroller.scrollLeft += ev.deltaY * WHEEL_MULT;
  }, { passive: false });

  // optional: allow arrow key navigation when cursor is over the scroller
  let pointerInside = false;
  scroller.addEventListener('mouseenter', () => { pointerInside = true; });
  scroller.addEventListener('mouseleave', () => { pointerInside = false; });

  window.addEventListener('keydown', (e) => {
    if (!pointerInside) return;
    if (e.key === 'ArrowRight') {
      scroller.scrollBy({ left: 150, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      scroller.scrollBy({ left: -150, behavior: 'smooth' });
    }
  });
})();




    // --- 3. NEW NAV-MINIMIZE LOGIC ---

const minimizeBtn = document.querySelector('#minimize-nav-btn');
const container = document.querySelector('.container');

minimizeBtn.addEventListener('click', () => {
    container.classList.toggle('nav-minimized');
});

});
