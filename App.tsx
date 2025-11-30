
import React, { useState, useEffect } from 'react';
import QrLogin from './components/QrLogin';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Routines from './components/Routines';
import MuscleGuide from './components/MuscleGuide';
import Nutrition from './components/Nutrition';
import Suggestions from './components/Suggestions';
import Info from './components/Info';
import AdminPanel from './components/AdminPanel';
import AnnouncementModal from './components/AnnouncementModal';
import Modal from './components/Modal';
import { MOCK_USER, USERS_DB, MOCK_ANNOUNCEMENTS } from './constants';
import { Recipe, User, Announcement } from './types';
import { Bell, ChevronLeft } from 'lucide-react';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false);

  // --- GLOBAL STATE ---
  // Users state primarily for Admin view
  const [users, setUsers] = useState<User[]>(USERS_DB);
  
  // Announcements State
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);

  // Lifted state to persist data
  const [assignedRoutineId, setAssignedRoutineId] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [weights, setWeights] = useState<Record<string, string>>({});
  
  const [attendance, setAttendance] = useState<string[]>([]);
  const [customVideoUrls, setCustomVideoUrls] = useState<Record<string, string>>({}); 
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(5);

  // --- SUPABASE DATA FETCHING ---

  // 1. Fetch Announcements on Load
  useEffect(() => {
    const fetchAnnouncements = async () => {
        try {
            const { data } = await supabase
                .from('announcements')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (data && data.length > 0) {
                // Map DB snake_case to CamelCase if necessary, or ensure types match
                const mapped = data.map(d => ({
                    id: d.id,
                    title: d.title,
                    message: d.message,
                    type: d.type,
                    dateCreated: d.created_at,
                    expiresAt: d.expires_at,
                    active: d.active
                })) as Announcement[];
                setAnnouncements(mapped);
            }
        } catch (e) {
            console.error("Using local announcements fallback");
        }
    };
    fetchAnnouncements();
  }, []);

  // 2. Fetch Users (Only if Admin)
  useEffect(() => {
    if (isAuthenticated && currentUser.role === 'admin') {
        const fetchUsers = async () => {
            const { data } = await supabase.from('users').select('*');
            if (data) {
                 const mappedUsers: User[] = data.map(u => ({
                     id: u.id,
                     dni: u.dni,
                     name: u.name,
                     role: u.role,
                     avatar: u.avatar || 'https://placehold.co/200',
                     memberSince: u.member_since,
                     assignedRoutineId: u.assigned_routine_id,
                     weeklyGoal: u.weekly_goal
                 }));
                 setUsers(mappedUsers);
            }
        }
        fetchUsers();
    }
  }, [isAuthenticated, currentUser.role]);


  const handleLogin = async (dni: string) => {
      // A. Try Real DB Login
      try {
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('dni', dni)
            .single();

          if (data) {
              const user: User = {
                  id: data.id,
                  dni: data.dni,
                  name: data.name,
                  role: data.role,
                  avatar: data.avatar || 'https://placehold.co/200',
                  memberSince: data.member_since,
                  assignedRoutineId: data.assigned_routine_id,
                  weeklyGoal: data.weekly_goal || 5
              };
              setCurrentUser(user);
              setAssignedRoutineId(user.assignedRoutineId || null);
              setWeeklyGoal(user.weeklyGoal || 5);
              setIsAuthenticated(true);
              
              // Load Attendance for this user
              const { data: attendanceData } = await supabase
                 .from('attendance')
                 .select('date')
                 .eq('user_id', user.id);
                 
              if (attendanceData) {
                 setAttendance(attendanceData.map(a => a.date));
              }
              return;
          }
      } catch (e) {
          console.warn("Database connection failed, trying local fallback.");
      }

      // B. Fallback to Local Constants (Santy)
      const localUser = USERS_DB.find(u => u.dni === dni);
      if (localUser) {
          setCurrentUser(localUser);
          setAttendance(localUser.attendance || []);
          setAssignedRoutineId(localUser.assignedRoutineId || null);
          setWeeklyGoal(localUser.weeklyGoal || 5);
          setIsAuthenticated(true);
      } else {
          setShowLoginErrorModal(true);
      }
  };

  // Handler to register attendance in DB
  const handleMarkAttendance = async () => {
      const today = new Date().toISOString().split('T')[0];
      
      // Optimistic UI update
      setAttendance(prev => [...prev, today]);

      // DB Update
      if (currentUser.id.includes('local')) return; // Don't sync mock users

      try {
          await supabase.from('attendance').insert({
              user_id: currentUser.id,
              date: today
          });
      } catch (e) {
          console.error("Error saving attendance", e);
      }
  };

  // Handler to update routine assignment in DB
  const handleRoutineUpdate = async (routineId: string | null) => {
      setAssignedRoutineId(routineId);
      
      if (currentUser.id.includes('local')) return;

      try {
          await supabase.from('users').update({ assigned_routine_id: routineId }).eq('id', currentUser.id);
      } catch (e) { console.error(e) }
  }

  // Handler to update weekly goal
  const handleGoalUpdate = async (goal: number) => {
      setWeeklyGoal(goal);
      if (currentUser.id.includes('local')) return;
      try {
          await supabase.from('users').update({ weekly_goal: goal }).eq('id', currentUser.id);
      } catch (e) { console.error(e) }
  }

  if (!isAuthenticated) {
    return (
      <>
        <QrLogin onLogin={handleLogin} />
        <Modal
          isOpen={showLoginErrorModal}
          onClose={() => setShowLoginErrorModal(false)}
          title="Error de Acceso"
          type="danger"
          confirmText="Entendido"
          onConfirm={() => setShowLoginErrorModal(false)}
        >
          Usuario no encontrado. Por favor, verifica tu DNI e intenta nuevamente.
        </Modal>
      </>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
            <Dashboard 
                user={currentUser} 
                attendance={attendance} 
                onMarkAttendance={handleMarkAttendance}
                weeklyGoal={weeklyGoal}
                setWeeklyGoal={handleGoalUpdate}
                announcements={announcements}
            />
        );
      case 'routines':
        return (
          <Routines 
            user={currentUser}
            assignedRoutineId={assignedRoutineId}
            setAssignedRoutineId={handleRoutineUpdate}
            completedExercises={completedExercises}
            setCompletedExercises={setCompletedExercises}
            weights={weights}
            setWeights={setWeights}
            customVideoUrls={customVideoUrls}
            setCustomVideoUrls={setCustomVideoUrls}
          />
        );
      case 'muscles':
        return <MuscleGuide />;
      case 'nutrition':
        return <Nutrition savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes} />;
      case 'admin':
        if (currentUser.role !== 'admin') return null;
        return (
            <AdminPanel 
                users={users} 
                setUsers={setUsers} 
                announcements={announcements} 
                setAnnouncements={setAnnouncements} 
                currentUser={currentUser} 
                onBack={() => setActiveTab('dashboard')} 
            />
        );
      case 'suggestions':
        return <Suggestions onBack={() => setActiveTab('dashboard')} />;
      case 'info':
        return <Info onBack={() => setActiveTab('dashboard')} />;
      case 'announcements_list':
        return (
            <div className="animate-fade-in pb-20">
                 <div className="flex items-center gap-2 mb-6">
                    <button onClick={() => setActiveTab('dashboard')} className="p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
                        <ChevronLeft size={20}/>
                    </button>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Bell className="text-brand-orange" /> Comunicados
                    </h2>
                 </div>
                 <div className="space-y-4">
                    {announcements.filter(a => a.active).length === 0 ? (
                        <p className="text-zinc-500 italic text-center py-10">No hay comunicados vigentes.</p>
                    ) : (
                        announcements.filter(a => a.active).map(ann => (
                            <div key={ann.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white text-lg">{ann.title}</h3>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                        ann.type === 'alert' ? 'bg-red-500 text-white' :
                                        ann.type === 'warning' ? 'bg-yellow-500 text-black' :
                                        'bg-blue-500 text-white'
                                    }`}>
                                        {ann.type}
                                    </span>
                                </div>
                                <p className="text-zinc-300 text-sm">{ann.message}</p>
                                <p className="text-zinc-500 text-[10px] mt-3 text-right">
                                    Publicado: {new Date(ann.dateCreated).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                 </div>
            </div>
        );
      default:
        return <Dashboard user={currentUser} attendance={attendance} onMarkAttendance={handleMarkAttendance} weeklyGoal={weeklyGoal} setWeeklyGoal={handleGoalUpdate} announcements={announcements} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} user={currentUser}>
      <AnnouncementModal announcements={announcements} />
      {renderContent()}
    </Layout>
  );
};

export default App;
