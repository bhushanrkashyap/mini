// ===== STATE MANAGEMENT =====
let isLoggedIn = false;
let userName = 'User';
let currentView = 'dashboard';
let currentStructure = '';
let arrayData = [];
let stackData = [];
let queueData = [];
let animationSpeed = 500;
let isAnimating = false;

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Get all DOM elements
    getDOMElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Apply initial theme
    applyTheme();
}

// ===== DOM ELEMENTS =====
let landingPage, startLearningBtn, authScreen, loginForm, signupForm;
let showSignupBtn, showLoginBtn, loginNameInput, signupNameInput;
let mainContent, dashboardView, visualizerView, profileView, comparisonView;
let homeLink, backToDashboardBtn, backToDashboardFromProfileBtn, backToDashboardFromCompBtn;
let loginBtn, signupBtn, logoutButton, userProfileBtn, userProfileDropdown;
let dropdownUsername, profileLink, dashboardLink, profileUsername;
let moduleCards, visualizerTitle, arrayVisualizer, stackVisualizer, queueVisualizer, treeGraphVisualizer;
let algorithmSelect, speedControl, algoSpecificControls, startBtn, resetBtn, speedSlider;
let visualizerNavBtns, arrayManualControls, manualArrayInput, loadManualArrayBtn;
let startComparisonBtn, algo1Select, algo2Select, compVisualizer1, compVisualizer2;
let compArrayInput, runComparisonBtn, resetComparisonBtn;
let themeToggleBtn, themeToggleDarkIcon, themeToggleLightIcon;
let html;

function getDOMElements() {
    landingPage = document.getElementById('landing-page');
    startLearningBtn = document.getElementById('start-learning-btn');
    authScreen = document.getElementById('auth-screen');
    loginForm = document.getElementById('login-form');
    signupForm = document.getElementById('signup-form');
    showSignupBtn = document.getElementById('show-signup');
    showLoginBtn = document.getElementById('show-login');
    loginNameInput = document.getElementById('login-name');
    signupNameInput = document.getElementById('signup-name');
    mainContent = document.getElementById('main-content');
    dashboardView = document.getElementById('dashboard-view');
    visualizerView = document.getElementById('visualizer-view');
    profileView = document.getElementById('profile-view');
    comparisonView = document.getElementById('comparison-view');
    
    homeLink = document.getElementById('home-link');
    backToDashboardBtn = document.getElementById('back-to-dashboard');
    backToDashboardFromProfileBtn = document.getElementById('back-to-dashboard-from-profile');
    backToDashboardFromCompBtn = document.getElementById('back-to-dashboard-from-comp');
    
    loginBtn = document.getElementById('loginBtn');
    signupBtn = document.getElementById('signupBtn');
    logoutButton = document.getElementById('logoutButton');
    userProfileBtn = document.getElementById('user-profile-btn');
    userProfileDropdown = document.getElementById('user-profile-dropdown');
    dropdownUsername = document.getElementById('dropdown-username');
    profileLink = document.getElementById('profile-link');
    dashboardLink = document.getElementById('dashboard-link');
    profileUsername = document.getElementById('profile-username');
    
    moduleCards = document.querySelectorAll('#modules .card');
    
    visualizerTitle = document.getElementById('visualizer-title');
    arrayVisualizer = document.getElementById('array-visualizer');
    stackVisualizer = document.getElementById('stack-visualizer');
    queueVisualizer = document.getElementById('queue-visualizer');
    treeGraphVisualizer = document.getElementById('tree-graph-visualizer');

    algorithmSelect = document.getElementById('algorithm-select');
    speedControl = document.getElementById('speed-control');
    algoSpecificControls = document.getElementById('algo-specific-controls');
    startBtn = document.getElementById('start-btn');
    resetBtn = document.getElementById('reset-btn');
    speedSlider = document.getElementById('speed-slider');
    visualizerNavBtns = document.querySelectorAll('.visualizer-nav-btn');
    arrayManualControls = document.getElementById('array-manual-controls');
    manualArrayInput = document.getElementById('manual-array-input');
    loadManualArrayBtn = document.getElementById('load-manual-array-btn');

    startComparisonBtn = document.getElementById('start-comparison-btn');
    algo1Select = document.getElementById('algo1-select');
    algo2Select = document.getElementById('algo2-select');
    compVisualizer1 = document.getElementById('comp-visualizer-1');
    compVisualizer2 = document.getElementById('comp-visualizer-2');
    compArrayInput = document.getElementById('comp-array-input');
    runComparisonBtn = document.getElementById('run-comparison-btn');
    resetComparisonBtn = document.getElementById('reset-comparison-btn');

    themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    html = document.documentElement;
}

// ===== ALGORITHM/OPERATIONS MAPPING =====
const structureOptions = {
    arrays: { 
        title: "Array & Algorithm Visualizer", 
        algorithms: [
            "Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort",
            "Linear Search", "Binary Search", 
            "Insert", "Delete"
        ] 
    },
    stacks: { title: "Stack Visualizer", algorithms: ["Push", "Pop"] },
    queues: { title: "Queue Visualizer", algorithms: ["Enqueue", "Dequeue"] },
    trees: { title: "Tree Visualizer", algorithms: ["BST Insert", "BST Search", "In-order Traversal"] },
    graphs: { title: "Graph Visualizer", algorithms: ["Breadth-First Search", "Depth-First Search"] }
};

// ===== COMPLEXITY MAPPING =====
    // Detailed complexity mapping for algorithms
    const complexityMap = {
        'Bubble Sort': {
            time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
            space: 'O(1)',
            stable: true,
            description: 'Repeatedly swaps adjacent elements if they are in wrong order'
        },
        'Selection Sort': {
            time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
            space: 'O(1)',
            stable: false,
            description: 'Finds minimum element and places it at the beginning'
        },
        'Insertion Sort': {
            time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
            space: 'O(1)',
            stable: true,
            description: 'Builds sorted array one item at a time by inserting elements'
        },
        'Merge Sort': {
            time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
            space: 'O(n)',
            stable: true,
            description: 'Divides array into halves, sorts them and merges back'
        },
        'Quick Sort': {
            time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
            space: 'O(log n)',
            stable: false,
            description: 'Picks pivot and partitions array around it recursively'
        },
        'Heap Sort': {
            time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
            space: 'O(1)',
            stable: false,
            description: 'Builds max heap and extracts maximum elements repeatedly'
        },
        'JavaScript Built-in': {
            time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
            space: 'O(log n)',
            stable: true,
            description: 'Optimized Timsort (hybrid of merge sort and insertion sort)'
        }
    };

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    // Authentication
    startLearningBtn.addEventListener('click', handleStartLearning);
    showSignupBtn.addEventListener('click', handleShowSignup);
    showLoginBtn.addEventListener('click', handleShowLogin);
    loginBtn.addEventListener('click', handleLogin);
    signupBtn.addEventListener('click', handleSignup);
    logoutButton.addEventListener('click', handleLogout);
    
    // Profile dropdown
    userProfileBtn.addEventListener('click', toggleProfileDropdown);
    window.addEventListener('click', handleOutsideClick);
    
    // Navigation
    homeLink.addEventListener('click', (e) => { e.preventDefault(); showDashboard(); });
    dashboardLink.addEventListener('click', (e) => { e.preventDefault(); showDashboard(); });
    profileLink.addEventListener('click', (e) => { e.preventDefault(); showProfile(); });
    startComparisonBtn.addEventListener('click', showComparison);
    backToDashboardBtn.addEventListener('click', showDashboard);
    backToDashboardFromProfileBtn.addEventListener('click', showDashboard);
    backToDashboardFromCompBtn.addEventListener('click', showDashboard);
    
    // Module cards
    moduleCards.forEach(card => {
        card.addEventListener('click', () => showVisualizer(card.dataset.structure));
    });
    
    // Visualizer navigation
    visualizerNavBtns.forEach(btn => {
        btn.addEventListener('click', () => showVisualizer(btn.dataset.structure));
    });
    
    // Algorithm controls
    loadManualArrayBtn.addEventListener('click', loadManualArray);
    startBtn.addEventListener('click', runAlgorithm);
    resetBtn.addEventListener('click', resetData);
    algorithmSelect.addEventListener('change', updateAlgoSpecificControls);
    speedSlider.addEventListener('input', handleSpeedChange);
    
    // Comparison
    runComparisonBtn.addEventListener('click', runComparison);
    resetComparisonBtn.addEventListener('click', resetComparison);
    
    // Theme
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Window resize
    window.addEventListener('resize', handleWindowResize);
}

