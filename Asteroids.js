
var field = []; // Pista de Asteroides
var bullets = []; // Pista del Lazer

var score; // Puntaje
var ship; // Jugador

function setup() {
  createCanvas(1280, 960);

  translate(width / 2, height / 2); // Traslada a la mitad de la pantalla

  ship = new Ship(randomColor(), randomColor());
  score = 0;
}

function draw() {
    /* Color del Mapa */
  background(52);

	/* Maneja Todo */
  handleKeys();
	handleField();
	handleBullets();

  newAsteroid();
	
	drawScore();

	/* Actualiza y dibuja la nave */
  ship.update();
  ship.draw();
}

/**
 * Crea un nuevo asteroide
 **/
function newAsteroid() {

	if (frameCount % 30 === 0) { // Cada medio segundo
    if (random() > map(score, 0, 1000, 0.75, 0.25)) { // Aumenta la dificultad

      var r = random(); // Plano para aleatorizar

			/* Genera asteroides solo en los bordes */
      var x = (r > 0.5) ? random(width) : (random() > 0.5) ? 0 : width;
      var y = (r < 0.5) ? random(height) : (random() > 0.5) ? 0 : height;

      field.push(new Asteroid(x, y, noise(frameCount) * 100, randomColor()));
    }
  }
}

/**
 * Actualiza, Dibuja, y maneja la colision de los asteroides en el array
 **/
function handleField() {

	for (var i = field.length - 1; i >= 0; i--) {

		/* Dibuja y Actualiza */
    field[i].update();
    field[i].draw();

		/* Verifica una colision */
    for (var j = bullets.length - 1; j >= 0; j--) {

      if (bullets[j].penetrates(field[i])) {
				// El asteroide fue golpeado
				// Gestion de array
        field.splice(i, 1);
        bullets.splice(j, 1);

        score++;
        return;
      }
    }
  }
}

/**
 * Actualiza, Dibuja, y gestiona el array de balas
 **/
function handleBullets() {

	for (var q = bullets.length - 1; q >= 0; q--) {

    if (bullets[q].onScreen) {

			/* Dibuja y Actualiza */
      bullets[q].update();
      bullets[q].draw();
    } else {
			// Lo no visible lo elimina del array

      bullets.splice(q, 1);
    }
  }
}

/**
 * Maneja las teclas del jugador para la rotacion
 **/
function handleKeys() {

  if (keyIsDown(LEFT_ARROW)) {

    ship.rotate(-0.05);
  } else if (keyIsDown(RIGHT_ARROW)) {

    ship.rotate(0.05);
  }
}

/**
 * Maneja las teclas del jugador para el lazer
 */
function keyPressed() {

  switch (keyCode) {

    case 32:
      ship.shoot(bullets);
      break;
  }
}

/**
 * Dibuja el puntaje del jugador
 **/
function drawScore() {

	noStroke();
  fill(255);
  textSize(30);
  textAlign(LEFT);
  text(score, 50, 100);
}

/**
 * Finaliza el ciclo y muestra el mensaje
 */
function endGame() {

  noLoop();
  noStroke();
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text("Game Over!", width / 2, height / 2);
}

/**
 * retorna un color aleatorio
 **/
function randomColor() {

  return color(random(255), random(255), random(255));
}
