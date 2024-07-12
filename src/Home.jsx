import { useState, useEffect } from "react"
import Navegacion from "./Navegacion"
import FormularioFiltro from "./FormularioFiltro"
import Clave from "./Clave"
import Modal from "./Modal"

function Home({clave}){

    let [claves,setClaves] = useState([])
    let [editando,setEditando] = useState(false)
    let [claveActual,setClaveActual] = useState(null)

    useEffect(() => {
        fetch("http://localhost:4000/claves")
        .then(claves => claves.json())
        .then(claves => setClaves(claves))
    },[])

    function borrarClave(id){
        setClaves(claves.filter(clave => clave.id != id))
    }

    function obtenerTipo(clavesFiltradas){
        setClaves(clavesFiltradas)
    }

    function abrirModal(clave){
        setClaveActual(clave)
        setEditando(true)
    }

    function cerrarModal(){
        setEditando(false)
        setClaveActual(null)
    }

    function actualizarClave(id, titulo, tipo_id, tipo, usuario, contraseña) {
        setClaves(
          claves.map((clave) =>
            clave.id === id
              ? { ...clave, titulo, tipo_id, tipo, usuario, contraseña }
              : clave
          )
        );
        cerrarModal();
      }


    return(
        <>
            <Navegacion />
            <FormularioFiltro obtenerTipo={obtenerTipo}  />
            <section className="claves">
                { claves.length == 0 ? <li>No hay ninguna clave registrada</li> : claves.map(({ id,titulo,tipo_id,usuario,contraseña,tipo }) => <Clave 
                    key={id}
                    id={id} 
                    titulo={titulo}
                    tipo_id={tipo_id}
                    usuario={usuario} 
                    contraseña={contraseña}
                    tipo={tipo}
                    borrarClave={borrarClave}
                    abrirModal={abrirModal}
                    /> ) }               
            </section>
            { editando && <Modal 
                            clave={claveActual} 
                            cerrarModal={cerrarModal}
                            actualizarClave={actualizarClave} />}
        </>
    )
}

export default Home