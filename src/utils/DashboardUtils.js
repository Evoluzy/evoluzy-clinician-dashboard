export const formatSleepData =  (rawSleepObj) => {
  let barChartData = rawSleepObj.map(data => {
    return {
      label: data.date,
      value: data.hours,
      start: data.start,
      end: data.end
    }
  })
  if (barChartData.length > 14) {
    return barChartData.slice(0, 14);
  }
  return barChartData;
}

export const formatHeartMinutesData =  (rawHeartMinObj) => {
  let barChartData = rawHeartMinObj.map(data => {
    return {
      label: data.date,
      value: data.points
    }
  })
  if (barChartData.length > 14) {
    return barChartData.slice(0, 14);
  }
  return barChartData;
}

export const formatCaloriesBurnedData =  (rawCaloriesBurnObj) => {
  let barChartData = rawCaloriesBurnObj.map(data => {
    return {
      label: data.date,
      value: data.points
    }
  })
  if (barChartData.length > 14) {
    return barChartData.slice(0, 14);
  }
  return barChartData;
}

export const formatWeeklyStepCountData = (rawWeeklyStepCountObj) => {
  let barChartData = rawWeeklyStepCountObj.map(data => {
    return {
      label: data.date,
      value: data.average
    }
  })
  if (barChartData.length > 5) {
    return barChartData.slice(0, 5);
  }
  return barChartData;
}

export const formatOverviewData = (rawSleepObj, rawHeartMinObj, rawCaloriesBurnObj, rawDailyStepCountObj) => {
  let overviewData = [];
  for (var i = 0; i < 30; i++) {
    var obj = {
      date: "",
      hours: "",
      sleepPeriod: "",
      points: "",
      calories: "",
      count: "",
    };
    if (rawSleepObj.length > i) {
      obj.date = rawSleepObj[i].date;
      obj.hours = rawSleepObj[i].hours
      obj.sleepPeriod = rawSleepObj[i].start.toString() + " - " + rawSleepObj[i].end.toString();
    }
    if (rawHeartMinObj.length > i) {
      obj.date = rawHeartMinObj[i].date;
      obj.points = rawHeartMinObj[i].points;
    }
    if (rawCaloriesBurnObj.length > i) {
      obj.date = rawCaloriesBurnObj[i].date;
      obj.calories = rawCaloriesBurnObj[i].calories;
    }
    if (rawDailyStepCountObj.length > i) {
      obj.date = rawDailyStepCountObj[i].date;
      obj.count = rawDailyStepCountObj[i].count;
    }
    if (
      rawSleepObj.length <= i &&
      rawCaloriesBurnObj.length <= i &&
      rawHeartMinObj.length <= i &&
      rawDailyStepCountObj.length <= i
    ) {
      break
    } else {
      overviewData.push(obj);
    }
  }
  return overviewData;
}