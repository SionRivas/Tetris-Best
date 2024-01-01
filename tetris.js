const tabla = document.getElementById('app');


let tablero = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function cloneArray(arr) {
    return arr.map(row => [...row]);
}

function createTable() {
    let disposition = '<table>';
    tablero.forEach((row, y) => {
        disposition += '<tr>';
        row.forEach((value, x) => {
            disposition += `<th id="${y}-${x}"></th>`;
        });
        disposition += '</tr>';
    });
    disposition += `</table>
                    <h5>created by Sion Rivas</h5>
                    <h6>January 1 - 2024</h6>`;
    tabla.innerHTML = disposition;
}

createTable();

let dropCounter = 0;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    if (dropCounter > 500 && canMove) {
        canMove = false;
        piece.position.y++;
        if (checkCollision()) {
            piece.position.y--;
            solidify();
        }
        dropCounter = 0;
        canMove = true;
    }

    draw();
    window.requestAnimationFrame(update);
}

// Generar un valor aleatorio entre dos colores (negro y gris oscuro) en formato hexadecimal

function draw() {
    if (
        piece.position.prex !== piece.position.x ||
        piece.position.prey !== piece.position.y ||
        JSON.stringify(preTablero) !== JSON.stringify(tablero) ||
        JSON.stringify(piece.preshape) !== JSON.stringify(piece.shape)
    ) {
        tablero.forEach((row, y) => {
            row.forEach((value, x) => {
                var box = document.getElementById(`${y}-${x}`);
                if (box.getAttribute('class') !== 'box-delete') {
                    box.setAttribute('class', `box-${value}`);
                }
            });
        });

        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    var box = document.getElementById(`${y + piece.position.y}-${x + piece.position.x}`);
                    box.setAttribute('class', `box-${value} move`);
                }
            });
        });

        preTablero = cloneArray(tablero);
        piece.position.prex = piece.position.x;
        piece.position.prey = piece.position.y;
        piece.preshape = cloneArray(piece.shape);
    }
}

let score = 0;

var piece = {
    position: {
        x: 4,
        prex: 0,
        y: 0,
        prey: 0,
    },
    shape: [
        [0],
    ],
    preshape: [],
};


const PIECES = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 2, 0,],
        [2, 2, 2,]
    ],
    [
        [3],
        [3],
        [3],
        [3]
    ],
    [
        [4, 0, 0],
        [4, 4, 4]
    ],
    [
        [0, 0, 5],
        [5, 5, 5]
    ],
    [
        [0, 6],
        [6, 6],
        [6, 0]
    ],
    [
        [7, 0],
        [7, 7],
        [0, 7]
    ]
]


let canMove = true;
document.addEventListener('keydown', (event) => {
    if (canMove) {
        canMove = false;
        if (event.key === 'ArrowLeft') doMovePiece(-1);
        if (event.key === 'ArrowRight') doMovePiece(1);
        if (event.key === 'ArrowDown') doMovePiece(2);
        if (event.key === 'ArrowUp') {
            let prepiece = piece.shape;
            let modify = [];

            for (let i = 0; i < piece.shape[0].length; i++) {
                const rowAdd = [];
                for (let j = piece.shape.length - 1; j >= 0; j--) {
                    rowAdd.push(piece.shape[j][i]);
                }
                modify.push(rowAdd);
            }
            piece.shape = modify;
            if (checkCollision()) piece.shape = prepiece;
            canMove = true;
        }
        canMove = true;
    }
});

function doMovePiece(sing) {
    if (sing === 2) {
        piece.position.y++;
        if (checkCollision()) {
            piece.position.y--;
            solidify();
        }

        canMove = true;
        return;
    }
    piece.position.x += sing;
    if (checkCollision()) piece.position.x -= sing;
    canMove = true;
}

function checkCollision() {
    return piece.shape.find((row, y) => {
        return row.find((value, x) => {
            return value !== 0 && tablero[y + piece.position.y]?.[x + piece.position.x] !== 0;
        });
    });
}

var lista = [];

function generateList() {
    for (var i = 1; i <= 7; i++) {
        lista.push(i);
    }
    for (var i = lista.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = lista[i];
        lista[i] = lista[j];
        lista[j] = temp;
    }
}

function solidify() {
    canMove = false;
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) tablero[y + piece.position.y][x + piece.position.x] = value;
        });
    });

    piece.shape = cloneArray(PIECES[lista[0] - 1]);
    lista.splice(0, 1);

    piece.position.x = Math.floor(tablero[0].length / 2 - piece.shape[0].length / 2);
    piece.position.y = 0;

    if (lista.length == 0) generateList();

    let next = document.getElementById('next');
    let nexthtml = `<h2>Next Piece</h2><table>`;
    PIECES[lista[0] - 1].forEach((row, y) => {
        nexthtml += `<tr>`;
        row.forEach((value, x) => {
            nexthtml += `<th class="box-${value}"></th>`;
        });
        nexthtml += `</tr>`;
    });
    next.innerHTML = nexthtml;

    if (checkCollision()) {
        alert('You loss')
        tablero.forEach((row) => row.fill(0));
        score = 0
        var marker = document.getElementById('score')
        marker.innerHTML = `
        <h3>Score</h3>
        <h2>${score}</h2>
        `
        
    }
    removeRows();

    canMove = true;
}

function removeRows() {
    let rowsToRemove = [];
    let newRow = Array(10).fill(0);
    tablero.forEach((row, y) => {
        if (row.every((value) => value != 0)) {
            rowsToRemove.push(y);
        }
    });
    rowsToRemove.forEach((y) => {
        tablero[y].forEach((value, x) => {
            var box = document.getElementById(`${y}-${x}`);
            box.setAttribute('class', `box-delete`);
        });
        setTimeout(function () {
            tablero.splice(y, 1);
            tablero.unshift(newRow);
            tablero[y].forEach((value, x) => {
                var box = document.getElementById(`${y}-${x}`);
                box.setAttribute('class', `box-0`);
            });

            draw();
        }, 500);
    });
    if (rowsToRemove.length == 1) refreshScore(200);
    if (rowsToRemove.length == 2) refreshScore(400);
    if (rowsToRemove.length == 3) refreshScore(800);
    if (rowsToRemove.length == 4) refreshScore(1500);
}

function refreshScore(value) {
    score += value;



    var marker = document.getElementById('score')
    marker.innerHTML = `
        <h3>Score</h3>
        <h2>${score}</h2>
        <h4 id="textGreen"class="textGreen">+${value}</h4>`

        setTimeout(()=>{
            let textGrenn = document.getElementById("textGreen")
            textGrenn.setAttribute("class","textFade")
        },3000)

}

update()
generateList()

solidify()