// ===== THEME MANAGEMENT =====
function applyTheme() {
    const isDark = localStorage.getItem('color-theme') === 'dark' || 
                   (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
        html.classList.add('dark');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
        html.classList.remove('dark');
    }
}

function toggleTheme() {
    html.classList.toggle('dark');
    localStorage.setItem('color-theme', html.classList.contains('dark') ? 'dark' : 'light');
    applyTheme();
    if(currentView === 'visualizer') renderCurrentStructure();
}

// ===== AUTHENTICATION HANDLERS =====
function handleStartLearning() {
    landingPage.classList.add('hidden');
    landingPage.classList.add('fade-in');
    
    if (isLoggedIn) {
        mainContent.classList.remove('hidden');
        showDashboard();
    } else {
        // Auto-login for demo purposes
        performLogin('Demo User');
    }
}

function performLogin(name) {
    isLoggedIn = true;
    userName = name || 'User';
    dropdownUsername.textContent = userName;
    profileUsername.textContent = userName;
    authScreen.classList.add('hidden');
    authScreen.classList.remove('flex');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('fade-in');
    showDashboard();
}

function handleShowSignup(e) {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
}

function handleShowLogin(e) {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
}

function handleLogin() {
    const name = loginNameInput.value.trim();
    if (name) performLogin(name);
}

function handleSignup() {
    const name = signupNameInput.value.trim();
    if (name) performLogin(name);
}

function handleLogout() {
    isLoggedIn = false;
    mainContent.classList.add('hidden');
    landingPage.classList.remove('hidden');
    currentView = 'landing';
}

function toggleProfileDropdown() {
    userProfileDropdown.classList.toggle('hidden');
}

function handleOutsideClick(e) {
    if (!userProfileBtn.contains(e.target) && !userProfileDropdown.contains(e.target)) {
        userProfileDropdown.classList.add('hidden');
    }
}

// ===== NAVIGATION & VIEW MANAGEMENT =====
function hideAllViews() {
    [dashboardView, visualizerView, profileView, comparisonView].forEach(v => {
        v.classList.add('hidden');
    });
}

function showDashboard() {
    hideAllViews();
    dashboardView.classList.remove('hidden');
    dashboardView.classList.add('fade-in');
    currentView = 'dashboard';
}

function showProfile() {
    hideAllViews();
    profileView.classList.remove('hidden');
    profileView.classList.add('fade-in');
    currentView = 'profile';
}

function showComparison() {
    hideAllViews();
    comparisonView.classList.remove('hidden');
    comparisonView.classList.add('fade-in');
    currentView = 'comparison';
    setupComparisonView();
}

function showVisualizer(structure) {
    currentStructure = structure;
    hideAllViews();
    visualizerView.classList.remove('hidden');
    visualizerView.classList.add('fade-in');
    currentView = 'visualizer';
    
    visualizerNavBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.structure === structure);
    });
    
    [arrayVisualizer, stackVisualizer, queueVisualizer, treeGraphVisualizer].forEach(v => {
        v.classList.add('hidden');
    });

    const options = structureOptions[structure];
    visualizerTitle.textContent = options.title;
    algorithmSelect.innerHTML = options.algorithms.map(alg => `<option>${alg}</option>`).join('');

    arrayManualControls.classList.add('hidden');
    
    if (structure === 'arrays') {
        arrayVisualizer.classList.remove('hidden');
        arrayManualControls.classList.remove('hidden');
        speedControl.classList.remove('hidden');
        resetBtn.textContent = 'New Array';
    } else if (structure === 'stacks' || structure === 'queues') {
        const visualizer = structure === 'stacks' ? stackVisualizer : queueVisualizer;
        visualizer.classList.remove('hidden');
        speedControl.classList.add('hidden');
        resetBtn.textContent = structure === 'stacks' ? 'Clear Stack' : 'Clear Queue';
    } else { 
        treeGraphVisualizer.classList.remove('hidden');
        speedControl.classList.add('hidden');
    }
    
    updateAlgoSpecificControls();
    resetData();
}

// ===== DATA MANAGEMENT =====
function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms)); 
}

function resetData() {
    isAnimating = false;
    
    if (currentStructure === 'arrays') {
        const size = Math.floor(arrayVisualizer.clientWidth / 60);
        arrayData = d3.shuffle(d3.range(1, Math.max(5, size)));
    } else if (currentStructure === 'stacks') {
        stackData = [3, 1, 4];
    } else if (currentStructure === 'queues') {
        queueData = [3, 1, 4];
    }
    
    renderCurrentStructure();
}

function renderCurrentStructure() {
    if (currentStructure === 'arrays') renderArray(arrayData, "#array-visualizer");
    if (currentStructure === 'stacks') renderStack();
    if (currentStructure === 'queues') renderQueue();
}

function loadManualArray() {
    const input = manualArrayInput.value.trim();
    if (input) {
        const parsed = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        if (parsed.length > 0) {
            arrayData = parsed;
            renderArray(arrayData, "#array-visualizer");
        }
    }
}

// ===== ARRAY RENDERING =====
function renderArray(data, containerSelector, pointers = {}) {
    const canvas = d3.select(containerSelector);
    canvas.html("");
    
    const selection = canvas.selectAll("div.data-box")
        .data(data, (d, i) => i) 
        .enter()
        .append("div")
        .attr("class", "data-box")
        .text(d => d);

    selection.each(function(d, i) {
        if (pointers[i]) {
            const pointerLabels = Array.isArray(pointers[i]) ? pointers[i] : [pointers[i]];
            pointerLabels.forEach((label, labelIndex) => {
                d3.select(this).append('span')
                    .attr('class', 'pointer-text')
                    .style('bottom', (-25 - (labelIndex * 20)) + 'px')
                    .text(label);
            });
        }
    });

    updateColors(containerSelector);
}

// ===== ANIMATED SORTING ALGORITHMS =====
async function bubbleSort(arr, helpers) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if(!isAnimating) { helpers.render(arr); return; }
            
            helpers.highlight(j, j + 1, "var(--secondary-light)");
            await sleep(animationSpeed);
            
            if (arr[j] > arr[j + 1]) {
                helpers.highlight(j, j + 1, "red");
                await sleep(animationSpeed);
                
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                helpers.render(arr);
                helpers.highlight(j, j + 1, "red");
                await sleep(animationSpeed);
            }
            
            helpers.unhighlight(j, j+1);
        }
    }
    helpers.render(arr);
}

// Selection Sort - Animated
async function selectionSort(arr, helpers) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        if(!isAnimating) { helpers.render(arr); return; }
        
        let minIdx = i;
        helpers.highlight(i, i, '#10b981'); // Green for current position
        await sleep(animationSpeed);
        
        for (let j = i + 1; j < n; j++) {
            if(!isAnimating) { helpers.render(arr); return; }
            
            helpers.highlight(j, j, '#f59e0b'); // Orange for scanning
            await sleep(animationSpeed * 0.7);
            
            if (arr[j] < arr[minIdx]) {
                if (minIdx !== i) helpers.unhighlight(minIdx, minIdx);
                minIdx = j;
                helpers.highlight(minIdx, minIdx, '#ef4444'); // Red for current minimum
            } else {
                helpers.unhighlight(j, j);
            }
        }
        
        if (minIdx !== i) {
            helpers.highlight(i, minIdx, '#dc2626'); // Dark red for swap
            await sleep(animationSpeed);
            
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            helpers.render(arr);
            await sleep(animationSpeed);
        }
        
        helpers.unhighlight(i, minIdx);
    }
    helpers.render(arr);
}

