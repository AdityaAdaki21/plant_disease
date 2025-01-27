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
        document.getElementById('inputImage').src = URL.createObjectURL(file);
        document.getElementById('modelButtons').style.display = 'block';
    }
});

// Simulate classification and pesticide recommendation (you would integrate with the back-end here)
function classifyImage(model) {
    // Simulate the predicted class (this would be done by a model prediction in reality)
    const predictedClass = classNames[model][Math.floor(Math.random() * classNames[model].length)];
    document.getElementById('result').innerHTML = `Predicted Class: ${predictedClass}`;
    document.getElementById('pesticideRecommendation').innerHTML = `Recommended Pesticide: ${recommendPesticide(predictedClass)}`;
}

function recommendPesticide(predictedClass) {
    if (predictedClass === 'Healthy') {
        return 'No need for any pesticide, plant is healthy';
    }
    return pesticideRecommendations[predictedClass] || 'No recommendation available';
}
