import ClassBasic from './ClassBasic'

class Class_week extends ClassBasic {
  type = 'week'
  week = 1
}

export const factory_week = () => Object.assign({}, new Class_week())