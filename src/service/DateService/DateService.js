export class DateService {
    static getDateString(rawDate) {
        //rawDate в виде YYYY-MM-DDThh:mm:ss.zzzzzz, сплитим по T
        const preprocessedDate = rawDate.split('.')[0]
        const dayStr = preprocessedDate.split('T')[0]
        const timeStr = preprocessedDate.split('T')[1]
        const dayDate = new Date(dayStr)

        if (DateService.#isToday(dayDate)) {
            return timeStr
        } else {
            if (DateService.#isYesterday(dayDate)) {
                return "Вчера в " + timeStr
            } else {
                return preprocessedDate.split('T').join(" в ")
            }
        }
    }

    static #isToday(dateToCheck) {
        const today = new Date()
        return today.getFullYear() === dateToCheck.getFullYear() && today.getMonth() === dateToCheck.getMonth() &&
            today.getDay() === dateToCheck.getDay()
    }

    static #isYesterday(dateToCheck) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return yesterday.getFullYear() === dateToCheck.getFullYear() && yesterday.getMonth() === dateToCheck.getMonth() &&
            yesterday.getDay() === dateToCheck.getDay()
    }
}