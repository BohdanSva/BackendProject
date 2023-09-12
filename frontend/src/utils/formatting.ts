// Functions
const addCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const addPercent = (num: number) => Number(num).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1,maximumFractionDigits:1}); 

const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, "");

const formatDate = (date: string) => {
    if (date=="" || date== "0000-00-00") return "n/a"
    else return new Date(date).toLocaleString("en-GB", {day: "numeric", month: "long", year: "numeric"});
}

const imperialToMetric = (num: number) => Math.round(num/10.76391042);
const metricToImperial = (num: number) => Math.round(num*10.76391042);

const yearsDifference = (firstDate: string, lastDate: string) => {
    let difference =(new Date (lastDate).getTime() - new Date (firstDate).getTime()); 
    difference /= (1000 * 60 * 60 * 24); // Convert into days
    return Math.abs(Math.round(difference/365.25)); // Difference in years
}

const timeFromToday = (date: string) => {
    let difference =(new Date (date).getTime() - new Date().getTime()); 
    difference /= (1000 * 60 * 60 * 24 * 365.25); // Convert into years
    return difference.toLocaleString(undefined,{minimumFractionDigits:1,maximumFractionDigits:1})
}

export { addCommas, addPercent, removeNonNumeric, formatDate, timeFromToday, imperialToMetric, metricToImperial};