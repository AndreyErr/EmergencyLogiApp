import React from "react";

function MessageText(props) {
  return (
    <div className={`alert alert-${props.typeOf} mb-0 mt-2`} role="alert">
      {props.text ? <span dangerouslySetInnerHTML={{ __html: props.text }} /> : null}
    </div>
  );
}

export default MessageText;