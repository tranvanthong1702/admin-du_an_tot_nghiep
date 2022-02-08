export const SHOW_MODAL_TYPE = {
  FORM: 'form',
  MEDIA: 'media',
  DELETE: 'delete',
  ARCHIVE: 'archive',
  GROUP: { FORM: 'group.form', DELETE: 'group.delete' },
  MEMBER: {
    ADD: 'member.add',
    LIST: 'member.list'
  },
  PROJECT: {
    FORM: 'project.form'
  }
}

export const AREA_DEFAULT = {
  name: '',
  description: '',
  image: ''
}

export const AREA_FORM_DEFAULT = {
  name: '',
  description: '',
  thumbnail: ''
}

export const GROUP_FORM_DEFAULT = {
  name: '',
  description: null,
  thumbnail: null
}
