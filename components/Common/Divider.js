const Divider = ({ title, lightTitle = false  }) => {
  return (
    <>
      {
          lightTitle ? (
            <div className="my-5">
              <h6 className="text-md font-medium text-black-700 dark:text-black-400 border-b border-primary-300 inline-block pb-1">
                {title}
              </h6>
            </div>
          ) : (
            <div
              style={{ margin: '20px auto' }}
              className="mb-5 flex items-center rounded bg-primary-light p-2 text-primary dark:bg-primary-dark-light"
            >
              <h6 className="text-lg font-bold">{title}</h6>
            </div>
          )
      }
    </>
  )
};

export default Divider;
