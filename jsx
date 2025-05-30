```jsx

import React, { useState, useEffect } from "react";

export default function App() {

// Инициализация серверов с уникальными сообщениями

const [servers, setServers] = useState([

{ id: "1", name: "Основной сервер", icon: "Z", messages: [] },

{ id: "2", name: "Резервный Сервер", icon: "R", messages: [] },

]);

const [selectedServer, setSelectedServer] = useState(servers[0].id);

const [searchQuery, setSearchQuery] = useState("");

const [activeSection, setActiveSection] = useState("chat");

const [newServerName, setNewServerName] = useState("");

const [newMessage, setNewMessage] = useState("");

const [darkMode, setDarkMode] = useState(true);

const [devMode, setDevMode] = useState(false);

const [password, setPassword] = useState("");

const [debugMode, setDebugMode] = useState(false);

const [loggingEnabled, setLoggingEnabled] = useState(false);

// Получаем текущий сервер

const currentServer = servers.find((s) => s.id === selectedServer) || servers[0];

// Функции логирования и отладки

const logEvent = (category, action, label, value) => {

if (loggingEnabled) {

console.log(`[LOG] ${category} - ${action} - ${label}:`, value);

}

};

const debugInfo = (message, data) => {

if (debugMode) {

console.debug(`[DEBUG] ${message}:`, data);

}

};

// Обработка отправки сообщения

const sendMessage = () => {

if (newMessage.trim()) {

const newMsg = {

user: "Вы",

text: newMessage,

time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),

};

// Обновляем сообщения только для текущего сервера

setServers(prevServers => {

const updatedServers = prevServers.map(server =>

server.id === selectedServer

? { ...server, messages: [...server.messages, newMsg] }

: server

);

// Логируем изменение

logEvent('Chat', 'Message sent', 'Server ID', selectedServer);

debugInfo('Обновленный список серверов', updatedServers);

return updatedServers;

});

setNewMessage("");

}

};

// Обработка создания нового сервера

const handleCreateServer = (e) => {

e.preventDefault();

if (newServerName.trim()) {

const newServer = {

id: Date.now().toString(),

name: newServerName,

icon: newServerName.charAt(0).toUpperCase(),

messages: []

};

setServers(prev => {

const updatedServers = [...prev, newServer];

// Логируем создание сервера

logEvent('Server', 'Created', 'New Server ID', newServer.id);

debugInfo('Новый сервер создан', newServer);

return updatedServers;

});

setNewServerName("");

setActiveSection("chat");

setSelectedServer(newServer.id);

}

};

// Переключение темы

const toggleTheme = () => {

setDarkMode(!darkMode);

logEvent('Theme', 'Changed', 'Status', !darkMode ? 'Light' : 'Dark');

debugInfo('Тема изменена', { darkMode: !darkMode });

};

// Проверка пароля для режима разработчика

const checkPassword = () => {

if (password === "zk87fj2j750BETA") {

setDevMode(true);

logEvent('DevMode', 'Activated', 'User', 'authenticated');

debugInfo('Режим разработчика активирован');

} else {

alert("Неверный пароль!");

logEvent('DevMode', 'Failed', 'Attempt', password);

debugInfo('Неудачная попытка входа в режим разработчика');

}

};

// Выход из режима разработчика

const exitDevMode = () => {

setDevMode(false);

setPassword("");

setDebugMode(false);

setLoggingEnabled(false);

logEvent('DevMode', 'Deactivated', 'User', 'logged out');

debugInfo('Режим разработчика деактивирован');

};

// Обработка изменения чекбоксов

const handleDebugToggle = (state) => {

setDebugMode(state);

logEvent('Settings', 'Debug Mode', 'Status', state ? 'Enabled' : 'Disabled');

debugInfo('Режим отладки изменен', { enabled: state });

};

const handleLoggingToggle = (state) => {

setLoggingEnabled(state);

logEvent('Settings', 'Logging', 'Status', state ? 'Enabled' : 'Disabled');

debugInfo('Логирование изменено', { enabled: state });

};

// Применяем тему

useEffect(() => {

if (darkMode) {

document.documentElement.classList.add('dark');

} else {

document.documentElement.classList.remove('dark');

}

}, [darkMode]);

return (

<div className={`flex h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gradient-to-b from-indigo-200 to-sky-100'}`}>

