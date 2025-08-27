const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="my-8 text-center">
      <h6 className="text-lg font-semibold text-gray-900">{title}</h6>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {/* <div className="mx-auto mt-4 h-1 w-200 rounded bg-blue-500"></div> */}
    </div>
  );
};

export default SectionTitle;
