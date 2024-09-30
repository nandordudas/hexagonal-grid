// [TODO] extract to a separate file
export interface Coordinates {
  x: number
  y: number
}

export interface SettingsSchema {
  mouseCoordinates: Coordinates
}

export const settings = new Settings<SettingsSchema>()
