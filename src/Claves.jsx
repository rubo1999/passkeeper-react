import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import FormularioAñadir from "./FormularioAñadir"
import Clave from "./Clave"
import Navegacion from "./Navegacion"
import Modal from "./Modal"

function Claves(){

    let [claves,setClaves] = useState([])
    let [editando,setEditando] = useState(false)
    let [claveActual,setClaveActual] = useState(null)

    let {tipo_id} = useParams()

    useEffect(() => {
        fetch(`https://api-passkeeper.onrender.com/claves/tipo/${tipo_id}`)
        .then(claves => claves.json())
        .then(claves => setClaves(claves))
    }, [tipo_id])

    function crearClave(clave){
        setClaves([...claves,clave])
    }

    function borrarClave(id){
        setClaves(claves.filter(clave => clave.id != id))
    }

    function abrirModal(clave){
        setClaveActual(clave)
        setEditando(true)
    }

    function cerrarModal(){
        setEditando(false)
        setClaveActual(null)
    }

    function actualizarClave(id,titulo,tipo_id,tipo,usuario,contraseña){
        setClaves(claves.map(clave =>{
            if(clave.id == id){
                return {...clave,titulo,tipo_id,tipo,usuario,contraseña}
            }
            return clave
        }))
        cerrarModal()
    }

    return(
        <>
        <Navegacion />
            <FormularioAñadir crearClave={crearClave} />
            <section className="claves">
            {claves.length == 0 ? <li>No hay ninguna clave registrada</li> : claves.map(({ id, titulo, tipo_id, tipo, usuario, contraseña }) => <Clave 
                key={id} 
                id={id} 
                titulo={titulo} 
                tipo_id={tipo_id} 
                usuario={usuario} 
                contraseña={contraseña} 
                tipo={tipo} 
                borrarClave={borrarClave}
                abrirModal={abrirModal} />
                )}             
            </section>
            { editando && <Modal 
                            clave={claveActual} 
                            cerrarModal={cerrarModal} 
                            actualizarClave={actualizarClave} /> }
        </>
    )
}

export default Claves