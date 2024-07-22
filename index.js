function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10),
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => {
    return total + wagesEarnedOnDate(employee, event.date);
  }, 0);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}

// Export functions for testing purposes
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll,
};
