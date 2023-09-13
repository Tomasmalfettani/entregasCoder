const productos = [
    { id: 1, nombre: "Shampoo", precio: 250 },
    { id: 2, nombre: "Acondicionador", precio: 350 },
    { id: 3, nombre: "Jabón", precio: 150 },
    { id: 4, nombre: "Desodorante", precio: 500 },
    { id: 5, nombre: "Perfume", precio: 1000 }
];

document.addEventListener("DOMContentLoaded", () => {
    const productosLista = document.getElementById("productos-lista");
    for (const producto of productos) {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        productosLista.appendChild(li);
    }

    const productoSelect = document.getElementById("producto-select");
    for (const producto of productos) {
        const option = document.createElement("option");
        option.value = producto.id;
        option.textContent = producto.nombre;
        productoSelect.appendChild(option);
    }

    const carritoEnStorage = localStorage.getItem("carrito");
    const totalPagarEnStorage = localStorage.getItem("totalPagar");

    if (carritoEnStorage) {
        const carrito = JSON.parse(carritoEnStorage);
        const totalPagar = parseFloat(totalPagarEnStorage);

        actualizarCarritoEnDOM(carrito, totalPagar);
    }
});

document.getElementById("agregar-carrito").addEventListener("click", () => {
    const productoSelect = document.getElementById("producto-select");
    const cantidadInput = document.getElementById("cantidad-input");

    const productoId = parseInt(productoSelect.value);
    const cantidad = parseInt(cantidadInput.value);

    if (isNaN(productoId) || isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, seleccione un producto válido y una cantidad mayor que cero.");
        return;
    }

    const producto = productos.find(p => p.id === productoId);
    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    const carritoEnStorage = localStorage.getItem("carrito");
    const carrito = carritoEnStorage ? JSON.parse(carritoEnStorage) : [];

    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });

    const totalPagar = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalPagar", totalPagar.toString());

    actualizarCarritoEnDOM(carrito, totalPagar);
});

function actualizarCarritoEnDOM(carrito, totalPagar) {
    const carritoLista = document.getElementById("carrito-lista");
    const totalPagarSpan = document.getElementById("total-pagar");

    while (carritoLista.firstChild) {
        carritoLista.removeChild(carritoLista.firstChild);
    }

    for (const item of carrito) {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.precio * item.cantidad}`;
        carritoLista.appendChild(li);
    }

    totalPagarSpan.textContent = totalPagar.toFixed(2);
}
