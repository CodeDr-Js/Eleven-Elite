const {
  host,
  hostname,
  href,
  origin,
  pathname,
  port,
  protocol,
  urLSearchParams,
} = window.location;
//   let param_x = dir( "data" )
function dir(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export {
  host,
  hostname,
  href,
  origin,
  pathname,
  port,
  protocol,
  urLSearchParams,
  dir,
};
