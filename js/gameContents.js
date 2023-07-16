export const menuContent = `
    <div class="game__menu">
        <span>DIFFICULTY</span>
        <button class="sketch-btn easy">EASY</button>
        <button class="sketch-btn normal">NORMAL</button>
        <button class="sketch-btn hard">HARD</button>
    </div>
`;

export const tetrisContent = `
    <h1 class="game__title">TETRIS</h1>
    <div class="game__wrapper">
        <div class="game__canvas">
            <canvas id="game" width="320" height="640"></canvas>
        </div>
        <div class="game__info">
            <div class="game__next">
                <span class="next__title">NEXT</span>
                <div class="next__wrapper">
                    <div class="tetromino">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="game__score">
                <span class="score__title">SCORE</span>
                <span class="score__total">0</span>
            </div>
            <div class="game__buttons">
                <button class="sketch-btn start">START</button>
                <button class="sketch-btn pause">PAUSE</button>
                <button class="sketch-btn restart">RESTART</button>
            </div>
            <div class="game__controls">
                <button class="sketch-btn top">
                    <span>
                        <img src="img/icons/top.svg" alt="top" />
                    </span>
                </button>
                <button class="sketch-btn bottom">
                    <span>
                        <img src="img/icons/down.svg" alt="bottom" />
                    </span>
                </button>
                <button class="sketch-btn left">
                    <span>
                        <img src="img/icons/left.svg" alt="left" />
                    </span>
                </button>
                <button class="sketch-btn right">
                    <span>
                        <img src="img/icons/right.svg" alt="right" />
                    </span>
                </button>
            </div>
        </div>
    </div>
`;
