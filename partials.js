/* Injects shared nav + footer so all pages stay consistent */
(function(){
  const page=document.body.dataset.page||'';
  const L=[
    ['index.html','Home'],['services.html','Services'],['clients.html','Clients'],
    ['gallery.html','Gallery'],['career.html','Career'],['about.html','About'],['contact.html','Contact']
  ];
  const links=L.map(([h,n])=>`<a href="${h}" class="${page===h?'active':''}">${n}</a>`).join('');
  const navHTML=`
  <nav class="nav">
    <a href="index.html" class="brand"><span class="dot"></span>
    <img src="assets/logo.png" alt="Dunixab" class="logo">
    </a>
    <div class="nav-links">${links}<a href="contact.html" class="btn btn-ghost" style="padding:12px 22px"><span>Start a Project</span></a></div>
    <button class="menu-btn">MENU</button>
  </nav>`;

  const ig='M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 1.8A4 4 0 0 0 3.8 7.8v8.4a4 4 0 0 0 4 4h8.4a4 4 0 0 0 4-4V7.8a4 4 0 0 0-4-4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4ZM17.5 5.8a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z';
  const fb='M14 9h3l.5-3H14V4.3c0-.9.3-1.5 1.6-1.5H17V.1C16.6 0 15.6 0 14.5 0 12 0 10.3 1.5 10.3 4v2H7.5v3h2.8v8H14V9Z';
  const x='M17.7 3h2.9l-6.3 7.2L22 21h-5.8l-4.5-5.9L6.5 21H3.6l6.8-7.7L2.3 3h6l4.1 5.4L17.7 3Zm-1 16h1.6L7.4 4.6H5.6L16.7 19Z';
  const wa='M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c.6.3 1.1.4 1.5.5a3.5 3.5 0 0 0 1.6.1c.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3Z';

  const footHTML=`
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-col">
        <h3>Let's craft<br>something <span class="italic-serif">unforgettable.</span></h3>
        <a href="contact.html" class="btn"><span>Begin a Project</span><span class="arrow">→</span></a>
      </div>
      <div class="footer-col">
        <h5>Studio</h5>
        <a href="services.html">Services</a>
        <a href="clients.html">Clients</a>
        <a href="gallery.html">Gallery</a>
        <a href="career.html">Career</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <h5>Reach Us</h5>
        <p>Neyyattinkara, Trivandrum,<br>Kerala, India</p>
        <a href="tel:+919249536897">+91 92495 36897</a>
        <a href="mailto:business@dunixabcreative.com">business@dunixabcreative.com</a>
        <div class="socials">
          <a href="https://www.facebook.com/profile.php?id=61590229095671" target="_blank" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="${fb}"/></svg></a>
          <a href="https://www.instagram.com/dunixabcreative" target="_blank" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="${ig}"/></svg></a>
          <a href="https://x.com/dunixabcreative" target="_blank" aria-label="Twitter X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="${x}"/></svg></a>
          <a href="https://wa.me/message/OYCL64TSREVHD1" target="_blank" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="${wa}"/></svg></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2024–<span id="yr"></span> Dunixab Creative Studio. Est. March 2024.</span>
      <span>Designed with intention in Kerala.</span>
    </div>
    <div class="big-mark">DUNIXAB</div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin',navHTML);
  document.body.insertAdjacentHTML('beforeend',footHTML);
  const yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
})();
