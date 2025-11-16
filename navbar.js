class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(10, 11, 61, 0.8);
backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(187, 181, 241, 0.2);
}
        
        .logo {
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .logo span {
          color: #bbb5f1;
}
        
        ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        
        a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }
        
        a:hover {
          color: white;
        }
        
        a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #6d4b77;
transition: width 0.3s ease;
        }
        
        a:hover::after {
          width: 100%;
        }
        
        .active-nav-link {
          color: #8a46ff !important;
          font-weight: 500;
        }
        
        .active-nav-link::after {
          width: 100%;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(138, 70, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .user-avatar:hover {
          background: rgba(138, 70, 255, 0.4);
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: rgba(10, 11, 61, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(187, 181, 241, 0.2);
          border-radius: 8px;
          width: 200px;
          padding: 0.5rem 0;
          margin-top: 0.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          display: none;
        }

        .profile-dropdown.show {
          display: block;
        }

        .profile-dropdown a {
          display: block;
          padding: 0.5rem 1rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .profile-dropdown a:hover {
          background: rgba(138, 70, 255, 0.2);
          color: white;
        }

        .profile-dropdown a i {
          margin-right: 0.5rem;
          width: 16px;
          height: 16px;
        }

        .profile-dropdown hr {
          border: none;
          height: 1px;
          background: rgba(187, 181, 241, 0.2);
          margin: 0.25rem 0;
        }
@media (max-width: 768px) {
          ul {
            gap: 1rem;
          }
        }
      </style>
      <nav>
        <a href="/" class="logo">
          <span>🌌</span> Luqmar
        </a>
        <div class="lg:hidden">
          <i data-feather="menu" class="w-6 h-6"></i>
        </div>
        <ul class="hidden lg:flex">
          <li><a href="/tracker.html"><i data-feather="calendar"></i> Tracker</a></li>
          <li><a href="/community.html" class="active-nav-link"><i data-feather="users"></i> Community</a></li>
          <li><a href="/nutrition.html"><i data-feather="heart"></i> Nutrition</a></li>
          <li><a href="/plans.html"><i data-feather="star"></i> Plans</a></li>
        <li>
          <div class="user-avatar" id="profile-toggle">
            <i data-feather="user"></i>
          </div>
          <div class="profile-dropdown" id="profile-dropdown">
            <a href="/profile.html"><i data-feather="user"></i> My Profile</a>
            <a href="/settings.html"><i data-feather="settings"></i> App Settings</a>
            <a href="/update-details.html"><i data-feather="edit"></i> Update Details</a>
            <hr>
            <a href="/logout" id="logout-btn"><i data-feather="log-out"></i> Log Out</a>
          </div>
        </li>
</ul>
        <a href="/signup.html" class="lg:hidden text-white">
          <i data-feather="user" class="w-6 h-6"></i>
        </a>
</nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
// Toggle profile dropdown and auth state
document.addEventListener('DOMContentLoaded', function() {
  const profileToggle = document.getElementById('profile-toggle');
  const profileDropdown = document.getElementById('profile-dropdown');
  const signedInMenu = document.getElementById('signed-in-menu');
  const signedOutMenu = document.getElementById('signed-out-menu');

  // Check auth state
  function checkAuth() {
    const userData = localStorage.getItem('luqmarUserData');
    if (userData) {
      signedInMenu.classList.remove('hidden');
      signedOutMenu.classList.add('hidden');
    } else {
      signedInMenu.classList.add('hidden');
      signedOutMenu.classList.remove('hidden');
    }
  }

  if (profileToggle && profileDropdown) {
    // Initial check
    checkAuth();

    profileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      profileDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      profileDropdown.classList.remove('show');
    });

    // Prevent dropdown from closing when clicking inside
    profileDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('luqmarUserData');
        checkAuth();
      });
    }
  }

  // Watch for auth changes
  window.addEventListener('storage', function() {
    checkAuth();
  });
});
