import React, { useEffect, useState } from "react"

function Modal({ clave, cerrarModal, actualizarClave }) {
  let [tipos, setTipos] = useState([])//Estado para almacenar los tipos
  let [titulo, setTitulo] = useState(clave.titulo)
  let [usuario, setUsuario] = useState(clave.usuario)
  let [contraseña, setContraseña] = useState(clave.contraseña)
  let [tipo_id, setTipo_id] = useState(clave.tipo_id)
  let [tipo, setTipo] = useState(clave.tipo)
  let [error, setError] = useState("")

  //Obtención de los tipos de clave en la select
  useEffect(() => {
    fetch("https://api-passkeeper.onrender.com/claves/tipo")
      .then((respuesta) => respuesta.json())
      .then((datos) => setTipos(datos))
  }, [])

  //Bucle para buscar el nombre del tipo de clave seleccionado
  function cambioTipo(evento){
    let idSeleccionado = evento.target.value
    let nombreTipo = ""
    for(let i = 0; i < tipos.length; i++) {
      if (tipos[i].id == idSeleccionado) {
        nombreTipo = tipos[i].nombre;
      }
    }

    setTipo_id(idSeleccionado)
    setTipo(nombreTipo)
  }

  function guardarCambios() {
    //Objeto con los datos actualizados de la clave
    let datosActualizados = {
      id: clave.id,
      titulo,
      tipo_id,
      usuario,
      contraseña,
      tipo,
    };
    
    setError("")
    if (usuario.trim() !== "" && titulo.trim() !== "" && contraseña.trim() !== ""){
        fetch(`https://api-passkeeper.onrender.com/claves/actualizar/${clave.id}`, {
            method: "PUT",
            body: JSON.stringify(datosActualizados),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((respuesta) => respuesta.json())
            .then(({ resultado, error }) => {
              if (!error && resultado === "ok") {
                actualizarClave(
                  datosActualizados.id,
                  datosActualizados.titulo,
                  datosActualizados.tipo_id,
                  datosActualizados.tipo,
                  datosActualizados.usuario,
                  datosActualizados.contraseña
                );
                cerrarModal();
              }  
            })
        }
        setError("Ningún campo puede estar en blanco")
    }
    
  return (
    <form className="modal" onSubmit={(evento) => evento.preventDefault()}>
      <div className="formulario">
        <p>Clasificación</p>
        <select value={tipo_id} onChange={cambioTipo}>
          <option value="0" disabled>Seleccione el tipo</option>
          {tipos.map(({ id, nombre }) => (
            <option key={id} value={id}>{nombre}</option>
          ))}
        </select>
        <p>Título</p>
        <input
          type="text"
          placeholder="Indique el nuevo título"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
        />
        <p>Usuario</p>
        <input
          type="text"
          placeholder="Indique el nuevo usuario"
          value={usuario}
          onChange={(evento) => setUsuario(evento.target.value)}
        />
        <p>Contraseña</p>
        <input
          type="text"
          placeholder="Indique la nueva contraseña"
          value={contraseña}
          onChange={(evento) => setContraseña(evento.target.value)}
        />
        <p className={error ? "visible" : "error"}>{error}</p>
        <section className="edicion">
          <button className="cancelar" onClick={() => cerrarModal()}>
            Cancelar
          </button>
          <button className="guardar" onClick={guardarCambios}>
            Guardar
          </button>
        </section>
      </div>
    </form>
  )
}

export default Modal