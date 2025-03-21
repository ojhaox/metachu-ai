// Dashboard and Settings Functionality for Harvest AI

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components with proper error handling
    try {
        initializeKOLTracking();
        initializeTweetDisplay();
        initializeTradeHistory();
        initializeSettings();
        initializeKOLManagement();
        setupSettingsButtons();
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
});

// KOL Tracking Functionality
function initializeKOLTracking() {
    // Get all KOL entries
    const kolEntries = document.querySelectorAll('.kol-entry');
    if (!kolEntries.length) {
        console.log('No KOL entries found to initialize');
        return;
    }
    
    // Add hover effects
    kolEntries.forEach(entry => {
        if (!entry) return;
        
        entry.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
        });
        
        entry.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.3)';
        });
    });
    
    // Simulate status updates
    setInterval(() => {
        const kolEntries = document.querySelectorAll('.kol-entry');
        if (!kolEntries.length) return;

        const randomKOL = kolEntries[Math.floor(Math.random() * kolEntries.length)];
        if (!randomKOL) return;

        const statusIndicator = randomKOL.querySelector('.status-indicator');
        const statusText = randomKOL.querySelector('.kol-status');
        
        if (!statusIndicator || !statusText) return;
        
        if (statusIndicator.classList.contains('offline')) {
            statusIndicator.classList.remove('offline');
            statusText.textContent = 'Active';
        } else {
            // Only occasionally set to offline (20% chance)
            if (Math.random() < 0.2) {
                statusIndicator.classList.add('offline');
                statusText.textContent = 'Offline';
            }
        }
    }, 5000); // Check every 5 seconds
}

