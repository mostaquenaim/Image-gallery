import { useContext } from 'react'
import Images from './component/Images'
import NavBarComp from './component/NavBarComp'
import { ThemeContext } from './Contexts/ThemeProvider'

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div
      data-theme={theme}
      className='font-italiana min-h-screen'>
      <NavBarComp></NavBarComp>
      <Images></Images>
    </div>
  )
}

export default App
