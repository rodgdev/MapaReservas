document.addEventListener('DOMContentLoaded', function() {
        const vendido = document.getElementById('vendido');
    vendido.addEventListener('click', () => {
        openModal('vendido', {
            numero: 10,
            tipologia: 'Frente',
            area: 90,
            separacion: 'S/500',
            izquierda: 6,
            derecha: 16,
            frente: 15,
            fondo: 15,
            imagen: 'assets/terreno.png'
        });
    });
    const disponible = document.getElementById('disponible');
    disponible.addEventListener('click', () => {
        openModal('disponible', {
            numero: 15,
            izquierda: 6,
            derecha: 16,
            frente: 15,
            fondo: 15,
            imagen: 'assets/terreno.png'
        });
    });
    const reservado = document.getElementById('reservado');
    reservado.addEventListener('click', () => {
        openModal('reservado', {
            numero: 16,
            tipologia: 'Frente',
            area: 90,
            separacion: 'S/500',
            izquierda: 6,
            derecha: 16,
            frente: 15,
            fondo: 15,
            imagen: 'assets/terreno.png'
        });
    });
    const bloqueado = document.getElementById('bloqueado');
    bloqueado.addEventListener('click', () => {
        openModal('error');
    });
});