// Tweet Display Functionality
function initializeTweetDisplay() {
    try {
        // Get all tweets
        const tweets = document.querySelectorAll('.tweet');
        if (!tweets.length) {
            console.log('No tweets found to initialize');
            return;
        }
        
        // Add hover effects
        tweets.forEach(tweet => {
            if (!tweet) return;
            
            tweet.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
            });
            
            tweet.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(5px)';
                this.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.3)';
            });
            
            // Make tweet actions interactive
            const actions = tweet.querySelectorAll('.tweet-action');
            actions.forEach(action => {
                if (!action) return;
                
                action.addEventListener('click', function() {
                    // Get current count
                    const countText = this.textContent.trim().split(' ')[1];
                    if (!countText) return;
                    
                    const count = parseInt(countText);
                    if (isNaN(count)) return;
                    
                    // Update count
                    this.innerHTML = this.innerHTML.replace(countText, count + 1);
                    
                    // Add active class
                    this.classList.add('active');
                    this.style.color = 'var(--primary)';
                });
            });
        });
        
        // Simulate new tweets
        const tweetList = document.querySelector('.tweet-list');
        if (!tweetList) {
            console.log('Tweet list container not found');
            return;
        }
        
        const tweetAuthors = ['SolanaWhale', 'CryptoGems', 'DeFi Guru', 'Alpha Hunter', 'Meme Master'];
        const tweetContents = [
            'Just spotted a potential gem on Solana! This project has solid fundamentals and an experienced team. #DYOR $SOL',
            'Market sentiment is shifting bullish for Solana ecosystem. Multiple projects showing strong growth signals! 📈',
            'New liquidity mining program launching on @solendprotocol with attractive APY. Worth checking out! #DeFi',
            'Technical analysis shows $SOL forming a bullish pattern. Potential breakout incoming! #SolanaSummer',
            'This NFT collection on Solana is gaining serious traction. Floor price up 30% in 24h! #NFTs #Solana'
        ];
        
        setInterval(() => {
            // Only add new tweet occasionally (30% chance)
            if (Math.random() < 0.3) {
                // Create new tweet
                const authorIndex = Math.floor(Math.random() * tweetAuthors.length);
                const contentIndex = Math.floor(Math.random() * tweetContents.length);
                
                const tweetElement = document.createElement('div');
                tweetElement.className = 'tweet';
                tweetElement.innerHTML = `
                    <div class="tweet-header">
                        <div class="tweet-avatar">${tweetAuthors[authorIndex][0]}</div>
                        <div class="tweet-name">${tweetAuthors[authorIndex]}</div>
                        <div class="tweet-handle">@${tweetAuthors[authorIndex].toLowerCase().replace(' ', '_')}</div>
                        <div class="tweet-time">Just now</div>
                    </div>
                    <div class="tweet-content">
                        ${tweetContents[contentIndex]}
                    </div>
                    <div class="tweet-actions">
                        <div class="tweet-action"><i class="far fa-heart"></i> ${Math.floor(Math.random() * 50)}</div>
                        <div class="tweet-action"><i class="far fa-retweet"></i> ${Math.floor(Math.random() * 20)}</div>
                        <div class="tweet-action"><i class="far fa-comment"></i> ${Math.floor(Math.random() * 10)}</div>
                    </div>
                `;
                
                // Add hover effects to new tweet
                tweetElement.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(10px)';
                    this.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
                });
                
                tweetElement.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(5px)';
                    this.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.3)';
                });
                
                // Add to list
                tweetList.insertBefore(tweetElement, tweetList.firstChild);
                
                // Remove oldest tweet if more than 5
                if (tweetList.children.length > 5) {
                    tweetList.removeChild(tweetList.lastChild);
                }
                
                // Make new tweet actions interactive
                const actions = tweetElement.querySelectorAll('.tweet-action');
                actions.forEach(action => {
                    action.addEventListener('click', function() {
                        // Get current count
                        const countText = this.textContent.trim().split(' ')[1];
                        const count = parseInt(countText);
                        
                        // Update count
                        this.innerHTML = this.innerHTML.replace(countText, count + 1);
                        
                        // Add active class
                        this.classList.add('active');
                        this.style.color = 'var(--primary)';
                    });
                });
            }
            
            // Update tweet times
            const tweetTimes = document.querySelectorAll('.tweet-time');
            tweetTimes.forEach((timeElement, index) => {
                if (timeElement.textContent === 'Just now') {
                    timeElement.textContent = '1m ago';
                } else {
                    const currentTime = timeElement.textContent;
                    const timeValue = parseInt(currentTime);
                    const timeUnit = currentTime.includes('m') ? 'm' : 'h';
                    
                    if (timeUnit === 'm' && timeValue < 59) {
                        timeElement.textContent = `${timeValue + 1}m ago`;
                    } else if (timeUnit === 'm' && timeValue >= 59) {
                        timeElement.textContent = `1h ago`;
                    } else if (timeUnit === 'h') {
                        timeElement.textContent = `${timeValue + 1}h ago`;
                    }
                }
            });
        }, 30000); // Update every 30 seconds
    } catch (error) {
        console.error('Error initializing tweet display:', error);
    }
}

