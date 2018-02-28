function Lazer(angle, radius, speed) {

	/* Coordenadas Cartesianas */
  this.x = null;
  this.y = null;

	/* Coordenadas Polares */
  this.angle = angle; // Angulo
  this.radius = radius; // Tamaño

  this.speed = speed; // Velocidad

  this.onScreen = true;
}

/**
 * Calcula una nueva posicion
 * Convierte esa posicion a coordenadas cartesianas
 * Actualiza el estado en pantalla
 **/
Lazer.prototype.update = function() {

	/* Cambia la posicion */
  this.radius += this.speed;

	/* Convierte a cartesiano */
  this.x = this.radius * sin(this.angle);
  this.y = this.radius * cos(this.angle);

	/* Actualiza en patalla */
  this.onScreen = (this.radius < width);
};

/**
 * Devuelve si el lazer golpea al asteroide
 **/
Lazer.prototype.penetrates = function(asteroid) {

  var d = dist(this.x + width / 2, this.y + height / 2, asteroid.position.x, asteroid.position.y);

  return (d < asteroid.size / 2);
};

/**
 * Dibuja el lazer
 */
Lazer.prototype.draw = function() {

  stroke("#009900");
  strokeWeight(3);

  push(); // Guarda la traslacion

  translate(width / 2, height / 2);
  point(this.x, this.y);

  pop(); // Revierte la traslacion
};
