document.addEventListener("DOMContentLoaded", function () {

  function getPropiedades(done) {
    const results = fetch("https://pypycris.pythonanywhere.com/api/v1/propiedades/");
    
    results
      .then((response) => response.json())
      .then((data) => {
        done(data);
      });
  }

  getPropiedades((data) => {
    data.forEach((propiedades) => {
      const contenedor = document.createRange().createContextualFragment(
        `
          <div class="anuncio">
              <picture>
                  <source srcset="${propiedades.img}" type="image/webp">
                  <img loading="lazy" width="200" height="300" src="${propiedades.img}" alt="Imagen de la propiedad">
              </picture>
              <div class="contenido-anuncio">
                  <h3>${propiedades.titulo}</h3>
                  <p class="alturamin">${propiedades.descripcion}</p>
                  <p>
                    <span class="precio">${propiedades.precio}€</span>
                  </p>
              </div>
          </div> 
        `
      );

      const contenedorAnuncios = document.querySelector(".contenedor-anuncios");
      contenedorAnuncios.appendChild(contenedor);
    });

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
