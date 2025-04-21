const metas = {
  EXPERTO: {
    venta: 1000,
    visibilidad: 300,
    extra: 200,
    foco: 400
  },
  ASCENSO: {
    venta: 800,
    visibilidad: 200,
    extra: 150,
    foco: 300
  },
  PROMESA: {
    venta: 600,
    visibilidad: 150,
    extra: 100
    // Sin foco
  }
};

function cargarMetas() {
  const segmento = $('#segmento').val();
  const datos = metas[segmento];

  const segmentoClase = `segmento-${segmento.toLowerCase()}`;


  const secciones = [
    { key: 'venta', label: 'Cuota Trimestral' },
    ...(segmento !== 'PROMESA' ? [{ key: 'foco', label: 'Marca Foco' }] : []),
    { key: 'visibilidad', label: 'Visibilidad Regular' },
    { key: 'extra', label: 'Extra Visibilidad' },
  ];

  let html = '';
  $.each(secciones, function (i, sec) {
    if (sec.key === 'venta') {
      const isPromesa = segmento === 'PROMESA';
      html += `
    <div class="card cuota-card ${isPromesa ? '' : 'cuota-card-verde'}" id="cuotaCard">
  <h2 class="section-title ${segmentoClase}">${sec.label}</h2>
  <div class="cuota-result">
    ${isPromesa ? `
       <div class="cuota-valor" id="cuotaValor">$0</div>
       <div class="cuota-cumplimiento" id="cuotaCumplimiento">0% Cumplimiento</div>
       <div class="cuota-total">Total cuota trimestral $${datos.venta.toLocaleString('es-CO')}</div>
    ` : `
      <div class="cuota-info">Compra del trimestre</div>
      <div class="cuota-valor" id="cuotaValor">$0</div>
      <div class="cuota-cumplimiento" id="cuotaCumplimiento">0% Cumplimiento</div>
      <div class="cuota-total">Total cuota trimestral $${datos.venta.toLocaleString('es-CO')}</div>
    `}
  </div>
  ${!isPromesa ? `
          <div class="subtotal ${segmentoClase}">
      Subtotal: <span id="ventaSubtotal">0</span> Puntos
    </div>
  ` : ''}
</div>

  `;
    }
    else if (sec.key === 'visibilidad' || sec.key === 'extra') {
      const icono = sec.key === `visibilidad` ? `lupa-${segmento.toLowerCase()}.svg` : `extra-${segmento.toLowerCase()}.svg`;
      html += `
       <div class="card visibilidad-card">
  <h2 class="section-title ${segmentoClase}">${sec.label}</h2>

<div class="checks">
  <div class="icono">
    <img src="./icons/${icono}" alt="${sec.label}" />
  </div>

  <div class="check-item">
    <label for="${sec.key}_m1">
      <input type="checkbox" id="${sec.key}_m1" />
      <span class="check-mark segmento-${segmento.toLowerCase()}"></span>
      <p>Mes 1</p>
    </label>
  </div>

  <div class="check-item">
    <label for="${sec.key}_m2">
      <input type="checkbox" id="${sec.key}_m2" />
      <span class="check-mark segmento-${segmento.toLowerCase()}"></span>
      <p>Mes 2</p>
    </label>
  </div>

  <div class="check-item">
    <label for="${sec.key}_m3">
      <input type="checkbox" id="${sec.key}_m3" />
      <span class="check-mark segmento-${segmento.toLowerCase()}"></span>
      <p>Mes 3</p>
    </label>
  </div>
</div>

          <div class="subtotal ${segmentoClase}">
    Subtotal: <span id="${sec.key}Subtotal">0</span> Puntos
  </div>
</div>

      `;
    } else if (sec.key === 'foco') {
      html += `
        <div class="card foco-card padding-foco">
          <h2 class="section-title ${segmentoClase}">${sec.label}</h2>
          <table class="foco-table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Mes 1</th>
                <th>Mes 2</th>
                <th>Mes 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Crecimiento desde el 18% en el SKU de la Marca Foco en adelante</td>
                <td><input type="checkbox" id="foco_1_m1" /></td>
                <td><input type="checkbox" id="foco_1_m2" /></td>
                <td><input type="checkbox" id="foco_1_m3" /></td>
              </tr>
              <tr>
                <td>Crecimiento desde el 16% hasta el 17% en el SKU de la Marca Foco</td>
                <td><input type="checkbox" id="foco_2_m1" /></td>
                <td><input type="checkbox" id="foco_2_m2" /></td>
                <td><input type="checkbox" id="foco_2_m3" /></td>
              </tr>
              <tr>
                <td>Crecimiento desde el 11% hasta el 15% en el SKU de la Marca Foco</td>
                <td><input type="checkbox" id="foco_3_m1" /></td>
                <td><input type="checkbox" id="foco_3_m2" /></td>
                <td><input type="checkbox" id="foco_3_m3" /></td>
              </tr>
            </tbody>
          </table>
          <div class="subtotal ${segmentoClase}">
            Subtotal: <span id="focoSubtotal">0</span> Puntos
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="card">
          <h2 class="section-title ${segmentoClase}">${sec.label}</h2>
          <div class="row">
            <label for="${sec.key}_m1">Mes 1:</label>
            <input type="number" id="${sec.key}_m1" />
            <label for="${sec.key}_m2">Mes 2:</label>
            <input type="number" id="${sec.key}_m2" />
            <label for="${sec.key}_m3">Mes 3:</label>
            <input type="number" id="${sec.key}_m3" />
          </div>
          <p><strong>Meta Trimestral:</strong> ${datos[sec.key]} puntos</p>
        </div>
      `;
    }
  });

  $('#simulador').html(html);
  // Ajustar layout dinámicamente según cantidad de tarjetas
  const cantidadCards = $('#simulador .card').length;
  $('#simulador').removeClass('cuatro-cards');

  if (cantidadCards === 4) {
    $('#simulador').addClass('cuatro-cards');
  }

  // Asignar eventos onchange después de renderizar
  $('input').on('change', calcularTotal);

  calcularTotal();



}

