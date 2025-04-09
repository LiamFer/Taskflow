export default function SiderLogo({collapsed,token}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "start",
        padding: "0 16px",
        marginBottom: 16,
      }}
    >
      <img
        src="https://images.vexels.com/media/users/3/196923/isolated/preview/79898c94791f3ed578e90b613d31eac0-cristal-roxo-brilhante.png" // substitua pelo caminho da sua logo
        alt="Taskflow Logo"
        style={{
          height: 32,
          objectFit: "contain",
          transition: "all 0.3s",
        }}
      />
      {!collapsed && (
        <span
          style={{
            marginLeft: 8,
            fontWeight: "bold",
            fontSize: 18,
            whiteSpace: "nowrap",
            color: token.colorTextBase,
          }}
        >
          Taskflow
        </span>
      )}
    </div>
  );
}
