import { useState, useEffect } from 'react';
import useBoards from './useBoards';

const useStatistics = () => {
  const [stats, setStats] = useState([]);
  const { boards, getAllTasks } = useBoards();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const taskCount = await getAllTasks();

        setStats([
          {
            icon: 'dashboard',
            value: String(boards?.length || 0),
            label: 'Tableaux'
          },
          {
            icon: 'list',
            value: String(taskCount || 0),
            label: 'Tâches'
          },
          {
            icon: 'check-circle',
            value: '0',
            label: 'Terminées'
          }
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        setStats([
          { icon: 'dashboard', value: '0', label: 'Tableaux' },
          { icon: 'list', value: '0', label: 'Tâches' },
          { icon: 'check-circle', value: '0', label: 'Terminées' }
        ]);
      }
    };

    fetchStats();
  }, [boards, getAllTasks]);

  return stats;
};

export default useStatistics;
