// App.jsx
import React, { useState, useEffect } from "react";

export default function App() {
  // Инициализация серверов с уникальными сообщениями
  const [servers, setServers] = useState([
    { id: "1", name: "Основной сервер", icon: "Z", messages: [] },
    { id: "2", name: "Резервный Сервер", icon: "R", messages: [] },
  ]);
  
  // ... (остальные состояния остаются без изменений)

  return (
    <div className={`flex h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-gradient-to-b from-indigo-200 to-sky-100'}`}>
      {/* Остальной JSX остается без изменений */}
    </div>
  );
}
