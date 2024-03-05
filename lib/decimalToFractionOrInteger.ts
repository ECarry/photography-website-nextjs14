export default function decimalToFractionOrInteger(decimal: number): string {
  // 首先检查是否为整数
  if (Number.isInteger(decimal)) {
    return `${decimal} s`;
  }

  // 精度，用于控制计算的精确度
  const precision: number = 1e-6;
  let denominator: number = 1; // 分母
  let numerator: number = 1; // 分子
  let minError: number = Math.abs(decimal - numerator / denominator);

  // 不断增加分母来查找最接近的分数
  for (let i = 2; i <= 8000; i++) {
    let tempNumerator: number = Math.round(decimal * i);
    let tempError: number = Math.abs(decimal - tempNumerator / i);
    if (tempError < minError) {
      minError = tempError;
      numerator = tempNumerator;
      denominator = i;
    }
    if (tempError < precision) break; // 如果误差小于设定的精度，则停止循环
  }

  // 对于分子为1的情况直接返回分数形式
  if (numerator === 1) {
    return `${numerator}/${denominator} s`;
  }

  // 否则，尝试简化分数并返回
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor: number = gcd(numerator, denominator);
  return `${numerator / divisor}/${denominator / divisor} s`;
}
