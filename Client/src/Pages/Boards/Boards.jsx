import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBoards } from "../../Services/boardService";
import BoardHeader from "./../../Components/Board/BoardHeader";
import BoardTab from "../../Components/Board/Tab/BoardTab";

export default function Boards() {
  const { boardID } = useParams();
  const navigate = useNavigate();
  const [boardInfo, setBoardInfo] = useState();

  useEffect(() => {
    getBoards().then((response) => {
      const BoardData = response.data.data.filter(
        (board) => board.id == boardID
      )[0];
      if (!BoardData) navigate("/home");
      setBoardInfo(BoardData);
    });
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
