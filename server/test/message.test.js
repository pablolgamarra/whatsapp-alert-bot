const message = require('../model/message');

test('Sended message "Hola Bot", to be responsed by "Test"', () => {
    expect(message.getMessage("Hola Bot")).toBe("Test");
});