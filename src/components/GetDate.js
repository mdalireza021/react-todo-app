import React from "react";
const GetDate=()=>
{
    const d = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const month=monthNames[d.getMonth()];

const dayNames=["Saturday","Sunday","Monday","Tuesday","Thursday","Friday"];
const day=dayNames[d.getDay()];

const value="Today is "+day+", "+month+" "+d.getDate();
    return(<div>
        <p>{value}</p>

    </div>)
}
export default GetDate;
