import {
  FaCalendarCheck,
  FaExclamationCircle,
  FaUserFriends,
  FaChartLine,
} from "react-icons/fa";

export default function StatsCards({ contadores, userData }) {
  const stats = [
    {
      title: "Eventos Concluídos",
      value: contadores.concluidos,
      icon: <FaCalendarCheck size={24} className="text-green-400" />,
      description: "Seus eventos finalizados.",
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      valueColor: "text-green-600",
    },
    {
      title: "Eventos Pendentes",
      value: contadores.pendentes,
      icon: <FaExclamationCircle size={24} className="text-red-400" />,
      description: "Aguardando conclusão.",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      valueColor: "text-red-600",
    },
    userData?.tipo === "ADM_MASTER" && {
      title: "Eventos (Outros)",
      value: contadores.outrosUsuarios,
      icon: <FaUserFriends size={24} className="text-yellow-400" />,
      description: "De outros colaboradores.",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      valueColor: "text-yellow-600",
    },
    {
      title: "Total de Eventos",
      value: contadores.todos,
      icon: <FaChartLine size={24} className="text-blue-400" />,
      description: "Todos os cadastrados.",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      valueColor: "text-blue-600",
    },
  ].filter(Boolean); // Remove o item "false" se o usuário não for ADM

  return (
    <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bg} p-5 rounded-xl shadow-md border ${stat.border}`}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className={`text-md font-semibold ${stat.text}`}>{stat.title}</h4>
            {stat.icon}
          </div>
          <p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
          <p className={`text-xs ${stat.valueColor} mt-1`}>{stat.description}</p>
        </div>
      ))}
    </section>
  );
}