// Insertion Sort - Animated
async function insertionSort(arr, helpers) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        if(!isAnimating) { helpers.render(arr); return; }
        
        const key = arr[i];
        let j = i - 1;
        
        helpers.highlight(i, i, '#10b981'); // Green for element to insert
        await sleep(animationSpeed);
        
        while (j >= 0 && arr[j] > key) {
            if(!isAnimating) { helpers.render(arr); return; }
            
            helpers.highlight(j, j + 1, '#f59e0b'); // Orange for shifting
            await sleep(animationSpeed * 0.8);
            
            arr[j + 1] = arr[j];
            helpers.render(arr);
            await sleep(animationSpeed * 0.5);
            
            helpers.unhighlight(j, j + 1);
            j--;
        }
        
        arr[j + 1] = key;
        helpers.render(arr);
        helpers.highlight(j + 1, j + 1, 'lightgreen');
        await sleep(animationSpeed * 0.5);
        helpers.unhighlight(j + 1, j + 1);
    }
    helpers.render(arr);
}

// Merge Sort - Enhanced visualization showing divide, sort, and merge
async function mergeSort(arr, helpers, start = 0, end = null) {
    if (end === null) end = arr.length - 1;
    if (start >= end) return;
    if(!isAnimating) { helpers.render(arr); return; }
    
    const mid = Math.floor((start + end) / 2);
    
    // Step 1: Show DIVIDE phase - highlight the section being divided
    helpers.highlightRange(start, end, '#e0e7ff'); // Light blue background for division
    const dividePointers = {};
    dividePointers[start] = '⬇️DIV';
    dividePointers[mid] = '⬇️MID';
    dividePointers[end] = '⬇️DIV';
    helpers.render(arr, dividePointers);
    await sleep(animationSpeed * 1.5);
    
    // Show left section
    helpers.highlightRange(start, mid, '#a78bfa'); // Purple for left half
    const leftPointers = {};
    leftPointers[start] = '←LEFT';
    leftPointers[mid] = '←LEFT';
    helpers.render(arr, leftPointers);
    await sleep(animationSpeed);
    helpers.unhighlightRange(start, mid);
    
    // Show right section
    helpers.highlightRange(mid + 1, end, '#fbbf24'); // Yellow for right half
    const rightPointers = {};
    rightPointers[mid + 1] = 'RIGHT→';
    rightPointers[end] = 'RIGHT→';
    helpers.render(arr, rightPointers);
    await sleep(animationSpeed);
    helpers.unhighlightRange(mid + 1, end);
    
    // Step 2: Recursively SORT left and right halves
    await mergeSort(arr, helpers, start, mid);
    await mergeSort(arr, helpers, mid + 1, end);
    
    // Step 3: MERGE the sorted halves
    await merge(arr, helpers, start, mid, end);
}

async function merge(arr, helpers, start, mid, end) {
    if(!isAnimating) return;
    
    const leftArr = arr.slice(start, mid + 1);
    const rightArr = arr.slice(mid + 1, end + 1);
    
    // Show the two sorted subarrays before merging
    helpers.highlightRange(start, mid, '#c7d2fe'); // Light purple for sorted left
    helpers.highlightRange(mid + 1, end, '#fef3c7'); // Light yellow for sorted right
    const premergePointers = {};
    premergePointers[start] = `L[${leftArr.join(',')}]`;
    premergePointers[mid + 1] = `R[${rightArr.join(',')}]`;
    helpers.render(arr, premergePointers);
    await sleep(animationSpeed * 1.2);
    
    let i = 0, j = 0, k = start;
    
    // Highlight the merge area
    helpers.highlightRange(start, end, '#d1fae5'); // Light green for merge area
    const mergePointers = {};
    mergePointers[start] = '⬇️MERGE';
    mergePointers[end] = '⬇️MERGE';
    helpers.render(arr, mergePointers);
    await sleep(animationSpeed);
    
    // Merge process with detailed visualization
    while (i < leftArr.length && j < rightArr.length) {
        if(!isAnimating) return;
        
        const mergeProgress = {};
        mergeProgress[k] = `⬇️${k - start + 1}/${end - start + 1}`;
        
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            helpers.render(arr, mergeProgress);
            helpers.highlight(k, k, '#10b981'); // Green for placed from left
            await sleep(animationSpeed);
            i++;
        } else {
            arr[k] = rightArr[j];
            helpers.render(arr, mergeProgress);
            helpers.highlight(k, k, '#34d399'); // Lighter green for placed from right
            await sleep(animationSpeed);
            j++;
        }
        k++;
    }
    
    // Copy remaining elements from left array
    while (i < leftArr.length) {
        if(!isAnimating) return;
        arr[k] = leftArr[i];
        const mergeProgress = {};
        mergeProgress[k] = `⬇️${k - start + 1}/${end - start + 1}`;
        helpers.render(arr, mergeProgress);
        helpers.highlight(k, k, '#10b981');
        await sleep(animationSpeed * 0.7);
        i++;
        k++;
    }
    
    // Copy remaining elements from right array
    while (j < rightArr.length) {
        if(!isAnimating) return;
        arr[k] = rightArr[j];
        const mergeProgress = {};
        mergeProgress[k] = `⬇️${k - start + 1}/${end - start + 1}`;
        helpers.render(arr, mergeProgress);
        helpers.highlight(k, k, '#34d399');
        await sleep(animationSpeed * 0.7);
        j++;
        k++;
    }
    
    // Show final merged section
    helpers.highlightRange(start, end, '#10b981'); // Green for fully merged
    const finalPointers = {};
    finalPointers[start] = '✅MERGED';
    finalPointers[end] = '✅MERGED';
    helpers.render(arr, finalPointers);
    await sleep(animationSpeed * 1.2);
    
    helpers.unhighlightRange(start, end);
}

// Quick Sort - Animated with pivot visualization
async function quickSort(arr, helpers, low = 0, high = null) {
    if (high === null) high = arr.length - 1;
    if (low < high) {
        if(!isAnimating) { helpers.render(arr); return; }
        
        const pi = await partition(arr, helpers, low, high);
        await quickSort(arr, helpers, low, pi - 1);
        await quickSort(arr, helpers, pi + 1, high);
    }
}

async function partition(arr, helpers, low, high) {
    if(!isAnimating) return high;
    
    const pivot = arr[high];
    
    // Highlight pivot
    helpers.highlight(high, high, '#a78bfa'); // Purple for pivot
    await sleep(animationSpeed);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if(!isAnimating) return high;
        
        helpers.highlight(j, j, '#f59e0b'); // Orange for current element
        await sleep(animationSpeed * 0.7);
        
        if (arr[j] < pivot) {
            i++;
            
            if (i !== j) {
                helpers.highlight(i, j, '#ef4444'); // Red for swap
                await sleep(animationSpeed * 0.8);
                
                [arr[i], arr[j]] = [arr[j], arr[i]];
                helpers.render(arr);
                await sleep(animationSpeed * 0.5);
            }
        }
        
        helpers.unhighlight(j, j);
    }
    
    // Place pivot in correct position
    i++;
    helpers.highlight(i, high, '#10b981'); // Green for final swap
    await sleep(animationSpeed);
    
    [arr[i], arr[high]] = [arr[high], arr[i]];
    helpers.render(arr);
    await sleep(animationSpeed);
    
    helpers.unhighlight(i, high);
    
    return i;
}

