import { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import Header from './components/Header';
import TaskCard from './components/TaskCard';
import UserTaskScreen from './components/UserTask';
import axios from 'axios';

export type User = {
  employeeId: string;
  username: string;
  password: string;
  status: boolean;
  role: 'ADMIN' | 'USER';
};

export type Task = {
  id: string;
  assignedLabel: string;
  module: 'UHES' | 'HES';
  taskId: string;
  project: 'AMI_PROD' | 'AMI_TEST';
  taskLabel: string;
  crBugIdLabel: string;
  statusLabel: string;
  startDate: string;
  endDate: string;
  priority: 'Low' | 'Medium' | 'High';
  createdBy: string; 
  createdAt: string;
  acceptance: string;
  remarks: string;
  revicedEndDate: string;
};

export type AppState = 'login' | 'signup' | 'dashboard' | 'createTask' | 'taskList' | 'userTasks';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppState>('login');
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {

    // Fetch TaskData from backend
    const TaskData = async () => {
      await axios.get('http://localhost:8080/TaskList')
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }
    TaskData();


    // Fetch Users from backend
    const UserData = async () => {
      await axios.get('http://localhost:8080/Dashboard')
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }
    UserData();
  }, []);



  const handleLogin = (user: User) => {
    setCurrentUser(user);
    console.log(currentUser);
    if (user.role === 'ADMIN') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('userTasks');
    }
  };

  const handleSignup = (newUser: User) => {

    const addUser = async () => {
      try {
        const response = await axios.post('http://localhost:8080/signup', newUser)
        if (response && (response.status === 201 || response.status === 200)) {
          console.log('User created successfully:', response.data);
          setUsers(prev => [...prev, newUser]);
          setCurrentUser(newUser);
          // setCurrentView('dashboard');
        } else {
          console.error('Failed to create user');
        }
      } catch (error) {
        console.error('Error during user creation:', error);
      }
    };
    addUser();

    if (newUser.role === 'ADMIN') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('userTasks');
    }

  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleCreateTask = (task: Task) => {
    const NewTask = async () => {
      try {
        await axios.post('http://localhost:8080/createtask', task);
        // console.log(task);
        setTasks(prev => [...prev, task]);
        setCurrentView('taskList');
      }
      catch (error) {
        console.error('Error creating task:', error);
      }
    };
    NewTask();

  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    // Optionally, you can also send the updated task to the backend here
    const UpdateTask = async () => {
      try {
        await axios.put(`http://localhost:8080/updateTask/${updatedTask.id}`, updatedTask);
        console.log(updatedTask); 
      }
      catch (error) {
        console.error('Error updating task:', error);
        console.log(updatedTask)
        alert(updatedTask.id)
      }
    };
    UpdateTask();
  };

  // -----------------------------------------------------------------
  const renderCurrentView = () => {
    if (!currentUser && currentView !== 'signup') {
      return (
        <Login
          users={users}
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentView('signup')}
        />
      );
    }

    if (currentView === 'signup') {
      return (
        <Signup
          existingUsers={users}
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard users={users} onCreateTask={() => setCurrentView('createTask')} />;
      case 'createTask':
        return (
          <CreateTask
            currentUser={currentUser!}
            users={users}
            onSubmit={handleCreateTask}
            onShowList={() => setCurrentView('taskList')}
            onCancel={() => setCurrentView('dashboard')}
          />
        );
      case 'userTasks':
        return <UserTaskScreen
          currentUser={currentUser!}
          tasks={tasks}
          onUpdateTask = {handleUpdateTask}
        />;

      case 'taskList':
        return (
          <TaskList
            tasks={tasks}
            users={users}
            onBack={() => setCurrentView('dashboard')}
            TaskCard={TaskCard}
            onUpdateTask={handleUpdateTask}
          />

        );
      default:
        return <Dashboard users={users} onCreateTask={() => setCurrentView('createTask')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {currentUser && (
        <Header
          currentUser={currentUser}
          currentView={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        />
      )}
      <main className={currentUser ? 'pt-16' : ''}>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