{/* Левая панель */}

<div className={`w-64 p-4 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>

{/* Логотип */}

<div className="flex items-center mb-6">

<div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gradient-to-r from-indigo-500 to-blue-500'} flex items-center justify-center font-bold text-white text-xl shadow-lg`}>

Z

</div>

<span className="ml-3 text-lg font-semibold text-white">Zascord</span>

</div>

{/* Поиск */}

<div className="mb-4">

<input

type="text"

value={searchQuery}

onChange={(e) => {

setSearchQuery(e.target.value);

// Поиск по ID

if (!isNaN(e.target.value)) {

console.log(`Поиск пользователя с ID: ${e.target.value}`);

}

}}

placeholder="Найти или начать беседу..."

className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}

/>

</div>

{/* Серверы */}

<div className="mb-6">

<h3 className={`text-xs uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Серверы</h3>

<ul>

{servers.map((server) => (

<li key={server.id}>

<div

onClick={() => {

setSelectedServer(server.id);

setActiveSection("chat");

}}

className={`flex items-center px-3 py-2 rounded cursor-pointer ${

selectedServer === server.id

? darkMode ? 'bg-gray-800' : 'bg-indigo-100'

: darkMode ? 'hover:bg-gray-800' : 'hover:bg-indigo-200'

}`}

>

<div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 ${darkMode ? 'bg-blue-600' : 'bg-indigo-500'}`}>

{server.icon}

</div>

<span className={darkMode ? 'text-white' : 'text-gray-800'}>{server.name}</span>

</div>

</li>

))}

</ul>

</div>

{/* Разделитель "Прочее" */}

<div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} mb-4 pt-2`}>

<h3 className={`text-xs uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Прочее</h3>

</div>

{/* Дополнительные разделы */}

<div>

<ul className="space-y-1">

<li>

<button

onClick={() => setActiveSection("friends")}

className={`flex items-center px-3 py-2 w-full hover:${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} rounded ${

activeSection === "friends" ? (darkMode ? 'bg-gray-800' : 'bg-indigo-200') : ''

}`}

>

<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 010 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 01-8 0 4 4 0 018 0z" />

</svg>

Друзья

</button>

</li>

<li>

<button

onClick={() => setActiveSection("settings")}

className={`flex items-center px-3 py-2 w-full hover:${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} rounded ${

activeSection === "settings" ? (darkMode ? 'bg-gray-800' : 'bg-indigo-200') : ''

}`}

>

<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />

<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

</svg>

Настройки

</button>

</li>

<li>

<button

onClick={() => setActiveSection("premium")}

className={`flex items-center px-3 py-2 w-full hover:${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} rounded ${

activeSection === "premium" ? (darkMode ? 'bg-gray-800' : 'bg-indigo-200') : ''

}`}

>

<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />

</svg>

Premium

</button>

</li>

<li>

<button

onClick={() => setActiveSection("store")}

className={`flex items-center px-3 py-2 w-full hover:${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} rounded ${

activeSection === "store" ? (darkMode ? 'bg-gray-800' : 'bg-indigo-200') : ''

}`}

>

<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />

</svg>

Магазин

</button>

</li>

</ul>

</div>

{/* Создать сервер */}

<div className={`mt-auto pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>

<button

onClick={() => setActiveSection("create-server")}

className={`flex items-center px-3 py-2 w-full hover:${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} rounded`}

>

<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />

</svg>

Создать сервер

</button>

</div>

</div>

{/* Основная область */}

<div className="flex-1 flex flex-col">

{/* Шапка */}

<div className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} px-4 py-3 shadow`}>

<h1 className="text-lg font-semibold text-white">

{activeSection === "friends" && "Друзья"}

{activeSection === "premium" && "Premium"}

{activeSection === "store" && "Магазин"}

{activeSection === "create-server" && "Создать сервер"}

