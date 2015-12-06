export default (config) => {
  return (
`{
  "name": "${config.npmName}",
  "version": "0.1.0",
  "description": "A React Native module powered by rem",
  "rem": {
    "type": "module"
  },
  "keywords": [
    "react-native",
    "react"
  ],
  "license": "MIT",
  "dependencies": {}
}
`);
}