import ky from 'ky';

export const deleteLead = async (id: string) => {
  const deleteResponse = await ky.delete(`/api/leads/${id}`);

  return deleteResponse.status;
};