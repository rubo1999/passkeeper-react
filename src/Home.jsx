import { useState, useEffect } from "react"
import Navegacion from "./Navegacion"
import FormularioFiltro from "./FormularioFiltro"
import Clave from "./Clave"
import Modal from "./Modal"

function Home(){

    let [claves,setClaves] = useState([])//Estado para almacenar todas las claves
    let [editando,setEditando] = useState(false)//Estado para controlar si se está editando o no
    let [claveActual,setClaveActual] = useState(null)//Almacena la clave actual que está editándose

    //Carga de todas las claves
    useEffect(() => {
        fetch("https://api-passkeeper.onrender.com/claves")
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

    //Ceación un nuevo objeto con los datos actualizados. En caso de que no sea el mismo id, retornar la clave sin ningún cambio
    function actualizarClave(id, titulo, tipo_id, tipo, usuario, contraseña) {
        setClaves(claves.map((clave) => clave.id == id ? { ...clave, titulo, tipo_id, tipo, usuario, contraseña } : clave))
        cerrarModal()
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
            { editando ? <Modal 
                            clave={claveActual} 
                            cerrarModal={cerrarModal}
                            actualizarClave={actualizarClave} /> : null}
        </>
    )
}

export default Home