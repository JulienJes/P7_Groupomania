function dateParser(num) { //mise en forme des dates récupérées
    let options = {hour:"2-digit", minute:"2-digit", seconde:"2-digite", weekday:"long", year:"numeric", month:"short", day:"numeric"};
    let timestamp= Date.parse(num);
    let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

    return date.toString();
}

export default dateParser

export function isEmpty(value) {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    )
}