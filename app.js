let weights = [];

const plank = document.querySelector('.plank');
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
    updateSeesaw();
})




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
    plank.style.transform = `rotate(${tiltAngle}deg)`;
    leftWeightText.textContent = totalLeftWeight;
    rightWeightText.textContent = totalRightWeight;
}