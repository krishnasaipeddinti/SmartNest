import { Users, BedDouble, ClipboardCheck, Bell, Wallet, FileWarning, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import StatCard from "../../components/common/StatCard";
import {
  getStudents,
  getRooms,
  getLeaves,
  getNotices,
  getFees,
  getComplaints,
  getFoodMenu,
} from "../../utils/auth";

const WardenDashboard = () => {
  const students = getStudents();
  const rooms = getRooms();
  const leaves = getLeaves();
  const notices = getNotices();
  const fees = getFees();
  const complaints = getComplaints();
  const foodMenu = getFoodMenu();

  const cards = [
    { icon: Users, label: "Students", value: students.length, hint: "View students", to: "/warden/students" },
    { icon: BedDouble, label: "Rooms", value: rooms.length, hint: "Room availability", to: "/warden/rooms" },
    { icon: Wallet, label: "Fees", value: fees.length, hint: "Fee records", to: "/warden/fees" },
    { icon: ClipboardCheck, label: "Leaves", value: leaves.length, hint: "Leave approvals", to: "/warden/leaves" },
    { icon: Bell, label: "Notices", value: notices.length, hint: "Add notices", to: "/warden/notices" },
    { icon: FileWarning, label: "Complaints", value: complaints.length, hint: "Resolve complaints", to: "/warden/complaints" },
    { icon: UtensilsCrossed, label: "Food Menu", value: foodMenu.length, hint: "Edit weekly menu", to: "/warden/food-menu" },
  ];

  return (
    <PageShell title="Warden Dashboard" subtitle="Operational control for hostel supervision.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} to={card.to}>
            <StatCard icon={card.icon} label={card.label} value={card.value} hint={card.hint} />
          </Link>
        ))}
      </div>
    </PageShell>
  );
};

export default WardenDashboard;