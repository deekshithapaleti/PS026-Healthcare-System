import { useState } from "react";

import {
  Search,
  Plus,
  CalendarDays,
  Clock,
  Video,
  MapPin,
  X
} from "lucide-react";

function Appointments() {

  const [showModal, setShowModal] = useState(false);

  const [appointments, setAppointments] = useState([
    {
      id: "APT-2001",
      patient: "Arjun Kumar",
      doctor: "Dr. Rahul Sharma",
      department: "Cardiology",
      date: "20 Sep 2026",
      time: "10:30 AM",
      type: "In Person",
      status: "Confirmed"
    },
    {
      id: "APT-2002",
      patient: "Priya Reddy",
      doctor: "Dr. Sneha Rao",
      department: "General Medicine",
      date: "20 Sep 2026",
      time: "11:45 AM",
      type: "Video",
      status: "Confirmed"
    },
    {
      id: "APT-2003",
      patient: "Vikram Singh",
      doctor: "Dr. Anil Kumar",
      department: "Neurology",
      date: "20 Sep 2026",
      time: "01:30 PM",
      type: "In Person",
      status: "Pending"
    },
    {
      id: "APT-2004",
      patient: "Sneha Rao",
      doctor: "Dr. Meera Patel",
      department: "Orthopedics",
      date: "20 Sep 2026",
      time: "03:00 PM",
      type: "In Person",
      status: "Confirmed"
    }
  ]);

  const [search, setSearch] = useState("");

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.doctor
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.id
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const scheduleAppointment = (event) => {

    event.preventDefault();

    const form = new FormData(event.target);

    const appointment = {
      id: `APT-${2001 + appointments.length}`,
      patient: form.get("patient"),
      doctor: form.get("doctor"),
      department: form.get("department"),
      date: form.get("date"),
      time: form.get("time"),
      type: form.get("type"),
      status: "Pending"
    };

    setAppointments([
      ...appointments,
      appointment
    ]);

    setShowModal(false);
  };

  return (
    <div className="module-page">

      {/* HEADER */}

      <div className="module-header">

        <div>

          <p className="page-label">
            APPOINTMENT SERVICE
          </p>

          <h1>Appointments</h1>

          <p>
            Schedule and manage patient consultations.
          </p>

        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={17} />
          Schedule Appointment
        </button>

      </div>


      {/* SUMMARY */}

      <div className="appointment-summary">

        <div className="summary-card">

          <div className="summary-icon purple-icon">
            <CalendarDays size={21} />
          </div>

          <div>
            <span>Today's Appointments</span>
            <strong>128</strong>
          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon green-icon">
            <CalendarDays size={21} />
          </div>

          <div>
            <span>Confirmed</span>
            <strong>96</strong>
          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon orange-icon">
            <Clock size={21} />
          </div>

          <div>
            <span>Pending</span>
            <strong>32</strong>
          </div>

        </div>

      </div>


      {/* APPOINTMENT CARD */}

      <div className="module-card">

        <div className="table-toolbar">

          <div>

            <h3>Scheduled Appointments</h3>

            <p>
              Consultation schedules managed by Appointment Service
            </p>

          </div>


          <div className="table-search">

            <Search size={16} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search appointments..."
            />

          </div>

        </div>


        <div className="appointment-list-large">

          {filteredAppointments.map(
            (appointment) => (

              <div
                className="appointment-card-row"
                key={appointment.id}
              >

                <div className="appointment-date">

                  <CalendarDays size={18} />

                  <span>
                    {appointment.date}
                  </span>

                </div>


                <div className="appointment-main">

                  <div className="appointment-person">

                    <div className="table-avatar">
                      {appointment.patient
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div>

                      <strong>
                        {appointment.patient}
                      </strong>

                      <span>
                        Patient • {appointment.id}
                      </span>

                    </div>

                  </div>


                  <div className="doctor-info">

                    <strong>
                      {appointment.doctor}
                    </strong>

                    <span>
                      {appointment.department}
                    </span>

                  </div>


                  <div className="appointment-slot">

                    <Clock size={14} />

                    <strong>
                      {appointment.time}
                    </strong>

                  </div>


                  <div className="appointment-type">

                    {appointment.type === "Video" ? (
                      <>
                        <Video size={14} />
                        Video Consultation
                      </>
                    ) : (
                      <>
                        <MapPin size={14} />
                        In Person
                      </>
                    )}

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

              </div>

            )
          )}

        </div>

      </div>


      {/* SCHEDULE MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  Schedule Appointment
                </h2>

                <p>
                  Create a new patient consultation.
                </p>

              </div>

              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <X size={19} />
              </button>

            </div>


            <form onSubmit={scheduleAppointment}>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Patient
                  </label>

                  <select
                    name="patient"
                    required
                  >

                    <option value="">
                      Select patient
                    </option>

                    <option>
                      Arjun Kumar
                    </option>

                    <option>
                      Priya Reddy
                    </option>

                    <option>
                      Vikram Singh
                    </option>

                    <option>
                      Sneha Rao
                    </option>

                    <option>
                      Rahul Verma
                    </option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Doctor
                  </label>

                  <select
                    name="doctor"
                    required
                  >

                    <option value="">
                      Select doctor
                    </option>

                    <option>
                      Dr. Rahul Sharma
                    </option>

                    <option>
                      Dr. Sneha Rao
                    </option>

                    <option>
                      Dr. Anil Kumar
                    </option>

                    <option>
                      Dr. Meera Patel
                    </option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Department
                  </label>

                  <select
                    name="department"
                    required
                  >

                    <option value="">
                      Select department
                    </option>

                    <option>
                      Cardiology
                    </option>

                    <option>
                      General Medicine
                    </option>

                    <option>
                      Neurology
                    </option>

                    <option>
                      Orthopedics
                    </option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Consultation Type
                  </label>

                  <select
                    name="type"
                    required
                  >

                    <option>
                      In Person
                    </option>

                    <option>
                      Video
                    </option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Date
                  </label>

                  <input
                    name="date"
                    type="date"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Time
                  </label>

                  <input
                    name="time"
                    type="time"
                    required
                  />

                </div>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Schedule Appointment
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Appointments;