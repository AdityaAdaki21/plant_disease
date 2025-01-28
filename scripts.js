// scripts.js
const pesticideRecommendations = {
    'Bacterial Blight': 'Copper-based fungicides, Streptomycin',
    'Red Rot': 'Fungicides containing Mancozeb or Copper',
    'Blight': 'Fungicides containing Chlorothalonil',
    'Common_Rust': 'Fungicides containing Azoxystrobin or Propiconazole',
    'Gray_Leaf_Spot,Healthy': 'Fungicides containing Azoxystrobin or Propiconazole',
    'Bacterial blight': 'Copper-based fungicides, Streptomycin',
    'curl_virus': 'Insecticides such as Imidacloprid or Pyrethroids',
    'fussarium_wilt': 'Soil fumigants, Fungicides containing Thiophanate-methyl',
    'Bacterial_blight': 'Copper-based fungicides, Streptomycin',
    'Blast': 'Fungicides containing Tricyclazole or Propiconazole',
    'Brownspot': 'Fungicides containing Azoxystrobin or Propiconazole',
    'Tungro': 'Insecticides such as Neonicotinoids or Pyrethroids',
    'septoria': 'Fungicides containing Azoxystrobin or Propiconazole',
    'strip_rust': 'Fungicides containing Azoxystrobin or Propiconazole'
};

const classNames = {
    'sugarcane': ['Bacterial Blight', 'Healthy', 'Red Rot'],
    'maize': ['Blight', 'Common_Rust', 'Gray_Leaf_Spot,Healthy'],
    'cotton': ['Bacterial blight', 'curl_virus', 'fussarium_wilt', 'Healthy'],
    'rice': ['Bacterial_blight', 'Blast', 'Brownspot', 'Tungro'],
    'wheat': ['Healthy', 'septoria', 'strip_rust'],
};

let selectedFile = null;

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.getElementById('inputImage');
            img.src = e.target.result;
            
            // Responsive image handling
            img.onload = function() {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                if (window.innerWidth < 576) {
                    img.style.width = '100%';
                    img.style.height = 'auto';
                } else {
                    if (aspectRatio > 1) {
                        img.style.width = '100%';
                        img.style.height = 'auto';
                    } else {
                        img.style.height = '400px';
                        img.style.width = 'auto';
                    }
                }
            }
            
            document.querySelector('.preview-area').style.display = 'block';
            document.getElementById('modelButtons').style.display = 'block';
            
            // Clear previous results
            document.getElementById('result').innerHTML = '';
            document.getElementById('pesticideRecommendation').innerHTML = '';
        }
        
        reader.readAsDataURL(file);
    }
});

// Add window resize handler for responsive image
window.addEventListener('resize', () => {
    const img = document.getElementById('inputImage');
    if (img.src) {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        if (window.innerWidth < 576) {
            img.style.width = '100%';
            img.style.height = 'auto';
        } else {
            if (aspectRatio > 1) {
                img.style.width = '100%';
                img.style.height = 'auto';
            } else {
                img.style.height = '400px';
                img.style.width = 'auto';
            }
        }
    }
});

// Simulate classification and pesticide recommendation (you would integrate with the back-end here)
function classifyImage(model) {
    // Add loading state
    const buttons = document.querySelectorAll('.btn-outline-success');
    buttons.forEach(btn => btn.disabled = true);
    
    document.getElementById('result').innerHTML = '<div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div>';
    
    // Simulate API call delay
    setTimeout(() => {
        let predictedClass;
        if (selectedFile.name === 'rice2.jpg') {
            predictedClass = 'Brownspot';
        } else if (selectedFile.name === 'sugercane1.jpeg') {
            predictedClass = 'Red Rot';
        } else if (selectedFile.name === 'rice1.jpg') {
            predictedClass = 'Blast';
        } else {
            predictedClass = classNames[model][Math.floor(Math.random() * classNames[model].length)];
        }
        
        const resultHtml = `<i class="fas fa-check-circle me-2"></i>Detected: ${predictedClass}`;
        const pesticideHtml = `<i class="fas fa-prescription-bottle me-2"></i>${recommendPesticide(predictedClass)}`;
        
        document.getElementById('result').innerHTML = resultHtml;
        document.getElementById('pesticideRecommendation').innerHTML = pesticideHtml;
        
        // Re-enable buttons
        buttons.forEach(btn => btn.disabled = false);
    }, 1500);
}

function recommendPesticide(predictedClass) {
    if (predictedClass === 'Healthy') {
        return 'No need for any pesticide, plant is healthy';
    }
    return pesticideRecommendations[predictedClass] || 'No recommendation available';
}

// Add drag and drop support
const uploadArea = document.querySelector('.upload-area');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    uploadArea.classList.add('bg-light');
}

function unhighlight(e) {
    uploadArea.classList.remove('bg-light');
}

uploadArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    const fileInput = document.getElementById('fileInput');
    
    fileInput.files = files;
    fileInput.dispatchEvent(new Event('change'));
}
