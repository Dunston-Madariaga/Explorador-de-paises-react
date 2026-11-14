import Icon from './Icon'

function Header({ modoOscuro, alternarModo }) {
  return (
    <header id="inicio" className="site-header">
      <div className="page-width site-header__inner">
        <h1 className="site-header__title">
          <Icon name="globe" />
          ¿En qué parte del mundo?
        </h1>
        <nav className="site-header__nav" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#paises">Países</a>
        </nav>
        <button type="button" className="theme-button" onClick={alternarModo}>
          <Icon name={modoOscuro ? 'sun' : 'moon'} />
          <span>{modoOscuro ? 'Modo claro' : 'Modo oscuro'}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
