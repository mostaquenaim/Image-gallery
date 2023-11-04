import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/styles/index.css'
import ThemeProvider from './Contexts/ThemeProvider.jsx'
import ImageProvider from './Contexts/ImageProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <ImageProvider>
            <App />
        </ImageProvider>
    </ThemeProvider>
)
