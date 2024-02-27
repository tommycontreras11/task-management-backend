export function generateUserName(firstName: string, lastName: string) {
    const match  = lastName.match(/^(\S+)/)
    if(!match) return

    return firstName[0].toLowerCase() + match[0].toLowerCase()
}
