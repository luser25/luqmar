class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: rgba(10, 11, 61, 0.8);
backdrop-filter: blur(10px);
          color: rgba(255, 255, 255, 0.7);
          padding: 2rem;
          text-align: center;
          margin-top: 4rem;
          border-top: 1px solid rgba(187, 181, 241, 0.2);
position: relative;
          z-index: 100;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .footer-section h3 {
          color: white;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li {
          margin-bottom: 0.5rem;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-links a:hover {
          color: #bbb5f1;
}
        
        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        
        .social-links a {
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.3s ease;
        }
        .social-links a:hover {
          color: #bbb5f1;
}
        
        .copyright {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(187, 181, 241, 0.2);
font-size: 0.9rem;
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h3>Luqmar</h3>
            <p>Your cosmic companion through every cycle phase.</p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul class="footer-links">
              <li><a href="/tracker.html">Cycle Tracker</a></li>
              <li><a href="/nutrition.html">Nutrition Guide</a></li>
              <li><a href="/plans.html">Wellness Plans</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Community</h3>
            <ul class="footer-links">
              <li><a href="/community.html">Forums</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Events</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Connect</h3>
            <div class="social-links">
              <a href="#"><i data-feather="instagram"></i></a>
              <a href="#"><i data-feather="twitter"></i></a>
              <a href="#"><i data-feather="facebook"></i></a>
              <a href="#"><i data-feather="youtube"></i></a>
            </div>
          </div>
        </div>
        <div class="copyright">
          &copy; 2024 Luqmar - Cosmic Cycle Tracker. All rights reserved.
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);