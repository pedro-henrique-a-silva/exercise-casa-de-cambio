import './style.css';
import Swal from 'sweetalert2';

const getCotacao = document.querySelector('.cotacao-info');
const getInput = document.querySelector('#input-moeda');
const getBtn = document.querySelector('#btn-pesquisa');
const getCoin = document.querySelector('.oneCoin');
const toFixedNumber = 3;

const createFrames = (obj) => {
  getCotacao.innerHTML = '';
  const getCoins = Object.keys(obj);
  if (getCoins.includes(getInput.value)) {
    getCoins.forEach((coin) => {
      const createP = document.createElement('p');
      createP.classList.add('cotacao-data');
      const createSpan = document.createElement('span');
      createP.innerHTML = `<i class="bi bi-cash-coin"></i> ${coin}`;
      createSpan.innerText = obj[coin].toFixed(toFixedNumber);
      createP.appendChild(createSpan);
      getCotacao.appendChild(createP);
    });
  } else {
    Swal.fire({
      title: 'Erro!',
      text: 'Moeda Inválida! O valor deve ser em siglas. Ex: USD',
      icon: 'error',
      confirmButtonText: 'Tentar Novamente',
    });
  }
};

getBtn.addEventListener('click', (event) => {
  event.preventDefault();
  getCoin.innerText = `Valores referentes a 1 ${getInput.value}`;
  fetch(`https://api.exchangerate.host/latest?base=${getInput.value}`)
    .then((response) => response.json())
    .then((data) => createFrames(data.rates))
    .catch(() => Swal.fire({
      title: 'Erro!',
      text: 'Deseja continuar?',
      icon: 'error',
      confirmButtonText: 'Cool',
    }));
});
