@App = angular.module 'App', ['ngResource']

@ICONS =
  395: ["snow sun", "snow moon"]
  392: ["lightning sun", "lightning moon"]
  389: ["lightning", "lightning"]
  386: ["snow sun", "snow moon"]
  377: ["sleet", "sleet"]
  374: ["showers sun", "showers moon"]
  371: ["snow sun", "snow moon"]
  368: ["flurries sun", "flurries moon"]
  365: ["snow sun", "snow moon"]
  362: ["snow sun", "snow moon"]
  359: ["rain", "rain"]
  356: ["showers sun", "showers moon"]
  353: ["drizzle sun", "showers moon"]
  350: ["snow", "snow"]
  338: ["snow", "snow"]
  335: ["snow sun", "snow moon"]
  332: ["snow", "snow"]
  329: ["snow", "snow"]
  326: ["cloud sun", "cloud moon"]
  323: ["cloud sun", "cloud moon"]
  320: ["snow", "snow"]
  317: ["snow", "snow"]
  314: ["snow", "snow"]
  311: ["snow", "snow"]
  308: ["rain", "rain"]
  305: ["showers sun", "showers moon"]
  302: ["rain", "rain"]
  299: ["showers sun", "showers moon"]
  296: ["rain", "rain"]
  293: ["rain", "rain"]
  284: ["snow", "snow"]
  281: ["snow", "snow"]
  266: ["drizzle", "drizzle"]
  263: ["showers sun", "showers moon"]
  260: ["fog", "fog moon"]
  248: ["fog", "fog moon"]
  230: ["snow", "snow"]
  227: ["snow", "snow"]
  200: ["downpour sun", "downpour moon"]
  185: ["snow", "snow"]
  182: ["snow", "snow"]
  179: ["snow sun", "snow moon"]
  176: ["showers sun", "showers moon"]
  143: ["fog", "fog moon"]
  122: ["cloud", "cloud"]
  119: ["cloud", "cloud"]
  116: ["cloud", "cloud"]
  113: ["sun", "moon"]

@WINDS =
  N: 'North'
  NbE: 'North by east'
  NNE: 'North-northeast'
  NEbN: 'Northeast by north'
  NE: 'Northeast'
  NEbE: 'Northeast by east'
  ENE: 'East-northeast'
  EbN: 'East by north'
  E: 'East'
  EbS: 'East by south'
  ESE: 'East-southeast'
  SEbE: 'Southeast by east'
  SE: 'Southeast'
  SEbS: 'Southeast by south'
  SSE: 'South-southeast'
  SbE: 'South by east'
  S: 'South'
  SbW: 'South by west'
  SSW: 'South-southwest'
  SWbS: 'Southwest by south'
  SW: 'Southwest'
  SWbW: 'Southwest by west'
  WSW: 'West-southwest'
  WbS: 'West by south'
  W: 'West'
  WbN: 'West by north'
  WNW: 'West-northwest'
  NWbW: 'Northwest by west'
  NW: 'Northwest'
  NWbN: 'Northwest by north'
  NNW: 'North-northwest'
  NbW: 'North by west'