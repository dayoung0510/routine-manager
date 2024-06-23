import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postTask, getUserIdTasks, updateTask } from 'apis/apis';

export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useGetUserIdTasks = (userId?: string) => {
  return useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => {
      if (userId) {
        return getUserIdTasks(userId);
      }
    },
    enabled: !!userId,
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
