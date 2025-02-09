// Класс Основной с общими свойствами
import getDateNow from './getDateNow'

export default class ClassBasic {
  constructor() {
    this.dateCreate = getDateNow()
  }
  id = ''
  type = ''
  title = ''
  description = ''
  position = 1
  status = 'active'
}