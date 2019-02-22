function getWoleetLibs() {
  return import(/* webpackChunkName: "woleet-weblibs" */'@woleet/woleet-weblibs').then(({ default: woleet }) => {
    return woleet;
  }).catch(error => 'An error occurred while loading the component');
}

function getI18nService() {
  return import(/* webpackChunkName: "i18next" */'i18next').then(({ default: __ }) => {
    return __;
  }).catch(error => 'An error occurred while loading the component');
}

function getReguralFontAwesomeIcons() {
  return import(/* webpackChunkName: "regular-icons" */'@fortawesome/free-regular-svg-icons').then((module) => {
    return module;
  }).catch(error => 'An error occurred while loading the component');
}

function getSolidFontAwesomeIcons() {
  return import(/* webpackChunkName: "solid-icons" */'@fortawesome/free-solid-svg-icons').then((module) => {
    return module;
  }).catch(error => 'An error occurred while loading the component');
}

export default  {
  getWoleetLibs,
  getI18nService,
  getReguralFontAwesomeIcons,
  getSolidFontAwesomeIcons
}