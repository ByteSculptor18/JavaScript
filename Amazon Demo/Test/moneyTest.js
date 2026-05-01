import { formatCurrency } from '../Scripts/utils/money.js';



describe('test Suite: formatCurrency', () => {
    it('should format 2095 as $20.95', () => {
        expect(formatCurrency(2095)).toEqual('$20.95');
    });

    it('should format 0 as $0.00', () => {
        expect(formatCurrency(0)).toEqual('$0.00');
    });

    it('should format 2000.5 as $20.01', () => {
        expect(formatCurrency(2000.5)).toEqual('$20.01');
    });

    it('should format 1999.5 as $20.00', () => {
        expect(formatCurrency(1999.5)).toEqual('$20.00');
    });

    it('should format 2000.4 as $20.00', () => {
        expect(formatCurrency(2000.4)).toEqual('$20.00');
    });
});