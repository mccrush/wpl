import ClassBasic from './ClassBasic'

class Class_labels extends ClassBasic {
  type = 'labels'
  color = '#ffffff'
}

export const factory_labels = () => Object.assign({}, new Class_labels())