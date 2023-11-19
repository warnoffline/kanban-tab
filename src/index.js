import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store/index'
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './services/theme';
import './18n'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> 
    <Suspense>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Suspense>
  </Provider>
);

