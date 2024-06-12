const NotFound = () => {
  return (
    <div className="notFound">
      <div className="container">
        <div className="notFound__inner">
          <h2 className="notFound-title">Страница не найдена</h2>
          <div className="notFound__content">
            <p className="notFound-404">404</p>
            <span className="notFound-info">
              Запрашиваемая страница не найдена.Возможно она была удаленна,либо
              ее адрес <br /> был изменен.Попробуйте воспользоваться поиском.
            </span>
            <div className="notFound-group">
              <button className="notFound-back">Вернуться назад </button>
              <button className="notFound-main">Вернуться на главную</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
