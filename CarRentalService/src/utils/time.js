function parseTime(s) {
    const d = new Date(s);
    if (isNaN(d)) throw new Error("Invalid time " + s);
    return d;
}

function overlaps(s1, e1, s2, e2) {
    return s1 < e2 && s2 < e1;
}

function hoursBetween(s, e){ 
    return (e-s)/1000/60/60;
    
}

module.exports = {parseTime, overlaps, hoursBetween}