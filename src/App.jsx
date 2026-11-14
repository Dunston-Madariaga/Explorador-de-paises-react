import CountryControls from './components/CountryControls'
import CountryList from './components/CountryList'
import Header from './components/Header'
import { PaisesProvider } from './context/PaisesContext'

function App() {
  return (
    <PaisesProvider>
      <Header />
      <main>
        <h2>Países</h2>
        <CountryList />
        <CountryControls />
      </main>
    </PaisesProvider>
  )
}

export default App
