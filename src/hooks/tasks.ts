import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  postTask,
  getUserIdAllTasks,
  updateTask,
  inactiveTask,
  deleteTask,
  getUserIdActiveTasks,
  getCategories,
  postSpecialTodo,
  getSpecialTodos,
  putSpecialTodoStatus,
  putTodayTask,
  getTodayDoneTaskList,
  putTodayScore,
  getDateList,
  getTasks,
  deleteSpecialTodo,
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

export const usePostSpecialTodo = () => {
  return useMutation({
    mutationFn: postSpecialTodo,
  });
};

export const useGetSpecialTodos = ({
  userId,
  date,
}: {
  userId?: string;
  date?: string;
}) => {
  return useQuery({
    queryFn: () => {
      if (userId && date) {
        return getSpecialTodos({ userId, date });
      }
    },
    queryKey: ['specialTodos', date],
    enabled: !!userId && !!date,
  });
};

export const usePutSpecialTodoStatus = () => {
  return useMutation({ mutationFn: putSpecialTodoStatus });
};

export const usePutTodayTask = () => {
  return useMutation({ mutationFn: putTodayTask });
};

export const useGetTodayDoneTaskList = ({
  userId,
  date,
}: {
  userId?: string;
  date: string;
}) => {
  return useQuery({
    queryFn: () => {
      if (userId && date) {
        return getTodayDoneTaskList({ userId, date });
      }
    },
    queryKey: ['tasks', date],
    enabled: !!userId && !!date,
  });
};

export const usePutTodayScore = () => {
  return useMutation({ mutationFn: putTodayScore });
};

export const useGetDateList = ({
  userId,
  year,
  month,
}: {
  userId?: string;
  year?: number;
  month?: number;
}) => {
  return useQuery({
    queryFn: () => {
      if (userId && month && year) {
        return getDateList({ userId, year, month });
      }
    },
    queryKey: ['recordsSpecialTodos', userId, year, month],
    enabled: !!userId && !!year && !!month,
  });
};

export const useGetTasks = ({
  userId,
  date,
}: {
  userId?: string;
  date: string;
}) => {
  return useQuery({
    queryFn: () => {
      if (userId) {
        return getTasks({ userId, date });
      }
    },
    queryKey: ['recordsTasks', userId, date],
    enabled: !!userId,
  });
};

export const useDeleteSpecialTodo = () => {
  return useMutation({ mutationFn: deleteSpecialTodo });
};
