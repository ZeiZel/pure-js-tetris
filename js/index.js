import { createGameMenu } from './gameMenu.js';
import { tetrisContent } from './gameContents.js';
import { addHoverToButton } from './sketchButton.js';
import {
	isValidPosition,
	moveOnClickLeft,
	moveOnClickRight,
	rapidFallOnDown,
	rotateOnClickUp,
	showGameMessage,
	showNextTetromino,
	shuffle,
	tetrisResize,
} from './utils.js';
import { colors, tetrominoItems } from './tetrominoItems.js';

const app = (difficulty) => {
	const gameContent = document.querySelector('.game');
	gameContent.innerHTML = '';
	gameContent.innerHTML = tetrisContent;

	addHoverToButton();

	const canvas = document.getElementById('game');
	const context = canvas.getContext('2d');

	const scoreBlock = document.querySelector('.score__total');

	const startButton = document.querySelector('.start'),
		pauseButton = document.querySelector('.pause'),
		restartButton = document.querySelector('.restart');

	const topArrow = document.querySelector('.top'),
		bottomArrow = document.querySelector('.bottom'),
		leftArrow = document.querySelector('.left'),
		rightArrow = document.querySelector('.right');

	const squareSize = 32; // px

	let tetrominoOrder = [], // последовательность фигур
		playArea = [], // двумерный массив с игровым полем
		count = 0, // счётчик кадров (сложность)
		score = 0, // счёт
		isGameOver = false,
		requestAnimationId = null; // позволит взаимодействовать с анимацией блоков

	for (let row = -2; row < 20; row++) {
		playArea[row] = [];

		for (let col = 0; col < 10; col++) {
			playArea[row][col] = 0;
		}
	}

	let tetromino = createTetromino();

	const showGameOver = () => {
		cancelAnimationFrame(requestAnimationId);
		isGameOver = true;
		showGameMessage(context, canvas, 'GAME OVER !!');
	};

	function createTetromino() {
		if (tetrominoOrder.length === 0) {
			tetrominoOrder = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
			shuffle(tetrominoOrder);
		}

		const name = tetrominoOrder.pop();
		const matrix = tetrominoItems[name];
		const col = playArea[0].length / 2 - Math.ceil(matrix[0].length / 2); // получаем центральную позицию колонки
		const row = name === 'I' ? -1 : -2;

		return {
			name,
			matrix,
			row,
			col,
		};
	}

	const placeTetromino = () => {
		for (let row = 0; row < tetromino.matrix.length; row++) {
			for (let col = 0; col < tetromino.matrix[row].length; col++) {
				if (tetromino.matrix[row][col]) {
					if (tetromino.row + row < 0) {
						return showGameOver();
					}

					playArea[tetromino.row + row][tetromino.col + col] = tetromino.name;
				}
			}
		}

		for (let row = playArea.length - 1; row > 0; ) {
			// все ли элементы в строке являются единицами (1 = true)
			// every возвращает true, если все элементы подходят под условие
			if (playArea[row].every((cell) => !!cell)) {
				// очищаем заполненный ряд
				for (let r = row; r >= 0; r--) {
					// опускаем верхнюю часть вниз на одну клетку
					for (let col = 0; col <= playArea[r].length; col++) {
						playArea[r][col] = playArea[r - 1][col];
					}
				}

				scoreBlock.innerHTML = score += 5;
			} else {
				row--;
			}
		}

		tetromino = createTetromino();
	};

	const game = () => {
		showNextTetromino(tetrominoOrder[tetrominoOrder.length - 1]);
		requestAnimationId = requestAnimationFrame(game);
		context.clearRect(0, 0, canvas.clientWidth, canvas.height); // очищает холст

		for (let row = 0; row < 20; row++) {
			for (let col = 0; col < 10; col++) {
				if (playArea[row][col]) {
					const name = playArea[row][col];
					context.fillStyle = colors[name];
					context.fillRect(
						col * squareSize,
						row * squareSize,
						squareSize - 1,
						squareSize - 1,
					);
				}
			}
		}

		if (tetromino) {
			if (++count > difficulty) {
				tetromino.row++;
				count = 0;
			}

			if (!isValidPosition(tetromino.matrix, tetromino.col, tetromino.row, playArea)) {
				tetromino.row--;
				placeTetromino();
			}

			context.fillStyle = colors[tetromino.name];

			for (let row = 0; row < tetromino.matrix.length; row++) {
				for (let col = 0; col < tetromino.matrix[row].length; col++) {
					if (tetromino.matrix[row][col])
						context.fillRect(
							(tetromino.col + col) * squareSize,
							(tetromino.row + row) * squareSize,
							squareSize - 1,
							squareSize - 1,
						); // заливка квадрата цветом
				}
			}
		}
	};

	document.addEventListener('keydown', (e) => {
		if (isGameOver) return;

		if (e.which === 40) {
			rapidFallOnDown(tetromino, playArea, placeTetromino);
		}

		if (e.which === 38) {
			rotateOnClickUp(tetromino, playArea);
		}

		if (e.which === 39) {
			moveOnClickRight(tetromino, playArea);
		}

		if (e.which === 37) {
			moveOnClickLeft(tetromino, playArea);
		}
	});

	startButton.addEventListener('click', () => {
		requestAnimationId = requestAnimationFrame(game);
		startButton.disabled = true;
		pauseButton.disabled = false;
	});

	pauseButton.addEventListener('click', () => {
		cancelAnimationFrame(requestAnimationId);
		showGameMessage(context, canvas, 'PAUSE');
		pauseButton.disabled = true;
		startButton.disabled = false;
	});

	restartButton.addEventListener('click', () => {
		// перезагрузка страницы
		window.location.reload();
	});

	topArrow.addEventListener('click', () => rotateOnClickUp(tetromino, playArea));
	leftArrow.addEventListener('click', () => moveOnClickLeft(tetromino, playArea));
	rightArrow.addEventListener('click', () => moveOnClickRight(tetromino, playArea));
	bottomArrow.addEventListener('click', () =>
		rapidFallOnDown(tetromino, playArea, placeTetromino),
	);
};

createGameMenu(app);

tetrisResize();

window.addEventListener('resize', () => tetrisResize());
