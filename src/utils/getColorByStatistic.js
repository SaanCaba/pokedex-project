export function getColorByStatistic(number) {
  let selectedColor = '';
  if (number <= 30) {
    selectedColor = '#fc6f79';
  } else if (number > 30 && number < 70) {
    selectedColor = '#fcd76f';
  } else {
    selectedColor = '#9cffa7';
  }
  return selectedColor;
}
