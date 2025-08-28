const SectionTitle = ({ title, subtitle }) => {
  return (
    <div
      className="mb-4 mt-5 text-center"
      // style={{ width: '80%', margin: '10px auto' }}
    >
      <h6 className="pt-2 text-lg font-semibold text-gray-900">{title}</h6>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {/* <div className="mx-auto mt-4 h-1 w-200 rounded bg-blue-500"></div> */}
    </div>
  );
};

export default SectionTitle;
