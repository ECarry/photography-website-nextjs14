export default function formatCustomDate(dateString: string): string {
  // 分割日期和时间部分
  const [datePart, timePart] = dateString.split(" ");

  // 分割日期部分
  const [year, month, day] = datePart.split(":");

  // 分割时间部分
  const [hours, minutes, seconds] = timePart.split(":");

  // 创建日期对象
  const inputDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );

  // 检查日期是否有效
  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }

  // 月份的英文缩写
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // AM 或 PM
  const ampm = inputDate.getHours() >= 12 ? "PM" : "AM";

  // 将小时调整为 12 小时制
  const adjustedHours = inputDate.getHours() % 12 || 12;

  // 格式化日期字符串
  const formattedDate = `${adjustedHours}:${String(
    inputDate.getMinutes()
  ).padStart(2, "0")}${ampm}`;
  const formattedMonth = months[inputDate.getMonth()];

  return `${inputDate.getDate()} ${formattedMonth} ${inputDate.getFullYear()} ${formattedDate}`;
}
