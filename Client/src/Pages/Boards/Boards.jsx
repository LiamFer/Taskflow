import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoards } from "../../Services/boardService";
import BoardHeader from "./../../Components/Board/BoardHeader";
import BoardTab from "../../Components/Board/Tab/BoardTab";

export default function Boards() {
  const { boardID } = useParams();
  const [boardInfo, setBoardInfo] = useState();

  useEffect(() => {
    getBoards().then((response) =>
      setBoardInfo(response.data.data.filter((board) => board.id == boardID)[0])
    );
  }, [boardID]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <BoardHeader boardInfo={boardInfo} />
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <BoardTab boardID={boardInfo?.id} />
      </div>
    </div>
  );
}
