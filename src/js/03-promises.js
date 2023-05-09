function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const delay = parseInt(form.delay.value);
  const step = parseInt(form.step.value);
  const amount = parseInt(form.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});