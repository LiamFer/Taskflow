import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBoards } from "../../Services/boardService";
import BoardHeader from "./../../Components/Board/BoardHeader";
import BoardTab from "../../Components/Board/Tab/BoardTab";
import { useBoardData } from "../../Context/boardContext";

export default function Boards() {
  const { boardID } = useParams();
  const navigate = useNavigate();
  const { fetchBoard, setboardID } = useBoardData();
  const [boardInfo, setBoardInfo] = useState();

  useEffect(() => {
    setboardID(boardID);
    getBoards().then((response) => {
      const BoardData = response.data.data.find((board) => board.id == boardID);
      if (!BoardData) navigate("/home");
      setBoardInfo(BoardData);
    });
  }, [boardID]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <BoardHeader boardInfo={boardInfo} />
      <div style={{ flex: 1, minHeight: 0 }}>
        <BoardTab boardID={boardInfo?.id} />
      </div>
    </div>
  );
}
