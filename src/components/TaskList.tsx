// import React, { useState } from 'react';
// import { Search, ArrowLeft, Calendar, Tag, User, Hash, CheckCircle, Clock, AlertCircle, List } from 'lucide-react';
// import { Task, User as UserType } from '../App';

// interface TaskListProps {
//   tasks: Task[];
//   users: UserType[];
//   onBack: () => void;
//   onUpdateTask: (updatedTask: Task) => void;
//   TaskCard: React.FC<{
//     task: Task;
//     onClose: () => void;
//     users: UserType[];
//     onUpdateTask: (updatedTask: Task) => void;
//   }>;
// }

// const TaskList: React.FC<TaskListProps> = ({ tasks, users, onUpdateTask, TaskCard, onBack }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

//   const filteredTasks = tasks.filter(task =>
//     task.assignedLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     task.taskLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     task.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     task.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getPriorityColor = (priority: string) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return 'bg-red-500/20 text-red-400 border-red-500/30';
//       case 'medium':
//         return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
//       case 'low':
//         return 'bg-green-500/20 text-green-400 border-green-500/30';
//       default:
//         return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
//     }
//   };

//   const getPriorityIcon = (priority: string) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return <AlertCircle className="w-4 h-4" />;
//       case 'medium':
//         return <Clock className="w-4 h-4" />;
//       case 'low':
//         return <CheckCircle className="w-4 h-4" />;
//       default:
//         return <Hash className="w-4 h-4" />;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     const statusLower = status.toLowerCase();
//     if (statusLower.includes('complete') || statusLower.includes('done')) {
//       return 'bg-green-500/20 text-green-400 border-green-500/30';
//     } else if (statusLower.includes('progress') || statusLower.includes('working')) {
//       return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
//     } else if (statusLower.includes('pending') || statusLower.includes('waiting')) {
//       return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
//     }
//     return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={onBack}
//                 className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <List className="w-5 h-5 text-white" />
//               </div>
//               <h1 className="text-3xl font-bold text-white">Task List</h1>
//             </div>
//           </div>
//           <p className="text-slate-400">Manage and track all created tasks</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
//                 <List className="w-5 h-5 text-blue-400" />
//               </div>
//               <div>
//                 <p className="text-xl font-bold text-white">{tasks.length}</p>
//                 <p className="text-slate-400 text-sm">Total Tasks</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
//                 <CheckCircle className="w-5 h-5 text-green-400" />
//               </div>
//               <div>
//                 <p className="text-xl font-bold text-white">
//                   {tasks.filter(t => t.statusLabel.toLowerCase().includes('complete') ).length}
//                 </p>
//                 <p className="text-slate-400 text-sm">Completed</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
//                 <Clock className="w-5 h-5 text-yellow-400" />
//               </div>
//               <div>
//                 <p className="text-xl font-bold text-white">
//                   {tasks.filter(t => t.statusLabel.toLowerCase().includes('progress') && t.statusLabel.toLowerCase() !=="completed").length}
//                 </p>
//                 <p className="text-slate-400 text-sm">In Progress</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
//                 <AlertCircle className="w-5 h-5 text-red-400" />
//               </div>
//               <div>
//                 <p className="text-xl font-bold text-white">
//                   {tasks.filter(t => t.priority === 'High' && t.statusLabel.toLowerCase() !=="completed" ).length}
//                 </p>
//                 <p className="text-slate-400 text-sm">High Priority</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Task Table */}
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg">
//           {/* Table Header */}
//           <div className="p-6 border-b border-slate-700">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
//               <h2 className="text-xl font-semibold text-white">All Tasks</h2>

//               {/* Search Bar */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search tasks..."
//                   className="pl-11 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-80"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             {filteredTasks.length > 0 ? (
//               <table className="w-full">
//                 <thead className="bg-slate-700/30">
//                   <tr>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                       Task ID
//                     </th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                       Task Label
//                     </th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                       Assigned To
//                     </th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                       Priority
//                     </th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                       Module
//                     </th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                       Dates
//                     </th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
//                       Created Info
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-700">
//                   {filteredTasks.map((task) => (
//                     <tr key={task.id} className="hover:bg-slate-700/20 transition-colors duration-150">

