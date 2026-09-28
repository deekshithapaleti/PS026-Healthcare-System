import {
  Search,
  Bell,
  ChevronDown,
  LogOut
} from "lucide-react";

function Header({ onLogout }) {

  return (
    <header className="top-header">

      <div className="breadcrumb">
        <span>ApexCare</span>
        <span>/</span>
        <strong>Healthcare Operations</strong>
      </div>

      <div className="header-actions">

        <div className="search-box">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search patients, appointments..."
          />

          <kbd>⌘ K</kbd>
        </div>

        <button className="notification-button">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="header-profile">

          <div className="header-avatar">
            AD
          </div>

          <div className="header-user">
            <strong>Administrator</strong>
            <span>Hospital Admin</span>
          </div>

          <ChevronDown size={15} />

        </div>

        <button
          className="logout-button"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
}

export default Header;