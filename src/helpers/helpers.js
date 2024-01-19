/*
* Необходима для определения типа данных и наличия самих данных
*/
export const canArrayValues = (value) => {
    return Array.isArray(value) && value.length > 0
}

/*
* Необходима для определения типа данных и наличия самих данных
*/
export const canObjectValues = (value) => {
    return (!!value) && (value.constructor === Object) && Object.keys(value).length > 0
}

/*
Функция преобразования строки даты в instance Date
Формат строки 15.08.2022 14:30
*/
export const convertStringToDate = (str = "00.00.0000 00:00") => {
    if (str instanceof Date) {
        return str
    }
    const [dateValues, timeValues] = str?.split(' ');
    const [day, month, year] = dateValues.split('.');
    const [hours, minutes] = timeValues ? timeValues.split(':') : ["00", "00"];

    return new Date(+year, +month - 1, +day, +hours, +minutes);
}
