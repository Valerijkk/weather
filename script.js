"use strict"; // Включает строгий режим для повышения качества кода

// Ваш API ключ от OpenWeatherMap
const API_KEY = "bfc40623ee666ab26f4acb2cd9042fc7"; // Замените на ваш действующий API ключ

// Получение элементов DOM
const searchBtn = document.getElementById("search-btn"); // Получает кнопку поиска по ID
const cityInput = document.getElementById("city-input"); // Получает поле ввода города по ID
const weatherResult = document.getElementById("weather-result"); // Получает блок для отображения результатов по ID

// Функция для получения данных о погоде
async function getWeather(city) { // Асинхронная функция для запроса данных о погоде
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=ru&appid=${API_KEY}`; // Формирует URL для API запроса с кодированием названия города
    try { // Начало блока обработки ошибок
        const response = await fetch(apiURL); // Выполняет запрос к API
        if (!response.ok) { // Проверяет, успешен ли ответ
            throw new Error("Город не найден"); // Выбрасывает ошибку, если город не найден
        }
        const data = await response.json(); // Парсит ответ в формате JSON
        displayWeather(data); // Вызывает функцию для отображения данных о погоде
    } catch (error) { // Обработка ошибок
        displayError(error.message); // Вызывает функцию для отображения сообщения об ошибке
    }
}

// Функция для отображения данных о погоде
function displayWeather(data) { // Функция для обновления содержимого блока с результатами
    weatherResult.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3> <!-- Отображает название города и страну -->
        <p>${data.weather[0].description} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" /></p> <!-- Отображает описание погоды и иконку -->
        <p>Температура: ${data.main.temp}°C</p> <!-- Отображает текущую температуру -->
        <p>Ощущается как: ${data.main.feels_like}°C</p> <!-- Отображает ощущаемую температуру -->
        <p>Влажность: ${data.main.humidity}%</p> <!-- Отображает влажность -->
        <p>Ветер: ${data.wind.speed} м/с</p> <!-- Отображает скорость ветра -->
    `;
    weatherResult.classList.add("active"); // Добавляет класс для отображения блока
}

// Функция для отображения ошибок
function displayError(message) { // Функция для обновления содержимого блока с ошибкой
    weatherResult.innerHTML = `<p class="error">${message}</p>`; // Отображает сообщение об ошибке
    weatherResult.classList.add("active"); // Добавляет класс для отображения блока
}

// Обработчик события клика на кнопку поиска
searchBtn.addEventListener("click", () => { // Добавляет обработчик события клика на кнопку поиска
    const city = cityInput.value.trim(); // Получает и очищает значение из поля ввода
    if (city === "") { // Проверяет, пусто ли поле ввода
        displayError("Пожалуйста, введите название города."); // Вызывает функцию для отображения сообщения об ошибке
        return; // Прерывает выполнение функции, если поле пусто
    }
    getWeather(city); // Вызывает функцию для получения данных о погоде с введенным городом
});

// Обработчик события нажатия Enter в поле ввода
cityInput.addEventListener("keypress", (e) => { // Добавляет обработчик события нажатия клавиши в поле ввода
    if (e.key === "Enter") { // Проверяет, была ли нажата клавиша Enter
        searchBtn.click(); // Имитация клика на кнопку поиска
    }
});