// Trade History Functionality
function initializeTradeHistory() {
    try {
        // Get all trade entries
        const tradeEntries = document.querySelectorAll('.trade-entry');
        if (!tradeEntries.length) {
            console.log('No trade entries found to initialize');
            return;
        }
        
        // Add hover effects
        tradeEntries.forEach(entry => {
            if (!entry) return;
            
            entry.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
            });
            
            entry.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(5px)';
                this.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.3)';
            });
        });
        
        // Simulate new trades
        const tradeList = document.querySelector('.trade-list');
        if (!tradeList) {
            console.log('Trade list container not found');
            return;
        }
        
        const tokens = ['$HARVEST', '$BONK', '$SOLEND', '$PYTH', '$JTO', '$RENDER', '$BONFIDA'];
        
        setInterval(() => {
            // Only add new trade occasionally (20% chance)
            if (Math.random() < 0.2) {
                // Create new trade
                const tokenIndex = Math.floor(Math.random() * tokens.length);
                const isBuy = Math.random() > 0.3; // 70% chance of buy
                const amount = (Math.random() * 2 + 0.1).toFixed(1); // 0.1 to 2.1 SOL
                
                const tradeElement = document.createElement('div');
                tradeElement.className = 'trade-entry';
                tradeElement.innerHTML = `
                    <div class="trade-header">
                        <div class="trade-type ${isBuy ? 'buy' : 'sell'}">
                            <i class="fas fa-arrow-alt-circle-${isBuy ? 'up' : 'down'}"></i> ${isBuy ? 'Buy' : 'Sell'}
                        </div>
                        <div class="trade-time">Just now</div>
                    </div>
                    <div class="trade-details">
                        <div class="trade-token">${tokens[tokenIndex]}</div>
                        <div class="trade-amount">${amount} SOL</div>
                    </div>
                    <div class="trade-status">Processing</div>
                `;
                
                // Add hover effects to new trade
                tradeElement.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(10px)';
                    this.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
                });
                
                tradeElement.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(5px)';
                    this.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.3)';
                });
                
                // Add to list
                tradeList.insertBefore(tradeElement, tradeList.firstChild);
                
                // Remove oldest trade if more than 5
                if (tradeList.children.length > 5) {
                    tradeList.removeChild(tradeList.lastChild);
                }
                
                // Simulate trade completion after a delay
                setTimeout(() => {
                    const statusElement = tradeElement.querySelector('.trade-status');
                    if (Math.random() > 0.1) { // 90% success rate
                        statusElement.textContent = 'Completed';
                        statusElement.classList.remove('pending');
                    } else {
                        statusElement.textContent = 'Failed';
                        statusElement.classList.add('failed');
                    }
                }, Math.random() * 5000 + 2000); // 2-7 seconds
            }
            
            // Update trade times
            const tradeTimes = document.querySelectorAll('.trade-time');
            tradeTimes.forEach((timeElement, index) => {
                if (timeElement.textContent === 'Just now') {
                    timeElement.textContent = '1m ago';
                } else {
                    const currentTime = timeElement.textContent;
                    const timeValue = parseInt(currentTime);
                    const timeUnit = currentTime.includes('m') ? 'm' : 'h';
                    
                    if (timeUnit === 'm' && timeValue < 59) {
                        timeElement.textContent = `${timeValue + 1}m ago`;
                    } else if (timeUnit === 'm' && timeValue >= 59) {
                        timeElement.textContent = `1h ago`;
                    } else if (timeUnit === 'h') {
                        timeElement.textContent = `${timeValue + 1}h ago`;
                    }
                }
            });
        }, 45000); // Update every 45 seconds
    } catch (error) {
        console.error('Error initializing trade history:', error);
    }
}

// Settings Functionality
function initializeSettings() {
    try {
        // Range slider value display
        const sentimentThreshold = document.getElementById('sentimentThreshold');
        const rangeValue = document.querySelector('.range-value');
        
        if (sentimentThreshold && rangeValue) {
            // Update the range value display when the slider changes
            sentimentThreshold.addEventListener('input', function() {
                rangeValue.textContent = this.value;
            });
            
            // Initialize with current value
            rangeValue.textContent = sentimentThreshold.value;
        } else {
            console.log('Sentiment threshold elements not found');
        }
        
        // Load saved settings if available
        loadSavedSettings();
    } catch (error) {
        console.error('Error initializing settings:', error);
    }
}

