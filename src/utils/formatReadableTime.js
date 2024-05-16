export function formatReadableTime(inputTime) {
  const inputDate = new Date(inputTime);
  const currentDate = new Date();

  const timeDifference = (currentDate - inputDate) / (1000 * 60); // Difference in minutes

  if (timeDifference < 60) {
    return `${Math.round(timeDifference)} minutes ago`;
  } else if (timeDifference < 1440) {
    return `${Math.round(timeDifference / 60)} hours ago`;
  } else if (timeDifference < 2880) {
    return 'Yesterday';
  } else {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    return `${month} ${day.replace(',', '')}, ${year}`;
  }
}
