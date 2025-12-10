import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from "@/services/deleteProject";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteProject'],
    mutationFn: (id: string) => deleteProject(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });
};