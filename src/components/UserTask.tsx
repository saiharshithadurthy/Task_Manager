import React, { useMemo, useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  List,
  Search,
  AlertCircle,
  Hash,
  LucideUserRoundCheck,
  SunMediumIcon,
  SunDim,
  Pause,
  Calendar
} from "lucide-react";
import { Task, User as user } from "../App";
import UserTaskCard from "./UserTaskCard";

interface UserTaskScreenProps {
  currentUser: user;
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;

}

const UserTaskScreen: React.FC<UserTaskScreenProps> = ({ currentUser, tasks, onUpdateTask }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { userTasks, stats } = useMemo(() => {
    const filtered = tasks.filter(
      (task) =>
        task.assignedLabel.toLowerCase() === currentUser.username.toLowerCase() ||
        task.assignedLabel === currentUser.employeeId
    );

    const total = filtered.length;
    const completed = filtered.filter((t) => t.statusLabel.toLowerCase() === "completed").length;
    const pending = total - completed;
    const high = filtered.filter((t) => t.priority === "High" && t.statusLabel.toLowerCase() != "completed").length;
    const medium = filtered.filter((t) => t.priority === "Medium" && t.statusLabel.toLowerCase() != "completed").length;
    const low = filtered.filter((t) => t.priority === "Low" && t.statusLabel.toLowerCase() != "completed").length;
    const acceptance = filtered.filter((t) => t.acceptance==="Accepct" && t.statusLabel.toLowerCase() != "completed").length;
    const yetToacceptance = filtered.filter((t) => t.acceptance!=="Accepct" && t.statusLabel.toLowerCase() != "completed").length;
    const onhold = filtered.filter((t) => t.statusLabel === "Hold" && t.statusLabel.toLowerCase() != "completed").length;
    const revicedEndDate = filtered.filter((t) => t.endDate < new Date().toISOString().split('T')[0].split('-').reverse().join('-') && t.statusLabel.toLowerCase() != "completed").length;

    return {
      userTasks: filtered,
      stats: { total, completed, pending, high, medium, low, acceptance, yetToacceptance, onhold, revicedEndDate },
    };
  }, [tasks, currentUser]);

  // Search within user's tasks
  const filteredTasks = userTasks.filter(
    (task) =>
      task.assignedLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Priority & Status color/icon helpers
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return <AlertCircle className="w-4 h-4" />;
      case "medium":
        return <Clock className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("complete") || statusLower.includes("done")) {
      return "bg-green-500/20 text-green-400 border-green-500/30";
    } else if (statusLower.includes("progress") || statusLower.includes("working")) {
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    } else if (statusLower.includes("pending") || statusLower.includes("waiting")) {
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
    return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${currentUser.status? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-red-500 to-rose-600"}`}>
              <User className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              {currentUser.username}'s Tasks
            </h1>
          </div>
          <p className="text-slate-400">Track your assigned tasks and progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: List, label: "Total Tasks", color: "blue", value: stats.total },
            { icon: CheckCircle, label: "Completed", color: "green", value: stats.completed },
            { icon: Clock, label: "Pending", color: "yellow", value: stats.pending },
            { icon: AlertTriangle, label: "High Priority", color: "red", value: stats.high },
            { icon: SunMediumIcon, label: "Medium Priority", color: "orange", value: stats.medium },
            { icon: SunDim, label: "Low Priority", color: "green", value: stats.low },
            { icon: LucideUserRoundCheck, label: "Accepted", color: "green", value: stats.acceptance },
            { icon: AlertCircle, label: "Yet to Accept", color: "yellow", value: stats.yetToacceptance },
            { icon: Pause, label: "On Hold", color: "blue", value: stats.onhold },
            { icon: Calendar, label: "Revised End Date", color: "red", value: stats.revicedEndDate },


          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg hover:scale-[1.01] transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 bg-${item.color}-500/20 rounded-xl flex items-center justify-center`}
                >
                  <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Task Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">My Tasks</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="pl-11 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredTasks.length > 0 ? (
              <table className="w-full text-center">
                <thead className="bg-slate-700/30">
                  <tr>
                    {[
                      "Sr No",
                      "Task ID",
                      "Task Label",
                      "Project",
                      "Priority",
                      "Status",
                      "Acceptance",
                      "Dates",
                      "Created Info",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-sm font-semibold text-slate-300 uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {filteredTasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className="hover:bg-slate-700/20 transition-all duration-150"
                      onClick={() => setSelectedTask(task)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/*Sr No*/}
                      <td className="px-6 py-4 text-sm text-slate-300">{index + 1}</td>
                      {/*Task ID*/}
                      <td className="px-6 py-4 whitespace-nowrap"  >
                        <div className="flex items-center space-x-2" >
                          {/* Small colored box with last 3 digits */}
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {task.taskId.slice(-3)} {/*last 3 digits only*/}
                            </span>
                          </div>
                          {/*Full Task ID beside it, truncated if too long*/}
                          <span className="text-sm text-white max-w-[150px] truncate block">
                            {task.taskId}
                          </span>
                        </div>
                      </td>
                      {/*Task Label*/}
                      <td className="px-6 py-4 text-sm text-slate-300">{task.taskLabel.substring(0, 5) + "...."}</td>

                      {/*Project*/}
                      <td className="px-6 py-4 text-sm text-slate-300">{task.project}</td>
                      {/*Priority*/}
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full font-semibold border ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {getPriorityIcon(task.priority)} {task.priority}
                        </span>
                      </td>
                      {/*Status*/}
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full font-semibold border ${getStatusColor(
                            task.statusLabel
                          )}`}
                        >
                          {task.statusLabel}
                        </span>
                      </td>
                      {/*Acceptance*/}
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full font-semibold border ${task.acceptance ==="Accepted"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                            }`}
                        >
                          {task.acceptance ==="Accepted" ? "Accepted" : "Pending"}
                        </span>
                      </td>
                      {/*Dates*/}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex items-center space-x-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span className={!task.startDate ? 'italic text-slate-500' : ''}>
                            {task.startDate || 'Yet to start'}
                          </span>
                          <span>→</span>
                          <span className={!task.endDate ? 'italic text-slate-500' : ''}>
                            {task.endDate || 'Not set'}
                          </span>
                        </div>
                      </td>
                      {/*Created Info*/}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex flex-col items-start">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3 text-slate-400" />
                            <span className="text-sm font-medium text-slate-200 ">{task.createdBy}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-400">{task.createdAt}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-12 text-center text-slate-400">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-400 opacity-70" />
                <p className="text-lg font-medium">No tasks assigned or matching your search.</p>
              </div>
            )}

            {selectedTask && (
              <UserTaskCard
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
                onUpdateTask={(updatedTask: Task) => {
                  onUpdateTask(updatedTask);
                  setSelectedTask(null);
                }}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTaskScreen;