// KOL Management Functionality
function initializeKOLManagement() {
    try {
        // Get all KOL cards
        const kolCards = document.querySelectorAll('.kol-card');
        
        // Add hover effects to KOL cards
        kolCards.forEach(card => {
            if (!card) return;
            
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = 'var(--thunder-glow)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--glow)';
            });
            
            // Add event listeners to action buttons
            const actionButtons = card.querySelectorAll('.kol-action-btn');
            actionButtons.forEach(button => {
                if (!button) return;
                
                button.addEventListener('click', function() {
                    if (this.classList.contains('danger')) {
                        // Handle remove button click
                        handleRemoveKOL(card);
                    } else if (this.classList.contains('primary')) {
                        // Handle activate button click
                        handleActivateKOL(card);
                    } else if (this.classList.contains('secondary')) {
                        // Handle view stats button click
                        handleViewKOLStats(card);
                    }
                });
            });
        });
        
        // Add event listener to Add KOL button
        const addKOLButton = document.getElementById('addKOL');
        const kolSearch = document.getElementById('kolSearch');
        
        if (addKOLButton && kolSearch) {
            addKOLButton.addEventListener('click', function() {
                const twitterHandle = kolSearch.value.trim();
                if (twitterHandle) {
                    handleAddKOL(twitterHandle);
                    kolSearch.value = ''; // Clear the input
                } else {
                    window.showNotification('Please enter a Twitter handle', 'error');
                }
            });
            
            // Add event listener for Enter key
            kolSearch.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const twitterHandle = kolSearch.value.trim();
                    if (twitterHandle) {
                        handleAddKOL(twitterHandle);
                        kolSearch.value = ''; // Clear the input
                    } else {
                        window.showNotification('Please enter a Twitter handle', 'error');
                    }
                }
            });
        } else {
            console.log('KOL search elements not found');
        }
        
        // Add event listener to empty state CTA button
        const emptyStateCTA = document.querySelector('.kol-empty-state .cta-button');
        if (emptyStateCTA && kolSearch) {
            emptyStateCTA.addEventListener('click', function() {
                // Focus on the search input
                kolSearch.focus();
            });
        }
        
        // Check if we need to show empty state
        checkEmptyState();
    } catch (error) {
        console.error('Error initializing KOL management:', error);
    }
}

// Handle adding a new KOL
function handleAddKOL(twitterHandle) {
    // In a real app, this would make an API call to fetch the KOL data
    // For demo purposes, we'll create a mock KOL card
    
    // Generate a random avatar letter from the handle
    const avatarLetter = twitterHandle.charAt(1).toUpperCase();
    
    // Create a new KOL card element
    const kolCard = document.createElement('div');
    kolCard.className = 'kol-card';
    kolCard.innerHTML = `
        <div class="kol-tracking-status active">
            <i class="fas fa-circle"></i> Active
        </div>
        <div class="kol-card-header">
            <div class="kol-card-avatar">${avatarLetter}</div>
            <div class="kol-card-info">
                <div class="kol-card-name">${twitterHandle}</div>
                <div class="kol-card-handle">
                    <i class="fab fa-twitter"></i> @${twitterHandle.toLowerCase().replace(/\s+/g, '_')}
                </div>
            </div>
        </div>
        <div class="kol-card-body">
            <div class="kol-card-stats">
                <div class="kol-stat">
                    <div class="kol-stat-value">${Math.floor(Math.random() * 50) + 5}K</div>
                    <div class="kol-stat-label">Followers</div>
                </div>
                <div class="kol-stat">
                    <div class="kol-stat-value">${Math.floor(Math.random() * 30) + 70}%</div>
                    <div class="kol-stat-label">Accuracy</div>
                </div>
                <div class="kol-stat">
                    <div class="kol-stat-value">${Math.floor(Math.random() * 10) + 1}</div>
                    <div class="kol-stat-label">Trades</div>
                </div>
            </div>
            <div class="kol-card-tags">
                <span class="kol-tag">Solana</span>
                <span class="kol-tag">New</span>
            </div>
            <div class="kol-card-actions">
                <button class="kol-action-btn secondary">
                    <i class="fas fa-chart-line"></i> View Stats
                </button>
                <button class="kol-action-btn danger">
                    <i class="fas fa-times"></i> Remove
                </button>
            </div>
        </div>
    `;
    
    // Add hover effects
    kolCard.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = 'var(--thunder-glow)';
    });
    
    kolCard.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = 'var(--glow)';
    });
    
    // Add event listeners to action buttons
    const actionButtons = kolCard.querySelectorAll('.kol-action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('danger')) {
                // Handle remove button click
                handleRemoveKOL(kolCard);
            } else if (this.classList.contains('primary')) {
                // Handle activate button click
                handleActivateKOL(kolCard);
            } else if (this.classList.contains('secondary')) {
                // Handle view stats button click
                handleViewKOLStats(kolCard);
            }
        });
    });
    
    // Add the new card to the grid
    const kolGrid = document.querySelector('.kol-grid');
    kolGrid.insertBefore(kolCard, kolGrid.firstChild);
    
    // Hide empty state if it was showing
    checkEmptyState();
    
    // Show success notification
    window.showNotification(`Added ${twitterHandle} to your KOL list`, 'success');
}

