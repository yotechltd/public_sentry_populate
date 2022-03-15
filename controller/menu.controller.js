
const menuController= {
    add:()=>{
        try{
            return {
                body:["Mars", "Moon", "Earth", "Mercury", "Venus", "Jupiter"],
                statusCode: 200
            };
        }catch(error){
            return {
                value: error
            }
        }
    },
    substr:(req,res)=>{
        try{
            return res.status(200).json({
                success: true,
                statusCode: 200,
                value: {
                    name: "Anik"
                }
            })
        }catch(error){
            return {
                value: error
            }
        }
    },
    match:()=>{
        try{
            return {
                success: true,
                statusCode: 200,
                body: {
                    name: "Anik"
                }
            }
        }catch(error){
            return {
                value: error
            }
        }
    },
    matches:()=>{
        try{
            return null;
        }catch(error){
            return {
                value: error
            }
        }
    }
}

module.exports = menuController;