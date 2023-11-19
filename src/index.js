import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store/index'
import { Provider } from 'react-redux';
import { ChakraProvider, Spinner } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './services/theme';
import './18n'
import './App.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> 
    <Suspense fallback={
      <div className='spinner'>
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />
      </div>
    }>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Suspense>
  </Provider>
);

