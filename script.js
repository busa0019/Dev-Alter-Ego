
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('skill-quiz');
            const submitBtn = document.getElementById('submit-btn');
            const restartBtn = document.getElementById('restart-btn');
            const progressBar = document.getElementById('quiz-progress');
            const loading = document.getElementById('loading');
            const btnText = document.getElementById('btn-text');
            const resultCard = document.getElementById('result-card');
            
            // Sound effects
            const revealSound = document.getElementById('reveal-sound');
            const drumrollSound = document.getElementById('drumroll-sound');
            const successSound = document.getElementById('success-sound');
            
            let totalQuestions = 5;
            
            function updateProgress() {
                const answered = document.querySelectorAll('input[type="radio"]:checked').length;
                const progress = (answered / totalQuestions) * 100;
                progressBar.style.width = `${progress}%`;
                
                submitBtn.disabled = answered < totalQuestions;
            }
            
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', updateProgress);
            });
            
            updateProgress();
            
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                btnText.textContent = 'Summoning Your Ego...';
                loading.style.display = 'inline-block';
                submitBtn.disabled = true;
                
                // Play drumroll sound
                drumrollSound.play().catch(e => console.log("Audio play failed:", e));
                
                setTimeout(() => {
                    calculateResults();
                    
                    loading.style.display = 'none';
                    btnText.textContent = 'Ego Revealed!';
                    restartBtn.style.display = 'block';
                }, 3000); // Longer delay for dramatic effect
            });
            
            restartBtn.addEventListener('click', function() {
                form.reset();
                resultCard.style.display = 'none';
                restartBtn.style.display = 'none';
                btnText.textContent = 'Reveal My Alter Ego! 🎭';
                updateProgress();
                
                // Reset any animations
                resultCard.classList.remove('reveal-animation', 'glow');
            });
            
            function calculateResults() {
                const formData = new FormData(form);
                let totalScore = 0;
                let answeredCount = 0;
                
                for (let [key, value] of formData) {
                    totalScore += parseInt(value);
                    answeredCount++;
                }
                
                // Fun, playful results
                const results = [
                    { 
                        minScore: 5, 
                        maxScore: 10, 
                        title: "The Code Guardian 🛡️", 
                        description: "You're the organized hero every team needs! Your superpower is turning chaos into clean code. While others panic, you're calmly documenting and debugging like a pro. Your secret weapon? Actually reading the documentation!",
                        icon: "🛡️",
                        color: "#4ECDC4",
                        confettiColor: "#4ECDC4"
                    },
                    { 
                        minScore: 11, 
                        maxScore: 15, 
                        title: "The Debugging Dynamo 🔧", 
                        description: "You're the practical problem-solver who keeps things moving! When bugs attack, you're the first to grab coffee and start tinkering. You might not always know why it works, but you know how to make it work - and that's what counts!",
                        icon: "🔧",
                        color: "#FFD166",
                        confettiColor: "#FFD166"
                    },
                    { 
                        minScore: 16, 
                        maxScore: 20, 
                        title: "The Creative Chaos Coordinator 🎪", 
                        description: "You thrive in beautiful messes! Your code might look like abstract art, but it gets the job done with style. You see patterns in chaos and turn wild ideas into working features. Embrace your inner mad scientist!",
                        icon: "🎪",
                        color: "#FF6B6B",
                        confettiColor: "#FF6B6B"
                    },
                    { 
                        minScore: 21, 
                        maxScore: 25, 
                        title: "The Full-Stack Phantom 🦸", 
                        description: "You're a coding ninja who operates in the shadows! Your methods are mysterious, your commits are legendary, and you somehow always deliver. You don't just break rules - you rewrite them. The codebase fears and respects you!",
                        icon: "🦸",
                        color: "#6A0572",
                        confettiColor: "#6A0572"
                    }
                ];
                
                const finalResult = results.find(r => totalScore >= r.minScore && totalScore <= r.maxScore);
                
                document.getElementById('job-title').textContent = finalResult.title;
                document.getElementById('job-description').textContent = finalResult.description;
                document.getElementById('result-icon').textContent = finalResult.icon;
                document.getElementById('score-display').textContent = `Your Chaos Level: ${totalScore}/25`;
                
                resultCard.style.setProperty('--gradient', `linear-gradient(135deg, ${finalResult.color}, #6A0572)`);
                
                // Stop drumroll and play reveal sound
                drumrollSound.pause();
                drumrollSound.currentTime = 0;
                revealSound.play().catch(e => console.log("Reveal sound failed:", e));
                
                // Show result with dramatic animation
                resultCard.style.display = 'block';
                resultCard.classList.add('reveal-animation');
                
                // Add glowing effect after reveal
                setTimeout(() => {
                    resultCard.classList.add('glow');
                    successSound.play().catch(e => console.log("Success sound failed:", e));
                }, 1500);
                
                // Trigger confetti explosion
                triggerConfetti(finalResult.confettiColor);
                
                resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            function triggerConfetti(color) {
                const end = Date.now() + 3000; // 3 seconds of confetti
                const colors = [color, '#FFFFFF', '#FFD700'];
                
                function frame() {
                    confetti({
                        particleCount: 3,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: colors
                    });
                    confetti({
                        particleCount: 3,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: colors
                    });
                    
                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                }
                
                frame();
                
                // Big explosion in the center
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: colors
                });
                
                // Additional effects
                setTimeout(() => {
                    confetti({
                        particleCount: 50,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: colors,
                        scalar: 1.2
                    });
                }, 500);
                
                setTimeout(() => {
                    confetti({
                        particleCount: 30,
                        spread: 60,
                        origin: { y: 0.7 },
                        colors: colors,
                        scalar: 0.8
                    });
                }, 1000);
            }
        });
    