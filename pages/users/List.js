import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { TbListDetails } from 'react-icons/tb';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { EyeIcon, DeleteIcon } from '@/components/icons/SvgIcons';
import { useDispatch } from 'react-redux';
import { showAlert } from '@/utils';
// FIREBASE ASSETS
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { TABLE_NAME } from '@/constants/constants';

const List = () => {
  const dispatch = useDispatch();
  const [addContactModal, setAddContactModal] = useState(false);
  const [details, setDetails] = useState(null);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const getProfiles = async () => {
    try {
      setIsLoading(true);
      const profileCol = collection(db, TABLE_NAME.profile);

      let profilesArray = [];

      // Handle search functionality
      if (search) {
        // Firestore doesn't support OR queries directly, so we fetch both and merge
        const searchEndValue = search + '\uf8ff';

        const firstNameQuery = query(
          profileCol,
          where('firstName', '>=', search),
          where('firstName', '<=', searchEndValue)
        );

        const emailQuery = query(
          profileCol,
          where('email', '>=', search),
          where('email', '<=', searchEndValue)
        );

        const [firstNameSnapshot, emailSnapshot] = await Promise.all([
          getDocs(firstNameQuery),
          getDocs(emailQuery),
        ]);

        const firstNameResults = firstNameSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const emailResults = emailSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Merge and remove duplicates
        profilesArray = [
          ...firstNameResults,
          ...emailResults.filter(
            (emailItem) =>
              !firstNameResults.some((item) => item.id === emailItem.id)
          ),
        ];
      } else {
        // No search term, fetch all data
        const profilesSnapshot = await getDocs(profileCol);
        profilesArray = profilesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }

      // Apply sorting
      const fieldToSortBy = sortField || 'firstName';
      profilesArray.sort((a, b) => {
        const aValue = a[fieldToSortBy]?.toLowerCase() || '';
        const bValue = b[fieldToSortBy]?.toLowerCase() || '';
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      // Get total count
      const total = profilesArray.length;

      // Apply pagination
      const offset = (currentPage - 1) * perPage;
      const paginatedProfiles = profilesArray.slice(offset, offset + perPage);

      console.log('<< profiles :', paginatedProfiles);

      setItems(paginatedProfiles);
      setTotalCount(total);
      setIsLoading(false);
    } catch (error) {
      showAlert(error.message, 'error');
      console.error(error);
      setIsLoading(false);
    }
  };

  // Fetch profiles when dependencies change
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortField, sortDirection, currentPage, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSort = (column, sortDirection) => {
    setSortField(column.sortField);
    setSortDirection(sortDirection);
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const contextActions = (
    <button
      key="delete"
      onClick={() => handleBulkDelete()}
      className="btn btn-danger"
    >
      Delete Selected
    </button>
  );

  const setModalData = (id) => {
    const existingData = items.find((item) => item.id === id);
    setDetails(existingData);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, TABLE_NAME.profile, id));
      showAlert('User deleted successfully', 'success');
      // Remove deleted user from state
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      showAlert(error.message, 'error');
      console.error(error);
    }
  };

  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${selectedRows
          .map((r) => r.firstName)
          .join(', ')}?`
      )
    ) {
      try {
        await Promise.all(
          selectedRows.map(async (record) => {
            await deleteDoc(doc(db, TABLE_NAME.profile, record.id));
          })
        );
        showAlert('Selected users deleted successfully', 'success');
        // Remove deleted users from state
        setItems((prevItems) =>
          prevItems.filter(
            (item) => !selectedRows.some((r) => r.id === item.id)
          )
        );
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
      } catch (error) {
        showAlert(error.message, 'error');
        console.error(error);
      }
    }
  };

  const columns = [
    {
      name: 'Full Name',
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      sortField: 'firstName',
      cell: (row) => (
        <div className="relative flex w-max items-center">
          <Link
            href={`/users/${row.id}`}
            className="flex underline hover:text-info"
          >
            {row.firstName + ' ' + row.lastName}
          </Link>
        </div>
      ),
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      sortField: 'email',
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
      sortField: 'phone',
    },
    {
      name: 'Paid User',
      selector: (row) =>
        row.subscriptionStatus && row.subscriptionStatus === 'true'
          ? 'Yes'
          : 'No',
      sortable: true,
      sortField: 'subscriptionStatus',
      center: true, // optional: to center-align the column
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="mx-auto flex w-max items-center gap-4">
          <Tippy content="Details Page" theme="success">
            <Link
              href={{
                pathname: '/users/[id]',
                query: { id: row.id },
              }}
              className="flex hover:text-info"
            >
              <TbListDetails className="text-xl text-gray-600 hover:text-success" />
            </Link>
          </Tippy>
          <button
            type="button"
            onClick={() => {
              setAddContactModal(true);
              setModalData(row.id);
            }}
            className="flex hover:text-success"
          >
            <EyeIcon />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row.id)}
            className="flex hover:text-danger"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
      <div className="invoice-table">
        <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl">Users List</h1>
          </div>
          {/* Search Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by first name or email"
              className="block rounded border-2 py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page
              }}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={items}
          progressPending={isLoading}
          pagination
          paginationServer
          paginationTotalRows={totalCount}
          paginationPerPage={perPage}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          onSort={handleSort}
          sortServer
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          contextActions={contextActions}
          clearSelectedRows={toggleCleared}
          selectableRowsHighlight
          highlightOnHover
          pointerOnHover
          persistTableHead
        />
      </div>
      {/* Modal code remains the same */}
      <Transition appear show={addContactModal} as={Fragment}>
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
                    className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                  >
                    {/* Close Icon */}
                  </button>
                  <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                    Profile Details
                  </div>
                  <div className="p-5">
                    {details && (
                      <>
                        <div className="mb-2">
                          <label htmlFor="name">
                            Full Name:{' '}
                            <span className="font-bold capitalize">
                              {details?.firstName + ' ' + details?.lastName}
                            </span>
                          </label>
                        </div>
                        {/* Other details */}
                      </>
                    )}
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
