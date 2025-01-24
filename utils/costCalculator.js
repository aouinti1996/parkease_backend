// utils/costCalculator.js

exports.calculateCost = (startTime, endTime, hourlyRate) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Calculate time difference in hours
    const timeDiff = (end - start) / (1000 * 60 * 60); // Time difference in hours

    return timeDiff * hourlyRate; // Return total cost
};