{activeSection === "settings" && "Настройки"}

{(activeSection === "chat" || !activeSection) && `#${currentServer.name}`}

</h1>

</div>

{/* Контент */}

<div className="flex-1 overflow-y-auto p-4">

{activeSection === "friends" && (

<div className="space-y-4">

<h2 className="text-xl font-bold mb-4 text-white">Друзья</h2>

<p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Ваши друзья будут отображаться здесь</p>

</div>

)}

{activeSection === "settings" && (

<div className="space-y-6">

<h2 className="text-xl font-bold mb-4 text-white">Настройки</h2>

{/* Переключение темы */}

<div className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} p-4 rounded-lg`}>

<h3 className="text-lg font-semibold mb-2 text-white">Тема</h3>

<div className="flex items-center">

<button

onClick={toggleTheme}

className={`px-4 py-2 rounded-l-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-300 text-indigo-800'} transition-colors duration-200`}

>

Темная

</button>

<button

onClick={toggleTheme}

className={`px-4 py-2 rounded-r-md ${!darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-300 text-indigo-800'} transition-colors duration-200`}

>

Светлая

</button>

</div>

</div>

{/* Режим разработчика */}

<div className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} p-4 rounded-lg`}>

<h3 className="text-lg font-semibold mb-2 text-white">Режим разработчика</h3>

{!devMode ? (

<div className="space-y-2">

<p className="text-sm text-white">Введите пароль для активации режима разработчика:</p>

<div className="flex space-x-2">

<input

type="password"

value={password}

onChange={(e) => setPassword(e.target.value)}

className={`flex-1 px-3 py-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-300 text-indigo-800'}`}

placeholder="Пароль"

/>

<button

onClick={checkPassword}

className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"

>

Активировать

</button>

</div>

</div>

) : (

<div className="flex items-center justify-between">

<div className="text-green-400">Режим разработчика активирован!</div>

<button

onClick={exitDevMode}

className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"

>

Выйти

</button>

</div>

)}

</div>

{/* Дополнительные настройки */}

{devMode && (

<div className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} p-4 rounded-lg mt-4`}>

<h3 className="text-lg font-semibold mb-2 text-white">Дополнительные настройки разработчика</h3>

<div className="space-y-2">

<div className="flex items-center justify-between">

<label className="text-white">Отладка:</label>

<label className="relative inline-block w-10 mr-2 align-middle select-none">

<input

type="checkbox"

checked={debugMode}

onChange={() => handleDebugToggle(!debugMode)}

className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"

/>

<label className="toggle-label block overflow-hidden h-5 rounded-full bg-blue-600 cursor-pointer"></label>

</label>

</div>

<div className="flex items-center justify-between">

<label className="text-white">Логирование:</label>

<label className="relative inline-block w-10 mr-2 align-middle select-none">

<input

type="checkbox"

checked={loggingEnabled}

onChange={() => handleLoggingToggle(!loggingEnabled)}

className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"

/>

<label className="toggle-label block overflow-hidden h-5 rounded-full bg-blue-600 cursor-pointer"></label>

</label>

</div>

</div>

</div>

)}

{/* Отладочная информация */}

{debugMode && (

<div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-indigo-200'}`}>

<h3 className="text-lg font-semibold mb-2 text-white">Отладочная информация</h3>

<div className="space-y-2 text-xs overflow-auto max-h-40">

<div className="mb-2">Текущий сервер: {currentServer.name}</div>

<div className="mb-2">Количество серверов: {servers.length}</div>

<div className="mb-2">Тема: {darkMode ? 'Темная' : 'Светлая'}</div>

<div className="mb-2">Режим разработчика: {devMode ? 'Активирован' : 'Деактивирован'}</div>

<div className="mb-2">Отладка: {debugMode ? 'Включена' : 'Выключена'}</div>

<div className="mb-2">Логирование: {loggingEnabled ? 'Включено' : 'Выключено'}</div>

</div>

</div>

)}

</div>

)}

