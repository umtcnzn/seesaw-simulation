const plank = document.querySelector('.plank');


plank.addEventListener('click', (event) => {

    const clickedX = event.offsetX;

    const plankWidth = plank.offsetWidth;

    const centerX = plankWidth / 2;

    const distanceFromCenter = Math.abs(clickedX - centerX);

    const weight = randomWeight();
    const weightElement = createWeight(weight);
    weightElement.style.left = `${clickedX}px`;
    plank.appendChild(weightElement);
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