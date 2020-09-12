const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'});
const formatterPercent = new Intl.NumberFormat('pt-BR', {style: 'percent', maximumFractionDigits: '2', minimumFractionDigits: '2'});

function formatNumber(numberToFormat) {
  return formatter.format(numberToFormat);
}

function formatPercent(numberToFormat){
  return formatterPercent.format(numberToFormat);
}

export { formatNumber, formatPercent };