import bridge from '@vkontakte/vk-bridge';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

await bridge.send('VKWebAppInit', {});

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>
    <App />
</React.StrictMode>);