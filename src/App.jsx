import { useState } from 'react'
import CountryControls from './components/CountryControls'
import CountryDetail from './components/CountryDetail'
import CountryFilters from './components/CountryFilters'
import CountryList from './components/CountryList'
import Footer from './components/Footer'
import Header from './components/Header'
import { PaisesProvider } from './context/PaisesContext'

function App() {
  const [modoOscuro, setModoOscuro] = useState(false)

  return (
    <PaisesProvider>
      <div className="app" data-theme={modoOscuro ? 'dark' : 'light'}>
        <Header modoOscuro={modoOscuro} alternarModo={() => setModoOscuro((actual) => !actual)} />
        <main className="page-width explorer">
          <CountryFilters />
          <div className="explorer__layout">
            <section id="paises" aria-labelledby="titulo-paises">
              <h2 id="titulo-paises" className="section-title">Países</h2>
              <CountryList />
              <CountryControls />
            </section>
            <CountryDetail />
          </div>
        </main>
        <Footer />
      </div>
    </PaisesProvider>
  )
}

export default App