//                       <td className="px-6 py-4 whitespace-nowrap text-left">
//                         <div className="inline-flex items-center space-x-2" onClick={() => setSelectedTask(task)} style={{ cursor: 'pointer' }}>
//                           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                             <span className="text-sm font-medium text-white">
//                               {task.taskId.slice(-3)}
//                             </span>
//                           </div>
//                           <span className="text-sm text-white max-w-[150px] truncate block">
//                             {task.taskId}
//                           </span>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 text-center">
//                         <div className="text-sm text-white font-medium">
//                           {task.taskLabel.length > 12 
//                             ? task.taskLabel.substring(0, 12) + "..."
//                             : task.taskLabel
//                           }
//                         </div>
//                         <div className="text-xs text-slate-400 mt-1">{task.project}</div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-left">
//                         <div className="inline-flex items-center space-x-2">
//                           <User className="w-4 h-4 text-slate-400" />
//                           <span className="text-sm text-slate-300">{task.assignedLabel}</span>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-center">
//                         <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}>
//                           {getPriorityIcon(task.priority)}
//                           <span>{task.priority}</span>
//                         </span>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-center">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(task.statusLabel)}`}>
//                           {task.statusLabel}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-center">
//                         <span className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
//                           <Tag className="w-3 h-3" />
//                           <span>{task.module}</span>
//                         </span>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-center">
//                         <div className="inline-flex items-center space-x-1 text-xs text-slate-400">
//                           <Calendar className="w-3 h-3" />
//                           <span className={!task.startDate ? 'italic text-slate-500' : ''}>
//                             {task.startDate || 'Yet to start'}
//                           </span>
//                           <span>→</span>
//                           <span className={!task.endDate ? 'italic text-slate-500' : ''}>
//                             {task.endDate || 'Not set'}
//                           </span>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-center">
//                         <div className="inline-flex flex-col items-start">
//                           <div className="flex items-center space-x-1">
//                             <User className="w-3 h-3 text-slate-400" />
//                             <span className="text-sm font-medium text-slate-200 ">{task.createdBy}</span>
//                           </div>
//                           <div className="flex items-center space-x-1 mt-1">
//                             <Calendar className="w-3 h-3 text-slate-400" />
//                             <span className="text-xs text-slate-400">{ task.createdAt }</span>
//                           </div>
//                         </div>
//                       </td>

//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="px-6 py-12 text-center">
//                 <div className="text-slate-400">
//                   <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                   <p className="text-lg font-medium">No tasks found</p>
//                   <p className="text-sm">
//                     {tasks.length === 0
//                       ? 'No tasks have been created yet'
//                       : 'Try adjusting your search criteria'
//                     }
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* TaskCard */}
//           {selectedTask && <TaskCard
//             task={selectedTask}
//             users={users}
//             onUpdateTask={(updatedTask) => {
//               onUpdateTask(updatedTask);
//               setSelectedTask(null);
//             }}
//             onClose={() => setSelectedTask(null)}
//           />}

//           {/* Table Footer */}
//           {filteredTasks.length > 0 && (
//             <div className="p-6 border-t border-slate-700 bg-slate-700/20">
//               <p className="text-sm text-slate-400 text-center">
//                 Showing {filteredTasks.length} of {tasks.length} tasks
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskList;

import React, { useState } from 'react';
import { Search, ArrowLeft, Calendar, Tag, User, Hash, CheckCircle, Clock, AlertCircle, List } from 'lucide-react';
import { Task, User as UserType } from '../App';

