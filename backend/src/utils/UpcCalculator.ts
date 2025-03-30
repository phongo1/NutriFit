export function getBarcode(og_barcode: string) {
    let barcode = og_barcode.substring(2);

    let calculate = (Number(barcode[0]) + Number(barcode[2]) + Number(barcode[4]) + Number(barcode[6]) + Number(barcode[8]) + Number(barcode[10])) * 3; //odd pos
    calculate += (Number(barcode[1]) + Number(barcode[3]) + Number(barcode[5]) + Number(barcode[7]) + Number(barcode[9])); //even pos

    calculate %= 10; //get remainder

    if (calculate != 0) {
        calculate = 10 - calculate; //subtract from 10 if not zero
    }

    barcode = barcode.padEnd(12, calculate.toString()); //add check digit to end

    return barcode;
}