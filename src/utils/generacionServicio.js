const generacionServicio = (xmlCifrado) => {
    const originalString = `xml=<pgs><data0>SNDBX123</data0><data>${xmlCifrado}</data></pgs>`;
    const data = encodeURIComponent(originalString);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
        }
    });

    xhr.open("POST", "https://sandboxpo.mit.com.mx/gen");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.send(data);
}

export default generacionServicio