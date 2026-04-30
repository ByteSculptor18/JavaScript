import { formatCurrency } from "../Scripts/utils/money.js";



if (formatCurrency(2095) === '$20.95') {
    console.log('Test passed: formatCurrency(2095) === "$20.95"');
} else {
    console.error('Test failed: formatCurrency(2095) !== "$20.95"');
}



if (formatCurrency(0) === '$0.00') {
    console.log('Test passed: formatCurrency(0) === "$0.00"');
} else {
    console.error('Test failed: formatCurrency(0) !== "$0.00"');
}



if (formatCurrency(2000.5) === '$20.01') {
    console.log('Test passed: formatCurrency(2000.5) === "$20.01"');
} else {
    console.error('Test failed: formatCurrency(2000.5) !== "$20.01"');
}


if (formatCurrency(1999.5) === '$20.00') {
    console.log('Test passed: formatCurrency(1999.5) === "$20.00"');
} else {
    console.error('Test failed: formatCurrency(1999.5) !== "$20.00"');
}

if (formatCurrency(2000.4) === '$20.00') {
    console.log('Test passed: formatCurrency(2000.4) === "$20.00"');
} else {
    console.error('Test failed: formatCurrency(2000.4) !== "$20.00"');
}