document.addEventListener("DOMContentLoaded", function () {
  // Obtener el parámetro ID de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    function getPropiedad(done) {
        // Hacer una petición a la API para obtener los detalles de la propiedad
        fetch(`https://pypycris.pythonanywhere.com/api/v1/propiedades/${id}/`)
        .then((response) => response.json())
        .then((data) => {
            done(data);
        })
        .catch((error) => {
            console.error("Error al obtener los detalles de la propiedad:", error);
        });
    }
  }

    getPropiedad((propiedad) => {
      // Crear el HTML para la propiedad específica
      const contenedor = document.createRange().createContextualFragment(
        `
        <h1>${propiedad.titulo}</h1>
                
        <div class="details">
            <p><span class="precio">${propiedad.precio}€</span></p>

            <ul class="iconos-caracteristicas">
                <li>
                    <img class="icono" loading="lazy" src="../Favicons/icono_dormitorio.svg" alt="icono habitaciones">
                    <p>${propiedad.habitaciones}</p>
                </li>
                <li>
                    <img class="icono" loading="lazy" src="../Favicons/icono_wc.svg" alt="icono wc">
                    <p>${propiedad.wc}</p>
                </li>
                <li>
                    <img class="icono" loading="lazy" src="../Favicons/icono_estacionamiento.svg" alt="icono estacionamiento">
                    <p>${propiedad.garaje}</p>
                </li>
            </ul>  
        </div>
                      
        <div class="div_blogDetails">
            <div class="propiedad-detail">
                <picture>
                    <source srcset="${propiedad.img}" type="image/webp">
                    <img loading="lazy" src="${propiedad.img}" alt="Imagen de la propiedad">
                </picture>
            </div>

            <div>
                <p class="informacion-meta">${propiedad.contentido}</p>
            </div>
        </div>

        `
      );

      const contenedorAnuncios = document.querySelector(".container-datails");
      contenedorAnuncios.appendChild(contenedor);

      // Llamar a la función para formatear precios después de que los elementos hayan sido agregados al DOM
      formatPrice();
    });

    function formatPrice() {
      // Función para formatear un número con comas como separadores de miles
      function formatPriceBis(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      const priceElements = document.querySelectorAll(".precio");

      priceElements.forEach(function (element) {
        const priceText = element.textContent;
        const priceNumber = parseFloat(
          priceText.replace("€", "").replace(",", "").trim()
        );

        if (!isNaN(priceNumber)) {
          element.textContent = formatPriceBis(priceNumber) + "€"; // Formatear el número y volver a agregar el símbolo de euro
        }
      });
    }
});
