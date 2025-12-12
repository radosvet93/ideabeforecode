import { useMutation } from '@tanstack/react-query';
import { generateEmail } from '@/services/email/generateEmail';
import type { GenerateEmailPayload } from '@/types';

export const useGenerateEmail = () => {

  return useMutation({
    mutationKey: ['generateEmail'],
    mutationFn: (payload: GenerateEmailPayload) => generateEmail(payload),
  });
};
