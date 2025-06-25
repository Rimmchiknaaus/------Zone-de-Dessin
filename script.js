// === Exercice 2 : Zone de dessin interactive ===

// === 1. Sélection des éléments nécessaires ===
// Récupérer l'élément <canvas> avec l'id "canvas"
const canvas = document.getElementById('canvas');

// Récupérer le contexte 2D avec "getContext('2d')"
const ctx = canvas.getContext('2d');
console.log(ctx);
// Récupérer les éléments : "client-display", "page-display", "canvas-display"
const clientDisplay = document.getElementById('client-display');
const pageDisplay = document.getElementById('page-display');
const canvasDisplay = document.getElementById('canvas-display');
// Récupérer les contrôles : "clear-btn", "color-picker", "size-slider", "size-value", "toggle-coords", "coord-display"
const clearBtn = document.getElementById('clear-btn');
const colorPicker = document.getElementById('color-picker');
const sizeSlider = document.getElementById('size-slider');
const sizeValue = document.getElementById('size-value');
const toggleCoords = document.getElementById('toggle-coords');
const coordDisplay = document.getElementById('coord-display');

// === 2. Initialisation des variables ===
// Créer une variable "isDrawing" initialisée à false
let isDrawing = false;

// Créer les variables "lastX" et "lastY" pour la position précédente
let lastX = 0;
let lastY = 0;

// === 3. Configuration initiale du style de dessin ===
// Définir "ctx.lineCap" à "round"
ctx.lineCap = 'round';
// Définir "ctx.lineJoin" à "round"
ctx.lineJoin = 'round';
// Définir "ctx.lineWidth" à 3
ctx.lineWidth = 3;
// Définir "ctx.strokeStyle" à une couleur par défaut (ex: "#ff6b6b")
ctx.strokeStyle = '#ff6b6b';

// === 4. Fonction pour obtenir les coordonnées relatives au canvas ===
// Créer la fonction "getCanvasCoordinates(event)"
function getCanvasCoordinates(event){
    // Utiliser "getBoundingClientRect()" pour récupérer la position du canvas
    const rect = canvas.getBoundingClientRect();
    // Calculer les coordonnées relatives en soustrayant left et top
    return{
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// === 5. Fonction pour mettre à jour l'affichage des coordonnées ===
// Créer la fonction "updateCoordinatesDisplay(event)"
function updateCoordinatesDisplay(event){
    // Récupérer les coordonnées canvas avec "getCanvasCoordinates()"
    const canvaCoord = getCanvasCoordinates(event);
    // Afficher les coordonnées client, page et canvas dans la console
    console.log('Client' + event.clientX + ' ' +event.clientY);
    console.log('Page' + event.pageX + ' ' + event.pageY);
    console.log('Canvas' + canvaCoord.x + ' ' +canvaCoord.y);
    // Mettre à jour le contenu des éléments d'affichage
    clientDisplay.textContent = `X: ${ event.clientX}, Y: ${ event.clientY}`;
    pageDisplay.textContent = `X: ${ event.pageX}, Y: ${ event.pageY}`;
    canvasDisplay.textContent = `X: ${Math.round (canvaCoord.x)}, Y: ${Math.round (canvaCoord.y)}`;
}

// === 6. Gestion du mousedown : démarrer le dessin ===
canvas.addEventListener('mousedown', function(event){
    // Mettre "isDrawing" à true
    isDrawing = true;
    // Calculer les coordonnées du clic
    const canvaCoords =  getCanvasCoordinates(event);
    // Stocker dans "lastX" et "lastY"
    lastX = canvaCoords.x;
    lastY = canvaCoords.y;
    // Appeler "updateCoordinatesDisplay()"
    updateCoordinatesDisplay(event);
})

// === 7. Gestion du mousemove : dessiner ===
canvas.addEventListener('mousemove', function(event){
    // Appeler "updateCoordinatesDisplay()"
    updateCoordinatesDisplay(event);
    // Vérifier si "isDrawing" est true, sinon return
    if (!isDrawing){
        return;
    }
    // Calculer les nouvelles coordonnées canvas
    const canvaCoords =  getCanvasCoordinates(event);
    // Dessiner une ligne de l'ancienne position à la nouvelle
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(canvaCoords.x, canvaCoords.y);
    ctx.stroke();
    // Mettre à jour "lastX" et "lastY" 
    lastX = canvaCoords.x;
    lastY = canvaCoords.y
})


// === 8. Gestion du mouseup et mouseleave : arrêter le dessin ===
// Mettre "isDrawing" à false
canvas.addEventListener('mouseup', function(){
    isDrawing = false;
})
canvas.addEventListener('mouseleave', function(){
    isDrawing = false;
})

// === 9. Ajout des contrôles ===
// Bouton "clear-btn" : appeler "ctx.clearRect()" pour vider le canvas
clearBtn.addEventListener('click', function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

// "color-picker" : changer la couleur de "ctx.strokeStyle"
colorPicker.addEventListener('change', function(){
    ctx.strokeStyle = colorPicker.value;
})

// "size-slider" : changer "ctx.lineWidth" et mettre à jour l'affichage dans "size-value"
sizeSlider.addEventListener('input', function(){
    ctx.lineWidth = sizeSlider.value;
    sizeValue.textContent = sizeSlider.value +'px';
})
// "toggle-coords" : afficher/masquer l'affichage des coordonnées (classe "hidden" sur "coord-display")
toggleCoords.addEventListener('click', function(){
    if(coordDisplay.style.display === 'none'){
        coordDisplay.style.display = 'block';
        toggleCoords.textContent = "Masquer les coordonnées"
    } else{
        coordDisplay.style.display = 'none';
        toggleCoords.textContent = "Afficher les coordonnées"
    }
})