// Heap Sort - Shows actual heap tree construction
async function heapSort(arr, helpers) {
    const n = arr.length;
    
    // Step 1: Build max heap - show tree structure
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if(!isAnimating) { helpers.render(arr); return; }
        await heapify(arr, helpers, n, i, true);
    }
    
    // Show completed max heap with tree structure
    const heapPointers = buildHeapTreePointers(arr, n);
    helpers.highlightRange(0, n - 1, '#10b981');
    helpers.render(arr, heapPointers);
    await sleep(animationSpeed * 2);
    helpers.unhighlightRange(0, n - 1);
    
    // Step 2: Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        if(!isAnimating) { helpers.render(arr); return; }
        
        // Swap root with last element
        helpers.highlight(0, i, '#ef4444');
        await sleep(animationSpeed);
        
        [arr[0], arr[i]] = [arr[i], arr[0]];
        helpers.render(arr);
        await sleep(animationSpeed * 0.8);
        
        // Mark as sorted
        helpers.highlight(i, i, '#10b981');
        await sleep(animationSpeed * 0.5);
        
        // Heapify the reduced heap
        await heapify(arr, helpers, i, 0, false);
    }
    
    helpers.render(arr);
}

// Build visual representation of heap tree
function buildHeapTreePointers(arr, n) {
    const pointers = {};
    for (let i = 0; i < n; i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let label = '';
        
        if (i === 0) {
            label = 'Root';
        } else {
            const parent = Math.floor((i - 1) / 2);
            if (2 * parent + 1 === i) {
                label = '↙L';
            } else {
                label = '↘R';
            }
        }
        pointers[i] = label;
    }
    return pointers;
}

async function heapify(arr, helpers, n, i, isBuildPhase) {
    if(!isAnimating) return;
    
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Show parent-child relationship in heap tree
    const heapPointers = {};
    heapPointers[i] = `P:${arr[i]}`;
    if (left < n) heapPointers[left] = `L:${arr[left]}`;
    if (right < n) heapPointers[right] = `R:${arr[right]}`;
    
    helpers.render(arr, heapPointers);
    
    // Highlight the subtree
    const toHighlight = [i];
    if (left < n) toHighlight.push(left);
    if (right < n) toHighlight.push(right);
    
    toHighlight.forEach(idx => helpers.highlight(idx, idx, '#fef3c7'));
    await sleep(animationSpeed);
    
    // Find largest
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
        helpers.highlight(left, left, '#fbbf24');
        await sleep(animationSpeed * 0.5);
    }
    
    if (right < n && arr[right] > arr[largest]) {
        if (largest !== i) helpers.highlight(largest, largest, '#fef3c7');
        largest = right;
        helpers.highlight(right, right, '#fbbf24');
        await sleep(animationSpeed * 0.5);
    }
    
    if (largest !== i) {
        // Show the swap in heap structure
        const swapPointers = {};
        swapPointers[i] = `⇅ ${arr[i]}`;
        swapPointers[largest] = `⇅ ${arr[largest]}`;
        helpers.render(arr, swapPointers);
        helpers.highlight(i, largest, '#a78bfa');
        await sleep(animationSpeed);
        
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        
        // Show updated heap
        const updatedPointers = {};
        updatedPointers[i] = `P:${arr[i]}`;
        if (left < n) updatedPointers[left] = `L:${arr[left]}`;
        if (right < n) updatedPointers[right] = `R:${arr[right]}`;
        helpers.render(arr, updatedPointers);
        await sleep(animationSpeed * 0.8);
        
        toHighlight.forEach(idx => helpers.unhighlight(idx, idx));
        
        // Recursively heapify the affected subtree
        await heapify(arr, helpers, n, largest, isBuildPhase);
    } else {
        toHighlight.forEach(idx => helpers.unhighlight(idx, idx));
    }
}

// Linear Search - Animated with clean UI
async function linearSearch(helpers) {
    const target = parseInt(document.getElementById('search-value').value);
    
    if (isNaN(target)) {
        alert('Please enter a valid search value!');
        return;
    }
    
    for (let i = 0; i < arrayData.length; i++) {
        if(!isAnimating) { helpers.render(arrayData); return; }
        
        helpers.highlight(i, i, '#f59e0b'); // Orange for checking
        await sleep(animationSpeed);
        
        if (arrayData[i] === target) {
            // Found! Just highlight green
            helpers.highlight(i, i, '#10b981'); // Green for found
            helpers.render(arrayData);
            await sleep(animationSpeed * 3);
            helpers.unhighlight(i, i);
            helpers.render(arrayData);
            return;
        }
        
        helpers.unhighlight(i, i);
    }
    
    // Not found
    helpers.highlightRange(0, arrayData.length - 1, '#fee2e2');
    helpers.render(arrayData);
    await sleep(animationSpeed * 2);
    helpers.unhighlightRange(0, arrayData.length - 1);
    helpers.render(arrayData);
}

// Binary Search - Animated with clean UI
async function binarySearch(helpers) {
    const target = parseInt(document.getElementById('search-value').value);
    
    if (isNaN(target)) {
        alert('Please enter a valid search value!');
        return;
    }
    
    // Sort the array silently
    arrayData.sort((a, b) => a - b);
    helpers.render(arrayData);
    await sleep(animationSpeed * 0.5);
    
    let left = 0;
    let right = arrayData.length - 1;
    
    while (left <= right) {
        if(!isAnimating) { helpers.render(arrayData); return; }
        
        const mid = Math.floor((left + right) / 2);
        
        // Highlight search range and show pointers
        helpers.highlightRange(left, right, '#e0e7ff');
        const pointers = { 
            [left]: 'L', 
            [right]: 'R', 
            [mid]: `M=${arrayData[mid]}` 
        };
        helpers.render(arrayData, pointers);
        helpers.highlight(mid, mid, '#f59e0b');
        await sleep(animationSpeed * 1.2);
        
        if (arrayData[mid] === target) {
            // Found! Just highlight green
            helpers.highlight(mid, mid, '#10b981');
            helpers.render(arrayData);
            await sleep(animationSpeed * 3);
            helpers.unhighlightRange(0, arrayData.length - 1);
            helpers.render(arrayData);
            return;
        }
        
        if (arrayData[mid] < target) {
            // Search right half
            helpers.unhighlightRange(left, mid);
            left = mid + 1;
        } else {
            // Search left half
            helpers.unhighlightRange(mid, right);
            right = mid - 1;
        }
    }
    
    // Not found
    helpers.highlightRange(0, arrayData.length - 1, '#fee2e2');
    helpers.render(arrayData);
    await sleep(animationSpeed * 2);
    helpers.unhighlightRange(0, arrayData.length - 1);
    helpers.render(arrayData);
}

// ===== PURE (NON-ANIMATED) SORTING ALGORITHMS =====
function bubbleSortSync(arr) {
    let a = arr.slice();
    let n = a.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j+1]) [a[j], a[j+1]] = [a[j+1], a[j]];
        }
    }
    return a;
}

function selectionSortSync(arr) {
    let a = arr.slice();
    for (let i = 0; i < a.length; i++) {
        let minIdx = i;
        for (let j = i+1; j < a.length; j++) {
            if (a[j] < a[minIdx]) minIdx = j;
        }
        if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
    return a;
}

function insertionSortSync(arr) {
    let a = arr.slice();
    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j+1] = a[j];
            j--;
        }
        a[j+1] = key;
    }
    return a;
}

function mergeSortSync(arr) {
    if (arr.length <= 1) return arr.slice();
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortSync(arr.slice(0, mid));
    const right = mergeSortSync(arr.slice(mid));
    const res = [];
    
    let i = 0, j = 0;
    while(i < left.length && j < right.length) {
        if (left[i] <= right[j]) res.push(left[i++]); 
        else res.push(right[j++]);
    }
    
    while(i < left.length) res.push(left[i++]);
    while(j < right.length) res.push(right[j++]);
    
    return res;
}

function quickSortSync(arr) {
    if (arr.length <= 1) return arr.slice();
    
    const a = arr.slice();
    const pivot = a[Math.floor(a.length/2)];
    const left = a.filter(x => x < pivot);
    const middle = a.filter(x => x === pivot);
    const right = a.filter(x => x > pivot);
    
    return quickSortSync(left).concat(middle, quickSortSync(right));
}

