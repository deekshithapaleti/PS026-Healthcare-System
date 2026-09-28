import {
  Activity,
  LayoutDashboard,
  Users,
  CalendarDays,
  Receipt,
  Network,
  ShieldCheck,
  Settings,
  LogOut
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {

  const menu = [
    {
      section: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard
        },
        {
          name: "Patients",
          icon: Users
        },
        {
          name: "Appointments",
          icon: CalendarDays
        },
        {
          name: "Billing",
          icon: Receipt
        }
      ]
    },
    {
      section: "SYSTEM",
      items: [
        {
          name: "Architecture",
          icon: Network
        },
        {
          name: "Service Health",
          icon: Activity
        }
      ]
    }
  ];

  return (
    <aside className="sidebar">

      <div className="brand">

        <div className="brand-logo">
          <Activity size={22} />
        </div>

        <div>
          <h2>ApexCare</h2>
          <span>Health Systems</span>
        </div>

      </div>


      <nav className="sidebar-navigation">

        {menu.map((group) => (
          <div className="menu-group" key={group.section}>

            <p className="menu-section">
              {group.section}
            </p>

            {group.items.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={
                    activePage === item.name
                      ? "sidebar-item active"
                      : "sidebar-item"
                  }
                  onClick={() => setActivePage(item.name)}
                >

                  <Icon size={18} />

                  <span>{item.name}</span>

                </button>
              );
            })}

          </div>
        ))}

      </nav>


      <div className="sidebar-footer">

        <button className="sidebar-item">
          <ShieldCheck size={18} />
          <span>Security</span>
        </button>

        <button className="sidebar-item">
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <div className="sidebar-user">

          <div className="user-avatar">
            AD
          </div>

          <div className="user-details">
            <strong>Administrator</strong>
            <span>Hospital Admin</span>
          </div>

          <LogOut size={16} />

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;