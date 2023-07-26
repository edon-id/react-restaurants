type TitleProps = {
  title: string;
};

export const SectionTitle = ({title}:TitleProps) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-10  offset-sm-1 mt-4">
          <h2 className="text-center mb-4 text-uppercase fs-4 fw-bold w-100">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};