interface TaskListProps {
  tasks: Task[];
  users: UserType[];
  onBack: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  TaskCard: React.FC<{
    task: Task;
    onClose: () => void;
    users: UserType[];
    onUpdateTask: (updatedTask: Task) => void;
  }>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, users, onUpdateTask, TaskCard, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter(task =>
    task.assignedLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.taskLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('complete')) {
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    } else if (statusLower.includes('progress')) {
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    } else if (statusLower.includes('pending')) {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  // const getAcceptanceColor = (acceptance: boolean) => {
  //   if (acceptance) {
  //     return 'bg-green-500/20 text-green-400 border-green-500/30';
  //   }
  //   return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  // };

  // const getAcceptanceIcon = (acceptance: boolean) => {
  //   if (acceptance) {
  //     return <CheckCircle className="w-4 h-4" />;
  //   }
  //   return <Clock className="w-4 h-4" />;
  // };

  return (
    <div className="min-h-screen p-6">
      {/* MODIFIED: Changed max-w-7xl mx-auto to w-full to prevent horizontal scroll */}
      <div className="max-w-7xl mx-auto" >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <List className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Task List</h1>
            </div>
          </div>
          <p className="text-slate-400">Manage and track all created tasks</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-4 mb-8">

          {/* Total Tasks */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <List className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{tasks.length}</p>
                <p className="text-slate-400 text-sm">Total Tasks</p>
              </div>
            </div>
          </div>

          {/* Yet to Start */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {tasks.filter(t => !t.startDate || t.startDate.trim() === '').length}
                </p>
                <p className="text-slate-400 text-sm">Yet to Start</p>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {tasks.filter(t =>
                    t.statusLabel.toLowerCase().includes('progress')
                  ).length}
                </p>
                <p className="text-slate-400 text-sm">In Progress</p>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {tasks.filter(t => t.statusLabel.toLowerCase().includes('complete')).length}
                </p>
                <p className="text-slate-400 text-sm">Completed</p>
              </div>
            </div>
          </div>

          {/* Accepted */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {tasks.filter(t => t.acceptance === 'Accepct').length}
                </p>
                <p className="text-slate-400 text-sm">Accepted</p>
              </div>
            </div>
          </div>

          {/* On Hold */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {tasks.filter(t => t.statusLabel.toLowerCase().includes('hold')).length}
                </p>
                <p className="text-slate-400 text-sm">On Hold</p>
              </div>
            </div>
          </div>

          {/* Revised Tasks */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {tasks.filter(t => t.revicedEndDate && t.revicedEndDate.trim() !== '').length}
                </p>
                <p className="text-slate-400 text-sm">Revised Date</p>
              </div>
            </div>
          </div>

          {/* High Priority */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {tasks.filter(t =>
                    t.priority === 'High' &&
                    !t.statusLabel.toLowerCase().includes('complete')
                  ).length}
                </p>
                <p className="text-slate-400 text-sm">High Priority</p>
              </div>
            </div>
          </div>
        </div>


        {/* Task Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg">
          {/* Table Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold text-white">All Tasks</h2>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks..."
                  className="pl-11 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-80"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filteredTasks.length > 0 ? (
              <table className="w-full">
                <thead className="bg-slate-700/30">
                  <tr>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Task ID
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Task Label
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Module
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Created Info
                    </th>
                    {/* MODIFIED: Moved Acceptance column to the end */}
                    {/* <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Acceptance
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-700/20 transition-colors duration-150"onClick={() => setSelectedTask(task)} style={{ cursor: 'pointer' }}>

                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="inline-flex items-center space-x-2" >
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {task.taskId.slice(-3)}
                            </span>
                          </div>
                          <span className="text-sm text-white max-w-[150px] truncate block">
                            {task.taskId}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="text-sm text-white font-medium">
                          {task.taskLabel.length > 12
                            ? task.taskLabel.substring(0, 12) + "..."
                            : task.taskLabel
                          }
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{task.project}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="inline-flex items-center space-x-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{task.assignedLabel}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}>
                          {getPriorityIcon(task.priority)}
                          <span>{task.priority}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(task.statusLabel)}`}>
                          {task.statusLabel}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          <Tag className="w-3 h-3" />
                          <span>{task.module}</span>
                        </span>
                      </td>

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

                      {/* MODIFIED: Moved Acceptance cell to the end */}
                      {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full border ${getAcceptanceColor(task.acceptance)}`}>
                          {getAcceptanceIcon(task.acceptance)}
                          <span>{task.acceptance ? 'Accepted' : 'Pending'}</span>
                        </span>
                      </td> */}

                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="text-slate-400">
                  <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No tasks found</p>
                  <p className="text-sm">
                    {tasks.length === 0
                      ? 'No tasks have been created yet'
                      : 'Try adjusting your search criteria'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* TaskCard */}
          {selectedTask && <TaskCard
            task={selectedTask}
            users={users}
            onUpdateTask={(updatedTask) => {
              onUpdateTask(updatedTask);
              setSelectedTask(null);
            }}
            onClose={() => setSelectedTask(null)}
          />}

          {/* Table Footer */}
          {filteredTasks.length > 0 && (
            <div className="p-6 border-t border-slate-700 bg-slate-700/20">
              <p className="text-sm text-slate-400 text-center">
                Showing {filteredTasks.length} of {tasks.length} tasks
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;