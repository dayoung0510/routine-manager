import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from './apis';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
