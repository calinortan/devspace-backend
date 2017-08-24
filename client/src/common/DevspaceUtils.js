import _ from 'lodash';
import {
  redA200, red700,
  blueA200, blue700,
  lightGreenA200, lightGreen700,
  purpleA200, purple700,
  yellowA200, yellow700,
  limeA200, lime700,
  indigoA200, indigo700,
  deepOrangeA200, deepOrange700,
  tealA200, teal700
} from 'material-ui/styles/colors';
const colorObjects = [
  {
    color: red700,
    highlightColor: redA200
  },
  {
    color: blue700,
    highlightColor: blueA200
  },
  {
    color: lightGreen700,
    highlightColor: lightGreenA200
  },
  {
    color: purple700,
    highlightColor: purpleA200
  },
  {
    color: yellow700,
    highlightColor: yellowA200
  },
  {
    color: lime700,
    highlightColor: limeA200
  },
  {
    color: indigo700,
    highlightColor: indigoA200
  },
  {
    color: deepOrange700,
    highlightColor: deepOrangeA200
  },
  {
    color: teal700,
    highlightColor: tealA200
  }
];
export const getColorObjects = (colorObjectsNumber) => {
  if (colorObjectsNumber == null || colorObjectsNumber > 9) {
    return _.shuffle(colorObjects);
  }
  return _.slice(_.shuffle(colorObjects), 0, colorObjectsNumber);
}

