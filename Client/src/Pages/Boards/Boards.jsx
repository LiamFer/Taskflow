import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "./../../Components/Board/BoardHeader";
import BoardTab from "../../Components/Board/Tab/BoardTab";
import { useBoardData } from "../../Context/boardContext";

export default function Boards() {
  const { boardID } = useParams();
  const navigate = useNavigate();
  const { userBoards, setboardID, getBoardInfo } = useBoardData();
  const [boardInfo, setBoardInfo] = useState();


  useEffect(() => {
    setboardID(boardID);
    const BoardData = getBoardInfo(boardID);
    if (!BoardData) navigate("/home");
    setBoardInfo(BoardData);
  }, [boardID, userBoards]);

  return (
    <div
      style={{
        margin: "0px 16px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingTop: 10,
      }}
    >
      <BoardHeader boardInfo={boardInfo} />
      <div style={{ flex: 1, minHeight: 0 }}>
        <BoardTab ID={boardInfo?.id} />
      </div>
    </div>
  );
}
