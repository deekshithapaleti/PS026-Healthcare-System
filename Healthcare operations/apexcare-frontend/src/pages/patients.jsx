import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit3,
  UserRound,
  X,
  Phone,
  Mail
} from "lucide-react";

import { getPatients, createPatient } from "../../services/api";

function Patients() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      const data = await getPatients();

      const formattedPatients = data.map((patient) => ({
        ...patient,
        patientId: `PT-${String(patient.id).padStart(4, "0")}`,
        age: "—",
        gender: "—",
        department: "General Medicine",
        status: "Active"
      }));

      setPatients(formattedPatients);
    } catch (error) {
      console.error("Failed to load patients:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(search.toLowerCase()) ||
    patient.department.toLowerCase().includes(search.toLowerCase())
  );

  const addPatient = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    const newPatient = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      dateOfBirth: "2000-01-01",
      medicalHistory: "No known allergies"
    };

    try {
      const createdPatient = await createPatient(newPatient);

      const formattedPatient = {
        ...createdPatient,
        patientId: `PT-${String(createdPatient.id).padStart(4, "0")}`,
        age: form.get("age"),
        gender: form.get("gender"),
        department: form.get("department"),
        status: "Active"
      };

      setPatients((currentPatients) => [
        ...currentPatients,
        formattedPatient
      ]);

      setShowModal(false);
      event.target.reset();

    } catch (error) {
      console.error("Failed to create patient:", error);
      alert("Failed to create patient");
    }
  };

  return (
    <div className="module-page">

      {/* PAGE HEADER */}

      <div className="module-header">

        <div>
          <p className="page-label">
            PATIENT SERVICE
          </p>

          <h1>Patients</h1>

          <p>
            Manage patient records and healthcare information.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={17} />
          Add Patient
        </button>

      </div>


      {/* SUMMARY */}

      <div className="patient-summary">

        <div className="summary-card">

          <div className="summary-icon blue-icon">
            <UserRound size={21} />
          </div>

          <div>
            <span>Total Patients</span>
            <strong>{patients.length}</strong>
          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon green-icon">
            <UserRound size={21} />
          </div>

          <div>
            <span>Active Patients</span>
            <strong>
              {patients.filter(
                (patient) => patient.status === "Active"
              ).length}
            </strong>
          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon purple-icon">
            <UserRound size={21} />
          </div>

          <div>
            <span>New This Month</span>
            <strong>{patients.length}</strong>
          </div>

        </div>

      </div>


      {/* TABLE CARD */}

      <div className="module-card">

        <div className="table-toolbar">

          <div>
            <h3>Patient Records</h3>

            <p>
              Secure patient information managed by Patient Service
            </p>
          </div>


          <div className="table-search">

            <Search size={16} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search patients..."
            />

          </div>

        </div>


        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Patient</th>
                <th>Patient ID</th>
                <th>Age / Gender</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Loading patients...
                  </td>
                </tr>

              ) : filteredPatients.length === 0 ? (

                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No patients found.
                  </td>
                </tr>

              ) : (

                filteredPatients.map((patient) => (

                  <tr key={patient.id}>

                    <td>

                      <div className="patient-cell">

                        <div className="table-avatar">
                          {patient.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>

                        <div>
                          <strong>{patient.name}</strong>

                          <span>{patient.email}</span>
                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="patient-id">
                        {patient.patientId}
                      </span>

                    </td>


                    <td>
                      {patient.age} / {patient.gender}
                    </td>


                    <td>

                      <span className="department-badge">
                        {patient.department}
                      </span>

                    </td>


                    <td>

                      <div className="contact-cell">

                        <span>
                          <Phone size={12} />
                          {patient.phone}
                        </span>

                      </div>

                    </td>


                    <td>

                      <span
                        className={
                          patient.status === "Active"
                            ? "status active-status"
                            : "status inactive-status"
                        }
                      >
                        {patient.status}
                      </span>

                    </td>


                    <td>

                      <div className="action-buttons">

                        <button title="View patient">
                          <Eye size={15} />
                        </button>

                        <button title="Edit patient">
                          <Edit3 size={15} />
                        </button>

                        <button title="More">
                          <MoreHorizontal size={15} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        <div className="table-footer">

          Showing {filteredPatients.length} of {patients.length} records

        </div>

      </div>


      {/* ADD PATIENT MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>Add New Patient</h2>

                <p>
                  Enter patient information below.
                </p>

              </div>

              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <X size={19} />
              </button>

            </div>


            <form onSubmit={addPatient}>

              <div className="form-grid">

                <div className="form-group">

                  <label>Full Name</label>

                  <input
                    name="name"
                    required
                    placeholder="Enter patient name"
                  />

                </div>


                <div className="form-group">

                  <label>Age</label>

                  <input
                    name="age"
                    type="number"
                    required
                    placeholder="Age"
                  />

                </div>


                <div className="form-group">

                  <label>Gender</label>

                  <select name="gender" required>

                    <option value="">
                      Select gender
                    </option>

                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>

                  </select>

                </div>


                <div className="form-group">

                  <label>Department</label>

                  <select name="department" required>

                    <option value="">
                      Select department
                    </option>

                    <option>Cardiology</option>
                    <option>General Medicine</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Pediatrics</option>

                  </select>

                </div>


                <div className="form-group">

                  <label>Phone</label>

                  <input
                    name="phone"
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />

                </div>


                <div className="form-group">

                  <label>Email</label>

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="patient@email.com"
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
                  Add Patient
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Patients;