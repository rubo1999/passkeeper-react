function Clave({id,titulo,usuario,contraseña,tipo,tipo_id,borrarClave,abrirModal}){
    return(
        <div className="clave">
            <h1>{titulo}</h1>
            <p>Tipo: {tipo}</p>
            <p>Usuario: {usuario}</p>
            <p>Contraseña: {contraseña}</p>
            <section className="botones">
                <button className="borrar" onClick={() => 
                    fetch(`https://api-passkeeper.onrender.com/claves/borrar/${id}`,{
                        method: "DELETE"
                    })
                    .then(respuesta => respuesta.json())
                    .then(({resultado,error}) =>{
                        if(!error){
                            return borrarClave(id)
                        }
                        console.log("error al usuario")
                    })
                }>Borrar</button>
                <button className="editar" onClick={() => abrirModal({id,titulo,usuario,contraseña,tipo_id,tipo})}>Editar</button>
            </section>
        </div>
    )
}

export default Clave