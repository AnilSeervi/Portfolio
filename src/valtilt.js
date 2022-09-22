const containers = document.querySelectorAll('.rounded');

containers.forEach((container) => {
	const card = container.firstElementChild;
	card.classList.add('hover-card');

	const { width, height } = container.getBoundingClientRect();

	container.addEventListener('mousemove', (e) => {
		const { offsetX, offsetY } = e;
		card.style.setProperty('--scale', 1.045);
		card.style.setProperty('--x-pos', offsetX / width - 0.5);
		card.style.setProperty('--y-pos', offsetY / height - 0.5);
	});

	container.addEventListener('mouseout', () => {
		card.style.setProperty('--scale', 1);
		card.style.setProperty('--y-pos', 0);
		card.style.setProperty('--x-pos', 0);
	});
});
