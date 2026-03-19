import { useState } from "react";
import PageShell from "../../components/common/PageShell";
import { getFees } from "../../utils/auth";
import { updateFeeStatus } from "../../utils/appData";

const FeesManagementPage = () => {
  const [fees, setFees] = useState(getFees());

  const handleStatus = (id, status) => {
    setFees(updateFeeStatus(id, status));
  };

  return (
    <PageShell title="Fees Management" subtitle="Review and update fee payment status.">
      <div className="space-y-4">
        {fees.map((fee) => (
          <div key={fee.id} className="glass rounded-3xl p-5 shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{fee.studentName}</h3>
                <p className="mt-2 text-slate-400">Amount: ₹{fee.amount}</p>
                <p className="text-slate-400">Due Date: {fee.dueDate}</p>
                <span className="badge mt-3">{fee.status}</span>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary" onClick={() => handleStatus(fee.id, "Pending")}>Pending</button>
                <button className="btn-secondary" onClick={() => handleStatus(fee.id, "Paid")}>Paid</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export default FeesManagementPage;