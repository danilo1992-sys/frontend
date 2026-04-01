import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: es });
}
