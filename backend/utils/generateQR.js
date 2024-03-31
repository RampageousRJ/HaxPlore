import qr from 'qrcode'

const generateQR=(data)=>{
    let stJson=JSON.stringify(data)
    /*qr.toString(stJson,{type:'terminal'},function(err,code){
        if(err){
            console.log("error:",err)
        }
        console.log(code)
    })*/
    qr.toDataURL(stJson,function(err,code){
        if(err){
            console.log("error:",err)
        }
        return {code};
    })
    /*qr.toFile("qr.png",stJson,function(err){
        if(err){
            console.log("error:",err)
        }
    })*/
}

export default generateQR;