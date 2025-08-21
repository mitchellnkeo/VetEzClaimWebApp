import React, { useRef } from 'react';
import Link from 'next/link';
import { DataTable } from 'mantine-datatable';
import { Dialog, Transition } from '@headlessui/react';
import { useState, useEffect, Fragment } from 'react';
import { TbListDetails } from 'react-icons/tb';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { EyeIcon } from '@/components/icons/SvgIcons';
import Image from 'next/image';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { showAlert, deleteAlert } from '@/utils';
import { list, remove } from '@/store/slices/profileSlice';
//FIREBASE ASSETS
import {
  doc,
  getDocs,
  getDoc,
  query,
  limit,
  orderBy,
  collection,
  startAfter,
  startAt,
  where,
  firebase,
} from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase';
import { setUser } from '@/store/slices/authSlice';
import { TABLE_NAME } from '@/constants/constants';

const List = () => {
  const dispatch = useDispatch();
  const fp = useRef(null);
  // const { isLoading, error, data } = useSelector((state) => state.profile);
  const [addContactModal, setAddContactModal] = useState(false);
  const [details, setDetails] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZES = [10, 30, 40, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(items, 'id'));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchDate, setSearchDate] = useState(''); //new Date()

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'id',
    direction: 'desc',
  });

  const getSubmitClaims = async () => {
    try {
      setIsLoading(true);
      const requestFileCol = collection(db, TABLE_NAME.submitclaim);
      const requestFileSnapshot = await getDocs(requestFileCol);

      const requestFileArray = requestFileSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const total = requestFileSnapshot.size;
      setTotalCount(total);
      setItems(requestFileArray);
      setInitialRecords(requestFileArray);
      setIsLoading(false);
    } catch (error) {
      showAlert(error.message, 'error');
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubmitClaims();
  }, []);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
  }, [sortStatus, items]);

  const setModalData = async (id) => {
    const existingData = items.find((item) => item.id === id);
    setDetails(existingData);
  };

  useEffect(() => {
    setInitialRecords(() => {
      return items?.filter((item, id) => {
        return item.nameForm.toLowerCase().includes(search.toLowerCase());
      });
    });
  }, [page]);

  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
      <div className="invoice-table">
        <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl">Submit Claims List</h1>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto"></div>
        </div>
        {isLoading ? (
          <span className="m-auto mb-10 flex h-14 w-14 animate-spin rounded-full border-8 border-[#f1f2f3] border-l-primary align-middle"></span>
        ) : (
          <div className="datatables pagination-padding" id="categoryTable">
            <p className="mb-2 pl-5">Total Result: {totalCount}</p>
            <DataTable
              className="table-hover whitespace-nowrap"
              records={records}
              minHeight={200}
              columns={[
                {
                  accessor: 'ID',
                  title: 'Name Form',
                  sortable: true,
                  render: ({ userId, id, nameForm }) => (
                    <div className="relative flex w-max items-center">
                      <Link
                        href={`/users/${userId}`}
                        className="flex underline hover:text-info"
                      >
                        {nameForm}
                      </Link>
                    </div>
                  ),
                },
                {
                  accessor: 'guid',
                  title: 'VA Status',
                  sortable: true,
                  render: ({ guid }) =>
                    guid ? (
                      <span className="uppercase text-success">success</span>
                    ) : null,
                },
                // {
                //   accessor: 'nameForm',
                //   sortable: true,
                // },
                // {
                //   accessor: 'veteranDateSigned',
                //   sortable: true,
                // },
                {
                  accessor: 'timestamp',
                  sortable: true,
                },
                {
                  accessor: 'status',
                  sortable: true,
                },
                // {
                //   accessor: 'action',
                //   title: 'Actions',
                //   sortable: false,
                //   textAlignment: 'center',
                //   render: ({ id }) => (
                //     <div className="mx-auto flex w-max items-center gap-4">
                //       <Tippy content="Details Page" theme="success">
                //         <Link
                //           href={{
                //             pathname: '/profile/[id]',
                //             query: { id: id },
                //           }}
                //           className="flex hover:text-info"
                //         >
                //           <TbListDetails className="text-xl text-gray-600 hover:text-success" />
                //         </Link>
                //       </Tippy>
                //       <button
                //         type="button"
                //         onClick={() => {
                //           setAddContactModal(true);
                //           setModalData(id);
                //         }}
                //         className="flex hover:text-success"
                //       >
                //         <EyeIcon />
                //       </button>
                //     </div>
                //   ),
                // },
              ]}
              highlightOnHover
              totalRecords={totalCount}
              recordsPerPage={pageSize}
              // page={page}
              onPageChange={(p) => setPage(p)}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={setPageSize}
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
              // selectedRecords={selectedRecords}
              // onSelectedRecordsChange={setSelectedRecords}
              paginationText={({ from, to, totalRecords }) =>
                `Showing  ${from} to ${to} of ${totalRecords} entries`
              }
            />
          </div>
        )}
      </div>
      <Transition appear show={addContactModal} as={Fragment} details={details}>
        <Dialog
          as="div"
          open={addContactModal}
          onClose={() => setAddContactModal(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[black]/60" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                  <button
                    type="button"
                    onClick={() => setAddContactModal(false)}
                    className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                    Profile Details
                  </div>
                  <div className="p-5">
                    <div className="mb-2">
                      <label htmlFor="name">
                        Full Name:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.firstName + ' ' + details?.lastName}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Email:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.email}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Phone:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.phone}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Unit Number:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.unitNumber}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Zip Code:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.zipCode}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Province:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.province}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        City:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.city}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Street:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.street}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Branch Service:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.branchService}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        AccountType:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.directDepositAccountType}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Deposit Account Number:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.directDepositAccountNumber}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Deposit Transit Number:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.directDepositTransitNumber}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Deposit Institution Name:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.directDepositInstitutionName}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Last Date Service:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.lastDateService}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        SSN:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                          {details?.ssn}
                        </span>
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="name">
                        Signature:{' '}
                        <img
                          src={details?.signature}
                          className="h-auto w-1/2 rounded-lg"
                          alt="image"
                        />
                      </label>
                    </div>
                    <div className="mt-8 flex items-center justify-end">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => setAddContactModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default List;