function heapSortSync(arr) {
    let a = arr.slice();
    
    function heapify(n, i) {
        let largest = i;
        const l = 2*i + 1;
        const r = 2*i + 2;
        
        if (l < n && a[l] > a[largest]) largest = l;
        if (r < n && a[r] > a[largest]) largest = r;
        
        if (largest !== i) {
            [a[i], a[largest]] = [a[largest], a[i]];
            heapify(n, largest);
        }
    }
    
    const n = a.length;
    for (let i = Math.floor(n/2) - 1; i >= 0; i--) heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
        [a[0], a[i]] = [a[i], a[0]];
        heapify(i, 0);
    }
    
    return a;
}

function getPureSortByName(name) {
    const sortFunctions = {
        'Bubble Sort': bubbleSortSync,
        'Selection Sort': selectionSortSync,
        'Insertion Sort': insertionSortSync,
        'Merge Sort': mergeSortSync,
        'Quick Sort': quickSortSync,
        'Heap Sort': heapSortSync,
        'JS Built-in Sort': (arr) => arr.slice().sort((a,b) => a-b)
    };
    
    return sortFunctions[name] || sortFunctions['JS Built-in Sort'];
}

// ===== ARRAY OPERATIONS =====
async function insertElement(helpers) {
    const val = parseInt(document.getElementById('value-to-insert').value);
    const index = parseInt(document.getElementById('index-to-insert').value);

    if (isNaN(val) || isNaN(index) || index < 0 || index > arrayData.length) {
        alert('Please enter valid value and index!');
        return;
    }
    
    arrayData.splice(index, 0, val);
    helpers.render(arrayData);
    await sleep(animationSpeed);
    helpers.highlight(index, index, 'lightgreen');
}

async function deleteElement(helpers) {
    const index = parseInt(document.getElementById('index-to-delete').value);
    
    if (isNaN(index) || index < 0 || index >= arrayData.length) {
        alert('Please enter a valid index!');
        return;
    }
    
    helpers.highlight(index, index, 'red');
    await sleep(animationSpeed);
    
    arrayData.splice(index, 1);
    helpers.render(arrayData);
}

async function twoPointers(helpers) {
    const target = parseInt(document.getElementById('target-sum').value);
    if (isNaN(target)) {
        alert('Please enter a valid target sum!');
        return;
    }

    let arr = [...arrayData].sort((a,b) => a - b);
    helpers.render(arr);
    await sleep(animationSpeed * 2);

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        if(!isAnimating) { helpers.render(arr); return; }
        
        helpers.render(arr, { [left]: 'L', [right]: 'R' });
        helpers.highlight(left, right, 'var(--secondary-light)');
        await sleep(animationSpeed);

        const sum = arr[left] + arr[right];
        if (sum === target) {
            helpers.highlight(left, right, 'lightgreen');
            return;
        } else if (sum < target) {
            helpers.unhighlight(left, right);
            left++;
        } else {
            helpers.unhighlight(left, right);
            right--;
        }
    }
    
    helpers.render(arr);
}

async function slidingWindow(helpers) {
    const k = parseInt(document.getElementById('window-size').value);
    
    if (isNaN(k) || k <= 0 || k > arrayData.length) {
        alert('Please enter a valid window size!');
        return;
    }

    let maxSum = -Infinity;
    let bestWindowStart = -1;
    let currentSum = 0;

    for(let i = 0; i < k; i++) {
        currentSum += arrayData[i];
    }
    maxSum = currentSum;
    bestWindowStart = 0;

    for (let i = k; i < arrayData.length; i++) {
        if(!isAnimating) { helpers.render(arrayData); return; }
        
        helpers.highlightRange(i - k, i, 'var(--secondary-light)');
        await sleep(animationSpeed);
        
        currentSum = currentSum - arrayData[i - k] + arrayData[i];
        if (currentSum > maxSum) {
            maxSum = currentSum;
            bestWindowStart = i - k + 1;
        }
        helpers.unhighlightRange(i-k, i);
    }
    
    helpers.highlightRange(bestWindowStart, bestWindowStart + k - 1, 'lightgreen');
}

// ===== STACK OPERATIONS =====
function renderStack() {
    console.log('renderStack called, stackData:', stackData);
    const canvas = d3.select("#stack-canvas");
    canvas.html("");
    
    if (stackData.length === 0) {
        console.log('Stack is empty');
        return;
    }
    
    canvas.selectAll("div.data-box")
        .data(stackData, (d, i) => i)
        .enter()
        .append("div")
        .attr("class", "data-box")
        .style("transform", "translateY(50px)")
        .style("opacity", 0)
        .text(d => d)
        .transition()
        .duration(300)
        .style("transform", "translateY(0)")
        .style("opacity", 1);
        
    updateColors("#stack-canvas");
}

async function stackPush() {
    console.log('stackPush called');
    if (isAnimating) {
        console.log('Already animating, returning');
        return;
    }
    
    const inputElement = document.getElementById('value-input');
    let val;
    
    if (inputElement && inputElement.value.trim() !== '') {
        val = parseInt(inputElement.value);
        console.log('Using input value:', val);
    } else {
        const promptVal = prompt('Enter a value to push onto the stack:');
        if (promptVal === null || promptVal.trim() === '') return;
        val = parseInt(promptVal);
        console.log('Using prompt value:', val);
    }
    
    if (isNaN(val)) {
        alert('Please enter a valid number!');
        return;
    }
    
    console.log('Pushing value to stack:', val);
    isAnimating = true;
    stackData.push(val);
    console.log('Stack data after push:', stackData);
    renderStack();
    await sleep(300);
    if (inputElement) inputElement.value = "";
    isAnimating = false;
    console.log('stackPush completed');
}

async function stackPop() {
    console.log('stackPop called');
    if(isAnimating) {
        console.log('Already animating, returning');
        return;
    }
    
    if(stackData.length === 0) {
        alert('Stack is empty!');
        return;
    }
    
    console.log('Popping from stack, current data:', stackData);
    isAnimating = true;
    const canvas = d3.select("#stack-canvas");
    const lastBox = canvas.select("div.data-box:last-child");
    
    if (!lastBox.empty()) {
        lastBox
            .transition()
            .duration(300)
            .style("transform", "translateY(50px)")
            .style("opacity", 0)
            .end()
            .then(() => { 
                stackData.pop();
                console.log('Stack data after pop:', stackData); 
                renderStack(); 
                isAnimating = false; 
            })
            .catch(() => {
                stackData.pop();
                console.log('Stack data after pop (catch):', stackData); 
                renderStack(); 
                isAnimating = false;
            });
    } else {
        stackData.pop();
        console.log('Stack data after pop (no animation):', stackData); 
        renderStack(); 
        isAnimating = false;
    }
}

// ===== QUEUE OPERATIONS =====
function renderQueue() {
    console.log('renderQueue called, queueData:', queueData);
    const canvas = d3.select("#queue-canvas");
    canvas.html("");
    
    if (queueData.length === 0) {
        console.log('Queue is empty');
        return;
    }
    
    canvas.selectAll("div.data-box")
        .data(queueData, (d, i) => i)
        .enter()
        .append("div")
        .attr("class", "data-box")
        .text(d => d)
        .each(function(d, i) {
            if (i === 0) {
                d3.select(this).append('span')
                    .attr('class', 'pointer-text')
                    .style('bottom', '-25px')
                    .text('Front');
            }
            if (i === queueData.length - 1 && queueData.length > 1) {
                d3.select(this).append('span')
                    .attr('class', 'pointer-text')
                    .style('bottom', '-45px')
                    .text('Rear');
            }
        });
        
    updateColors("#queue-canvas");
}

async function queueEnqueue() {
    console.log('queueEnqueue called');
    if (isAnimating) {
        console.log('Already animating, returning');
        return;
    }
    
    const inputElement = document.getElementById('value-input');
    let val;
    
    if (inputElement && inputElement.value.trim() !== '') {
        val = parseInt(inputElement.value);
        console.log('Using input value:', val);
    } else {
        const promptVal = prompt('Enter a value to enqueue:');
        if (promptVal === null || promptVal.trim() === '') return;
        val = parseInt(promptVal);
        console.log('Using prompt value:', val);
    }
    
    if (isNaN(val)) {
        alert('Please enter a valid number!');
        return;
    }
    
    console.log('Enqueueing value:', val);
    isAnimating = true;
    queueData.push(val);
    console.log('Queue data after enqueue:', queueData);
    renderQueue();
    await sleep(300);
    if (inputElement) inputElement.value = "";
    isAnimating = false;
    console.log('queueEnqueue completed');
}

