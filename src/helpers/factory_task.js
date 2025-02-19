import ClassBasic from './ClassBasic'

class Class_task extends ClassBasic {
  type = 'task'
  year = 2025
  week = 0
  day = 1
  timeH = ''
  timeM = ''
}

export const factory_task = () => Object.assign({}, new Class_task())