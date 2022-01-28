function importAll(r) {
    return r.keys().map(r);
  }
  
  const pictures = importAll(require.context('./assets/signs', false, /\.(png|jpe?g|svg)$/));


 export {pictures};