// ✅ Envio do formulário via Google Apps Script
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const thankYou = document.getElementById('thank-you');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nome: form.nome.value,
      email: form.email.value,
      whatsapp: form.whatsapp.value,
      cpf: form.cpf.value,
      nascimento: form.nascimento.value,
      pais: form.pais.value,
      estado: form.estado.value,
      cidade: form.cidade.value,
      rua_numero: form.rua_numero.value,
      cep: form.cep.value,
      consentimento: form.consentimento.checked ? "Sim" : "Não",
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycby4VWcmLAqRUkLTR5beMvjI2oam_p3R_rd51QLmj54fI6YVkm40Bwr4zYoEevczxKeMZQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      form.style.display = 'none';
      thankYou.classList.remove('hidden');
      thankYou.classList.add('show');
    } catch (err) {
      alert('⚠️ Erro de conexão com o servidor.');
      console.error('❌ Erro no envio:', err);
    }
  });
});

// ✅ Abrir e fechar formulário (popup)
function toggleForm() {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popup-form');
  const thankYou = document.getElementById('thank-you');
  const form = document.getElementById('lead-form');

  const isHidden = overlay.classList.contains('hidden');
  overlay.classList.toggle('hidden', !isHidden);
  popup.classList.toggle('hidden', !isHidden);
  thankYou.classList.add('hidden');

  if (isHidden) {
    form.reset();
    form.style.display = 'block';
  }
}

// ✅ Reiniciar o formulário para nova inscrição
function restartForm() {
  const thankYou = document.getElementById('thank-you');
  const form = document.getElementById('lead-form');

  thankYou.classList.add('hidden');
  thankYou.classList.remove('show');
  form.reset();
  form.style.display = 'block';
}

// ✅ FAQ toggle
function toggleFAQ(el) {
  el.classList.toggle('active');
  el.classList.toggle('open');
}

// ✅ Animação da maquininha (frame 2)
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('machineImg');
  if (!img) return;

  function handleScroll() {
    const rect = img.getBoundingClientRect();
    const triggerHeight = window.innerHeight * 0.7;

    if (rect.top <= triggerHeight) {
      img.classList.add('visible');
      window.removeEventListener('scroll', handleScroll);
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});
