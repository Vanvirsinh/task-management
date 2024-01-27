const getDate = () => {
    const date = new Date();

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

const today = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

return today; // 26 Jan 2024
}

const isValidDateFormat = (value) => {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error('Invalid date format. Please use "YYYY-MM-DD" format.');
  }
  return true;
};

module.exports = { getDate, isValidDateFormat }