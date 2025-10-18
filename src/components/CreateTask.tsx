import React, { useState } from 'react';
import { Plus, List, ArrowLeft } from 'lucide-react';
// import { Plus, List, Calendar, Tag, Settings, ArrowLeft } from 'lucide-react';
import { Task, User as UserType } from '../App';
// import axios from 'axios';

interface CreateTaskProps {
  currentUser: { employeeId: string; username: string };
  users: UserType[];
  onSubmit: (task: Task) => void;
  onShowList: () => void;
  onCancel: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ currentUser, users, onSubmit, onShowList, onCancel }) => {
  const [formData, setFormData] = useState({
    id:'',
    assignedLabel: '',
    module: 'HES' as 'UHES' | 'HES',
    project: 'AMI_PROD' as 'AMI_PROD' | 'AMI_TEST',
    taskLabel: '',
    crBugIdLabel: '',
    statusLabel: 'Yet to Start',
    startDate: 'Yet to Start',
    endDate: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    createdAt: new Date().toISOString().split('T')[0].split('-').reverse().join('-'),
    acceptance: 'Pending',
    remarks: '',
    revicedEndDate: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const generateTaskId = (module: 'UHES' | 'HES'): string => {
    const randomNum = Math.floor(Math.random() * 1000) + 1;
    return `${module}_TASK_${randomNum}`;
  };

  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  };

  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: { [key: string]: string } = {};


    if (!formData.assignedLabel) newErrors.assignedLabel = 'Assigned Label is required';
    if (!formData.taskLabel) newErrors.taskLabel = 'Task Label is required';
    if (!formData.crBugIdLabel) newErrors.crBugIdLabel = 'CR Bug ID Label is required';
    if (!formData.endDate) newErrors.endDate = 'End Date is required';

    // Date validation
    if (formData.endDate) {
      const startDateParts = formData.startDate.split('-');
      const endDateParts = formData.endDate.split('-');

      const startDate = new Date(parseInt(startDateParts[2]), parseInt(startDateParts[1]) - 1, parseInt(startDateParts[0]));
      const endDate = new Date(parseInt(endDateParts[2]), parseInt(endDateParts[1]) - 1, parseInt(endDateParts[0]));

      if (endDate < startDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newTask: Task = {
      id:crypto.randomUUID(),
      assignedLabel: formData.assignedLabel,
      module: formData.module,
      taskId: generateTaskId(formData.module),
      project: formData.project,
      taskLabel: formData.taskLabel,
      crBugIdLabel: formData.crBugIdLabel,
      statusLabel: formData.statusLabel,
      startDate: formData.startDate,
      endDate: formData.endDate,
      priority: formData.priority,
      createdBy: currentUser.employeeId,
      createdAt: formData.createdAt,
      acceptance: formData.acceptance,
      remarks: formData.remarks,
      revicedEndDate: formData.revicedEndDate
    };
    console.log(currentUser);

    onSubmit(newTask);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'endDate') {
      const formattedDate = formatDateForDisplay(value);
      setFormData(prev => ({ ...prev, [name]: formattedDate }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={onCancel}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Create New Task</h1>
            </div>
          </div>
          <p className="text-slate-400">Create and assign tasks to team members</p>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-lg">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


              {/* Task ID (Read-only, auto-generated) */}
              <div>
                <label htmlFor="taskId" className="block text-sm font-medium text-slate-300 mb-2">
                  Task ID (Auto-generated)
                </label>
                <input
                  type="text"
                  id="taskId"
                  value={generateTaskId(formData.module)}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                />
              </div>

              {/* assignedLabel */}
              <div>
                <label htmlFor="assignedLabel" className="block text-sm font-medium text-slate-300 mb-2">
                  Assigned Label <span className="text-red-400">*</span>
                </label>
                <select
                  name="assignedLabel"
                  value={formData.assignedLabel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Select User</option>
                  {users.filter(u => u.status).map(u => (
                    <option key={u.employeeId} value={u.username}>{u.username}</option>
                  ))}
                </select>
                {errors.assignedLabel && <p className="mt-2 text-sm text-red-400">{errors.assignedLabel}</p>}
              </div>

              {/* Module */}
              <div>
                <label htmlFor="module" className="block text-sm font-medium text-slate-300 mb-2">
                  Module
                </label>
                <select
                  id="module"
                  name="module"
                  value={formData.module}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="HES">HES</option>
                  <option value="UHES">UHES</option>
                </select>
              </div>



              {/* Project */}
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-slate-300 mb-2">
                  Project
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="AMI_PROD">AMI_PROD</option>
                  <option value="AMI_TEST">AMI_TEST</option>
                </select>
              </div>

              {/* Task Labe */}
              {/* <div>
                <label htmlFor="taskLabel" className="block text-sm font-medium text-slate-300 mb-2">
                  Task Label <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="taskLabel"
                  name="taskLabel"
                  value={formData.taskLabel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.taskLabel ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  placeholder="Enter task label"
                />
                {errors.taskLabel && <p className="mt-2 text-sm text-red-400">{errors.taskLabel}</p>}
              </div>*/}




              {/* CR Bug ID Label */}
              <div>
                <label htmlFor="crBugIdLabel" className="block text-sm font-medium text-slate-300 mb-2">
                  CR Bug ID Label <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="crBugIdLabel"
                  name="crBugIdLabel"
                  value={formData.crBugIdLabel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 ${errors.crBugIdLabel ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  placeholder="Enter CR Bug ID label"
                />
                {errors.crBugIdLabel && <p className="mt-2 text-sm text-red-400">{errors.crBugIdLabel}</p>}
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Start Date */}
              {/* <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-slate-300 mb-2">
                  Start Date
                </label>
                <input
                  type="text"
                  id="startDate"
                  value={formData.startDate}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-slate-500">Default to current date</p>
              </div> */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-slate-300 mb-2">
                  Start Date
                </label>
                <input
                  type="text"
                  id="startDate"
                  value={"Will start when user accepts"}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-slate-500">Auto-updated when user accepts the task</p>
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-slate-300 mb-2">
                  End Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formatDateForInput(formData.endDate)}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-200 ${errors.endDate ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                />
                {errors.endDate && <p className="mt-2 text-sm text-red-400">{errors.endDate}</p>}
              </div>


              {/* Task Label */}
              <div>
                <label htmlFor="taskLabel" className="block text-sm font-medium text-slate-300 mb-2">
                  Task Label <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="taskLabel"
                  name="taskLabel"
                  value={formData.taskLabel}
                  onChange={handleInputChange}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto"; // reset height
                    target.style.height = target.scrollHeight + "px"; // grow with content
                  }}
                  rows={1} // default height
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none overflow-hidden ${errors.taskLabel ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500'}`}
                  placeholder="Enter task label"
                />
                {errors.taskLabel && <p className="mt-2 text-sm text-red-400">{errors.taskLabel}</p>}
              </div>

              {/* Status Label */}
              <div>
                <label htmlFor="statusLabel" className="block text-sm font-medium text-slate-300 mb-2">
                  Status Label <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="statusLabel"
                  name="statusLabel"
                  value={'Yet to Start'}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                />
              </div>



            </div>


            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-slate-700">
              <button
                type="button"
                onClick={onShowList}
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
              >
                <List className="w-5 h-5" />
                <span>Show List</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Submit Task</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;