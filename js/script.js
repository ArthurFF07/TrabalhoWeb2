/* ======================================================
   Catálogo com dados dos carros (simulação local)
   ====================================================== */
const cars = [
  {id:1, name:'Chevrolet Onix', price:120, contact:'+55 85 99911-0001', photos:['img/onix.jpg'],
   specs:'1.0, 4 portas, econômico, ideal para cidade',
   comment:'Onix bem conservado, ar-condicionado, baixo consumo — excelente para viagens urbanas.'
  },

  {id:2, name:'Volkswagen Gol', price:95, contact:'+55 85 99911-0002', photos:['img/gol.jpg'],
   specs:'1.0, 4 portas, econômico',
   comment:'Gol básico, ótimo custo-benefício para corridas curtas e diárias.'
  },

  {id:3, name:'Fiat Uno', price:85, contact:'+55 85 99911-0003', photos:['img/uno.jpg'],
   specs:'1.0, 2 portas, super econômico',
   comment:'Uno econômico, ideal para deslocamentos diários.'
  },

  {id:4, name:'Hyundai HB20', price:130, contact:'+55 85 99911-0004', photos:['img/hb20.jpg'],
   specs:'1.6, 4 portas, mais espaçoso',
   comment:'HB20 com bom conjunto mecânico, conforto para 4 passageiros.'
  },

  {id:5, name:'Renault Kwid', price:80, contact:'+55 85 99911-0005', photos:['img/kwid.jpg'],
   specs:'1.0, compacto, ótimo para cidade',
   comment:'Muito econômico e fácil de estacionar.'
  },

  {id:6, name:'Toyota Corolla', price:220, contact:'+55 85 99911-0006', photos:['img/corolla.jpg'],
   specs:'2.0, sedan, confortável',
   comment:'Corolla elegante e confortável, ideal para viagens mais longas.'
  }
];

/* ======================================================
   Sistema de armazenamento (sessionStorage)
   ====================================================== */
const STORAGE_KEY = 'alugacar_rentals_v1';

function loadRentals() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRentals(list) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/* ======================================================
   Apagar progresso APENAS ao sair do site (não ao atualizar)
   ====================================================== */
let isReload =
  performance.getEntriesByType("navigation")[0].type === "reload";

window.addEventListener("beforeunload", () => {
  if (!isReload) {
    sessionStorage.removeItem(STORAGE_KEY);
  }
});

/* ======================================================
   Controle de navegação SPA
   ====================================================== */
const app = document.getElementById('app');

function navigate(hash) {
  location.hash = hash;
}
window.navigate = navigate;

/* ======================================================
   Página inicial com catálogo
   ====================================================== */
