import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FormularioAñadir({ crearClave }) {
    let [titulo, setTitulo] = useState("");
    let [usuario, setUsuario] = useState("");
    let [contraseña, setContraseña] = useState("");
    let [idTipo, setIdTipo] = useState("0");
    let [error, setError] = useState("");
    let [tipos, setTipos] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:4000/claves/tipo")
            .then(respuesta => respuesta.json())
            .then(datos => setTipos(datos));
    }, []);



    return (
        <>
            <form className="añadir" onSubmit={evento => {
                evento.preventDefault();
                setError("");

                if (usuario.trim() !== "" && titulo.trim() !== "" && contraseña.trim() !== "" && idTipo !== "0") {
                    let nombreTipo = "";
                    for(let i = 0; i < tipos.length; i++){
                        if(tipos[i].id == idTipo){
                            nombreTipo = tipos[i].nombre
                        }
                    }
                    fetch("http://localhost:4000/claves/nueva", {
                        method: "POST",
                        body: JSON.stringify({ titulo, tipo_id : idTipo, usuario, contraseña, tipo : nombreTipo  }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                        .then(respuesta => respuesta.json())
                        .then(({ id, error }) => {
                            if (!error) {
                                crearClave({ id, titulo, tipo_id : idTipo, usuario, contraseña, tipo : nombreTipo });
                                setTitulo("");
                                setUsuario("");
                                setContraseña("");
                                setIdTipo("0");
                                return navigate(`/claves/tipo/${idTipo}`);
                            }
                        });
                } else {
                    setError("Ningún campo puede estar en blanco");
                }
            }}>
                <select value={idTipo} onChange={evento => setIdTipo(evento.target.value)}>
                    <option value="0" disabled>Seleccione el tipo</option>
                    {tipos.map(({ id, nombre }) => <option key={id} value={id}>{nombre}</option>)}
                </select>
                <input type="text"
                    placeholder="Indique el título"
                    value={titulo}
                    onChange={evento => setTitulo(evento.target.value)} />
                <input type="text"
                    placeholder="Indique el usuario"
                    value={usuario}
                    onChange={evento => setUsuario(evento.target.value)} />
                <input type="text"
                    placeholder="Indique la contraseña"
                    value={contraseña}
                    onChange={evento => setContraseña(evento.target.value)} />
                <input type="submit" value="Añadir clave" />
                <p className={error ? "visible" : "error"}>{error}</p>
            </form>
        </>
    );
}

export default FormularioAñadir;
