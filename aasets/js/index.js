const tareas = [
  { id: 101, descripcion: 'Esta es la primera tarea', completado: false },
  { id: 102, descripcion: 'Tambien existe la tarea 2', completado: false },
  { id: 103, descripcion: 'Por ultimo tenemos la 3º tarea', completado: false },
];

const ul = document.getElementById('tareas');
const totalEl = document.getElementById('total');
const hechasEl = document.getElementById('realizadas');
const porHacerEl = document.getElementById('porHacer');
const inputDescripcion = document.getElementById('descripcion');
const btnAgregar = document.getElementById('agregar');
const vacio = document.getElementById('vacio');

function renderResumen() {
  const total = tareas.length;
  const realizadas = tareas.filter(t => t.completado).length;
  const porHacer = total - realizadas;
  totalEl.textContent = total;
  hechasEl.textContent = realizadas;
  porHacerEl.textContent = porHacer;
}

function renderLista() {
  if (tareas.length === 0) {
    ul.innerHTML = '';
    vacio.style.display = 'block';
    return;
  }
  vacio.style.display = 'none';
  let html = '';
  for (const t of tareas) {
    html += `
      <li>
        <span class="desc ${t.completado ? 'done' : ''}">${t.descripcion}</span>
        <button class="btn btn-add" onclick="cambiar(${t.id})">${t.completado ? 'Desmarcar' : 'Marcar'}</button>
        <button class="btn btn-del" onclick="borrar(${t.id})">Eliminar</button>
      </li>
    `;
  }
  ul.innerHTML = html;
}

function agregarTarea() {
  const texto = inputDescripcion.value.trim();
  if (!texto) return;
  const nueva = { id: Date.now(), descripcion: texto, completado: false };
  tareas.push(nueva);
  inputDescripcion.value = '';
  actualizar();
}

function borrar(id) {
  const i = tareas.findIndex(t => t.id === id);
  if (i !== -1) {
    tareas.splice(i, 1);
    actualizar();
  }
}
window.borrar = borrar;

function cambiar(id) {
  const i = tareas.findIndex(t => t.id === id);
  if (i !== -1) {
    tareas[i].completado = !tareas[i].completado;
    actualizar();
  }
}
window.cambiar = cambiar;

function actualizar() {
  renderLista();
  renderResumen();
}

btnAgregar.addEventListener('click', agregarTarea);
inputDescripcion.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') agregarTarea();
});

actualizar();
