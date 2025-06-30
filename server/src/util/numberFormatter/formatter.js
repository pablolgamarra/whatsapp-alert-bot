module.exports = {
    formatter: (number) => {
        let formatted;
        if (number.startsWith('0')) {
            formatted = number.slice(1);
        }
        formatted = `+595${formatted}@c.us`;
        return formatted;
    }
}