async function queueDequeue() {
    console.log('queueDequeue called');
    if(isAnimating) {
        console.log('Already animating, returning');
        return;
    }
    
    if(queueData.length === 0) {
        alert('Queue is empty!');
        return;
    }
    
    console.log('Dequeueing from queue, current data:', queueData);
    isAnimating = true;
    const canvas = d3.select("#queue-canvas");
    const firstBox = canvas.select("div.data-box:first-child");
    
    if (!firstBox.empty()) {
        firstBox
            .transition()
            .duration(300)
            .style("transform", "translateX(-50px)")
            .style("opacity", 0)
            .end()
            .then(() => { 
                queueData.shift();
                console.log('Queue data after dequeue:', queueData); 
                renderQueue(); 
                isAnimating = false; 
            })
            .catch(() => {
                queueData.shift();
                console.log('Queue data after dequeue (catch):', queueData); 
                renderQueue(); 
                isAnimating = false;
            });
    } else {
        queueData.shift();
        console.log('Queue data after dequeue (no animation):', queueData); 
        renderQueue(); 
        isAnimating = false;
    }
}

// ===== COMPARISON VIEW =====
function setupComparisonView() {
    const sortingAlgos = structureOptions.arrays.algorithms.filter(a => a.includes("Sort"));
    const optionsHtml = sortingAlgos.map(alg => `<option>${alg}</option>`).join('');
    
    algo1Select.innerHTML = optionsHtml;
    algo2Select.innerHTML = optionsHtml;
    algo2Select.selectedIndex = 1;
    
    resetComparison();
}

function resetComparison() {
    isAnimating = false;
    let arr;
    const input = compArrayInput.value.trim();
    
    if (input) {
        arr = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    } else {
        const size = Math.floor(compVisualizer1.clientWidth / 60);
        arr = d3.shuffle(d3.range(1, Math.max(5, size)));
    }
    
    renderArray([...arr], "#comp-visualizer-1");
    renderArray([...arr], "#comp-visualizer-2");
    
    // Clear results
    document.getElementById('comp-result-1').innerHTML = '';
    document.getElementById('comp-result-2').innerHTML = '';
}

async function runComparison() {
    if (isAnimating) return;
    
    isAnimating = true;
    try {
        let arr;
        const input = compArrayInput.value.trim();
        
        if (input) {
            arr = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        } else {
            const size = Math.floor(compVisualizer1.clientWidth / 60);
            arr = d3.shuffle(d3.range(1, Math.max(5, size)));
        }

        const algo1 = algo1Select.value;
        const algo2 = algo2Select.value;

        // Show initial unsorted arrays
        renderComparisonArrayEnhanced(compVisualizer1, arr, algo1);
        renderComparisonArrayEnhanced(compVisualizer2, arr, algo2);

        const result1 = document.getElementById('comp-result-1');
        const result2 = document.getElementById('comp-result-2');
        
        result1.innerHTML = '<span class="text-gray-500 text-sm">Sorting...</span>';
        result2.innerHTML = '<span class="text-gray-500 text-sm">Sorting...</span>';

        // Run with animated visualization
        await sleep(1000); // Longer initial pause
        
        const stats1 = await runSortWithAnimation(algo1, arr.slice(), compVisualizer1);
        const stats2 = await runSortWithAnimation(algo2, arr.slice(), compVisualizer2);

        // Display detailed results
        displayDetailedResults(algo1, stats1, result1, stats1.time < stats2.time ? 'faster' : stats1.time > stats2.time ? 'slower' : 'tie');
        displayDetailedResults(algo2, stats2, result2, stats2.time < stats1.time ? 'faster' : stats2.time > stats1.time ? 'slower' : 'tie');
    } finally {
        isAnimating = false;
    }
}

