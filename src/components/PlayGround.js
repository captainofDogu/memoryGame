import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFramework, updateFramework } from "../redux/frameWorkSlice";
import { frameworkSelectors } from "../redux/frameWorkSlice";
import { updatePoint } from "../redux/pointSlice";
import Swal from "sweetalert2";
import Card from "./Card";
import { duplicatedFrameworks, shuffle } from "./duplicatedFrameworks";

function PlayGround() {
  const [openedFrameworks, setOpenedFrameworks] = useState([]);
  console.log(openedFrameworks) // karta bastıgımda açık kalmasını sağlıyoruz 

  const dispatch = useDispatch();

  const frameworks = useSelector(frameworkSelectors.selectAll);
  console.log(frameworks)
  let completedCards = frameworks.filter((framework) => framework.complete);


  // oyun bittikten sonra restart işlemi yaptırıyor 
  if (completedCards.length === 20) {
    Swal.fire({
      title: "Do you want to play again?",
      showCancelButton: true,
      confirmButtonText: "Restart",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Loading!", "", "success");
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    shuffle(duplicatedFrameworks).map((name, index) =>
      dispatch(
        addFramework({
          id: index,
          name, // angular ,react vs
          close: true,
          complete: false,
          fail: false,
        })
      
      )
      
    );
  }, [dispatch]);

  useEffect(() => {
    openedFrameworks.length > 0 &&
      openedFrameworks.forEach((openedFramework) =>
        dispatch(
          updateFramework({
            id: openedFramework.index,
            changes: {
              close: false,
            },
          })
        )
      );

    if (openedFrameworks.length > 1) {
      setTimeout(() => {
        setTimeout(() => { // açılan 2 kart da aynı cart sa onları güncelliyoruz
          if (
            openedFrameworks[0].name === openedFrameworks[1].name &&
            openedFrameworks[0].index !== openedFrameworks[1].index
          ) {
            openedFrameworks.forEach((openedFramework) =>
              dispatch(
                updateFramework({
                  id: openedFramework.index,
                  changes: {
                    complete: true,
                  },
                })
              )
            );// Eğer adları aynı id leri farklıysa kapatma tam tersiyse kapat 
            dispatch(updatePoint(50)); // eğer doğru bilirse 50 puan ekle
          } else {
            openedFrameworks.forEach((openedFramework) =>
              dispatch(
                updateFramework({
                  id: openedFramework.index,
                  changes: {
                    close: true,
                  },
                })
              )
            );
            dispatch(updatePoint(-10));
          }
        }, 750);

        setOpenedFrameworks([]);
      }, 1000);
    }
  }, [openedFrameworks, dispatch]);

  const handleClick = (name, index) => {
    let framework = {
      name,
      index,
    };
    setOpenedFrameworks([...openedFrameworks, framework]);
  };

  return (
    <div className="playground">
      {frameworks.length > 0 &&
        frameworks.map((framework, id) => {
          return (
            <Card
              className={framework.complete ? "disabledPointer" : ""}
              key={id}
              framework={framework.name}
              click={() => {
                !framework.complete &&
                  openedFrameworks.length < 2 &&
                  handleClick(framework.name, id);
              }}
              close={framework.close}
              complete={framework.complete}
            />
          );
        })}
    </div>
  );
}

export default PlayGround;