// Handle removing a KOL
function handleRemoveKOL(kolCard) {
    // Get the KOL name for the notification
    const kolName = kolCard.querySelector('.kol-card-name').textContent;
    
    // Add a fade-out animation
    kolCard.style.opacity = '0';
    kolCard.style.transform = 'scale(0.8)';
    
    // Remove the card after animation completes
    setTimeout(() => {
        kolCard.remove();
        
        // Check if we need to show empty state
        checkEmptyState();
        
        // Show notification
        window.showNotification(`Removed ${kolName} from your KOL list`, 'info');
    }, 300);
}

// Handle activating a KOL
function handleActivateKOL(kolCard) {
    // Get the KOL name for the notification
    const kolName = kolCard.querySelector('.kol-card-name').textContent;
    
    // Update the status
    const statusElement = kolCard.querySelector('.kol-tracking-status');
    statusElement.innerHTML = '<i class="fas fa-circle"></i> Active';
    statusElement.classList.remove('inactive');
    statusElement.classList.add('active');
    
    // Update the button
    const activateButton = kolCard.querySelector('.kol-action-btn.primary');
    activateButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
    activateButton.classList.remove('primary');
    activateButton.classList.add('secondary');
    
    // Update event listener
    activateButton.addEventListener('click', function() {
        handlePauseKOL(kolCard);
    });
    
    // Show notification
    window.showNotification(`Activated tracking for ${kolName}`, 'success');
}

// Handle pausing a KOL
function handlePauseKOL(kolCard) {
    // Get the KOL name for the notification
    const kolName = kolCard.querySelector('.kol-card-name').textContent;
    
    // Update the status
    const statusElement = kolCard.querySelector('.kol-tracking-status');
    statusElement.innerHTML = '<i class="fas fa-circle"></i> Inactive';
    statusElement.classList.remove('active');
    statusElement.classList.add('inactive');
    
    // Update the button
    const pauseButton = kolCard.querySelector('.kol-action-btn.secondary:not(:first-child)');
    if (pauseButton) {
        pauseButton.innerHTML = '<i class="fas fa-play"></i> Activate';
        pauseButton.classList.remove('secondary');
        pauseButton.classList.add('primary');
        
        // Update event listener
        pauseButton.addEventListener('click', function() {
            handleActivateKOL(kolCard);
        });
    }
    
    // Show notification
    window.showNotification(`Paused tracking for ${kolName}`, 'info');
}

// Handle viewing KOL stats
function handleViewKOLStats(kolCard) {
    // Get the KOL name
    const kolName = kolCard.querySelector('.kol-card-name').textContent;
    
    // In a real app, this would open a detailed stats view
    // For demo purposes, we'll just show a notification
    window.showNotification(`Viewing detailed stats for ${kolName}`, 'info');
}

// Check if we need to show the empty state
function checkEmptyState() {
    const kolGrid = document.querySelector('.kol-grid');
    const kolCards = kolGrid.querySelectorAll('.kol-card');
    const emptyState = document.querySelector('.kol-empty-state');
    
    if (kolCards.length === 0 && emptyState) {
        emptyState.style.display = 'block';
    } else if (emptyState) {
        emptyState.style.display = 'none';
    }
}

