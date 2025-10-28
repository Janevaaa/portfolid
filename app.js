// Wait for the DOM to be fully loaded before we run our script
document.addEventListener("DOMContentLoaded", () => {

    // 1. Select all the elements we need
    const sidebarImage = document.querySelector('.sidebar-image');
    const sections = document.querySelectorAll('.content-section');
    const scrollContainer = document.querySelector('.middle-content');

    // 2. Define the "job" to do when a section enters/leaves
    function onSectionIntersect(entries) {
        entries.forEach(entry => {
            // isIntersecting is true when the element is on screen
            if (entry.isIntersecting) {
                
                // Get the new image path from our data-image attribute
                const newImage = entry.target.dataset.image;

                // --- The Fade Effect Logic ---
                // 1. Fade the image out
                sidebarImage.style.opacity = 0;

                // 2. Wait for the fade-out to finish (300ms)
                setTimeout(() => {
                    // 3. Change the image source
                    sidebarImage.src = newImage;
                    // 4. Fade the new image back in
                    sidebarImage.style.opacity = 1;
                }, 300); // Must match your CSS transition time
            }
        });
    }

    // 3. Create the "scout" (the Observer)
    const options = {
        root: scrollContainer, // We are watching the .middle-content scrollbar
        rootMargin: '0px',
        threshold: 0.5 // Fire when 50% of the section is visible
    };

    const observer = new IntersectionObserver(onSectionIntersect, options);

    // 4. Tell the scout what to watch
    sections.forEach(section => {
        observer.observe(section);
    });

});