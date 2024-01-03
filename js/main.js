const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. Проверка темной темы на уровне системных настроек
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
    btnDarkMode.classList.add("dark-mode-btn--active");
	document.body.classList.add("dark");
}

// 2. Проверка темной темы в localStorage
if (localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
}

// Если меняются системные настройки, меняем тему
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";

        if (newColorScheme === "dark") {
			btnDarkMode.classList.add("dark-mode-btn--active");
			document.body.classList.add("dark");
			localStorage.setItem("darkMode", "dark");
		} else {
			btnDarkMode.classList.remove("dark-mode-btn--active");
			document.body.classList.remove("dark");
			localStorage.setItem("darkMode", "light");
		}
    });

// Включение ночного режима по кнопке
btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle("dark-mode-btn--active");
    const isDark = document.body.classList.toggle("dark");

    if (isDark) {
        localStorage.setItem("darkMode", "dark");
    } else {
        localStorage.setItem("darkMode", "light");
    }
};




function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
  
    const randomSize = Math.random() * 4;
    const randomPosition = Math.random() * window.innerWidth;
  
    snowflake.style.width = `${randomSize}px`;
    snowflake.style.height = `${randomSize}px`;
    snowflake.style.left = `${randomPosition}px`;
  
    const snowContainer = document.querySelector('.snow-container');
    snowContainer.appendChild(snowflake);
  
    let topPosition = -randomSize;
    const fallSpeed = 1 + Math.random() * 2;
  
    function snowfall() {
      topPosition += fallSpeed;
      snowflake.style.top = `${topPosition}px`;
  
      const windowHeight = window.innerHeight;
      if (topPosition < windowHeight - randomSize) {
        requestAnimationFrame(snowfall);
      } else {
        snowflake.style.top = `${windowHeight - randomSize}px`;
  
        const increaseInterval = setInterval(() => {
          const flakeWidth = parseFloat(snowflake.style.width);
          const flakeHeight = parseFloat(snowflake.style.height);
          snowflake.style.width = `${flakeWidth + 0.1}px`;
          snowflake.style.height = `${flakeHeight + 0.1}px`;
  
          // Обновление координаты top при увеличении размера
          topPosition -= 0.1;
          snowflake.style.top = `${topPosition}px`;
  
          if (topPosition < -flakeHeight) {
            clearInterval(increaseInterval);
            snowflake.remove(); // Удаляем снежинку после завершения анимации
          }
        }, 1000);
      }
    }
  
    snowfall();
  }
  
  setInterval(createSnowflake, 100);
  