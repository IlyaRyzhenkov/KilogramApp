export class CookieService {
    static setCookie(cookieName, cookieValue, hoursToExpire) {
        let date = new Date();
        date.setTime(date.getTime() + (hoursToExpire * 60 * 60 * 1000));
        document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
    }

    static getCookie(cookieName) {
        let cookies = document.cookie.split(';').map(c => c.trim());
        try {
            return cookies.find(cookie => cookie.split('=')[0] === cookieName).split('=')[1];
        } catch (e) {
            return null;
        }
    }

    static clearCookie(cookieName) {
        this.setCookie(cookieName, "", -1);
    }
}