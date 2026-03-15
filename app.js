const BASE_WEIGHT = 20;
const WEIGHT_MULTIPLIER = 5;
const WEIGHT_COLORS = ['#10b981', '#3b82f6', '#f97316', '#8b5cf6', '#06b6d4', '#ec4899', '#eab308', '#ef4444'];

let weights = [];

const dropSound = new Audio('assets/object-drop-sound.mp3');

const plank = document.querySelector('.plank');
const resetBtn = document.querySelector('#reset-button');

const leftWeightText = document.querySelector('#left-weight-text');
const rightWeightText = document.querySelector('#right-weight-text');

plank.addEventListener('click', (event) => {

    const clickedX = event.offsetX;
    const plankWidth = plank.offsetWidth;
    const centerX = plankWidth / 2;
    const distanceFromCenter = Math.abs(clickedX - centerX);

    const weight = randomWeight();
    const weightElement = createWeight(weight);
    weightElement.style.left = `${clickedX}px`;
    plank.appendChild(weightElement);
    dropSound.play();
    weights.push({ distance: distanceFromCenter, weight, direction: clickedX < centerX ? 'left' : 'right' });
    saveWeights();
    updateSeesaw();
})

resetBtn.addEventListener('click', () => {
    document.querySelectorAll('.weight').forEach(weight => weight.remove());
    weights = [];
    saveWeights();
    updateSeesaw();
});

const createWeight = (weight) => {
    const weightElement = document.createElement('div');
    weightElement.classList.add('weight');
    weightElement.textContent = `${weight}kg`;
    weightElement.style.width = `${BASE_WEIGHT + weight * WEIGHT_MULTIPLIER}px`;
    weightElement.style.height = `${BASE_WEIGHT + weight * WEIGHT_MULTIPLIER}px`;
    weightElement.style.backgroundColor = randomColor();
    return weightElement;
}

const randomColor = () => {
    return WEIGHT_COLORS[Math.floor(Math.random() * WEIGHT_COLORS.length)];
}

const randomWeight = () => {
    return Math.floor(Math.random() * 10) + 1;
}

const updateSeesaw = () => {
    let totalLeftWeight = 0;
    let totalLeftTorque = 0;
    let totalRightWeight = 0;
    let totalRightTorque = 0;

    weights.forEach((weight) => {
        if (weight.direction === 'left') {
            totalLeftWeight += weight.weight;
            totalLeftTorque += weight.weight * weight.distance;
        } else {
            totalRightWeight += weight.weight;
            totalRightTorque += weight.weight * weight.distance;
        }
    });

    const tiltAngle = Math.max(-30, Math.min(30, (totalRightTorque - totalLeftTorque) / 100));
    plank.style.transform = `rotate(${tiltAngle}deg)`;
    leftWeightText.textContent = totalLeftWeight;
    rightWeightText.textContent = totalRightWeight;
}

const saveWeights = () => {
    if (weights.length === 0) {
        localStorage.removeItem('weights');
        return;
    }
    localStorage.setItem('weights', JSON.stringify(weights));
}

const loadWeights = () => {
    const savedWeights = JSON.parse(localStorage.getItem('weights'));
    if (savedWeights) {
        weights = savedWeights;
    }
}

const initWeights = () => {
    loadWeights();
    weights.forEach((weight) => {
        const weightElement = createWeight(weight.weight);
        const plankWidth = plank.offsetWidth / 2;
        const positionX = weight.direction === 'left' ? plankWidth - weight.distance : plankWidth + weight.distance;
        weightElement.style.left = `${positionX}px`;
        plank.appendChild(weightElement);
    });
    updateSeesaw();
}

window.onload = () => {
    initWeights();
}