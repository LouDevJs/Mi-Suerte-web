// Función para dar formato a la fecha actual
function setLocalDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  document.getElementById('current-date').textContent = today.toLocaleDateString('es-ES', options);
}

// Generador de números basado en el día actual (para que se mantengan fijos durante todo el día)
function getDailyNumbers() {
  const today = new Date();
  // Creamos una "semilla" numérica usando la fecha (año, mes, día)
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  let numbers = [];
  let i = 0;
  
  while (numbers.length < 4) {
    // Generador pseudoaleatorio usando la semilla
    const x = Math.sin(seed + i) * 10000;
    const num = Math.floor((x - Math.floor(x)) * 100); // Números de 00 a 99
    
    // Formatear a dos dígitos (ej: 05, 09, 87)
    const formattedNum = num.toString().padStart(2, '0');
    
    if (!numbers.includes(formattedNum)) {
      numbers.push(formattedNum);
    }
    i++;
  }
  return numbers;
}

// Mostrar números en la interfaz
function displayNumbers() {
  setLocalDate();
  const dailyHot = getDailyNumbers();
  
  // Renderizar bolos principales
  const container = document.getElementById('hot-numbers');
  container.innerHTML = '';
  dailyHot.forEach(num => {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.textContent = num;
    container.appendChild(ball);
  });
  
  // Combinaciones sugeridas fijas para el día
  document.getElementById('pale-suggest').textContent = `${dailyHot[0]} - ${dailyHot[1]}`;
  document.getElementById('tripleta-suggest').textContent = `${dailyHot[0]} - ${dailyHot[1]} - ${dailyHot[2]}`;
  document.getElementById('super-pale-suggest').textContent = `${dailyHot[2]} - ${dailyHot[3]}`;
}

// Generar jugada personalizada interactiva (clic en el botón)
function generatePersonalLuck() {
  let personalNumbers = [];
  while (personalNumbers.length < 4) {
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    if (!personalNumbers.includes(randomNum)) {
      personalNumbers.push(randomNum);
    }
  }
  
  // Actualizar bolos principales con efecto visual rápido
  const balls = document.querySelectorAll('.ball');
  balls.forEach((ball, idx) => {
    ball.style.animation = 'none'; // Detener temporalmente
    // Pequeño delay de revelación
    setTimeout(() => {
      ball.textContent = personalNumbers[idx];
      ball.style.animation = 'bounce 0.5s ease infinite alternate';
    }, idx * 150);
  });
  
  // Actualizar sugerencias dinámicamente
  setTimeout(() => {
    document.getElementById('pale-suggest').textContent = `${personalNumbers[0]} - ${personalNumbers[1]}`;
    document.getElementById('tripleta-suggest').textContent = `${personalNumbers[0]} - ${personalNumbers[1]} - ${personalNumbers[2]}`;
    document.getElementById('super-pale-suggest').textContent = `${personalNumbers[2]} - ${personalNumbers[3]}`;
  }, 600);
}

// Inicializar al cargar la página
window.onload = displayNumbers;