export const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age > 0 ? age : 0 ;
}


export const formatDateCalendarInput = (date:string) => {

    if(date && date.toString().length > 0){
        const fechaNacimiento = date.toString().split("T")[0].split('-')
        const dateFormat = `${fechaNacimiento[0]}-${fechaNacimiento[1]}-${fechaNacimiento[2]}`
        return dateFormat
    }
    return date
}