import { Link } from "react-router-dom"

function Navegacion(){
    return (
        <nav className="cabecera">
            <img src="/logo.png"/>
            <ul>
                <li><Link to="/" className="enlace">Inicio</Link></li>
                <li><Link to="/claves/tipo/1" className="enlace">Bancos</Link></li>
                <li><Link to="/claves/tipo/2" className="enlace">Trabajo</Link></li>
                <li><Link to="/claves/tipo/3" className="enlace">Redes</Link></li>
                <li><Link to="/claves/tipo/4" className="enlace">Compras</Link></li>
            </ul>
            <h2>Tu mejor gestor de contraseñas</h2>
        </nav>
    )
}

export default Navegacion