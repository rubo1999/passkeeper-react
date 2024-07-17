import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import FormularioAñadir from "./FormularioAñadir"
import Clave from "./Clave"
import Navegacion from "./Navegacion"
import Modal from "./Modal"

function Claves(){

    let [claves,setClaves] = useState([]) //Almacena las claves
    let [editando,setEditando] = useState(false) //Estado para controlar si se está editando o no
    let [claveActual,setClaveActual] = useState(null)//Almacena la clave actual que está editándose

    let {tipo_id} = useParams()

    //Carga de las claves del tipo determinado que se saca del useParams con la dependencia en el useEffect
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

    //Ceación un nuevo objeto con los datos actualizados. En caso de que no sea el mismo id, retornar la clave sin ningún cambio
    function actualizarClave(id, titulo, tipo_id, tipo, usuario, contraseña) {
        setClaves(claves.map(clave => clave.id == id ? { ...clave, titulo, tipo_id, tipo, usuario, contraseña } : clave))
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
            { editando ? <Modal 
                            clave={claveActual} 
                            cerrarModal={cerrarModal} 
                            actualizarClave={actualizarClave} /> : null }
        </>
    )
}

export default Claves