import {
	EASY_DIFFICULTY_SPEED,
	NORMAL_DIFFICULTY_SPEED,
	HARD_DIFFICULTY_SPEED,
} from './constants.js';
import { menuContent } from './gameContents.js';
import { addHoverToButton } from './sketchButton.js';

export const createGameMenu = (app) => {
	const gameContent = document.querySelector('.game');
	gameContent.innerHTML = '';
	gameContent.innerHTML = menuContent;

	const easyButton = document.querySelector('.easy');
	const normalButton = document.querySelector('.normal');
	const hardButton = document.querySelector('.hard');

	easyButton.addEventListener('click', () => app(EASY_DIFFICULTY_SPEED));
	normalButton.addEventListener('click', () => app(NORMAL_DIFFICULTY_SPEED));
	hardButton.addEventListener('click', () => app(HARD_DIFFICULTY_SPEED));

	addHoverToButton();
};