// Setup Settings Buttons
function setupSettingsButtons() {
    // Settings buttons
    const saveSettingsBtn = document.querySelector('.save-settings');
    const resetSettingsBtn = document.querySelector('.reset-settings');
    
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // Collect all settings values
            const settings = {
                maxTradeSize: document.getElementById('maxTradeSize').value,
                riskLevel: document.getElementById('riskLevel').value,
                autoTrading: document.getElementById('autoTrading').checked,
                sentimentThreshold: document.getElementById('sentimentThreshold').value,
                responseTime: document.getElementById('responseTime').value,
                tokenDetection: document.getElementById('tokenDetection').checked,
                tweetAlerts: document.getElementById('tweetAlerts').checked,
                tradeAlerts: document.getElementById('tradeAlerts').checked,
                priceAlerts: document.getElementById('priceAlerts').checked,
                alertMethod: document.getElementById('alertMethod').value
            };
            
            // Save settings (in a real app, this would save to a database or localStorage)
            console.log('Saving settings:', settings);
            localStorage.setItem('harvestAISettings', JSON.stringify(settings));
            
            // Show success message
            window.showNotification('Settings saved successfully!', 'success');
        });
    }
    
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function() {
            // Reset to default values
            document.getElementById('maxTradeSize').value = '1.0';
            document.getElementById('riskLevel').value = 'moderate';
            document.getElementById('autoTrading').checked = true;
            document.getElementById('sentimentThreshold').value = '65';
            document.getElementById('responseTime').value = '5';
            document.getElementById('tokenDetection').checked = true;
            document.getElementById('tweetAlerts').checked = true;
            document.getElementById('tradeAlerts').checked = true;
            document.getElementById('priceAlerts').checked = false;
            document.getElementById('alertMethod').value = 'both';
            
            // Update range value display
            const rangeValue = document.querySelector('.range-value');
            if (rangeValue) {
                rangeValue.textContent = '65';
            }
            
            // Show success message
            window.showNotification('Settings reset to default values', 'info');
        });
    }
}

// Load saved settings from localStorage
function loadSavedSettings() {
    const savedSettings = localStorage.getItem('harvestAISettings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Apply saved settings to form elements
        if (settings.maxTradeSize) document.getElementById('maxTradeSize').value = settings.maxTradeSize;
        if (settings.riskLevel) document.getElementById('riskLevel').value = settings.riskLevel;
        if (settings.autoTrading !== undefined) document.getElementById('autoTrading').checked = settings.autoTrading;
        if (settings.sentimentThreshold) {
            document.getElementById('sentimentThreshold').value = settings.sentimentThreshold;
            document.querySelector('.range-value').textContent = settings.sentimentThreshold;
        }
        if (settings.responseTime) document.getElementById('responseTime').value = settings.responseTime;
        if (settings.tokenDetection !== undefined) document.getElementById('tokenDetection').checked = settings.tokenDetection;
        if (settings.tweetAlerts !== undefined) document.getElementById('tweetAlerts').checked = settings.tweetAlerts;
        if (settings.tradeAlerts !== undefined) document.getElementById('tradeAlerts').checked = settings.tradeAlerts;
        if (settings.priceAlerts !== undefined) document.getElementById('priceAlerts').checked = settings.priceAlerts;
        if (settings.alertMethod) document.getElementById('alertMethod').value = settings.alertMethod;
    }
}

// Show wallet overlay with proper error handling
function showWalletOverlay() {
    try {
        const overlay = document.getElementById('wallet-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        } else if (typeof window.showWalletOverlay === 'function') {
            // If function exists in parent scope, call it
            window.showWalletOverlay();
        } else {
            console.warn('Wallet overlay element not found and no fallback function available');
        }
    } catch (error) {
        console.error('Error showing wallet overlay:', error);
    }
}
