import React from 'react'

function Alert(props) {
    const captali = (word) => {
        if(word === "danger")word = "error";
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height:'50 px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{captali(props.alert.type)}</strong>: {props.alert.msg}
      </div>}
    </div>
  )
}

export default Alert