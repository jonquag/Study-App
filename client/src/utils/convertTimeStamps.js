// msToTimeAgo takes in milliseconds elapsed since the UNIX epoch
// and converts it to one of x seconds ago, x minutes ago, x days ago, x years ago
export const msToTimeAgo = (ms) => {
    
    if (isNaN(ms)) return 'Not a number';

    const d = new Date();
    const nowTs = Math.floor(d.getTime()/1000);
    const seconds = nowTs-ms;
    
    // years ago
    if (seconds > 365.2425*24*3600) {
        const y = Math.floor(seconds / (365.2425*24*3600))
        return  y + (y > 1 ? ' years ago' : ' year ago');
    }
    // months ago
    if (seconds > 30*24*3600) {
        const m = Math.floor(seconds / (30*24*3600));
        return m + (m > 1 ? ' months ago' : ' month ago');
    }
    // weeks ago
    if (seconds > 7*24*3600) {
        const w = Math.floor(seconds / (7*24*3600));
        return w + (w > 1 ? ' weeks ago' : ' week ago');
     }
    // days ago
    if (seconds > 2*24*3600) {
        return Math.floor(seconds / (24*3600)) + ' days ago';
    }
    // yesterday
    if (seconds > 24*3600) {
        return 'yesterday';
    }
    // hours ago
    if (seconds > 3600) {
        const h = Math.floor(seconds/3600);
        return h + (h > 1 ? ' hours ago' : ' hour ago');
    }
    //minutes ago
    if (seconds > 60) {
        const s = Math.floor(seconds/60);
        return s + (s > 1 ? ' minutes ago' : ' minute ago');
    }
    //seconds ago
    return Math.floor(seconds) + ' seconds ago';
};
