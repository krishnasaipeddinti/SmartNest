import { useEffect, useState } from "react";
import { BedDouble, UserCircle2, Wallet, ClipboardCheck } from "lucide-react";
import PageShell from "../../components/common/PageShell";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../context/AuthContext";
import { getRoomsApi, getMyFeeApi } from "../../services/hostelApi";
import { updateStudentProfile } from "../../utils/appData";

const StudentDashboard = () => {
  const { user, refreshUser } = useAuth();
  const [localUser, setLocalUser] = useState(user || null);
  const [rooms, setRooms] = useState([]);
  const [currentFee, setCurrentFee] = useState(null);

  const loadData = async () => {
    try {
      const latestUser = await refreshUser();
      setLocalUser(latestUser || user || null);

      const [roomsData, feeData] = await Promise.all([
        getRoomsApi(),
        getMyFeeApi(),
      ]);

      setRooms(Array.isArray(roomsData) ? roomsData : []);
      setCurrentFee(feeData || null);
    } catch (error) {
      console.error("Dashboard sync failed:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const allottedRoom = rooms.find((room) => room.roomNo === localUser?.room);

  const totalFee =
    Number(currentFee?.amount) ||
    Number(allottedRoom?.monthlyFee) ||
    0;

  const paidAmount = Number(currentFee?.paidAmount || 0);
  const remainingFee = Math.max(0, totalFee - paidAmount);

  const remainingFeeDisplay = remainingFee === 0 ? "No Due" : `₹${remainingFee}`;
  const feeStatusDisplay =
    remainingFee === 0 && totalFee > 0
      ? "Paid"
      : currentFee?.status || (totalFee > 0 ? "Pending" : "Not Assigned");

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: localUser?.name || "",
    phone: localUser?.phone || "",
    course: localUser?.course || "",
    year: localUser?.year || "",
    parentContact: localUser?.parentContact || "",
  });

  useEffect(() => {
    setForm({
      name: localUser?.name || "",
      phone: localUser?.phone || "",
      course: localUser?.course || "",
      year: localUser?.year || "",
      parentContact: localUser?.parentContact || "",
    });
  }, [localUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateStudentProfile(localUser.id, form);
    const latestUser = await refreshUser();
    setLocalUser(latestUser || localUser);
    setIsEditing(false);
  };

  return (
    <PageShell
      title="Student Dashboard"
      subtitle="Your allotted room, details, and fee summary."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={UserCircle2}
          label="Student"
          value={localUser?.name || "-"}
          hint="Logged in student"
        />
        <StatCard
          icon={BedDouble}
          label="Room"
          value={localUser?.room || "Not Allotted"}
          hint="Allocated room number"
        />
        <StatCard
          icon={Wallet}
          label="Total Fee"
          value={totalFee ? `₹${totalFee}` : "Not Assigned"}
          hint="Based on allotted room"
        />
        <StatCard
          icon={ClipboardCheck}
          label="Remaining Fee"
          value={remainingFeeDisplay}
          hint={remainingFee === 0 ? "No pending hostel fee" : "Pending hostel fee"}
        />
      </div>

      <div className="glass mt-6 rounded-3xl p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">My Details</h3>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cancel" : "Edit Details"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              className="input"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Course"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />
            <input
              className="input md:col-span-2"
              placeholder="Parent Contact"
              value={form.parentContact}
              onChange={(e) => setForm({ ...form, parentContact: e.target.value })}
              required
            />
            <button className="btn-primary md:col-span-2" type="submit">
              Save Details
            </button>
          </form>
        ) : (
          <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
            <p><span className="font-semibold text-white">Name:</span> {localUser?.name}</p>
            <p><span className="font-semibold text-white">Email:</span> {localUser?.email}</p>
            <p><span className="font-semibold text-white">Phone:</span> {localUser?.phone}</p>
            <p><span className="font-semibold text-white">Course:</span> {localUser?.course || "-"}</p>
            <p><span className="font-semibold text-white">Year:</span> {localUser?.year || "-"}</p>
            <p><span className="font-semibold text-white">Parent Contact:</span> {localUser?.parentContact || "-"}</p>
            <p><span className="font-semibold text-white">Room Number:</span> {localUser?.room || "Not Allotted"}</p>
            <p><span className="font-semibold text-white">Hostel Block:</span> {localUser?.hostelBlock || "-"}</p>
          </div>
        )}
      </div>

      {totalFee ? (
        <div className="glass mt-6 rounded-3xl p-5 shadow-2xl">
          <h3 className="text-lg font-semibold text-white">Fee Summary</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
            <p><span className="font-semibold text-white">Total Fee:</span> ₹{totalFee}</p>
            <p><span className="font-semibold text-white">Paid:</span> ₹{paidAmount}</p>
            <p><span className="font-semibold text-white">Status:</span> {feeStatusDisplay}</p>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
};

export default StudentDashboard;