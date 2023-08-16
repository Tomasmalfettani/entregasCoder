function calcularCostoTotal() {
    let total = 0;
    let seguirAgregando = true;

    while (seguirAgregando) {
        let producto = prompt("Ingrese el nombre del producto o servicio:");
        let precio = Number(prompt("Ingrese el precio del producto o servicio:"));

        total += precio;

        if (isNaN(precio)) { 
            alert("Por favor, ingrese un precio válido.");
            continue; 
        }

        seguirAgregando = prompt("¿Desea agregar otro producto o servicio?\nSeguir = Escribir\t Seguir \nNo seguir = Escribir\t No");

        if (seguirAgregando !== "Seguir") {
            seguirAgregando = false; 
        }
    }

    alert("El costo total de los productos y/o servicios es: $" + total);
}

calcularCostoTotal();