function renderHome() {
  const tpl = document.getElementById('home-tpl').content.cloneNode(true);
  const catalog = tpl.getElementById('catalog');

  cars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img class="car-photo" src="${car.photos[0]}" alt="${car.name}">
      <div style="text-align:center">
        <div class="car-name">${car.name}</div>
        <div class="car-price">R$ ${car.price}/dia</div>
      </div>
      <div style="display:flex;gap:12px;align-items:center">
        <div class="round-square">
          <button class="btn-rent" data-id="${car.id}">Alugar</button>
        </div>
        <div style="text-align:left;color:var(--muted);font-size:13px">${car.specs}</div>
      </div>
    `;
    catalog.appendChild(card);
  });

  app.innerHTML = '';
  app.appendChild(tpl);

  document.querySelectorAll('.btn-rent').forEach(b => {
    b.addEventListener('click', e => {
      const id = e.currentTarget.dataset.id;
      const url = location.origin + location.pathname + '#car-' + id;
      window.open(url, '_blank');
    });
  });
}

/* ======================================================
   Página de detalhes do carro
   ====================================================== */
function renderDetail(id) {
  const car = cars.find(c => c.id == id);
  if (!car) return renderHome();

  const tpl = document.getElementById('detail-tpl').content.cloneNode(true);

  tpl.getElementById('mainPhoto').src = car.photos[0];

  const thumbs = tpl.getElementById('thumbs');
  car.photos.forEach(p => {
    const img = document.createElement('img');
    img.src = p;
    img.addEventListener('click', () => {
      tpl.getElementById('mainPhoto').src = p;
    });
    thumbs.appendChild(img);
  });

  tpl.getElementById('carTitle').textContent = car.name;
  tpl.getElementById('carPrice').textContent = `R$ ${car.price}/dia`;
  tpl.getElementById('carSpecs').textContent = car.specs;
  tpl.getElementById('carComment').textContent = car.comment;
  tpl.getElementById('carContact').textContent = car.contact;

  app.innerHTML = '';
  app.appendChild(tpl);

  document.getElementById('rentNow').addEventListener('click', () => openRentModal(car));
}

/* ======================================================
   Página de progresso
   ====================================================== */
function renderProgress() {
  const tpl = document.getElementById('progress-tpl').content.cloneNode(true);
  const listNode = tpl.getElementById('progressList');
  const rentals = loadRentals().sort((a, b) => b.dateReserved - a.dateReserved);

  if (rentals.length === 0) {
    const p = document.createElement('div');
    p.className = 'small-muted';
    p.textContent = 'Você ainda não alugou nenhum carro.';
    listNode.appendChild(p);
  } else {
    rentals.forEach(r => {
      const car = cars.find(c => c.id == r.carId) || { name: r.carName };
      const item = document.createElement('div');
      item.className = 'progress-item';

      const percent = r.status === 'Concluído'
        ? 100
        : r.status === 'Em andamento'
        ? 45
        : 10;

      item.innerHTML = `
        <div style="width:64px;height:48px;border-radius:8px;overflow:hidden">
          <img src="${car.photos ? car.photos[0] : ''}" 
               style="width:100%;height:100%;object-fit:cover">
        </div>

        <div style="flex:1">
          <div style="font-weight:700">${car.name}</div>
          <div class="small-muted">
            ${new Date(r.dateReserved).toLocaleString()}
          </div>

          <div style="margin-top:8px">
            <div class="progress-bar">
              <i style="width:${percent}%"></i>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:13px;color:var(--muted)">
              <span>${r.status}</span>
              <span>R$ ${r.price}/dia</span>
            </div>
          </div>
        </div>
      `;
      listNode.appendChild(item);
    });
  }

  app.innerHTML = '';
  app.appendChild(tpl);
}

/* ======================================================
   Modal de aluguel
   ====================================================== */
function openRentModal(car) {
  const modal = document.createElement('div');
  modal.className = 'modal-back';

  modal.innerHTML = `
    <div class="modal">
      <h3>Quando deseja alugar?</h3>

      <label>Data</label>
      <input type="date" id="rentDate">

      <label>Hora</label>
      <input type="time" id="rentTime">

      <div style="margin-top:10px" class="small-muted">
        Contato: <strong>${car.contact}</strong>
      </div>

      <div style="display:flex;gap:8px;margin-top:14px;justify-content:flex-end">
        <button class="btn-primary" id="sendRent">Enviar</button>
        <button class="btn-primary" id="cancelRent"
          style="background:transparent;color:var(--muted);border:1px solid rgba(255,255,255,0.04)">
          Cancelar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('cancelRent').addEventListener('click', () => modal.remove());

  document.getElementById('sendRent').addEventListener('click', () => {
    const date = document.getElementById('rentDate').value;
    const time = document.getElementById('rentTime').value;

    const rentals = loadRentals();
    rentals.push({
      carId: car.id,
      carName: car.name,
      price: car.price,
      contact: car.contact,
      dateReserved: new Date().toISOString(),
      dateFrom: date + ' ' + time,
      status: 'Em andamento'
    });

    saveRentals(rentals);
    modal.remove();

    const wait = document.createElement('div');
    wait.className = 'modal-back';
    wait.innerHTML = `
      <div class="modal">
        <h3>Aluguel em andamento</h3>
        <p class="small-muted">
          Aguarde o contato do anunciante. Você será redirecionado.
        </p>
      </div>
    `;

    document.body.appendChild(wait);

    setTimeout(() => {
      wait.remove();
      navigate('#home');
      router(); // 🔥 NÃO RECARREGA A PÁGINA — NÃO APAGA SESSION
    }, 1600);
  });
}

/* ======================================================
   Roteador SPA
   ====================================================== */
function router() {
  const hash = location.hash || '#home';

  if (hash.startsWith('#car-')) {
    renderDetail(hash.split('-')[1]);
  }
  else if (hash === '#progress') {
    renderProgress();
  }
  else {
    renderHome();
  }
}

/* Abrir progresso em nova aba */
document.getElementById('progressLink')
  .addEventListener('click', (e) => {
    e.preventDefault();
    const url = location.origin + location.pathname + '#progress';
    window.open(url, '_blank');
  });

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
