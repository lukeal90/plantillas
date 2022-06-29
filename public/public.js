const form = document.querySelector('#formulario');
console.log("ENTRO")
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("ENTRO")
    const formData = new FormData(form);
    const newProducto = {
        title: formData.get('title'),
        price: formData.get('price'),
        thumbnail: formData.get('thumbnail')
    };
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProducto)
        }
        const result = await fetch('/api/products', options);
        const data = await result.json();
        Swal.fire(
            'Producto guardado',
            `El producto ha sido agregado con éxito`,
            'success'
        );
    }
    catch (error) {
        Swal.fire(
            'Ha ocurrido un error',
            `El producto no ha sido guardado: ${error.message}`,
            'error'
        );
        console.warn(error);
    }
});