const generatedNss = new Set(); //objeto que almacena valores unicos
export default function generaNss() {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567189';
    const charactersLength: number = characters.length;

    do {
        result = ""
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    } while (generatedNss.has(result)); // verifica si el elemento result existe en generatedNss

    generatedNss.add(result);// result se agrega a genetratedNss para que no se vuelva a repetir
    return result;
}