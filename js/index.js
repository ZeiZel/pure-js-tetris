import { createGameMenu } from './gameMenu.js';
import { tetrisContent } from './gameContents.js';

const app = (difficulty) => {
	const gameContent = document.querySelector('.game');
	gameContent.innerHTML = '';
	gameContent.innerHTML = tetrisContent;
};

createGameMenu(app);
