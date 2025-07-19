function updateThemeAssets(theme) {
    document.querySelectorAll('.theme-sensitive').forEach(img => {
        const newSrc = img.dataset[`img${capitalize(theme)}`];
        if (newSrc) img.src = newSrc;
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function loadInlineSVGs() {
    document.querySelectorAll('.svg-icon[data-src]').forEach(container => {
        const url = container.getAttribute('data-src');

        fetch(url)
            .then(res => res.text())
            .then(svg => {
                container.innerHTML = svg;
                const svgEl = container.querySelector('svg');
                if (svgEl) {
                    svgEl.classList.add('icon');
                    svgEl.removeAttribute('width');
                    svgEl.removeAttribute('height');
                }
            });
    });
}

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateThemeAssets(newTheme);
});

let carrito = [
    { numero: 15, precio: 500 },
    { numero: 21, precio: 500 },
    { numero: 24, precio: 500 }
];

function mostrarCarrito() {
    openModal('carrito', { lotes: carrito });
}

function removeLote(numero) {
    carrito = carrito.filter(lote => lote.numero !== numero);
    mostrarCarrito(); // recargar
}

function añadirLote() {
    closeModal();
    alert('Redirigir a mapa para seleccionar más lotes');
}

function continuar() {
    alert(`Procediendo con el pago de S/${carrito.reduce((sum, l) => sum + l.precio, 0)}`);
}


function openModal(type, loteData = {}) {
    const modal = document.getElementById('modal-content');
    let html = '';

    switch (type) {
        case 'error':
            html = `
                <div style="text-align:center">
                <img src="assets/map_error.png" style="width:60px;" />
                <h2>¡Ups!</h2>
                <p>Este lote está siendo separado<br>por otro usuario.<br>Inténtalo nuevamente más tarde.</p>
                <button class="boton-principal btn-vendido" onclick="closeModal()">INTENTAR DE NUEVO</button>
                </div>
            `;
            break;

        case 'disponible':
            html = `
                <div class="modal-type-icon icon-green-modal">
                    <img src="assets/disponible.png" alt="disponible"/>
                </div>
                <h2 class="modal-disponible-title">Costa del Valle<br><small>N° ${loteData.numero} | <b class="estado-disponible">Disponible</b></small></h2>
                <hr>
                <div class=modal-disponible-content>
                    <h3 class="green-text">Información</h3>
                    <div class="grid-info-col2">
                        <span>
                            <b>TIPOLOGÍA</b>:<br>${loteData.tipologia || 'Frente'}
                        </span>
                        <span>
                            <b>ÁREA</b>:<br>${loteData.area || 90.00} m²
                        </span>
                    </div>
                    <hr>
                    <span class="separe-text">Separe con: <b>${loteData.separacion || 'S/500'}</b></span>
                    <hr>
                    <h3 class="green-text">Perímetro</h3>
                    <div class="grid-info-col2">
                    <span>
                        <b>IZQUIERDA</b>:<br>${loteData.izquierda} m
                    </span>
                    <span>
                        <b>DERECHA</b>:<br>${loteData.derecha} m
                    </span>
                    <span>
                        <b>FRENTE</b>:<br>${loteData.frente} m
                    </span>
                    <span>
                        <b>FONDO</b>:<br>${loteData.fondo} m
                    </span>
                    </div>
                    <div style="text-align:center; margin:12px 0;">
                        <img src="${loteData.imagen}" style="max-width:20%;" />
                    </div>
                </div>
                <hr>
                <button class="boton-outline">
                    <img class="whatsapp-icon green-image" src="./assets/whatsapp.png" alt="w">
                    <span>MÁS INFORMACIÓN</span>
                </button>
                <button class="boton-principal btn-disponible">AGREGAR AL CARRITO</button>
            `;
            break;

        case 'reservado':
            html = `
                <div class="modal-type-icon icon-orange-modal">
                    <img src="assets/reservado.png" alt="disponible"/>
                </div>
                <h2 class="modal-disponible-title">Costa del Valle...<br><small>N° ${loteData.numero} | <b class="estado-${type}">Reservado</b></small></h2>
                <hr>
                <div class=modal-disponible-content>
                    <h3 class="brown-text">Información</h3>
                    <div class="grid-info-col2">
                        <span>
                            <b>TIPOLOGÍA</b>:<br>${loteData.tipologia || 'Frente'}
                        </span>
                        <span>
                            <b>ÁREA</b>:<br>${loteData.area || 90.00} m²
                        </span>
                    </div>
                    <hr>
                    <span class="separe-text">Separe con: <b>${loteData.separacion || 'S/500'}</b></span>
                    <hr>
                    <h3 class="brown-text">Perímetro</h3>
                    <div class="grid-info-col2">
                    <span>
                        <b>IZQUIERDA</b>:<br>${loteData.izquierda} m
                    </span>
                    <span>
                        <b>DERECHA</b>:<br>${loteData.derecha} m
                    </span>
                    <span>
                        <b>FRENTE</b>:<br>${loteData.frente} m
                    </span>
                    <span>
                        <b>FONDO</b>:<br>${loteData.fondo} m
                    </span>
                    </div>
                    <div style="text-align:center; margin:12px 0;">
                        <img src="${loteData.imagen}" style="max-width:20%;" />
                    </div>
                </div>
            `;
            break;
        case 'vendido':
            html = `
                <div class="modal-type-icon icon-red-modal">
                    <img src="assets/vendido.png" alt="disponible"/>
                </div>
                <h2 class="modal-disponible-title">Costa del Valle...<br><small>N° ${loteData.numero} | <b class="estado-${type}">Vendido</b></small></h2>
                <hr>
                <div class=modal-disponible-content>
                    <h3 class="red-text">Información</h3>
                    <div class="grid-info-col2">
                        <span>
                            <b>TIPOLOGÍA</b>:<br>${loteData.tipologia || 'Frente'}
                        </span>
                        <span>
                            <b>ÁREA</b>:<br>${loteData.area || 90.00} m²
                        </span>
                    </div>
                    <hr>
                    <span class="separe-text">Separe con: <b>${loteData.separacion || 'S/500'}</b></span>
                    <hr>
                    <h3 class="red-text">Perímetro</h3>
                    <div class="grid-info-col2">
                    <span>
                        <b>IZQUIERDA</b>:<br>${loteData.izquierda} m
                    </span>
                    <span>
                        <b>DERECHA</b>:<br>${loteData.derecha} m
                    </span>
                    <span>
                        <b>FRENTE</b>:<br>${loteData.frente} m
                    </span>
                    <span>
                        <b>FONDO</b>:<br>${loteData.fondo} m
                    </span>
                    </div>
                    <div style="text-align:center; margin:12px 0;">
                        <img src="${loteData.imagen}" style="max-width:20%;" />
                    </div>
                </div>
            `;
            break;
        case 'imagen':
            html = `<img src="${loteData.src}" alt="Vista del proyecto" />`;
            document.getElementById('modal').classList.add('image-only');
            break;
        case 'carrito':
            const lotes = loteData.lotes || [];
            const total = lotes.reduce((sum, lote) => sum + lote.precio, 0);

            html = `
                <h2>Lotes Seleccionados</h2>
                <ul class="lote-lista">
                ${lotes.map(lote => `
                    <li>
                    <span>N° ${lote.numero}</span>
                    <span>S/${lote.precio}</span>
                    <button class="remove-lote" onclick="removeLote(${lote.numero})">🗑️</button>
                    </li>
                `).join('')}
                </ul>
                <hr>
                <p><strong>Total a pagar: S/${total}</strong></p>
                <button class="boton-secundario" onclick="añadirLote()">AÑADIR LOTE</button>
                <button class="boton-principal btn-disponible" onclick="continuar()">CONTINUAR</button>
            `;
            break;

        default:
            document.getElementById('modal').classList.remove('image-only');
    }

    document.getElementById('modal-overlay').classList.remove('hidden');
    modal.innerHTML = html;
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function loadContent(page) {
    fetch(`${page}.html`) // Cargar el archivo HTML correspondiente
        .then(response => {
            if (response.ok) {
                return response.text(); // Obtener el contenido del archivo HTML
            }
            throw new Error('Network response was not ok.');
        })
        .then(html => {
            contenido.innerHTML = html; // Insertar el contenido cargado en #contenido
            loadCSSAndJS(page);
            showContent(); // Mostrar el nuevo contenido con la animación de opacidad
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

function loadCSSAndJS(page) {
    // Eliminar cualquier CSS y JS cargado previamente
    removeOldCSSAndJS();

    // Cargar el CSS común para todas las vistas
    const commonCSS = document.createElement('link');
    commonCSS.rel = 'stylesheet';
    commonCSS.href = 'css/style.css'; // Cargar el CSS común
    document.head.appendChild(commonCSS);

    // Cargar el CSS específico para la página
    const pageCSS = document.createElement('link');
    pageCSS.rel = 'stylesheet';
    fetch(`css/${page}.css`, { method: 'HEAD' })
        .then(res => {
            if (res.ok) {
                pageCSS.href = `css/${page}.css`;
                document.head.appendChild(pageCSS);
            }
        });

    // Cargar el JS específico para la página
    const pageJS = document.createElement('script');
    pageJS.src = `js/${page}.js`; // Cargar el JS de la página seleccionada
    pageJS.onload = () => {
        console.log(`${page}.js loaded successfully`);
    };
    document.body.appendChild(pageJS);
}

// Función para eliminar los CSS y JS previos
function removeOldCSSAndJS() {
    const oldCSS = document.querySelectorAll('link[rel="stylesheet"]');
    oldCSS.forEach(css => css.remove()); // Eliminar cualquier CSS previo

    const oldJS = document.querySelectorAll('script');
    oldJS.forEach(js => js.remove()); // Eliminar cualquier JS previo
}

// Función para aplicar la animación y hacer visible el contenido
function showContent() {
    contenido.classList.add('active'); // Activar la animación de opacidad
}



document.addEventListener('DOMContentLoaded', () => {
    loadInlineSVGs();
    loadContent('disponibilidad');

    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDark = savedTheme === 'dark';
    themeToggle.checked = isDark;
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeAssets(savedTheme);

    const cart = document.getElementById('cart');
    cart.addEventListener('click', mostrarCarrito);

    const footerItems = document.querySelectorAll('.footer-item');
    const vistas = document.querySelectorAll('.vista');
    const masBtn = document.getElementById('mas_btn');
    const masOpcionesContainer = document.getElementById('mas');
    const galeriaBtn = document.getElementById('galeriaBtn');
    const ubicacionBtn = document.getElementById('ubicacionBtn');
    const contactoBtn = document.getElementById('contactoBtn');

    // Función para cambiar entre vistas
    footerItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.target;

            console.log(`Cambiando a la vista: ${target}`);

            // Ocultar todas las vistas
            contenido.innerHTML = '';

            // Mostrar la vista correspondiente
            loadContent(target);
        });
    });

    document.addEventListener('click', (e) => {
        if (!masOpcionesContainer.contains(e.target) && masOpcionesContainer.classList.contains('active')) {
            masOpcionesContainer.classList.remove('active');
        }
    });

    masBtn.addEventListener('click', () => {
        masOpcionesContainer.classList.toggle('active');
    });

    // Navegar a las sub-vistas: Galería, Ubicación, Contacto
    galeriaBtn.addEventListener('click', () => {
        // Mostrar la vista de Galería
        vistas.forEach(vista => vista.classList.remove('active'));
        document.getElementById('galeria').classList.add('active');
    });

    ubicacionBtn.addEventListener('click', () => {
        // Mostrar la vista de Ubicación
        vistas.forEach(vista => vista.classList.remove('active'));
        document.getElementById('ubicacion').classList.add('active');
    });

    contactoBtn.addEventListener('click', () => {
        // Mostrar la vista de Contacto
        vistas.forEach(vista => vista.classList.remove('active'));
        document.getElementById('contacto').classList.add('active');
    });

    /* openModal('error'); */
    /* openModal('imagen', {
        src: 'assets/photo.jpg'
    }); */
    /* openModal('disponible', {
        numero: 15,
        izquierda: 6,
        derecha: 16,
        frente: 15,
        fondo: 15,
        imagen: 'assets/terreno.png'
    }); */
    /* openModal('reservado', {
        numero: 16,
        tipologia: 'Frente',
        area: 90,
        separacion: 'S/500',
        izquierda: 6,
        derecha: 16,
        frente: 15,
        fondo: 15,
        imagen: 'assets/terreno.png'
    }); */
    /* openModal('vendido', {
        numero: 10,
        tipologia: 'Frente',
        area: 90,
        separacion: 'S/500',
        izquierda: 6,
        derecha: 16,
        frente: 15,
        fondo: 15,
        imagen: 'assets/terreno.png'
    }); */
});