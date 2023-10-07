const { Next } = require("react-bootstrap/esm/PageItem");


const handler = NextAuth({
    providers:[
        
    ]
});


export {handler as GET, handler as POST};