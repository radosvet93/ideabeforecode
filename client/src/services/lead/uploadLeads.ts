import ky from 'ky';

export const uploadLeads = async ({ file, projectId }: { file: File, projectId: string }) => {
  console.log('file', file);
  console.log('projectId', projectId);
  await ky.post(`/api/leads/upload-csv?projectId=${projectId}`, {
    body: file,
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
  }).json();
};