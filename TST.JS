const givenDate = new Date("2024-12-05");
const today = new Date();
const threeMonthsFromNow = new Date();
threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

if (givenDate > today && givenDate <= threeMonthsFromNow) {
  console.log("Given date is within 3 months from now");
} else {
  console.log("Given date is not within 3 months from now");
}