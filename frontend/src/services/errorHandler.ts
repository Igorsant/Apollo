export const errorHandler = (err: any): string => {
  if (err.message === 'Network Error') return 'Erro ao se comunicar com servidor';
  if (err.response?.status >= 400 && err.response?.status <= 499)
    return err.response.data.error ?? 'Erro: formulário possui dados inválidos';
  if (err.response?.status >= 500 && err.response?.status <= 599)
    return err.response.data.error ?? 'Erro interno do servidor';
  return 'Erro';
};
