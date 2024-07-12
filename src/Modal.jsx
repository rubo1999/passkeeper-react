import React, { useEffect, useState } from "react";

function Modal({ clave, cerrarModal, actualizarClave }) {
  const [tipos, setTipos] = useState([]);
  const [titulo, setTitulo] = useState(clave.titulo);
  const [usuario, setUsuario] = useState(clave.usuario);
  const [contraseña, setContraseña] = useState(clave.contraseña);
  const [tipo_id, setTipo_id] = useState("0");
  const [tipo, setTipo] = useState(clave.tipo);

  useEffect(() => {
    fetch("http://localhost:4000/claves/tipo")
      .then((respuesta) => respuesta.json())
      .then((datos) => setTipos(datos));
  }, []);

  function cambioTipo(evento) {
    let idSeleccionado = evento.target.value;
    let nombreTipo = "";
    for (let i = 0; i < tipos.length; i++) {
      if (tipos[i].id === idSeleccionado) {
        nombreTipo = tipos[i].nombre;
      }
    }

    setTipo_id(idSeleccionado);
    setTipo(nombreTipo);
  }

  function guardarCambios() {
    let datosActualizados = {
      id: clave.id,
      titulo,
      tipo_id,
      usuario,
      contraseña,
      tipo,
    };

    fetch(`http://localhost:4000/claves/actualizar/${clave.id}`, {
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
        } else {
          console.error("Error al actualizar la clave:", error);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud fetch:", error);
      });
  }

  return (
    <form className="modal" onSubmit={(evento) => evento.preventDefault()}>
      <div className="formulario">
        <p>Clasificación</p>
        <select value={tipo_id} onChange={cambioTipo}>
          <option value="0" disabled>
            Seleccione el tipo
          </option>
          {tipos.map(({ id, nombre }) => (
            <option key={id} value={id}>
              {nombre}
            </option>
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
  );
}

export default Modal;
