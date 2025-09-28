import type { MainTableProps } from '@/shared/components/MainTable';
import { useGetProjects } from '../api/useGetProjects';
import type { ProjectTableRow } from '../types';

export const useProjectsTable = () => {
  const { data } = useGetProjects();

  const columns: MainTableProps<ProjectTableRow>['columns'] = [
    { key: 'title', label: 'Project Title' },
    { key: 'status', label: 'Status' },
    { key: 'managerName', label: 'Manager' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' }, 
  ];

  const rows = data || [];

  return { rows, columns };
};