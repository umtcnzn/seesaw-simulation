let weights = [];

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
    weights.push({ element: weightElement, distance: distanceFromCenter, weight, direction: clickedX < centerX ? 'left' : 'right' });
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
    return weightElement;
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
    console.log(`Left Torque: ${totalLeftTorque}, Right Torque: ${totalRightTorque}, Tilt Angle: ${tiltAngle}`);
    plank.style.transform = `rotate(${tiltAngle}deg)`;
    leftWeightText.textContent = totalLeftWeight;
    rightWeightText.textContent = totalRightWeight;
}

saveWeights = () => {
    if (weights.length === 0) {
        localStorage.removeItem('weights');
        return;
    }
    localStorage.setItem('weights', JSON.stringify(weights));
}

loadWeights = () => {
    const savedWeights = JSON.parse(localStorage.getItem('weights'));
    if (savedWeights) {
        weights = savedWeights;
    }
}

initWeights = () => {
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