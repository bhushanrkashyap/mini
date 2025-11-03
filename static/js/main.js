// Main JS: small helpers used across visualizers
document.addEventListener('DOMContentLoaded', () => {
  // simple focus or minor interactive features can be added here
  // e.g., attach tooltip container
  if (!document.getElementById('algosphere-tooltip')){
    const t = document.createElement('div');
    t.id = 'algosphere-tooltip';
    t.style.position = 'fixed'; t.style.pointerEvents='none'; t.style.padding='6px 10px'; t.style.background='rgba(0,0,0,0.75)'; t.style.color='#fff'; t.style.borderRadius='6px'; t.style.fontSize='12px'; t.style.display='none';
    document.body.appendChild(t);
  }
});
