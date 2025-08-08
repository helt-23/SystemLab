const ScheduleTable = ({ diasSemana, horariosUnicos, horarios, onCellClick }) => {
  const statusClassMap = {
    livre: "available",
    reservado: "reserved",
    aula: "class"
  };

  const renderCellContent = (horario) => {
    switch (horario.tipo) {
      case "aula":
        return (
          <div className="cell-content">
            <div className="cell-title">{horario.dados.materia}</div>
            <div className="cell-subtitle">{horario.dados.professor}</div>
          </div>
        );

      case "reservado":
        return (
          <div className="cell-content">
            <div className="cell-title">
              {horario.isUserBooking ? "Sua Reserva" : "Reservado"}
            </div>
            <div className="cell-subtitle">{horario.dados.usuario.nome}</div>
          </div>
        );

      default: // livre
        return (
          <div className="cell-content">
            <div className="cell-title">Livre</div>
            <div className="cell-subtitle">Clique para reservar</div>
          </div>
        );
    }
  };

  return (
    <div className="schedule-table-wrapper">
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Horário</th>
            {diasSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horariosUnicos.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {diasSemana.map((dia) => {
                const horario = horarios.find(
                  (h) =>
                    h.diaSemana === dia &&
                    `${h.horaInicio} - ${h.horaFim}` === time
                );

                if (!horario) return <td key={`${time}-${dia}`}></td>;

                return (
                  <td
                    key={`${time}-${dia}`}
                    className={horario.tipo === "livre" ? "clickable-cell" : ""}
                    onClick={() => {
                      if (horario.tipo === "livre") {
                        onCellClick(dia);
                      }
                    }}
                  >
                    <div className={`cell-status ${statusClassMap[horario.tipo]}`}>
                      {renderCellContent(horario)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;