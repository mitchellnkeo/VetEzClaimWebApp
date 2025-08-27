const Divider = ({ title }) => {
  return (
    <div
      style={{ width: '90%', margin: '20px auto' }}
      className="mb-5 flex items-center rounded bg-primary-light p-2 text-primary dark:bg-primary-dark-light"
    >
      <h6 className="text-lg font-bold">{title}</h6>
    </div>
  );
};

export default Divider;
