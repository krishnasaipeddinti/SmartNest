import { useState } from "react";
import PageShell from "../../components/common/PageShell";
import { getFees } from "../../utils/auth";
import { updateFeeStatus } from "../../utils/appData";

const WardenFeesPage = () => {
  const [fees, setFees] = useState(getFees());

  const handleStatusChange = (id, status) => {
    const updatedFees = updateFeeStatus(id, status);
    setFees(updatedFees);
  };

  return (
    <PageShell
      title="Fees Access"
      subtitle="Review student fee records and update payment status."
    >
      <div className="space-y-4">
        {fees.length > 0 ? (
          fees.map((fee) => (
            <div key={fee.id} className="glass rounded-3xl p-5 shadow-2xl">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {fee.studentName}
                  </h3>
                  <div className="mt-3 space-y-1 text-sm text-slate-300">
                    <p>Student ID: {fee.studentId}</p>
                    <p>Amount: ₹{fee.amount}</p>
                    <p>Due Date: {fee.dueDate}</p>
                  </div>
                  <div className="mt-4">
                    <span className="badge">{fee.status}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="btn-secondary"
                    onClick={() => handleStatusChange(fee.id, "Pending")}
                  >
                    Mark Pending
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleStatusChange(fee.id, "Paid")}
                  >
                    Mark Paid
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass rounded-3xl p-8 text-center text-slate-400 shadow-2xl">
            No fee records available.
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default WardenFeesPage;