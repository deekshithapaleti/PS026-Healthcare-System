import {
  Users,
  CalendarDays,
  IndianRupee,
  Receipt,
  Activity,
  ArrowUpRight,
  Clock
} from "lucide-react";

function Dashboard() {
  const appointments = [
    {
      patient: "Arjun Kumar",
      doctor: "Dr. Rahul Sharma",
      department: "Cardiology",
      time: "10:30 AM",
      status: "Confirmed"
    },
    {
      patient: "Priya Reddy",
      doctor: "Dr. Sneha Rao",
      department: "General Medicine",
      time: "11:45 AM",
      status: "Confirmed"
    },
    {
      patient: "Vikram Singh",
      doctor: "Dr. Anil Kumar",
      department: "Neurology",
      time: "01:30 PM",
      status: "Pending"
    }
  ];

  return (
    <div className="dashboard-page">

      <div className="page-heading">
        <div>
          <p className="page-label">OVERVIEW</p>
          <h1>Healthcare Dashboard</h1>
          <p>
            Monitor hospital operations, patients and appointments
            from one place.
          </p>
        </div>

        <div className="system-online">
          <span></span>
          All Systems Operational
        </div>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue-icon">
            <Users size={22} />
          </div>

          <div>
            <p>Total Patients</p>
            <h2>2,847</h2>
            <span className="positive">
              <ArrowUpRight size={14} />
              12.5% this month
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-icon">
            <CalendarDays size={22} />
          </div>

          <div>
            <p>Appointments</p>
            <h2>128</h2>
            <span>Scheduled today</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green-icon">
            <IndianRupee size={22} />
          </div>

          <div>
            <p>Revenue</p>
            <h2>₹8.42L</h2>
            <span className="positive">
              <ArrowUpRight size={14} />
              8.2% this month
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange-icon">
            <Receipt size={22} />
          </div>

          <div>
            <p>Pending Bills</p>
            <h2>34</h2>
            <span>Requires attention</span>
          </div>
        </div>

      </div>

      <div className="dashboard-columns">

        <div className="dashboard-card appointments-card">

          <div className="card-heading">
            <div>
              <h3>Today's Appointments</h3>
              <p>Upcoming patient consultations</p>
            </div>

            <button className="text-button">
              View All
            </button>
          </div>

          <div className="appointment-list">

            {appointments.map((appointment, index) => (
              <div className="appointment-row" key={index}>

                <div className="patient-avatar">
                  {appointment.patient
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <div className="appointment-patient">
                  <strong>{appointment.patient}</strong>
                  <span>{appointment.doctor}</span>
                </div>

                <div className="department">
                  {appointment.department}
                </div>

                <div className="appointment-time">
                  <Clock size={14} />
                  {appointment.time}
                </div>

                <span
                  className={
                    appointment.status === "Confirmed"
                      ? "status confirmed"
                      : "status pending"
                  }
                >
                  {appointment.status}
                </span>

              </div>
            ))}

          </div>
        </div>

        <div className="dashboard-card service-card">

          <div className="card-heading">
            <div>
              <h3>Microservices</h3>
              <p>Real-time service health</p>
            </div>

            <Activity size={20} />
          </div>

          {[
            "Patient Service",
            "Appointment Service",
            "Billing Service",
            "API Gateway",
            "Eureka Server"
          ].map((service) => (
            <div className="service-row" key={service}>

              <div>
                <span className="service-indicator"></span>
                {service}
              </div>

              <span className="online-badge">
                Online
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;