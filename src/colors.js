// @flow

const colors = {
  win8_4: '#000000',
  mac_7: '#2D2D2D',
  mac_11: '#FFFFFF',
  flat_clouds: '#ecf0f1',
  mac_5: '#D7D7D7',
  palette0_4: '#aaaaaa',
  mac_6: '#919191',
  win95_4: '#6c6c6c',
  mac_4: '#5F5F5F',
  win8_5: '#4B4A48',
  win8_0: '#7E735F',
  mac_2: '#7B8495',
  mac_10: '#D5E1ED',
  flat_silver: '#bdc3c7',
  flat_concrete: '#95a5a6',
  win8_16: '#535D54',
  win8_10: '#4B5459',
  flat_midnight_blue: '#2c3e50',
  flat_wet_asphalt: '#34495e',
  mac_1: '#4A6997',
  mac_0: '#5A7FB4',
  flat_belize_hole: '#2980b9',
  flat_peter_river: '#3498db',
  win8_3: '#0063B1',
  palette0_3: '#0037fd',
  win95_1: '#394dcd',
  win8_8: '#6B69D6',
  win8_6: '#8F8BD8',
  win8_11: '#8764B8',
  win8_13: '#744DA8',
  flat_amethyst: '#9b59b6',
  flat_wisteria: '#8e44ad',
  win8_19: '#871797',
  win8_18: '#9B008A',
  win8_12: '#C00077',
  win8_7: '#C40052',
  palette0_2: '#ff0000',
  win8_2: '#E81123',
  win8_17: '#D03438',
  flat_pomegranate: '#c0392b',
  flat_alizarin: '#e74c3c',
  win95_0: '#e35f5f',
  flat_pumpkin: '#d35400',
  win8_1: '#FF8B00',
  flat_carrot: '#e67e22',
  flat_orange: '#f39c12',
  flat_sun_flower: '#f1c40f',
  palette0_1: '#fbf000',
  win8_15: '#4A6762',
  mac_8: '#62867C',
  win8_14: '#018675',
  flat_green_sea: '#16a085',
  flat_turquoise: '#1abc9c',
  flat_emerald: '#2ecc71',
  flat_nephritis: '#27ae60',
  win8_20: '#10883E',
};

export function getColors(): Array<string> {
  return Object.keys(colors).map(colorName => colors[colorName]);
}

export default colors;
