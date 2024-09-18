import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  postTask,
  getUserIdAllTasks,
  updateTask,
  inactiveTask,
  deleteTask,
  getUserIdActiveTasks,
  getCategories,
} from 'apis/apis';

export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useGetUserIdAllTasks = (userId?: string) => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => {
      if (userId) {
        return getUserIdAllTasks(userId);
      }
    },
    enabled: !!userId,
  });
};

export const useGetUserIdActiveTasks = (userId?: string) => {
  return useQuery({
    queryKey: ['activeTasks'],
    queryFn: () => {
      if (userId) {
        return getUserIdActiveTasks(userId);
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

export const useInactiveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inactiveTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useGetCategories = () => {
  return useQuery({ queryFn: getCategories, queryKey: ['categories'] });
};
