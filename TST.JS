function addOneDay(dateString) {
  // Convert the dateString to a Date object
  const date = new Date(dateString);

  // Add one day to the date
  date.setDate(date.getDate() + 1);

  // Format the date to 'YYYY-MM-DD' format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Example usage
const date = '2024-04-30';
const newDate = addOneDay(date);
console.log(newDate); 