export function convertColorToHex(color: string): number {
    // Удаление символа '#'
    const hexColor = color.replace('#', '');
    // Преобразование строки в числовое значение с основанием 16
    const numericColor = parseInt(hexColor, 16);
    // Добавление префикса '0x'
    return parseInt('0x' + numericColor.toString(16).toUpperCase());
}