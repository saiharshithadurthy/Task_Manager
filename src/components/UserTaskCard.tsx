import React, { useState } from "react";
import { X, Tag, User, Calendar, List } from "lucide-react";
import ReactDOM from "react-dom";
import { Task } from "../App";

interface UserTaskCardProps {
  task: Task;
  //   users: UserType[];
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
}

const UserTaskCard: React.FC<UserTaskCardProps> = ({ task, onClose, onUpdateTask }) => {
  const portalTarget = document.body;
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Task>({ ...task });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(name + value);
  };
  const today = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

  

  const handleSave = () => {
    onUpdateTask(formData);
    console.log(formData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCancel = () => {
    setFormData({ ...task });
    setIsEditing(false);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-11/12 max-w-4xl h-[75vh] bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 p-8 flex flex-col animate-fadeIn">

        {/* Close Button */}
        <button className="absolute top-4 right-4 text-slate-400 hover:text-white" onClick={onClose}>
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-slate-700 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{"Task Details"}</h2>
          <span className="text-sm text-slate-400">Task ID - {task.taskId}</span>
        </div>
        {/* Success Toast */}
        {showSuccess && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm animate-fadeInOut">
            Task Updated Successfully!
          </div>
        )}

        {/* Form Fields */}
        <div className="flex-1 overflow-y-auto text-slate-300 space-y-6 pr-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/*Assigned by*/}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
              <p className="text-sm text-slate-400 flex items-center gap-2"><User className="w-4 h-4" />Assigned by</p>
              <p className="text-white font-medium mt-2">{task.createdBy}</p>
            </div>

            {/*Created at*/}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
              <p className="text-sm text-slate-400 flex items-center gap-2"><Calendar className="w-4 h-4" />Created at</p>
              <p className="text-white font-medium mt-2">{task.createdAt}</p>
            </div>

            {/*CrBugId*/}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
              <p className="text-sm text-slate-400 flex items-center gap-2"><Tag className="w-4 h-4" />CR Bug ID</p>
              <p className="text-white font-medium mt-2">{task.crBugIdLabel}</p>
            </div>

            {/* Project */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
              <p className="text-sm text-slate-400 flex items-center gap-2"><Tag className="w-4 h-4" /> Project</p>
              <p className="text-white font-medium mt-2">{task.project}</p>
            </div>

            {/* Priority */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
              <p className="text-sm text-slate-400 flex items-center gap-2"><Tag className="w-4 h-4" /> Priority</p>
              <p className="text-white font-medium mt-2">{task.priority}</p>
            </div>

            {/* Dates */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
              <p className="text-sm text-slate-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> Dates</p>
              <p className="text-white font-medium mt-2">{task.startDate} → {task.endDate}</p>
            </div>

            {/*Acceptance*/}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
              <p className="text-sm text-slate-400 flex items-center gap-2"><Tag className="w-4 h-4" />Acceptance</p>
              {isEditing && task.acceptance !== "Accepct" ? (
                <div className="flex gap-4 mt-2">
                  <select
                    name="acceptance"
                    value={formData.acceptance} 
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Accepted" >Accepted</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              ) : (
                <p className="text-white font-medium mt-2  ">{task.acceptance ? "Accepcted" : "Pending"}</p>
              )}
            </div>


            {/* Status */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
              <p className="text-sm text-slate-400 flex items-center gap-2"><Tag className="w-4 h-4" /> Status</p>
              {isEditing && task.acceptance ? (
                <div className="flex gap-4 mt-2">

                  <select
                    name="statusLabel"
                    value={formData.statusLabel}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Yet to Start">Yet to Start</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Hold">Hold</option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>
              ) : (
                <p className="text-white font-medium mt-2">{task.statusLabel}</p>
              )}
            </div>

            {/* Task Label */}
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 col-span-2">
              <p className="text-sm text-slate-400 flex items-center gap-2"><List className="w-4 h-4" /> Task Label</p>
              <p className="text-white font-medium mt-2 break-words">{task.taskLabel}</p>
            </div>

            {/*revicedEndDate*/}
            {
              task.revicedEndDate !== '' || task.endDate < today ? (
                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                  <p className="text-sm text-slate-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> Revised End Date</p>
                  {isEditing ? (
                    <input
                      type="date"
                      name="revicedEndDate"
                      value={formData.revicedEndDate}
                      onChange={handleInputChange}
                      className="bg-slate-700/50 border border-slate-600 rounded-xl p-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-white font-medium mt-2">{task.revicedEndDate || "No revised end date set."}</p>
                  )}
                </div>
              ) : null
            }

            {/* Remarks */}
            {task.remarks !== '' || task.endDate < today ? (
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 col-span-2">
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Remarks
                </p>
                {isEditing ? (
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={(e) => {
                      handleInputChange(e);
                      e.target.style.height = "auto"; // Reset height
                      e.target.style.height = `${e.target.scrollHeight}px`; // Grow with content
                    }}
                    rows={1}
                    className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-xl p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      overflow: "hidden",
                      minHeight: "45px",
                      transition: "height 0.2s ease",
                    }}
                  />
                ) : (
                  <p className="text-white font-medium mt-2 break-words">{task.remarks || "No remarks provided."}</p>
                )}
              </div>
            ) : null
            }

          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3 border-t border-slate-700 pt-4">
          {isEditing ? (
            <>
              <button className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600" onClick={handleCancel}>Cancel</button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700" onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600" onClick={onClose}>Close</button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700" onClick={() => setIsEditing(true)}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>,
    portalTarget
  );
};

export default UserTaskCard;
