import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers, putUserName } from '../apis/apis';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

export const usePutUserName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserName,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