// Enhanced D3.js visualization with bar heights
function renderComparisonArrayEnhanced(container, arr, algoName) {
    const width = container.clientWidth;
    const height = 200;
    const maxVal = d3.max(arr) || 100;
    const barWidth = Math.min(50, (width - 20) / arr.length);
    
    // Clear container
    d3.select(container).html('');
    
    // Create SVG
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', 'transparent');
    
    // Create bars with height proportional to value
    const bars = svg.selectAll('g')
        .data(arr)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${i * barWidth + 10}, ${height - 30})`);
    
    bars.append('rect')
        .attr('class', 'sort-bar')
        .attr('width', barWidth - 4)
        .attr('height', 0)
        .attr('y', 0)
        .attr('fill', html.classList.contains('dark') ? '#6366f1' : '#4f46e5')
        .attr('rx', 3)
        .transition()
        .duration(800) // Slower initial render
        .attr('height', d => (d / maxVal) * 150)
        .attr('y', d => -(d / maxVal) * 150);
    
    bars.append('text')
        .attr('x', (barWidth - 4) / 2)
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .attr('fill', html.classList.contains('dark') ? '#f9fafb' : '#1f2937')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .text(d => d);
}

// Run sort with animated visualization
async function runSortWithAnimation(algoName, arr, container) {
    const comparisons = { count: 0 };
    const swaps = { count: 0 };
    const accesses = { count: 0 };
    
    const startTime = performance.now();
    
    // For simple algorithms, we can animate them
    if (['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'].includes(algoName)) {
        await animatedSort(algoName, arr, container, comparisons, swaps, accesses);
    } else {
        // For complex algorithms, just run them fast
        const sortFn = getPureSortByName(algoName);
        sortFn(arr);
        renderComparisonArrayEnhanced(container, arr, algoName);
    }
    
    const endTime = performance.now();
    
    return {
        time: endTime - startTime,
        comparisons: comparisons.count,
        swaps: swaps.count,
        accesses: accesses.count
    };
}

// Animated sorting with D3.js transitions
async function animatedSort(algoName, arr, container, comparisons, swaps, accesses) {
    const n = arr.length;
    const delay = Math.max(300, 2000 / n); // Slower animations for better visibility
    
    switch(algoName) {
        case 'Bubble Sort':
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    comparisons.count++;
                    accesses.count += 2;
                    
                    // Highlight comparison
                    highlightBars(container, [j, j + 1], '#f59e0b');
                    await sleep(delay * 1.5);
                    
                    if (arr[j] > arr[j + 1]) {
                        swaps.count++;
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        
                        // Animate swap
                        await updateBarsWithAnimation(container, arr, [j, j + 1]);
                        await sleep(delay * 1.2);
                    }
                    
                    unhighlightBars(container, [j, j + 1]);
                }
            }
            break;
            
        case 'Selection Sort':
            for (let i = 0; i < n - 1; i++) {
                let minIdx = i;
                highlightBars(container, [i], '#10b981');
                
                for (let j = i + 1; j < n; j++) {
                    comparisons.count++;
                    accesses.count += 2;
                    
                    highlightBars(container, [j], '#f59e0b');
                    await sleep(delay * 1.3);
                    
                    if (arr[j] < arr[minIdx]) {
                        unhighlightBars(container, [minIdx]);
                        minIdx = j;
                        highlightBars(container, [minIdx], '#ef4444');
                    } else {
                        unhighlightBars(container, [j]);
                    }
                }
                
                if (minIdx !== i) {
                    swaps.count++;
                    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                    await updateBarsWithAnimation(container, arr, [i, minIdx]);
                    await sleep(delay * 1.5);
                }
                
                unhighlightBars(container, [i, minIdx]);
            }
            break;
            
        case 'Insertion Sort':
            for (let i = 1; i < n; i++) {
                let key = arr[i];
                let j = i - 1;
                
                highlightBars(container, [i], '#10b981');
                await sleep(delay * 1.5);
                
                while (j >= 0 && arr[j] > key) {
                    comparisons.count++;
                    accesses.count += 2;
                    swaps.count++;
                    
                    arr[j + 1] = arr[j];
                    highlightBars(container, [j, j + 1], '#f59e0b');
                    await updateBarsWithAnimation(container, arr, [j, j + 1]);
                    await sleep(delay * 1.2);
                    unhighlightBars(container, [j, j + 1]);
                    j--;
                }
                
                arr[j + 1] = key;
                await updateBarsWithAnimation(container, arr, [j + 1]);
                await sleep(delay * 1.2);
                unhighlightBars(container, [j + 1]);
            }
            break;
            
        case 'Merge Sort':
            await mergeSortComparison(arr, container, comparisons, swaps, accesses, 0, n - 1, delay);
            break;
            
        case 'Quick Sort':
            await quickSortComparison(arr, container, comparisons, swaps, accesses, 0, n - 1, delay);
            break;
    }
    
    // Final sorted animation
    renderComparisonArrayEnhanced(container, arr, algoName);
}

// Merge Sort for comparison view
async function mergeSortComparison(arr, container, comparisons, swaps, accesses, start, end, delay) {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    
    // Highlight dividing section
    for (let i = start; i <= end; i++) {
        highlightBars(container, [i], '#a78bfa');
    }
    await sleep(delay * 0.8);
    
    await mergeSortComparison(arr, container, comparisons, swaps, accesses, start, mid, delay);
    await mergeSortComparison(arr, container, comparisons, swaps, accesses, mid + 1, end, delay);
    await mergeComparison(arr, container, comparisons, swaps, accesses, start, mid, end, delay);
}

async function mergeComparison(arr, container, comparisons, swaps, accesses, start, mid, end, delay) {
    const leftArr = arr.slice(start, mid + 1);
    const rightArr = arr.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    while (i < leftArr.length && j < rightArr.length) {
        comparisons.count++;
        accesses.count += 2;
        
        highlightBars(container, [k], '#fbbf24');
        
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        
        await updateBarsWithAnimation(container, arr, [k]);
        await sleep(delay * 0.7);
        unhighlightBars(container, [k]);
        k++;
    }
    
    while (i < leftArr.length) {
        accesses.count++;
        arr[k] = leftArr[i];
        await updateBarsWithAnimation(container, arr, [k]);
        await sleep(delay * 0.5);
        i++;
        k++;
    }
    
    while (j < rightArr.length) {
        accesses.count++;
        arr[k] = rightArr[j];
        await updateBarsWithAnimation(container, arr, [k]);
        await sleep(delay * 0.5);
        j++;
        k++;
    }
}

// Quick Sort for comparison view
async function quickSortComparison(arr, container, comparisons, swaps, accesses, low, high, delay) {
    if (low < high) {
        const pi = await partitionComparison(arr, container, comparisons, swaps, accesses, low, high, delay);
        await quickSortComparison(arr, container, comparisons, swaps, accesses, low, pi - 1, delay);
        await quickSortComparison(arr, container, comparisons, swaps, accesses, pi + 1, high, delay);
    }
}

async function partitionComparison(arr, container, comparisons, swaps, accesses, low, high, delay) {
    const pivot = arr[high];
    highlightBars(container, [high], '#a78bfa'); // Pivot
    await sleep(delay * 0.8);
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        comparisons.count++;
        accesses.count += 2;
        
        highlightBars(container, [j], '#f59e0b');
        await sleep(delay * 0.6);
        
        if (arr[j] < pivot) {
            i++;
            if (i !== j) {
                swaps.count++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                await updateBarsWithAnimation(container, arr, [i, j]);
                await sleep(delay * 0.7);
            }
        }
        unhighlightBars(container, [j]);
    }
    
    i++;
    swaps.count++;
    [arr[i], arr[high]] = [arr[high], arr[i]];
    await updateBarsWithAnimation(container, arr, [i, high]);
    await sleep(delay);
    unhighlightBars(container, [high]);
    
    return i;
}

// Heap Sort for comparison view
async function heapSortComparison(arr, container, comparisons, swaps, accesses, delay) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapifyComparison(arr, container, comparisons, swaps, accesses, n, i, delay);
    }
    
    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        swaps.count++;
        highlightBars(container, [0, i], '#ef4444');
        await sleep(delay);
        
        [arr[0], arr[i]] = [arr[i], arr[0]];
        await updateBarsWithAnimation(container, arr, [0, i]);
        await sleep(delay * 0.8);
        
        highlightBars(container, [i], '#10b981'); // Sorted
        await heapifyComparison(arr, container, comparisons, swaps, accesses, i, 0, delay);
    }
}

async function heapifyComparison(arr, container, comparisons, swaps, accesses, n, i, delay) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    const toCheck = [i];
    if (left < n) toCheck.push(left);
    if (right < n) toCheck.push(right);
    
    toCheck.forEach(idx => highlightBars(container, [idx], '#fbbf24'));
    await sleep(delay * 0.6);
    
    if (left < n) {
        comparisons.count++;
        accesses.count += 2;
        if (arr[left] > arr[largest]) largest = left;
    }
    
    if (right < n) {
        comparisons.count++;
        accesses.count += 2;
        if (arr[right] > arr[largest]) largest = right;
    }
    
    if (largest !== i) {
        swaps.count++;
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        await updateBarsWithAnimation(container, arr, [i, largest]);
        await sleep(delay * 0.7);
        toCheck.forEach(idx => unhighlightBars(container, [idx]));
        await heapifyComparison(arr, container, comparisons, swaps, accesses, n, largest, delay);
    } else {
        toCheck.forEach(idx => unhighlightBars(container, [idx]));
    }
}

// Highlight specific bars
function highlightBars(container, indices, color) {
    const svg = d3.select(container).select('svg');
    svg.selectAll('g').each(function(d, i) {
        if (indices.includes(i)) {
            d3.select(this).select('rect').attr('fill', color);
        }
    });
}

// Unhighlight bars
function unhighlightBars(container, indices) {
    const svg = d3.select(container).select('svg');
    const defaultColor = html.classList.contains('dark') ? '#6366f1' : '#4f46e5';
    svg.selectAll('g').each(function(d, i) {
        if (indices.includes(i)) {
            d3.select(this).select('rect').attr('fill', defaultColor);
        }
    });
}

// Update bars with animation
async function updateBarsWithAnimation(container, arr, indices) {
    const svg = d3.select(container).select('svg');
    const maxVal = d3.max(arr) || 100;
    
    svg.selectAll('g').each(function(d, i) {
        if (indices.includes(i)) {
            const newVal = arr[i];
            d3.select(this).select('rect')
                .transition()
                .duration(400) // Slower bar updates
                .attr('height', (newVal / maxVal) * 150)
                .attr('y', -(newVal / maxVal) * 150);
            
            d3.select(this).select('text')
                .text(newVal);
        }
    });
}

// Display detailed results with complexity info
function displayDetailedResults(algoName, stats, container, status) {
    const complexity = complexityMap[algoName];
    
    if (!complexity) {
        container.innerHTML = `<span class="text-red-500">Error: Algorithm not found</span>`;
        return;
    }
    
    let icon = '';
    let statusColor = '';
    let statusText = '';
    
    if (status === 'faster') {
        icon = '🏆';
        statusColor = 'text-green-600 dark:text-green-400';
        statusText = 'Faster';
    } else if (status === 'slower') {
        icon = '🐌';
        statusColor = 'text-red-600 dark:text-red-400';
        statusText = 'Slower';
    } else {
        icon = '🤝';
        statusColor = 'text-blue-600 dark:text-blue-400';
        statusText = 'Tie';
    }
    
    container.innerHTML = `
        <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="${statusColor} text-lg font-bold flex items-center gap-2">
                <span class="text-2xl">${icon}</span>
                <span>${statusText}</span>
            </div>
            
            <div class="space-y-1 text-sm">
                <div class="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700">
                    <span class="font-semibold text-gray-700 dark:text-gray-300">⏱️ Execution Time:</span>
                    <span class="font-mono font-bold text-indigo-600 dark:text-indigo-400">${stats.time.toFixed(3)} ms</span>
                </div>
                <div class="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700">
                    <span class="font-semibold text-gray-700 dark:text-gray-300">🔄 Comparisons:</span>
                    <span class="font-mono">${stats.comparisons}</span>
                </div>
                <div class="flex justify-between items-center py-1 border-b border-gray-200 dark:border-gray-700">
                    <span class="font-semibold text-gray-700 dark:text-gray-300">↔️ Swaps:</span>
                    <span class="font-mono">${stats.swaps}</span>
                </div>
                <div class="flex justify-between items-center py-1">
                    <span class="font-semibold text-gray-700 dark:text-gray-300">� Array Accesses:</span>
                    <span class="font-mono">${stats.accesses}</span>
                </div>
            </div>
            
            <div class="mt-3 pt-3 border-t-2 border-gray-300 dark:border-gray-600">
                <div class="text-xs font-bold mb-2 text-gray-800 dark:text-gray-200">⏰ Time Complexity:</div>
                <div class="grid grid-cols-3 gap-2 text-xs mb-2">
                    <div class="bg-green-100 dark:bg-green-900 p-2 rounded text-center">
                        <div class="font-semibold text-green-800 dark:text-green-200">Best</div>
                        <div class="font-mono text-green-900 dark:text-green-100">${complexity.time.best}</div>
                    </div>
                    <div class="bg-yellow-100 dark:bg-yellow-900 p-2 rounded text-center">
                        <div class="font-semibold text-yellow-800 dark:text-yellow-200">Average</div>
                        <div class="font-mono text-yellow-900 dark:text-yellow-100">${complexity.time.average}</div>
                    </div>
                    <div class="bg-red-100 dark:bg-red-900 p-2 rounded text-center">
                        <div class="font-semibold text-red-800 dark:text-red-200">Worst</div>
                        <div class="font-mono text-red-900 dark:text-red-100">${complexity.time.worst}</div>
                    </div>
                </div>
                
                <div class="text-xs space-y-1 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    <div class="flex justify-between">
                        <span class="font-semibold">� Space Complexity:</span>
                        <span class="font-mono">${complexity.space}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">🔒 Stability:</span>
                        <span>${complexity.stable ? '✅ Stable' : '❌ Unstable'}</span>
                    </div>
                </div>
                
                <div class="text-xs mt-2 p-2 bg-indigo-50 dark:bg-indigo-900 rounded italic text-gray-700 dark:text-gray-300">
                    💡 ${complexity.description}
                </div>
            </div>
        </div>
    `;
}

// ===== UTILITY FUNCTIONS =====
function highlight(i, j, color, containerSelector = "#array-visualizer") {
    const boxes = d3.select(containerSelector).selectAll("div.data-box").nodes();
    if (boxes[i]) d3.select(boxes[i]).style("background-color", color);
    if (j !== undefined && boxes[j]) d3.select(boxes[j]).style("background-color", color);
}

function unhighlight(i, j, containerSelector = "#array-visualizer") {
    const boxes = d3.select(containerSelector).selectAll("div.data-box").nodes();
    const primaryColor = html.classList.contains('dark') ? "var(--primary-dark)" : "var(--primary-light)";
    if (boxes[i]) d3.select(boxes[i]).style("background-color", primaryColor);
    if (j !== undefined && boxes[j]) d3.select(boxes[j]).style("background-color", primaryColor);
}

function highlightRange(start, end, color, containerSelector = "#array-visualizer") {
    d3.select(containerSelector)
        .selectAll("div.data-box")
        .filter((d, i) => i >= start && i <= end)
        .style("background-color", color);
}

function unhighlightRange(start, end, containerSelector = "#array-visualizer") {
    const primaryColor = html.classList.contains('dark') ? "var(--primary-dark)" : "var(--primary-light)";
    d3.select(containerSelector)
        .selectAll("div.data-box")
        .filter((d, i) => i >= start && i <= end)
        .style("background-color", primaryColor);
}

function updateColors(containerSelector) {
    const primaryColor = html.classList.contains('dark') ? "var(--primary-dark)" : "var(--primary-light)";
    d3.select(containerSelector)
        .selectAll(".data-box")
        .style("background-color", primaryColor);
}

// ===== ALGORITHM RUNNER =====
async function runAlgorithm() {
    console.log('runAlgorithm called');
    if (isAnimating) {
        console.log('Already animating, returning');
        return;
    }

    const selectedAlgo = algorithmSelect.value;
    console.log('Selected algorithm:', selectedAlgo);
    console.log('Current structure:', currentStructure);
    
    const helpers = {
        render: (data, pointers) => renderArray(data, "#array-visualizer", pointers),
        highlight: (i, j, color) => highlight(i, j, color, "#array-visualizer"),
        unhighlight: (i, j) => unhighlight(i, j, "#array-visualizer"),
        highlightRange: (start, end, color) => highlightRange(start, end, color, "#array-visualizer"),
        unhighlightRange: (start, end) => unhighlightRange(start, end, "#array-visualizer")
    };

    isAnimating = true;
    try {
        if (selectedAlgo === 'Bubble Sort') await bubbleSort(arrayData, helpers);
        else if (selectedAlgo === 'Selection Sort') await selectionSort(arrayData, helpers);
        else if (selectedAlgo === 'Insertion Sort') await insertionSort(arrayData, helpers);
        else if (selectedAlgo === 'Merge Sort') await mergeSort(arrayData, helpers);
        else if (selectedAlgo === 'Quick Sort') await quickSort(arrayData, helpers);
        else if (selectedAlgo === 'Linear Search') await linearSearch(helpers);
        else if (selectedAlgo === 'Binary Search') await binarySearch(helpers);
        else if (selectedAlgo === 'Insert') await insertElement(helpers);
        else if (selectedAlgo === 'Delete') await deleteElement(helpers);
        else if (selectedAlgo === 'Push') {
            console.log('Calling stackPush');
            await stackPush();
        }
        else if (selectedAlgo === 'Pop') {
            console.log('Calling stackPop');
            await stackPop();
        }
        else if (selectedAlgo === 'Enqueue') {
            console.log('Calling queueEnqueue');
            await queueEnqueue();
        }
        else if (selectedAlgo === 'Dequeue') {
            console.log('Calling queueDequeue');
            await queueDequeue();
        }
        console.log('Algorithm execution completed');
    } finally {
        isAnimating = false;
        console.log('isAnimating set to false');
    }
}

// ===== ALGORITHM SPECIFIC CONTROLS =====
function updateAlgoSpecificControls() {
    algoSpecificControls.innerHTML = '';
    const selectedAlgo = algorithmSelect.value;
    
    const createInput = (id, label, placeholder, type = 'number') => {
        return `<div>
            <label for="${id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">${label}</label>
            <input id="${id}" type="${type}" placeholder="${placeholder}" class="form-input mt-1">
        </div>`;
    };

    if (currentStructure === 'stacks') {
        // Always show value input for stacks
        algoSpecificControls.innerHTML = createInput('value-input', 'Value', 'e.g., 42');
    } else if (currentStructure === 'queues') {
        // Always show value input for queues
        algoSpecificControls.innerHTML = createInput('value-input', 'Value', 'e.g., 42');
    } else if (currentStructure === 'arrays') {
        if (selectedAlgo === 'Insert') {
            algoSpecificControls.innerHTML = createInput('value-to-insert', 'Value', 'e.g., 10') + 
                                            createInput('index-to-insert', 'Index', 'e.g., 2');
        } else if (selectedAlgo === 'Delete') {
            algoSpecificControls.innerHTML = createInput('index-to-delete', 'Index', 'e.g., 2');
        } else if (selectedAlgo.includes('Search')) {
            algoSpecificControls.innerHTML = createInput('search-value', 'Target Value', 'e.g., 7');
        }
    }
}

// ===== OTHER HANDLERS =====
function handleSpeedChange(e) {
    animationSpeed = 1100 - e.target.value;
}

function handleWindowResize() {
    if (currentView === 'visualizer') resetData();
    if (currentView === 'comparison') resetComparison();
}
