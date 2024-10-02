import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as ParentRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <>
    <ParentRouter>
      <App />  
    </ParentRouter>
  </>,
)