{activeSection === "premium" && (

<div className="space-y-4">

<h2 className="text-xl font-bold mb-4 text-white">Zascord Premium</h2>

<p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Получите эксклюзивные преимущества:</p>

<ul className="list-disc pl-5 space-y-2">

<li>Безлимитные кастомные эмодзи</li>

<li>Увеличенные загрузки файлов</li>

<li>Эксклюзивные темы</li>

<li>Приоритетная поддержка</li>

</ul>

<button className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white">

Подписаться

</button>

</div>

)}

{activeSection === "store" && (

<div className="space-y-4">

<h2 className="text-xl font-bold mb-4 text-white">Магазин Zascord</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} p-4 rounded-lg`}>

<h3 className="font-semibold text-white">Эмодзи Pack 1</h3>

<p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Набор кастомных эмодзи</p>

<p className="mt-2 font-bold text-white">99₽</p>

<button className="mt-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm text-white">

Купить

</button>

</div>

<div className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} p-4 rounded-lg`}>

<h3 className="font-semibold text-white">Тема "Космос"</h3>

<p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Темная тема с звездами</p>

<p className="mt-2 font-bold text-white">149₽</p>

<button className="mt-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm text-white">

Купить

</button>

</div>

</div>

</div>

)}

{activeSection === "create-server" && (

<div className="space-y-4">

<h2 className="text-xl font-bold mb-4 text-white">Создать новый сервер</h2>

<form onSubmit={handleCreateServer} className="space-y-4">

<div>

<label htmlFor="serverName" className="block text-sm font-medium mb-1 text-white">

Название сервера

</label>

<input

type="text"

id="serverName"

value={newServerName}

onChange={(e) => setNewServerName(e.target.value)}

className={`w-full px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-300 text-indigo-800'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}

placeholder="Введите название сервера"

/>

</div>

<button

type="submit"

className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white"

>

Создать сервер

</button>

</form>

</div>

)}

{(activeSection === "chat" || !activeSection) && (

<>

{/* Каналы */}

<div className={`${darkMode ? 'border-gray-700' : 'border-gray-300'} border-b pb-4 mb-4`}>

<ul>

<li>

<a href="#" className={`flex items-center px-3 py-2 hover:${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} rounded`}>

<svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">

<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />

</svg>

Общий чат

</a>

</li>

</ul>

</div>

{/* Чат */}

<div className="flex flex-col space-y-4">

{currentServer.messages.map((msg, idx) => (

<div

key={idx}

className={`flex flex-col ${msg.user === "Вы" ? "items-end" : "items-start"}`}

>

<div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${msg.user === "Вы" ? 'bg-indigo-600' : darkMode ? 'bg-gray-800' : 'bg-indigo-200'}`}>

<div className="font-semibold text-sm text-white">{msg.user}</div>

<p className="text-sm mt-1 text-white">{msg.text}</p>

<div className="text-xs text-right text-gray-400 mt-1">{msg.time}</div>

</div>

</div>

))}

</div>

</>

)}

</div>

{/* Ввод сообщений */}

{(activeSection === "chat" || !activeSection) && (

<div className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-200'} p-4`}>

<div className="flex items-center space-x-2">

<input

type="text"

value={newMessage}

onChange={(e) => setNewMessage(e.target.value)}

onKeyDown={(e) => e.key === "Enter" && sendMessage()}

placeholder="Сообщение..."

className={`flex-1 px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-indigo-300 text-indigo-800'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}

/>

<button

onClick={sendMessage}

className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white"

>

Отправить

</button>

</div>

</div>

)}

</div>

</div>

);

}

```

### Что еще нужно добавить?

1. **Настройка проекта**:

- Убедитесь, что в проекте есть `index.js`, `index.html` и другие необходимые файлы (создаются `create-react-app`).

- Установите Tailwind CSS, если еще не установлен: [инструкция](https://tailwindcss.com/docs/guides/create-react-app).

2. **Деплой на GitHub Pages**:

- Добавьте в `package.json`:

```json

"homepage": "https://yourusername.github.io/repository-name",

"scripts": {

"predeploy": "npm run build",

"deploy": "gh-pages -d build",

// ... остальные скрипты

}

```

- Запустите:

```bash

npm run deploy

```
