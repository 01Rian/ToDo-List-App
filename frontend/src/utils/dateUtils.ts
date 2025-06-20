const parseToDate = (dateString: string): Date | null => {
  try {
    // Se a data está no formato brasileiro "dd-MM-yyyy HH:mm:ss"
    if (dateString.includes('-') && dateString.length === 19) {
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('-');
      const isoString = `${year}-${month}-${day}T${timePart}`;
      const date = new Date(isoString);
      
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    
    // Fallback para formato ISO ou outros
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    return null;
  } catch {
    return null;
  }
};

export const formatDate = (dateString: string, withTime = true): string => {
  const date = parseToDate(dateString);
  if (!date) return dateString;

  if (withTime) {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } else {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
};

export const formatDateShort = (dateString: string): string => {
  return formatDate(dateString, false);
};
