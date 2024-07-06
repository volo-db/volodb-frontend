export function getAgeToday(birthdayString) {
  const birthdayDate = new Date(birthdayString)
  const today = new Date()

  let age = today.getFullYear() - birthdayDate.getFullYear()

  if (today.getMonth() < birthdayDate.getMonth()) return age - 1

  if (today.getMonth() == birthdayDate.getMonth() && today.getDay() < birthdayDate.getDay())
    return age - 1

  return age
}

export function getAge(birthdayString, relevantDateString) {
  const birthdayDate = new Date(birthdayString)
  const relevantDate = new Date(relevantDateString)

  if (relevantDate <= birthdayDate) return 0

  let age = relevantDate.getFullYear() - birthdayDate.getFullYear()

  if (relevantDate.getMonth() < birthdayDate.getMonth()) return age - 1

  if (
    relevantDate.getMonth() == birthdayDate.getMonth() &&
    relevantDate.getDay() < birthdayDate.getDay()
  )
    return age - 1

  return age
}

export function getPropperDateString(dateString) {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch (error) {
    throw new Error('dateString not valid')
  }
}

export function reformatDate(dateStr) {
  // Split the date string by the '.' character
  const [day, month, year] = dateStr.split('.')

  // Return the formatted date string
  return `${year}-${month}-${day}`
}
