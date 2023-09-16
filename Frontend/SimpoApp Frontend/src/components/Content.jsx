import React from "react";

const Content = (props) => {
//parte para js

const { count } = props;

//return 

return(
    <div>
        <h1>Content</h1>
        <div>Count: {count}</div>
    </div>
);


}
//export default Header;
export default Content;