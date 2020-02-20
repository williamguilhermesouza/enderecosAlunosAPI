export default function cpfValidator(cpf): boolean {
    let valid: boolean = true;
    let sum_prod: number = 0;
    let verification_digit: number = 0;
    if (cpf.length != 11 || cpf.match(/^[0-9]+$/g) == null) {
        valid = false;
        console.log('length not only digits');
    }

    for (let i = 0; i < 11; i++) {
        if (cpf[i] != cpf[1]) {
            break
        }
        if (i == 10) {
            valid = false;
            console.log('digits same');
        }
    }

    for (let i = 10, j = 0; i > 1; i--, j++) {
        sum_prod += i * parseInt(cpf[j]);
    }

    verification_digit = (sum_prod * 10) % 11;
    if (verification_digit != cpf[9]) {
        valid = false;
        console.log('1st invalid');
    }

    sum_prod = 0;

    for (let i = 11, j = 0; i > 2; i--, j++) {
        sum_prod += i * parseInt(cpf[j]);
    }
    sum_prod += verification_digit * 2;
    verification_digit = (sum_prod * 10) % 11;

    if (verification_digit != cpf[10]) {
        valid = false;
        console.log('2nd invalid');
    }

    return valid;
}