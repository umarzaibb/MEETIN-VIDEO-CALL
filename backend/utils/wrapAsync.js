module.exports= (req,res,func)=>{
    try{
        return func(req,res);
    }catch{(e)=>{
       console.log(`***ERROR ${e.message}`);
    }}
}