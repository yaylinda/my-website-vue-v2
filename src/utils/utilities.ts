export function getAgoTime(dateStr: string, currentStr: string) {
    if (dateStr && currentStr) {
        const now = new Date(Date.parse(currentStr.replace(" ", "T"))).getTime();
        const then = new Date(Date.parse(dateStr.replace(" ", "T"))).getTime();
        const difference = (now as any) - then;
  
        const minutes = difference / (1000 * 60);
        if (minutes < 60) {
          return Math.floor(minutes) + "m";
        }
  
        const hours = difference / (1000 * 60 * 60);
        if (hours < 24) {
          return Math.floor(hours) + "h";
        }
  
        const days = difference / (1000 * 60 * 60 * 24);
        if (days < 7) {
          return Math.floor(days) + "d";
        }
  
        const weeks = difference / (1000 * 60 * 60 * 24 * 7);
        if (weeks < 5) {
          return Math.floor(weeks) + "w";
        }
  
        const months = difference / (1000 * 60 * 60 * 24 * 30);
        if (months < 12) {
          return Math.floor(months) + "mon";
        }
  
        const years = difference / (1000 * 60 * 60 * 24 * 365);
        return Math.floor(years) + "yr";
      }
}