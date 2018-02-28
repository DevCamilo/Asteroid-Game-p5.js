function Asteroid(x, y, size, color) {

  this.position = createVector(x, y);

  this.size = size; // Radio del asteroide
  this.color = color; // Asigna el color aleatorio
}

/**
 * Dirige el asteroide hacia la nave
 * verifica colisiones con la nave
 */
Asteroid.prototype.update = function() {

  var path = createVector(width / 2, height / 2).sub(this.position); // Hace el camino
  path.setMag(5 - log(this.size)); // Cambia la magnitud segun el tamaño del asteroide

  this.position.add(path); // Cambia la posicion segun el camino

	/* Revisa colosion con la nave */
  var d = dist(this.position.x, this.position.y, width / 2, height / 2);

  if (d < this.size / 2) {
		// La distancia es mayor que el radio del asteroide

    endGame();
  }
};

/**
 * dDibuja el Asteroide
 **/
Asteroid.prototype.draw = function() {

  fill(51);
  stroke(this.color);
  strokeWeight(5);

  ellipse(this.position.x, this.position.y, this.size);
};
