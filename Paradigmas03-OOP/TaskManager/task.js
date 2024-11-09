// Task.js
function Task(title, description, difficulty, expireDate) {
  this.title = title;
  this.description = description || '';
  this.status = 'pendiente'; // Valor predeterminado
  this.creationDate = new Date();
  this.lastEditDate = new Date();
  this.expireDate = expireDate;
  this.difficulty = difficulty;
}

// Métodos en el prototipo de Task
Task.prototype.changeStatus = function(newStatus) {
  this.status = newStatus;
};

Task.prototype.showTask = function() {
  console.log("\nTítulo:", this.title);
  console.log("Estado:", this.status);
  console.log("Descripción:", this.description);
  console.log("Fecha de creación:", this.creationDate);
  console.log("Fecha de vencimiento:", this.expireDate);
  console.log("Dificultad:", this.getDifficultyStars());
  console.log("Última edición:", this.lastEditDate);
};

Task.prototype.getDifficultyStars = function() {
  switch (this.difficulty.toLowerCase()) {
    case 'baja':
      return '★☆☆';
    case 'media':
      return '★★☆';
    case 'alta':
      return '★★★';
    default:
      return 'Dificultad inválida';
  }
};

Task.prototype.editTask = function(newTitle, newDescription, newStatus, newDifficulty, newExpireDate) {
  this.title = newTitle || this.title;
  this.description = newDescription || this.description;
  this.status = newStatus || this.status;
  this.difficulty = newDifficulty || this.difficulty;
  this.expireDate = newExpireDate || this.expireDate;
  this.lastEditDate = new Date();

  console.log("Tarea editada con éxito.");
};

module.exports = Task;
