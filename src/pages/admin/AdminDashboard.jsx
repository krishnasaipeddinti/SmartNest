import { Users, BedDouble, Wallet, FileWarning, Bell, ClipboardCheck, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import StatCard from "../../components/common/StatCard";
import {
  getStudents,
  getRooms,
  getFees,
  getComplaints,
  getNotices,
  getLeaves,
  getFoodMenu,
} from "../../utils/auth";

const AdminDashboard = () => {
  const students = getStudents();
  const rooms = getRooms();
  const fees = getFees();
  const complaints = getComplaints();
  const notices = getNotices();
  const leaves = getLeaves();
  const foodMenu = getFoodMenu();

  const cards = [
    { icon: Users, label: "Students", value: students.length, hint: "Manage students", to: "/admin/students" },
    { icon: BedDouble, label: "Rooms", value: rooms.length, hint: "Manage rooms", to: "/admin/rooms" },
    { icon: Wallet, label: "Fees", value: fees.length, hint: "Manage fees", to: "/admin/fees" },
    { icon: FileWarning, label: "Complaints", value: complaints.length, hint: "Manage complaints", to: "/admin/complaints" },
    { icon: Bell, label: "Notices", value: notices.length, hint: "Manage notices", to: "/admin/notices" },
    { icon: ClipboardCheck, label: "Leaves", value: leaves.length, hint: "Manage leave requests", to: "/admin/leaves" },
    { icon: UtensilsCrossed, label: "Food Menu", value: foodMenu.length, hint: "Edit weekly menu", to: "/admin/food-menu" },
  ];

  return (
    <PageShell title="Admin Dashboard" subtitle="Complete hostel management overview.">
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

export default AdminDashboard;