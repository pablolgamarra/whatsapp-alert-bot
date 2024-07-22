const numberFormatter = require('../util/numberFormatter/formatter');

test('Number Parsed: 0961336691', () => {
    expect(numberFormatter.formatter('0961336691')).toBe('+595961336691@c.us');
})