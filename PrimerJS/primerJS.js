const traePersona = async () => {
    const numero = document.getElementById('numeroPersonas').value;
    const respuesta = await fetch(`https://randomuser.me/api/?results=${numero > 0 ? numero : 1}`);
    const data = await respuesta.json();
    
    for(let persona of data.results)
    {
        console.log(persona.name.title, persona.name.first, persona.name.last);
    }
}