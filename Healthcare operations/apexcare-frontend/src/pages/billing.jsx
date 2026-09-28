import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  Receipt,
  IndianRupee,
  CheckCircle2,
  Clock3,
  X,
  CreditCard
} from "lucide-react";

import {
  getBills,
  createBill,
  updateBill,
  deleteBill
} from "../../services/api";


function Billing() {

  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
const [editBill, setEditBill] = useState(null);
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");


  // =========================
  // LOAD BILLS FROM BACKEND
  // =========================

  useEffect(() => {

    async function loadBills() {

      try {

        const data = await getBills();

        const formattedBills = data.map((bill) => ({

          id: `INV-${String(bill.id).padStart(4, "0")}`,

          patient: `Patient ${bill.patientId}`,

          appointment:
            `APT-${String(bill.appointmentId).padStart(4, "0")}`,

          service: "Medical Consultation",

          amount: bill.totalAmount,

          date: "20 Sep 2026",

          status: bill.paymentStatus,

          backendId: bill.id,

          patientId: bill.patientId,

          appointmentId: bill.appointmentId,

          consultationFee: bill.consultationFee,

          medicineFee: bill.medicineFee

        }));

        setBills(formattedBills);

      } catch (error) {

        console.error(
          "Failed to load bills:",
          error
        );

      }

    }

    loadBills();

  }, []);


  // =========================
  // SEARCH
  // =========================

  const filteredBills = bills.filter(
    (bill) =>
      bill.patient
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      bill.id
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      bill.appointment
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  // =========================
  // GENERATE BILL
  // =========================

  const generateBill = async (event) => {

    event.preventDefault();

    const form = new FormData(event.target);

    const patientId = Number(
      form.get("patientId")
    );

    const appointmentId = Number(
      form.get("appointmentId")
    );

    const amount = Number(
      form.get("amount")
    );

    const newBillData = {

      patientId: patientId,

      appointmentId: appointmentId,

      consultationFee: amount,

      medicineFee: 0,

      paymentStatus: "Pending"

    };


    try {

      const savedBill =
        await createBill(newBillData);


      const formattedBill = {

        id:
          `INV-${String(savedBill.id).padStart(4, "0")}`,

        patient:
          `Patient ${savedBill.patientId}`,

        appointment:
          `APT-${String(savedBill.appointmentId).padStart(4, "0")}`,

        service:
          "Medical Consultation",

        amount:
          savedBill.totalAmount,

        date:
          "20 Sep 2026",

        status:
          savedBill.paymentStatus,

        backendId:
          savedBill.id,

        patientId:
          savedBill.patientId,

        appointmentId:
          savedBill.appointmentId,

        consultationFee:
          savedBill.consultationFee,

        medicineFee:
          savedBill.medicineFee

      };


      setBills((previousBills) => [
        ...previousBills,
        formattedBill
      ]);

      setShowModal(false);

      event.target.reset();

    } catch (error) {

      console.error(
        "Failed to create bill:",
        error
      );

      alert(
        "Failed to create bill"
      );

    }

  };


  // =========================
  // DELETE BILL
  // =========================

  async function handleDeleteBill(bill) {

    const confirmed =
      window.confirm(
        `Delete ${bill.id}?`
      );

    if (!confirmed) {
      return;
    }


    try {

      await deleteBill(
        bill.backendId
      );


      setBills(
        (previousBills) =>
          previousBills.filter(
            (item) =>
              item.backendId !== bill.backendId
          )
      );

      setActiveMenu(null);

    } catch (error) {

      console.error(
        "Failed to delete bill:",
        error
      );

      alert(
        "Failed to delete bill"
      );

    }

  }


  // =========================
  // SUMMARY
  // =========================

  const totalRevenue = bills
    .filter(
      (bill) =>
        bill.status === "Paid"
    )
    .reduce(
      (total, bill) =>
        total + bill.amount,
      0
    );


  const pendingAmount = bills
    .filter(
      (bill) =>
        bill.status === "Pending"
    )
    .reduce(
      (total, bill) =>
        total + bill.amount,
      0
    );


  return (

    <div className="module-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="module-header">

        <div>

          <p className="page-label">
            BILLING SERVICE
          </p>

          <h1>
            Billing & Payments
          </h1>

          <p>
            Generate invoices and manage
            patient payments.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setShowModal(true)
          }
        >

          <Plus size={17} />

          Generate Bill

        </button>

      </div>



      {/* =========================
          SUMMARY
      ========================= */}

      <div className="billing-summary">


        <div className="summary-card">

          <div className="summary-icon green-icon">

            <IndianRupee size={21} />

          </div>

          <div>

            <span>
              Total Revenue
            </span>

            <strong>
              ₹
              {totalRevenue.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>



        <div className="summary-card">

          <div className="summary-icon orange-icon">

            <Clock3 size={21} />

          </div>

          <div>

            <span>
              Pending Amount
            </span>

            <strong>
              ₹
              {pendingAmount.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>



        <div className="summary-card">

          <div className="summary-icon blue-icon">

            <Receipt size={21} />

          </div>

          <div>

            <span>
              Total Invoices
            </span>

            <strong>
              {bills.length}
            </strong>

          </div>

        </div>


      </div>



      {/* =========================
          BILL TABLE
      ========================= */}

      <div className="module-card">


        <div className="table-toolbar">

          <div>

            <h3>
              Invoices
            </h3>

            <p>
              Billing records processed
              by Billing Service
            </p>

          </div>


          <div className="table-search">

            <Search size={16} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search invoices..."
            />

          </div>

        </div>



        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Invoice
                </th>

                <th>
                  Patient
                </th>

                <th>
                  Appointment
                </th>

                <th>
                  Service
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Date
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredBills.map(
                (bill) => (

                  <tr
                    key={bill.backendId}
                  >


                    {/* INVOICE */}

                    <td>

                      <span className="invoice-id">

                        {bill.id}

                      </span>

                    </td>



                    {/* PATIENT */}

                    <td>

                      <strong className="table-primary-text">

                        {bill.patient}

                      </strong>

                    </td>



                    {/* APPOINTMENT */}

                    <td>

                      <span className="appointment-id">

                        {bill.appointment}

                      </span>

                    </td>



                    {/* SERVICE */}

                    <td>

                      {bill.service}

                    </td>



                    {/* AMOUNT */}

                    <td>

                      <strong className="amount">

                        ₹
                        {bill.amount.toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                    </td>



                    {/* DATE */}

                    <td>

                      {bill.date}

                    </td>



                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          bill.status === "Paid"
                            ? "payment-status paid"
                            : "payment-status pending-payment"
                        }
                      >

                        {bill.status === "Paid" ? (

                          <CheckCircle2
                            size={12}
                          />

                        ) : (

                          <Clock3
                            size={12}
                          />

                        )}

                        {bill.status}

                      </span>

                    </td>



                    {/* ACTION */}

                    <td>

                      <div className="invoice-action-wrapper">


                        <button
                          className="invoice-action"
                          onClick={() =>
                            setActiveMenu(
                              activeMenu ===
                                bill.backendId
                                ? null
                                : bill.backendId
                            )
                          }
                        >

                          ⋮

                        </button>



                        {activeMenu ===
                          bill.backendId && (

                          <div className="invoice-action-menu">


                            {/* VIEW */}

                            <button
                              onClick={() => {

                                setSelectedBill(
                                  bill
                                );

                                setActiveMenu(
                                  null
                                );

                              }}
                            >

                              View Invoice

                            </button>



                            {/* EDIT */}

                          <button
  onClick={() => {
    setEditBill(bill);
    setActiveMenu(null);
  }}
>
  Edit Bill
</button>


                            {/* DELETE */}

                            <button
                              onClick={() =>
                                handleDeleteBill(
                                  bill
                                )
                              }
                            >

                              Delete Bill

                            </button>


                          </div>

                        )}

                      </div>

                    </td>


                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>



        <div className="table-footer">

          Showing{" "}
          {filteredBills.length}
          {" "}invoices

        </div>


      </div>



      {/* =========================
          GENERATE BILL MODAL
      ========================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">


            <div className="modal-header">

              <div>

                <h2>
                  Generate Invoice
                </h2>

                <p>
                  Create a bill for
                  a patient consultation.
                </p>

              </div>


              <button
                className="close-button"
                onClick={() =>
                  setShowModal(false)
                }
              >

                <X size={19} />

              </button>

            </div>



            <form
              onSubmit={generateBill}
            >


              <div className="form-grid">


                {/* PATIENT ID */}

                <div className="form-group">

                  <label>
                    Patient ID
                  </label>

                  <input
                    name="patientId"
                    type="number"
                    placeholder="Example: 1"
                    min="1"
                    required
                  />

                </div>



                {/* APPOINTMENT ID */}

                <div className="form-group">

                  <label>
                    Appointment ID
                  </label>

                  <input
                    name="appointmentId"
                    type="number"
                    placeholder="Example: 1"
                    min="1"
                    required
                  />

                </div>



                {/* AMOUNT */}

                <div className="form-group">

                  <label>
                    Consultation Amount
                  </label>

                  <input
                    name="amount"
                    type="number"
                    min="1"
                    placeholder="Enter amount"
                    required
                  />

                </div>


              </div>



              <div className="payment-preview">

                <CreditCard size={17} />

                <div>

                  <strong>
                    Payment will be
                    recorded as Pending
                  </strong>

                  <span>
                    The Billing Service
                    will process the payment.
                  </span>

                </div>

              </div>



              <div className="modal-actions">


                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="primary-button"
                >

                  Generate Invoice

                </button>


              </div>


            </form>

          </div>

        </div>

      )}



      {/* =========================
          VIEW INVOICE MODAL
      ========================= */}

      {selectedBill && (

        <div className="modal-overlay">

          <div className="invoice-modal">


            <div className="invoice-modal-header">

              <div>

                <span className="invoice-label">

                  APEXCARE HEALTHCARE

                </span>

                <h2>
                  Invoice
                </h2>

              </div>


              <button
                className="close-button"
                onClick={() =>
                  setSelectedBill(null)
                }
              >

                <X size={19} />

              </button>

            </div>



            <div className="invoice-details">


              <div className="invoice-info-row">


                <div>

                  <span>
                    Invoice Number
                  </span>

                  <strong>
                    {selectedBill.id}
                  </strong>

                </div>


                <div>

                  <span>
                    Date
                  </span>

                  <strong>
                    {selectedBill.date}
                  </strong>

                </div>


              </div>



              <div className="invoice-section">

                <span>
                  Patient
                </span>

                <strong>
                  {selectedBill.patient}
                </strong>

              </div>



              <div className="invoice-section">

                <span>
                  Appointment
                </span>

                <strong>
                  {selectedBill.appointment}
                </strong>

              </div>



              <div className="invoice-section">

                <span>
                  Service
                </span>

                <strong>
                  {selectedBill.service}
                </strong>

              </div>



              <div className="invoice-amount-row">

                <span>
                  Total Amount
                </span>

                <strong>

                  ₹
                  {selectedBill.amount.toLocaleString(
                    "en-IN"
                  )}

                </strong>

              </div>



              <div className="invoice-payment-row">

                <span>
                  Payment Status
                </span>


                <span
                  className={
                    selectedBill.status === "Paid"
                      ? "payment-status paid"
                      : "payment-status pending-payment"
                  }
                >

                  {selectedBill.status === "Paid" ? (

                    <CheckCircle2
                      size={13}
                    />

                  ) : (

                    <Clock3
                      size={13}
                    />

                  )}

                  {selectedBill.status}

                </span>


              </div>


            </div>



            <div className="invoice-modal-footer">

              <button
                className="secondary-button"
                onClick={() =>
                  setSelectedBill(null)
                }
              >

                Close

              </button>

            </div>


          </div>

        </div>

      )}

      {editBill && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>
                <h2>Edit Invoice</h2>
                <p>
                  Update billing information.
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setEditBill(null)}
              >
                <X size={19} />
              </button>

            </div>


            <form
              onSubmit={async (event) => {

                event.preventDefault();

                const form = new FormData(
                  event.target
                );

                const updatedBill = {

                  patientId:
                    Number(
                      form.get("patientId")
                    ),

                  appointmentId:
                    Number(
                      form.get("appointmentId")
                    ),

                  consultationFee:
                    Number(
                      form.get("amount")
                    ),

                  medicineFee:
                    0,

                  paymentStatus:
                    form.get("paymentStatus")

                };


                try {

                  const updated =
                    await updateBill(
                      editBill.backendId,
                      updatedBill
                    );


                  setBills(
                    (previousBills) =>
                      previousBills.map(
                        (bill) =>
                          bill.backendId ===
                          editBill.backendId
                            ? {
                                ...bill,

                                patient:
                                  `Patient ${updated.patientId}`,

                                appointment:
                                  `APT-${String(
                                    updated.appointmentId
                                  ).padStart(
                                    4,
                                    "0"
                                  )}`,

                                amount:
                                  updated.totalAmount,

                                status:
                                  updated.paymentStatus,

                                patientId:
                                  updated.patientId,

                                appointmentId:
                                  updated.appointmentId,

                                consultationFee:
                                  updated.consultationFee,

                                medicineFee:
                                  updated.medicineFee

                              }
                            : bill
                      )
                  );


                  setEditBill(null);

                } catch (error) {

                  console.error(
                    "Failed to update bill:",
                    error
                  );

                  alert(
                    "Failed to update bill"
                  );

                }

              }}
            >

              <div className="form-grid">


                <div className="form-group">

                  <label>
                    Patient ID
                  </label>

                  <input
                    name="patientId"
                    type="number"
                    min="1"
                    defaultValue={
                      editBill.patientId
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Appointment ID
                  </label>

                  <input
                    name="appointmentId"
                    type="number"
                    min="1"
                    defaultValue={
                      editBill.appointmentId
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Consultation Amount
                  </label>

                  <input
                    name="amount"
                    type="number"
                    min="0"
                    defaultValue={
                      editBill.consultationFee
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Payment Status
                  </label>

                  <select
                    name="paymentStatus"
                    defaultValue={
                      editBill.status
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Paid">
                      Paid
                    </option>

                  </select>

                </div>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setEditBill(null)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="primary-button"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </div>

  );

}


export default Billing;