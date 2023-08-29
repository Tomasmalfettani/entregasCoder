const productos = [
    { id: 1, nombre: "Shampoo", precio: 250 },
    { id: 2, nombre: "Acondicionador", precio: 350 },
    { id: 3, nombre: "Jabón", precio: 150 },
    { id: 4, nombre: "Desodorante", precio: 500 },
    { id: 5, nombre: "Perfume", precio: 1000 }
];

const carrito = [];

function mostrarProductos() {
    let listaProductos = "Productos disponibles:\n\n";
    for (const producto of productos) {
        listaProductos += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    }
    alert(listaProductos);
}

function agregarAlCarrito(id, cantidad) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        const carritoItem = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        };
        carrito.push(carritoItem);
        alert(`${producto.nombre} agregado al carrito.`);
    } else {
        alert("Producto no encontrado.");
    }
}

function mostrarCarrito() {
    let infoCarrito = "Carrito de compras:\n\n";
    let total = 0;
    for (const item of carrito) {
        const subtotal = item.precio * item.cantidad;
        infoCarrito += `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${subtotal}\n`;
        total += subtotal;
    }

    const iva = total * 0.21; // IVA del 21%
    const totalConIva = total + iva;

    infoCarrito += `\nTotal a pagar (sin IVA): $${total}\n`;
    infoCarrito += `IVA (21%): $${iva}\n`;
    infoCarrito += `\nTotal a pagar (con IVA): $${totalConIva}\n`;

    alert(infoCarrito);
}

function simularCompra() {
    mostrarProductos();

    while (true) {
        const id = Number(prompt("Ingrese el ID del producto que desea comprar (0 para finalizar):"));
        if (id === 0) {
            break;
        }
        const cantidad = Number(prompt(`Ingrese la cantidad de ${productos[id - 1].nombre} que desea:`));
        agregarAlCarrito(id, cantidad);
    }

    mostrarCarrito();
}

simularCompra();
