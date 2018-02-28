function Ship(fillColor, strokeColor) {

  this.angle = 0; // Angulo
  this.angleVelocity = 0; // Velocidad del Angulo

  this.fillColor = fillColor; // Color de la nave
  this.strokeColor = strokeColor; // Color del perímetro
}

/**
 * Cambia el angulo por angleVelocity
 **/
Ship.prototype.update = function() {

  this.angle += this.angleVelocity;
  this.angleVelocity *= 0.7;
};

/**
 * Dispara lazers
 * Añade el disparo al array
 **/
Ship.prototype.shoot = function(bullets) {

  bullets.push(new Lazer(-this.angle + PI, 0, 5));
};

/**
 * Cambia el angleVelocity basado en la aceleracion 
 **/
Ship.prototype.rotate = function(acceleration) {

  this.angleVelocity += acceleration;
};

/**
 * Dibuja la nave
 **/
Ship.prototype.draw = function() {

  fill(this.fillColor);
  strokeWeight(2);
  stroke(this.strokeColor);

  push(); // Guarda la traslacion y rotacion

  translate(width / 2, height / 2); // Dibuja la nave en el centro
  rotate(this.angle); // Dibuja relativo al angulo de la nave

	/* Dibuja el triangulo */
  beginShape();
  vertex(0, -30);
  vertex(15, 15);
  vertex(-15, 15);
  endShape(CLOSE);

  pop(); // Revierte la traslacion y rotacion
};
