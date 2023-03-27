// Obtiene la lista de reservas almacenadas en localStorage o crea una nueva si no existe
const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Función para mostrar las reservas en la página
function mostrarReservas(reservas) {
  const reservasList = document.getElementById('reservasList');
  // Limpia la lista anterior de reservas
  reservasList.innerHTML = '';

  // Recorre todas las reservas y agrega cada una a la lista
  reservas.forEach(function(reserva) {
    const reservaItem = document.createElement('li');
    reservaItem.innerHTML = `Nombre: ${reserva.nombre} ${reserva.apellido}, DNI: ${reserva.dni}, Cantidad de personas: ${reserva.cantidadPersonas}, Fecha de entrada: ${reserva.fechaEntrada}, Fecha de salida: ${reserva.fechaSalida}`;
    reservasList.appendChild(reservaItem);
  });
}

// Agrega un evento al formulario de reserva para manejar el envío
const reservaForm = document.getElementById('reservaForm');
reservaForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtiene los valores de los campos de reserva
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const dni = document.getElementById('dni').value;
  const cantidadPersonas = document.getElementById('cantidadPersonas').value;
  const fechaEntrada = document.getElementById('fechaEntrada').value;
  const fechaSalida = document.getElementById('fechaSalida').value;

if (!nombre || !apellido || !dni || !cantidadPersonas || !fechaEntrada || !fechaSalida) {
    
    Swal.fire(
      '¿Ha ingresado todos los campos?',
      'Verifique nuevamente',
    );
    return;
  }
  // Crea un objeto de reserva con los valores de los campos
  const reserva = {
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    cantidadPersonas: cantidadPersonas,
    fechaEntrada: fechaEntrada,
    fechaSalida: fechaSalida
  };

  // Agrega la reserva a la lista de reservas y la guarda en localStorage
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));

  // Muestra las reservas actualizadas en la página
  mostrarReservas(reservas);
  // Limpia los valores de los campos de reserva
  reservaForm.reset();
  document.getElementById('mensajeError').innerHTML = "";
});

// Agrega un evento al botón de búsqueda para manejar la búsqueda de reserva por DNI
const buscarBtn = document.getElementById('buscarBtn');
buscarBtn.addEventListener('click', function(event) {
  event.preventDefault();

  // Obtiene el valor del campo de búsqueda
  const dniBusqueda = document.getElementById('dniBusqueda').value;

  // Busca la reserva en la lista de reservas
  const reservaEncontrada = reservas.find(function(reserva) {
    return reserva.dni === dniBusqueda;
  });

  // Borra todas las reservas y muestra solo la reserva encontrada, si existe
  if (reservaEncontrada) {
    mostrarReservas([reservaEncontrada]);
    // Borra la reserva encontrada de la lista de reservas y la guarda en localStorage
    const reservaIndex = reservas.indexOf(reservaEncontrada);
    reservas.splice(reservaIndex, 1);
    localStorage.setItem('reservas', JSON.stringify(reservas));
  } else {
    document.getElementById('reservasList').innerHTML = "No se encontraron reservas.";
  }

  // Limpia el valor del campo de búsqueda
  document.getElementById('dniBusqueda').value = '';
});
function eliminarReserva() {
    const dniBusqueda = document.getElementById('dniBusqueda').value;
  
    // Si no se ingresó ningún DNI, mostrar mensaje de error y salir de la función
    if (!dniBusqueda) {
      const mensajeError = document.getElementById('mensajeError');
      mensajeError.textContent = 'Ingrese un DNI para eliminar una reserva.';
      return;
    }
  
    // Busca la reserva en la lista de reservas
    const reservaEncontrada = reservas.find(function(reserva) {
      return reserva.dni === dniBusqueda;
    });
  
    // Borra la reserva encontrada de la lista de reservas y la guarda en localStorage
    if (reservaEncontrada) {
      const reservaIndex = reservas.indexOf(reservaEncontrada);
      reservas.splice(reservaIndex, 1);
      localStorage.setItem('reservas', JSON.stringify(reservas));
  
      // Muestra un mensaje de éxito
      const mensajeError = document.getElementById('mensajeError');
      mensajeError.textContent = 'La reserva se eliminó correctamente.';
    } else {
      // Muestra un mensaje de error si no se encontró la reserva
      const mensajeError = document.getElementById('mensajeError');
      mensajeError.textContent = 'No se encontró ninguna reserva con el DNI ingresado.';
    }
  }
  
