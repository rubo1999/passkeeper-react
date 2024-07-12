import { useEffect, useState } from "react"


function FormularioFiltro({ obtenerTipo }){

    let [secciones,setSecciones] = useState([])
    let [tipoSeleccionado,setTipoSeleccionado] = useState("0")

    useEffect(() => {
        fetch("http://localhost:4000/claves/tipo")
        .then(respuesta => respuesta.json())
        .then(datos => setSecciones(datos))
    }, [])

    return(
        <>
            <h3>Todas tus contraseñas</h3>
            <form onSubmit={evento => {
                evento.preventDefault()
                if(tipoSeleccionado != 0){
                    fetch(`http://localhost:4000/claves/tipo/${tipoSeleccionado}`)
                    .then(respuesta => respuesta.json())
                    .then(datos => obtenerTipo(datos))
                }
            }}>
                <select value={tipoSeleccionado} onChange={evento => setTipoSeleccionado(evento.target.value)}>
                    <option value="0" disabled>Seleccione el tipo</option>
                    { secciones.map(tipo => <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>) }
                </select>
                <input type="submit" value="Filtrar" />
            </form>
        </>
    )
}

export default FormularioFiltro