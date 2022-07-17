import React from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

function Pointer() {
  const value = useSelector((state) => state.point.value);
  const diff = useSelector((state) => state.point.diff);
  console.log("diff",diff)
  console.log("value + diff / 5",value + diff / 5) // 200
  console.log(value) // 200
  

  return (
    <div className="pointer">
      <div>
        <h1>POINT:</h1>
        <h1>
          <CountUp start={value + diff / 5} end={value} delay={0}>
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef}  />
                
              </div>
            )}
          </CountUp>
        </h1>
      </div>
    </div>
  );
}

export default Pointer;
