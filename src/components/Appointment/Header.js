import React from "react";
import className from "classnames";

export default function Header(props) {
  // console.log('helllo');
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}



