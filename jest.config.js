const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  preset: '@shelf/jest-mongodb',
  transform: tsjPreset.transform,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  }
}