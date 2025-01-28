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

class DiseasePesticideManager {
    constructor() {
        this.pesticideRecommendations = {
            'Bacterial Blight': ['Syngenta', 'Copper Fungicide 500', 'Bacterial Blight is a common disease affecting various plants, caused by bacteria.', 'Water-soaked lesions on leaves, wilting.', 'Use disease-free seeds, avoid overhead irrigation.', 'Copper Fungicide 500', 'Copper', 'Apply as a foliar spray every 7-10 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'Red Rot': ['BASF', 'Mancozeb 80 WP', 'Red Rot is a fungal disease that primarily affects sugarcane.', 'Red discoloration inside stalks, foul smell.', 'Plant resistant varieties and remove infected plants.', 'Mancozeb 80 WP', 'Mancozeb', 'Apply as a foliar spray every 10-15 days during the infection period.', 'Avoid contact with skin; wash hands thoroughly after use.'],
            'Blight': ['Dow AgroSciences', 'Bravo WeatherStik', 'Blight is a plant disease characterized by rapid and complete chlorosis, browning, and death of plant tissues.', 'Brown spots on leaves, wilting.', 'Use resistant varieties, remove infected plants.', 'Bravo WeatherStik', 'Chlorothalonil', 'Apply as a foliar spray every 7-10 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'Common_Rust': ['Monsanto', 'Amistar 250SC', 'Common Rust is a fungal disease that affects maize and other crops.', 'Rust-colored pustules on leaves.', 'Use resistant varieties, apply fungicides.', 'Amistar 250SC', 'Azoxystrobin', 'Apply as a foliar spray every 10-14 days during the infection period.', 'Avoid contact with skin; wash hands thoroughly after use.'],
            'Gray_Leaf_Spot,Healthy': ['BASF', 'Headline SC', 'Gray Leaf Spot is a fungal disease that affects the leaves of maize.', 'Gray lesions on leaves.', 'Use resistant varieties, rotate crops.', 'Headline SC', 'Pyraclostrobin', 'Apply as a foliar spray every 7-14 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'Bacterial blight': ['Syngenta', 'Kocide 2000', 'Bacterial blight is a common disease affecting various plants, caused by bacteria.', 'Water-soaked lesions on leaves, wilting.', 'Use disease-free seeds, avoid overhead irrigation.', 'Kocide 2000', 'Copper', 'Apply as a foliar spray every 7-10 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'curl_virus': ['Bayer CropScience', 'Confidor 200SL', 'Curl Virus affects cotton plants, causing leaf curling and stunted growth.', 'Leaf curling, stunted growth.', 'Use disease-free seeds, control insect vectors.', 'Confidor 200SL', 'Imidacloprid', 'Apply as a foliar spray every 10-14 days during the infection period.', 'Avoid contact with skin; wash hands thoroughly after use.'],
            'fussarium_wilt': ['Syngenta', 'Folicur EC', 'Fusarium Wilt is a soil-borne fungal disease that affects a wide range of plants.', 'Yellowing and wilting of leaves, vascular discoloration.', 'Use disease-free seeds, rotate crops.', 'Folicur EC', 'Tebuconazole', 'Apply as a soil drench or foliar spray every 7-14 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'Bacterial_blight': ['Syngenta', 'Kocide 2000', 'Bacterial blight is a common disease affecting various plants, caused by bacteria.', 'Water-soaked lesions on leaves, wilting.', 'Use disease-free seeds, avoid overhead irrigation.', 'Kocide 2000', 'Copper', 'Apply as a foliar spray every 7-10 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'Blast': ['Dow AgroSciences', 'Streptomycin 17WP', 'Blast is a fungal disease that affects rice, causing lesions on leaves and stems.', 'Lesions on leaves and stems, wilting.', 'Use resistant varieties, avoid excessive nitrogen fertilization.', 'Streptomycin 17WP', 'Streptomycin', 'Apply as a foliar spray every 7-10 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'Brownspot': ['BASF', 'Headline SC', 'Brownspot is a fungal disease that affects rice, causing brown lesions on leaves.', 'Brown lesions on leaves.', 'Use resistant varieties, avoid excessive nitrogen fertilization.', 'Headline SC', 'Pyraclostrobin', 'Apply as a foliar spray every 7-14 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'Tungro': ['Bayer CropScience', 'Actara 25WG', 'Tungro is a viral disease that affects rice, causing stunted growth and yellowing of leaves.', 'Stunted growth, yellowing of leaves.', 'Use disease-free seeds, control insect vectors.', 'Actara 25WG', 'Thiamethoxam', 'Apply as a foliar spray every 10-14 days during the infection period.', 'Avoid contact with skin; wash hands thoroughly after use.'],
            'septoria': ['Monsanto', 'Quadris 2.5 SC', 'Septoria is a fungal disease that affects wheat, causing leaf spots and blight.', 'Leaf spots, blight.', 'Use resistant varieties, rotate crops.', 'Quadris 2.5 SC', 'Azoxystrobin', 'Apply as a foliar spray every 7-14 days during the infection period.', 'Avoid inhalation; wear protective clothing.'],
            'strip_rust': ['BASF', 'Folicur 430 SC', 'Stripe Rust is a fungal disease that affects wheat, causing yellow stripes on leaves.', 'Yellow stripes on leaves.', 'Use resistant varieties, apply fungicides.', 'Folicur 430 SC', 'Tebuconazole', 'Apply as a foliar spray every 7-14 days during the infection period.', 'Avoid inhalation; wear protective clothing.']
        };
    }

    getRecommendation(predictedClass) {
        if (predictedClass === 'Healthy') {
            return 'No need for any pesticide, plant is healthy';
        }
        const [company, pesticide, info, symptoms, prevention, pesticideName, activeIngredient, application, safety] = this.pesticideRecommendations[predictedClass] || [null, "No recommendation available", "No additional information available", "", "", "", "", "", ""];
        if (company) {
            return `
                <strong>Description:</strong> ${info} <br>
                <strong>Symptoms:</strong> ${symptoms} <br>
                <strong>Prevention:</strong> ${prevention} <br>
                <strong>Pesticide:</strong> ${pesticideName} <br>
                <strong>Active Ingredients:</strong> ${activeIngredient} <br>
                <strong>Application:</strong> ${application} <br>
                <strong>Safety:</strong> ${safety}
            `;
        }
        return "No recommendation available";
    }
}

const pesticideManager = new DiseasePesticideManager();

function recommendPesticide(predictedClass) {
    const originalRecommendation = pesticideRecommendations[predictedClass] || 'No recommendation available';
    const detailedRecommendation = pesticideManager.getRecommendation(predictedClass);
    return `${originalRecommendation} <br> ${detailedRecommendation}`;
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
