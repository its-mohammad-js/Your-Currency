import numeral from "numeral";
import { supportedTimeFormats } from "../constants";

const getTimeForamt = (timeFormat) => {
  return supportedTimeFormats.filter((time) => {
    if (time.timePeriod === timeFormat) return time;
  })[0].dateFormat;
};

const reduceCoinHistory = (coinHistory, timeForamt) => {
  const result = [];
  if (coinHistory && coinHistory.history) {
    coinHistory.history.map(({ price, timestamp }) => {
      const date = new Date(timestamp * 1000);
      const formattedDate = date.toLocaleDateString(
        "en-US",
        getTimeForamt(timeForamt)
      );

      result.push({ time: formattedDate, price });
    });
  }

  const highestPricesByTime = result.reduce((acc, curr) => {
    const { time, price } = curr;
    if (!acc[time]) {
      acc[time] = { time, highestPrice: price };
    } else {
      acc[time].highestPrice = Math.min(acc[time].highestPrice, price);
    }

    return acc;
  }, {});

  return Object.values(highestPricesByTime).reverse();
};

function findHighestAndLowestValues(array) {
  let highestValue = -Infinity;
  let lowestValue = Infinity;

  for (let i = 0; i < array.length; i++) {
    const number = parseFloat(array[i]);

    if (number > highestValue) {
      highestValue = number;
    }

    if (number < lowestValue) {
      lowestValue = number;
    }
  }

  return { highest: highestValue, lowest: lowestValue };
}

const changePriceFormat = (num) => {
  if (num === 0) return num;
  if (num <= 0.001) return numeral(num).format("0.000000");
  if (num <= 0.01) return numeral(num).format("0.0000");
  if (num <= 0.1) return numeral(num).format("0.00");
  if (num <= 1) return numeral(num).format("0.0");
  if (num >= 1) return numeral(num).format("0,0");
  if (num >= 1000) return numeral(num).format("0.0a");
};

export { reduceCoinHistory, changePriceFormat, findHighestAndLowestValues };
