document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
menuButton?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('.contact-form');
const status = form?.querySelector('.form-status');
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true; button.textContent = 'Enviando...'; status.textContent = '';
  try {
    const body = new URLSearchParams(new FormData(form));
    const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
    if (!response.ok) throw new Error('Falha no envio');
    form.reset(); status.textContent = 'Recebemos a sua mensagem. A equipe da Aust entrará em contato.';
  } catch {
    status.textContent = 'Não foi possível enviar agora. Tente novamente em alguns instantes.'; status.style.color = 'var(--red-light)';
  } finally {
    button.disabled = false; button.innerHTML = 'Enviar para a Aust <span>↗</span>';
  }
});
