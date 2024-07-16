import { useEffect, useState } from "react"


function FormularioFiltro({ obtenerTipo }){

    let [secciones,setSecciones] = useState([])//Estado para almacenar las seccinoes disponibles
    let [tipoSeleccionado,setTipoSeleccionado] = useState("0")//Estado para almacenar el tipo seleccionado en el select

    //Obtención de los tipos de clave en la select
    useEffect(() => {
        fetch("https://api-passkeeper.onrender.com/claves/tipo")
        .then(respuesta => respuesta.json())
        .then(datos => setSecciones(datos))
    }, [])

    return(
        <>
            <h3>Todas tus contraseñas</h3>
            <form onSubmit={evento => {
                evento.preventDefault()
                if(tipoSeleccionado != 0){
                    fetch(`https://api-passkeeper.onrender.com/claves/tipo/${tipoSeleccionado}`)
                    .then(respuesta => respuesta.json())
                    .then(datos => obtenerTipo(datos))
                }
            }}>
                <select value={tipoSeleccionado} onChange={evento => setTipoSeleccionado(evento.target.value)}>
                    <option value="0" disabled>Seleccione el tipo</option>
                    { secciones.map(({id,nombre}) => <option key={id} value={id}>{nombre}</option>) }
                </select>
                <input type="submit" value="Filtrar" />
            </form>
        </>
    )
}

export default FormularioFiltro