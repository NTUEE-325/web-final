import React from "react";
import Konva from "konva";
import { Layer, Rect, Stage, Group, Circle, Image } from "react-konva";

function GameBoard() {
  let image = new window.Image();
  image.src = "https://i.imgur.com/v4mD7Mw.jpg";
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Image
          x={"10"}
          y={"10"}
          image={image}
          width={1050}
          height={620}
        ></Image>
      </Layer>
      <Layer>
        <Circle
          x={"110"}
          y={"185"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"190"}
          y={"210"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"200"}
          y={"255"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"240"}
          y={"185"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"270"}
          y={"220"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"245"}
          y={"250"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"495"}
          y={"140"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"480"}
          y={"225"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"520"}
          y={"190"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"570"}
          y={"165"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"560"}
          y={"225"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"625"}
          y={"130"}
          radius={8}
          fill="blue"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"125"}
          y={"235"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"170"}
          y={"290"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"240"}
          y={"300"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"260"}
          y={"370"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"250"}
          y={"440"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"250"}
          y={"520"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"360"}
          y={"480"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"300"}
          y={"560"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"530"}
          y={"360"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"610"}
          y={"340"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"580"}
          y={"410"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"580"}
          y={"510"}
          radius={8}
          fill="yellow"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"515"}
          y={"285"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"655"}
          y={"180"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"590"}
          y={"285"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"615"}
          y={"225"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
        <Circle
          x={"655"}
          y={"300"}
          radius={8}
          fill="black"
          onClick={() => alert("hello")}
        />
      </Layer>
    </Stage>
  );
}

export default GameBoard;
