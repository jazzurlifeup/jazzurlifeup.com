const container = document.getElementById('blob-container');
const blobCount = 12;

function createBlobs() {
    for (let i = 0; i < blobCount; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        
        // Start blobs behind the sidebar
        const radius = gsap.utils.random(40, 80);
        gsap.set(circle, {
            attr: {
                cx: -100, 
                cy: gsap.utils.random(50, 150),
                r: radius,
                fill: "#313244"
            }
        });

        container.appendChild(circle);

        // Animate the "pour" and "forming"
        gsap.to(circle, {
            attr: { cx: gsap.utils.random(50, 750) },
            duration: gsap.utils.random(2, 4),
            delay: i * 0.15,
            ease: "power2.out",
            repeat: -1,
            yoyo: true,
            repeatDelay: gsap.utils.random(1, 3)
        });

        // Add a vertical wobble to look like lava-lamp liquid
        gsap.to(circle, {
            attr: { cy: "+=30" },
            duration: gsap.utils.random(2, 5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Fade in the subtext after the paint starts flowing
    gsap.to(".welcome-text", { opacity: 1, y: -10, duration: 1, delay: 1.5 });
}

createBlobs();