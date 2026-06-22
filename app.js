document.addEventListener('DOMContentLoaded', () => {
    const canvasContainer = document.getElementById('canvas-container');
    const searchInput = document.getElementById('search-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.querySelector('.voice-btn');
    
    // Model Comparison button
    const tokenizerInfoBtn = document.getElementById('tokenizer-info-btn');

    // Language Selector elements
    const selectLangBtn = document.getElementById('select-lang-btn');
    const langSelectorContainer = document.getElementById('lang-selector-container');
    const langModalClose = document.getElementById('lang-modal-close');
    const langCards = document.querySelectorAll('.lang-card:not(.disabled)');
    const activeLangStatus = document.getElementById('active-lang-status');

    // Phrases Grid elements
    const phrasesGrid = document.getElementById('phrases-grid');
    const refreshPhrasesBtn = document.getElementById('refresh-phrases-btn');

    // Tokenizer elements
    const tokenizerOutput = document.getElementById('tokenizer-output');
    const tokenBadgesList = document.getElementById('token-badges-list');
    const statTokensValue = document.getElementById('stat-tokens-value');
    const statCharsValue = document.getElementById('stat-chars-value');
    const statFertilityValue = document.getElementById('stat-fertility-value');

    // 16 Sample Phrases from user's image
    const samplePhrases = [
        { telugu: "ప్రతిరోజు ఉదయం యోగా మరియు ధ్యానం ...", english: "Daily yoga & meditation" },
        { telugu: "మనం రేపు కలుద్దాం", english: "Let's meet tomorrow" },
        { telugu: "శుభ రాత్రి", english: "Good night" },
        { telugu: "ఈ రోజు నా పుట్టినరోజు", english: "Today is my birthday" },
        { telugu: "నాకు తెలుగు భాష చాలా ఇష్టం", english: "I love the Telugu language" },
        { telugu: "నాకు కాఫీ కావాలి", english: "I want coffee" },
        { telugu: "దయచేసి నాకు సహాయం చేయండి", english: "Please help me" },
        { telugu: "వర్షం పడుతోంది", english: "It is raining" },
        { telugu: "మా పిల్లలు బడికి వెళ్తున్నారు", english: "Our children go to school" },
        { telugu: "నమస్కారం, మీరు ఎలా ఉన్నారు?", english: "Hello, how are you?" },
        { telugu: "నేను ఇంటికి వెళ్తున్నాను", english: "I am going home" },
        { telugu: "నేను రేపు వస్తాను", english: "I will come tomorrow" },
        { telugu: "నేను పుస్తకం చదువుతున్నాను", english: "I am reading a book" },
        { telugu: "మీకు అన్నం తినాలని ఉందా?", english: "Do you want to eat rice?" },
        { telugu: "నాకు ఆకలిగా ఉంది", english: "I am hungry" },
        { telugu: "భారతదేశం తన వైవిధ్యభరితమైన సంస్కృ...", english: "India's diverse culture" }
    ];

    let currentPhraseIndex = 0;
    let phrasesToShowCount = 4; // Display 4 premium phrases vertically on the right, changes dynamically

    // Tokenizer logic: split by words (Unicode-aware) or punctuation marks
    const tokenizeText = (text) => {
        if (!text) return [];
        return text.match(/[\p{L}\p{N}]+|[^\p{L}\p{N}\s]/gu) || [];
    };

    // Background Glow Trigger State
    let isLanguageSelected = false;

    const checkGlowState = () => {
        const isPromptEntered = searchInput && searchInput.value.trim().length > 0;
        const glowBg = document.getElementById('interactive-glow-bg');
        if (glowBg) {
            if (isLanguageSelected || isPromptEntered) {
                glowBg.classList.add('active');
            } else {
                glowBg.classList.remove('active');
            }
        }
    };

    // Live update tokenizer badges and stats
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const currentStats = { tokens: 0, chars: 0, fertility: 0 };

    const animateValue = (element, start, end, duration, isFloat = false) => {
        let startTime = null;
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = easeOutExpo(progress);
            const current = start + (end - start) * easeProgress;
            element.textContent = isFloat ? current.toFixed(2) : Math.round(current);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = isFloat ? end.toFixed(2) : end;
            }
        };
        requestAnimationFrame(step);
    };

    const updateTokenizer = (text) => {
        if (!tokenizerOutput || !tokenBadgesList || !statTokensValue || !statCharsValue || !statFertilityValue) return;
        
        const trimmed = text.trim();
        if (!trimmed) {
            tokenizerOutput.style.display = 'none';
            checkGlowState();
            statTokensValue.textContent = '0';
            statCharsValue.textContent = '0';
            statFertilityValue.textContent = '0.00';
            currentStats.tokens = 0;
            currentStats.chars = 0;
            currentStats.fertility = 0;
            const gaugeFill = document.getElementById('stat-fertility-gauge');
            if (gaugeFill) gaugeFill.style.strokeDasharray = '0, 100';
            return;
        }
        
        const tokens = tokenizeText(trimmed);
        tokenizerOutput.style.display = 'block';
        
        // Calculate stats
        const charCount = text.length;
        const words = trimmed.split(/[\s\p{P}]+/gu).filter(Boolean); // Split by space or punctuation to count words
        const wordCount = words.length;
        const fertility = wordCount > 0 ? (tokens.length / wordCount) : 1.00;
        
        // Animate DOM values
        animateValue(statTokensValue, currentStats.tokens, tokens.length, 500, false);
        animateValue(statCharsValue, currentStats.chars, charCount, 500, false);
        animateValue(statFertilityValue, currentStats.fertility, fertility, 500, true);
        
        currentStats.tokens = tokens.length;
        currentStats.chars = charCount;
        currentStats.fertility = fertility;

        // Update Gauge
        const gaugeFill = document.getElementById('stat-fertility-gauge');
        if (gaugeFill) {
            const maxFertility = 6.0;
            const percentage = Math.min((fertility / maxFertility) * 100, 100);
            gaugeFill.style.strokeDasharray = `${percentage}, 100`;
            
            if (fertility <= 2.0) {
                gaugeFill.style.stroke = '#10b981'; // Green for excellent fertility
            } else if (fertility <= 4.0) {
                gaugeFill.style.stroke = '#f59e0b'; // Orange for average
            } else {
                gaugeFill.style.stroke = '#ef4444'; // Red for poor
            }
        }
        
        // Render badges
        tokenBadgesList.innerHTML = '';
        tokens.forEach((token, index) => {
            const badge = document.createElement('div');
            badge.className = `token-badge ${index % 2 === 0 ? 'odd-token' : 'even-token'}`;
            
            // Safe text insertion
            const textNode = document.createTextNode(token);
            badge.appendChild(textNode);
            
            // Calculate pseudo-random deterministic token ID and real byte length
            let hash = 0;
            for (let i = 0; i < token.length; i++) {
                hash = ((hash << 5) - hash) + token.charCodeAt(i);
                hash |= 0;
            }
            const tokenId = Math.abs(hash % 32000) + 100;
            const byteLength = new Blob([token]).size;

            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'token-tooltip';
            tooltip.innerHTML = `
                <span class="tooltip-id">ID: ${tokenId}</span>
                <span class="tooltip-bytes">${byteLength} byte${byteLength !== 1 ? 's' : ''}</span>
            `;
            badge.appendChild(tooltip);

            // Apply a cascading stagger delay for modern entrance animation
            badge.style.animationDelay = `${index * 40}ms`;
            tokenBadgesList.appendChild(badge);
        });

        checkGlowState();
    };

    const renderPhrases = () => {
        if (!phrasesGrid) return;
        phrasesGrid.innerHTML = '';
        const selectedSet = [];
        
        for (let i = 0; i < phrasesToShowCount; i++) {
            const idx = (currentPhraseIndex + i) % samplePhrases.length;
            selectedSet.push(samplePhrases[idx]);
        }

        selectedSet.forEach(phrase => {
            const card = document.createElement('div');
            card.className = 'phrase-card';
            card.innerHTML = `
                <div class="phrase-card-content">
                    <span class="phrase-telugu" title="${phrase.telugu}">${phrase.telugu}</span>
                    <span class="phrase-english">${phrase.english}</span>
                </div>
                <div class="phrase-card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            `;

            // Clicking a phrase populates the search bar
            card.addEventListener('click', () => {
                // Clear voice listening state if active
                if (voiceBtn.classList.contains('listening')) {
                    voiceBtn.classList.remove('listening');
                    searchInput.placeholder = "TYPE TO SEE TOKENS";
                }

                searchInput.value = phrase.telugu;
                // Auto-grow height trigger
                searchInput.style.height = 'auto';
                searchInput.style.height = searchInput.scrollHeight + 'px';
                // Trigger button toggle
                sendBtn.style.display = 'flex';
                voiceBtn.style.display = 'none';
                updateTokenizer(phrase.telugu); // Update tokenizer above search bar
                searchInput.focus();
            });

            phrasesGrid.appendChild(card);
        });
    };

    // 1. Focus Glow Effect (reacts with CSS custom properties transitions)
    if (searchInput && canvasContainer) {
        searchInput.addEventListener('focus', () => {
            canvasContainer.classList.add('focus-active');
        });
        searchInput.addEventListener('blur', () => {
            canvasContainer.classList.remove('focus-active');
        });
    }

    // 2. Auto-grow Textarea, Toggle Send/Voice buttons, & Tokenize
    searchInput.addEventListener('input', () => {
        // Clear voice listening state if typing
        if (voiceBtn.classList.contains('listening')) {
            voiceBtn.classList.remove('listening');
            searchInput.placeholder = "TYPE TO SEE TOKENS";
        }

        // Reset height
        searchInput.style.height = 'auto';
        // Set new height based on content
        searchInput.style.height = searchInput.scrollHeight + 'px';

        // Update tokenizer live display
        updateTokenizer(searchInput.value);

        // Toggle buttons
        if (searchInput.value.trim().length > 0) {
            sendBtn.style.display = 'flex';
            voiceBtn.style.display = 'none';
        } else {
            sendBtn.style.display = 'none';
            voiceBtn.style.display = 'flex';
        }
    });

    // 3. Model Comparison Toggle Handler
    if (tokenizerInfoBtn) {
        tokenizerInfoBtn.addEventListener('click', () => {
            const isActive = canvasContainer.classList.toggle('comparison-active');
            tokenizerInfoBtn.classList.toggle('comparison-active-btn');
            
            const searchBarContainer = document.querySelector('.search-bar-container');
            const tokenizerOutputContainer = document.querySelector('.tokenizer-output-container');
            const samplePhrasesSection = document.querySelector('.sample-phrases-section');
            const searchColumn = document.querySelector('.search-column');
            const phrasesHeader = document.querySelector('.phrases-header');
            const modelComparisonContainer = document.getElementById('model-comparison-container');
            
            // Dynamically change suggestions count
            phrasesToShowCount = isActive ? 8 : 4;
            renderPhrases();
            
            if (isActive) {
                // Move search bar and token output to the RIGHT column, above the phrases header
                if (samplePhrasesSection && phrasesHeader && searchBarContainer && tokenizerOutputContainer) {
                    samplePhrasesSection.insertBefore(tokenizerOutputContainer, phrasesHeader);
                    samplePhrasesSection.insertBefore(searchBarContainer, tokenizerOutputContainer);
                }
                
                if (modelComparisonContainer) {
                    setTimeout(() => {
                        modelComparisonContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 20);
                }
            } else {
                // Move them back to the LEFT column, above the model comparison container
                if (searchColumn && modelComparisonContainer && searchBarContainer && tokenizerOutputContainer) {
                    searchColumn.insertBefore(tokenizerOutputContainer, modelComparisonContainer);
                    searchColumn.insertBefore(searchBarContainer, tokenizerOutputContainer);
                }
                
                canvasContainer.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // 4. Language Selection Dialog Handler
    if (selectLangBtn && langSelectorContainer && langModalClose) {
        selectLangBtn.addEventListener('click', () => {
            const isHidden = langSelectorContainer.style.display === 'none';
            langSelectorContainer.style.display = isHidden ? 'block' : 'none';
        });

        langModalClose.addEventListener('click', () => {
            langSelectorContainer.style.display = 'none';
        });
    }

    // 5. Toggle Tokenizer Output Collapsible Content on Header Click
    const tokenizerHeader = document.getElementById('tokenizer-header');
    if (tokenizerHeader && tokenizerOutput) {
        tokenizerHeader.addEventListener('click', () => {
            tokenizerOutput.classList.toggle('expanded');
        });
    }

    // Language Grid Selection
    langCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('active'));
            // Add active class to selected card
            card.classList.add('active');

            // Update active status
            const lang = card.getAttribute('data-lang');
            if (activeLangStatus) {
                activeLangStatus.textContent = `Active: ${lang} • Model: Akshara 32K`;
            }

            // Trigger background gradient
            isLanguageSelected = true;
            checkGlowState();

            // Close modal with short delay
            setTimeout(() => {
                langSelectorContainer.style.display = 'none';
            }, 300);
        });
    });

    // Initialize & Handle Phrases Grid
    if (refreshPhrasesBtn && phrasesGrid) {
        renderPhrases();

        refreshPhrasesBtn.addEventListener('click', () => {
            // Add rotate class temporarily
            const icon = refreshPhrasesBtn.querySelector('.refresh-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                setTimeout(() => { icon.style.transform = 'none'; }, 400);
            }

            // Shuffle index
            currentPhraseIndex = (currentPhraseIndex + phrasesToShowCount) % samplePhrases.length;
            
            // Trigger shuffle fade transition via CSS class
            phrasesGrid.classList.add('shuffling');

            setTimeout(() => {
                renderPhrases();
                phrasesGrid.classList.remove('shuffling');
            }, 250);
        });
    }

    // Clear search and reset heights on mock send
    const handleSend = () => {
        // Clear voice state if active
        if (voiceBtn.classList.contains('listening')) {
            voiceBtn.classList.remove('listening');
            searchInput.placeholder = "TYPE TO SEE TOKENS";
        }

        const text = searchInput.value.trim();
        if (text) {
            console.log(`Prompt submitted: ${text}`);
            searchInput.value = '';
            searchInput.style.height = 'auto';
            sendBtn.style.display = 'none';
            voiceBtn.style.display = 'flex';
            updateTokenizer(''); // Clear tokenizer display
        }
    };

    // Toggle voice recording mockup
    if (voiceBtn) {
        voiceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            voiceBtn.classList.toggle('listening');
            if (voiceBtn.classList.contains('listening')) {
                searchInput.value = '';
                updateTokenizer('');
                searchInput.placeholder = "Listening...";
                searchInput.focus();
            } else {
                searchInput.placeholder = "TYPE TO SEE TOKENS";
            }
        });
    }

    sendBtn.addEventListener('click', handleSend);
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Generate starfield space theme
    const initStarfield = () => {
        const starfield = document.getElementById('starfield');
        if (!starfield) return;

        const starCount = 350;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 1; // 1px to 3px
            
            star.className = 'star glow'; // All stars can twinkle now!
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Duration between 4s and 12s so it twinkles infrequently
            star.style.animationDuration = `${Math.random() * 8 + 4}s`;
            // Random negative delay so they are all completely desynchronized from the start
            star.style.animationDelay = `-${Math.random() * 12}s`;
            
            fragment.appendChild(star);
        }
        starfield.appendChild(fragment);
    };

    initStarfield();
});
