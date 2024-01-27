const calculatePriority = (dueDate) => {
    const today = new Date();
    const dueDateTime = new Date(dueDate);

    const timeDifference = dueDateTime.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
};

module.exports = { calculatePriority };