function calcularTotal() {
  const segmento = $('#segmento').val();
  const datos = metas[segmento];
  let total = 0;

  $.each(datos, function (key, valorMeta) {
    if (key === 'venta') {
      let m1 = parseFloat($(`#${key}_m1`).val()) || 0;
      let m2 = parseFloat($(`#${key}_m2`).val()) || 0;
      let m3 = parseFloat($(`#${key}_m3`).val()) || 0;
      let suma = m1 + m2 + m3;
      let porcentaje = Math.min(suma / valorMeta, 1) * 100;

      total += Math.round(Math.min(suma, valorMeta));

      $('#cuotaValor').text(suma.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }));
      $('#cuotaCumplimiento').text(`${Math.round(porcentaje)}% Cumplimiento`);
    } else if (key === 'visibilidad' || key === 'extra') {
      let puntos = 0;
      for (let i = 1; i <= 3; i++) {
        if ($(`#${key}_m${i}`).prop('checked')) {
          puntos += valorMeta / 3;
        }
      }
      total += puntos;
      $(`#${key}Subtotal`).text(Math.round(puntos));
    } else if (key === 'foco') {
      const pesos = [100, 80, 60];
      let puntos = 0;
      for (let fila = 1; fila <= 3; fila++) {
        for (let mes = 1; mes <= 3; mes++) {
          if ($(`#foco_${fila}_m${mes}`).prop('checked')) {
            puntos += pesos[fila - 1];
          }
        }
      }
      total += puntos;
      $('#focoSubtotal').text(puntos);
    }
  });

  $('#totalPuntos').text(`Total puntos que puedes ganar en el trimestre: ${Math.round(total)}`);
}

// Inicializar
$(document).ready(function () {
  cargarMetas();
  $('#segmento').on('change', cargarMetas);
});
