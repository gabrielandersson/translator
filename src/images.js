
//A function to import pictures, compatible with png, jpg/jpeg and svg
function importAll(r) {
    return r.keys().map(r);
  }
  
  const pictures = importAll(require.context('./assets/signs', false, /\.(png|jpe?g|svg)$/));


 export {pictures};